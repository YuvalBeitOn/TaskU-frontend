import { boardService } from '@/services/board.service.js'
export const boardStore = {
  state: {
    boards: [],
    currBoard: null,
    searchBoard: null,
    filterBy: { status: 'All', priority: 'All', person: 'All', searchTerm: '' },
    isLoading: false
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
            return (task.members = task.members.filter(member => {
              console.log(member._id)
              console.log(filterBy.person)
              return member._id === filterBy.person
            }))
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
      return state.boards[0]._id
    },
    filterBy(state) {
      return JSON.parse(JSON.stringify(state.filterBy))
    },
    isLoading(state) {
      return state.isLoading
    },
    boardActivities(state) {
      return state.currBoard.activities
    }
  },
  mutations: {
    setBoards(state, { boards }) {
      // const miniBoards = boards.map(board => {
      //   console.log('im in map')
      //   board = { _id: board._id, name: board.name }
      //   return board
      // })
      state.boards = boards
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
    },
    toggleIsLoading(state) {
      state.isLoading = !state.isLoading
    }
  },
  actions: {
    async loadBoards(context) {
      console.log(context)
      const userId = context.rootGetters.user._id
      console.log('UserId from board store @Boards loading:', userId)
      const boards = await boardService.query(userId)
      context.commit({ type: 'setBoards', boards })
    },
    async loadBoard({ commit }, { boardId }) {
      commit({ type: 'toggleIsLoading' })
      // try {
      const board = await boardService.getById(boardId)
      console.log('after i  got board:', boardId)
      commit({ type: 'setBoard', board })
      console.log('after set board')
      setTimeout(() => {
      commit({ type: 'toggleIsLoading' })
      }, 2000)
    },
    async removeBoard({ commit, state }, { boardId }) {
      if (state.boards.length <= 1) return
      try {
        await boardService.remove(boardId)
        commit({ type: 'removeBoard', boardId })
      } catch (err) {
        console.log('error', err)
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
      const savedBoard = await boardService.save(board)
      if (board._id) {
        commit({ type: 'setBoard', board: savedBoard })
      } else {
        console.log('im in the else')
        await dispatch({ type: 'loadBoards' })
      }
      return savedBoard._id
    }
  }
}
