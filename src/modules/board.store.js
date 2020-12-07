import { boardService } from '@/services/board.service.js'
import _ from 'lodash'

export const boardStore = {
  state: {
    boards: [],
    currBoard: null,
    searchBoard: null,
    filterBy: { status: 'All', priority: 'All', person: 'All', searchTerm: '' },
    darkMode: false,
    displayMode: 'Board'
  },
  getters: {
    displayMode(state) {
      return state.displayMode
    },
    boards(state) {
      if (!state.searchBoard) return state.boards
      console.log('state.searchBoard:', state.searchBoard)
      if (state.searchBoard && state.boards !== null) {
        console.log(state.boards)
        const filteredBoard = state.boards.filter(board => {
          return board.name
            .toLowerCase()
            .includes(state.searchBoard.toLowerCase())
        })
        return filteredBoard
      }
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
      return state.boards[0]._id
    },
    filterBy(state) {
      return JSON.parse(JSON.stringify(state.filterBy))
    },
    boardActivities(state) {
      return state.currBoard.activities
    },
    getDarkModeToggle(state) {
      const isDarkMode = state.darkMode
      return { darkMode: isDarkMode, '': !isDarkMode }
    },
    tasksByStatues(state) {
      let statuesMap = state.currBoard.statuses.reduce((acc, status) => {
        acc[_.camelCase(status.txt)] = {
          id: status.id,
          color: status.color,
          txt: status.txt,
          tasks: []
        }
        return acc
      }, {})
      const boardGroups = state.currBoard.groups
      boardGroups.forEach(group => {
        group.tasks.forEach(task => {
          var newStatus = _.camelCase(task.status.txt)
          for (let key in statuesMap) {
            if (key === newStatus) {
              const taskDetails = {
                ...task,
                groupName: group.name,
                groupId: group.id
              }
              statuesMap[key].tasks.push(taskDetails)
            }
          }
        })
      })
      const statusArray = Object.values(statuesMap)
      return statusArray
    }
  },
  mutations: {
    setBoardById(state, { board }) {
      const boardIdx = state.boards.findIndex(
        currBoard => currBoard._id === board._id
      )
      state.boards.splice(boardIdx, 1, board)
      if (board._id === state.currBoard._id) {
        console.log('replacing curr board')
        state.currBoard = board
      }
    },
    setDisplayMode(state, { displayMode }) {
      state.displayMode = displayMode
    },
    darkMode(state, { darkMode }) {
      state.darkMode = darkMode
    },
    setBoards(state, { boards }) {
           const miniBoards = boards.map(board => {
        board = { _id: board._id, name: board.name }
        return board
      })
      state.boards = miniBoards
    },
    setBoard(state, { board }) {
      state.currBoard = board
    },
    removeBoard(state, { boardId }) {
      state.boards = state.boards.filter(board => board._id !== boardId)
    },
    setSearch(state, { searchBoard }) {
      state.searchBoard = searchBoard
      console.log('state.searchBoard mutation:', state.searchBoard)
    },
    setFilterBy(state, { filterBy }) {
      state.filterBy = filterBy
    }
  },
  actions: {
    async loadBoards({ commit, rootGetters }) {
      const userId = rootGetters.user._id
      try {
        const boards = await boardService.query(userId)
        commit({ type: 'setBoards', boards })
      } catch (err) {
        console.log('ERROR: cant loads boards', err)
        throw err
      }
    },
    async loadBoard({ commit }, { boardId }) {
      commit({ type: 'setBoard', board: null })
      console.log('board: set board')
      try {
        const board = await boardService.getById(boardId)
        commit({ type: 'setBoard', board })
      } catch (err) {
        console.log('no loaded')
        console.log('ERROR: cant load board', err)
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
      try {
        const savedBoard = await boardService.save(board)
        if (board._id) {
          commit({ type: 'setBoard', board: savedBoard })
        } else {
          console.log('im in the else')
          await dispatch({ type: 'loadBoards' })
        }
        return savedBoard._id
      } catch (err) {
        console.log('ERROR: cant save/update board')
        throw err
      }
    }
  }
}
