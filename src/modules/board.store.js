import { boardService } from '@/services/board.service.js'

import _ from 'lodash'

export const boardStore = {
  state: {
    boards: [],
    currBoard: null,
    searchBoard: null,
    filterBy: { status: 'All', priority: 'All', person: 'All', searchTerm: '' },
    darkMode:false
  },
  getters: {
    boards(state) {
      if (!state.searchBoard) return state.boards
      return state.boards.filter(board =>
        board.name.toLowerCase().includes(state.searchBoard.toLowerCase())
      )
    },
    board(state) {
      const filterBy = state.filterBy
      let filteredBoard = JSON.parse(JSON.stringify(state.currBoard))
      if (filterBy.status !== 'All') {
        filteredBoard.groups.filter(group => {
          group.tasks = group.tasks.filter(task => {
            return task.status.txt === filterBy.status
          })
        })
        filteredBoard.groups = filteredBoard.groups.filter(
          group => (group = group.tasks.length !== 0)
        )
      }
      if (filterBy.priority !== 'All') {
        filteredBoard.groups.forEach(group => {
          group.tasks = group.tasks.filter(task => {
            return task.priority.txt === filterBy.priority
          })
        })
        filteredBoard.groups = filteredBoard.groups.filter(
          group => (group = group.tasks.length !== 0)
        )
      }
      if (filterBy.person !== 'All') {
        filteredBoard.groups.forEach(group => {
          group.tasks = group.tasks.filter(task => {
            if (task.members.some(member => member._id === filterBy.person)) {
              return task
            }
          })
        })
      }
      // if (filterBy.person !== 'All') {
      //   filteredBoard.groups.forEach(group => {
      //     group.tasks = group.tasks.filter(task => {
      //       task.members = task.members.filter(member => {
      //         console.log(member._id, filterBy.person)
      //         return member._id === filterBy.person
      //       })
      //     })
      //   })
      // }
      if (filterBy.searchTerm !== '') {
        filteredBoard.groups.forEach(group => {
          group.tasks = group.tasks.filter(task => {
            return task.txt
              .toLowerCase()
              .includes(filterBy.searchTerm.toLowerCase())
          })
        })
        filteredBoard.groups = filteredBoard.groups.filter(
          group => (group = group.tasks.length !== 0)
        )
      }
      return filteredBoard
    },
    defaultBoardId(state) {
      return state.boards[0]._id;
    },
    filterBy(state) {
      return JSON.parse(JSON.stringify(state.filterBy))
    },
    boardActivities(state) {
      return state.currBoard.activities
    },
    getDarkModeToggle(state){
      const isDarkMode = state.darkMode
      return  {darkMode:isDarkMode   , '':!isDarkMode }
     
    },
    tasksByStatues(state){
       let statuesMap =state.currBoard.statuses.reduce((acc,status)=>{
        acc[_.camelCase(status.txt)] = {statusId:status.id,color:status.color,statusTxt:status.txt,tasks:[]}
        return acc
      },{})
      const boardGroups = state.currBoard.groups
      boardGroups.forEach(group=>{
        group.tasks.forEach(task=>{
         var newStatus = _.camelCase(task.status.txt)
         for(let key in statuesMap){
           if(key === newStatus){
             const taskDetails = {...task,groupName:group.name,groupId:group.id}
             statuesMap[key].tasks.push(taskDetails)
           }
         }
        })
      })
      console.log('statuesMap:', statuesMap)
      return statuesMap 
    }

  },
  mutations: {
    darkMode(state,{darkMode}){
      return state.darkMode = darkMode
    },
    setBoards(state, { boards }) {
      // const miniBoards = boards.map(board => {
      //   console.log('im in map')
      //   board = { _id: board._id, name: board.name }
      //   return board
      // })
      state.boards = boards
      console.log('store board mutation BOARDS SET')
    },
    setBoard(state, { board }) {
      state.currBoard = board
    },
    removeBoard(state, { boardId }) {
      state.boards = state.boards.filter(board => board._id !== boardId)
    },
    setSearch(state, { searchBoard }) {
      state.searchBoard = searchBoard
    },
    setFilterBy(state, { filterBy }) {
      state.filterBy = filterBy
    }
  },
  actions: {
    async loadBoards({ commit, rootGetters }) {
      commit({ type: 'setBoards', boards: null })
      const userId = rootGetters.user._id
      try {
        console.log('UserId from board store @Boards loading:', userId)
        const boards = await boardService.query(userId)
        commit({ type: 'setBoards', boards })
      } catch (err) {
        console.log('ERROR: cant loads boards',err);
        throw err
      }
    },
    async loadBoard({ commit }, { boardId }) {
      commit({ type: 'setBoard', board: null })
      try {
      const board = await boardService.getById(boardId)
      commit({ type: 'setBoard', board })
      } catch (err){
        console.log('no loaded');
        console.log('ERROR: cant load board',err);
        throw err
      }
    },
    async removeBoard({ commit, state }, { boardId }) {
      if (state.boards.length <= 1) return
      try {
        await boardService.remove(boardId)
        commit({ type: 'removeBoard', boardId })
      } catch (err) {
        console.log('ERROR: cant remove board', err)
        throw err
      }
    },
    async saveBoard({ commit, dispatch, rootGetters }, { board }) {
      const guestUser = rootGetters.guestUser
      const userId = rootGetters.user._id
      //Avoiding guest user duplication in members parameter
      if (userId !== guestUser._id && !board._id) {
        board.members.push(guestUser)
      }
      try{
        const savedBoard = await boardService.save(board)
        if (board._id) {
          commit({ type: 'setBoard', board: savedBoard })
        } else {
          console.log('im in the else')
          await dispatch({ type: 'loadBoards' })
        }
        return savedBoard._id
      } catch (err){
        console.log('ERROR: cant save/update board');
        throw err
      }
    }
  }
}
