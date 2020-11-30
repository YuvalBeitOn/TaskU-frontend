import { boardService } from '@/services/board.service.js'
export const boardStore = {
  state: {
    boards: [],
    currBoard: null,
    searchBoard: null,
    filterBy: { status: 'All', priority: 'All', person: 'All', searchTerm: '' },
    isLoading: false,
  },
  getters: {
    boards(state) {
      if (!state.searchBoard) return state.boards
      return state.boards.filter(board =>
        board.name.toLowerCase().includes(state.searchBoard.toLowerCase())
      )
    },
    board(state) {
      const filterBy = state.filterBy;
      console.log('filterBy:', filterBy);
      let filteredBoard = JSON.parse(JSON.stringify(state.currBoard))
      if (filterBy.status !== 'All') {
        filteredBoard.groups.forEach(group => {
          group.tasks = group.tasks.filter(task => {
            return task.status.txt === filterBy.status
          })
        })
      }
      if (filterBy.priority !== 'All') {
        filteredBoard.groups.forEach(group => {
          group.tasks = group.tasks.filter(task => {
            return task.priority.txt === filterBy.priority
          })
        })
      }
      if (filterBy.person !== 'All') {
        filteredBoard.groups.forEach(group => {
          group.tasks = group.tasks.filter(task => {
            task.members = task.members.filter(member => {
              console.log('member:', member);
              console.log('filterBy.person:', filterBy.person);
              return member._id === filterBy.person
            })
          })
        })
      }
      if (filterBy.searchTerm !== '') {
        filteredBoard.groups.forEach(group => {
          group.tasks = group.tasks.filter(task => {
            return task.txt.toLowerCase().includes(filterBy.searchTerm.toLowerCase())
          })
        })
      }
      console.log('filteredBoard:', filteredBoard);
      // filteredBoard.groups.filter(group => group.tasks)
      return filteredBoard;
    },
    defaultBoardId(state) {
      return state.boards[0]._id
    },
    filterBy(state) {
      return JSON.parse(JSON.stringify(state.filterBy))
    },
    isLoading(state) {
      return state.isLoading
    }
  },
  mutations: {
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
    },
    setFilterBy(state, { filterBy }) {
      state.filterBy = filterBy;
    },
    toggleIsLoading(state) {
      state.isLoading = !state.isLoading
    }
  },
  actions: {
    async loadBoards(context) {
      const boards = await boardService.query()
      context.commit({ type: 'setBoards', boards })
    },
    async loadBoard({ commit }, { boardId }) {
      commit({ type: 'toggleIsLoading' })
      const board = await boardService.getById(boardId)
      commit({ type: 'setBoard', board })
      setTimeout(() => {
        commit({ type: 'toggleIsLoading' })
      }, 2000)
    },
    async removeBoard({ commit }, { boardId }) {
      await boardService.remove(boardId)
      commit({ type: 'removeBoard', boardId })
    },
    async saveBoard({ commit, dispatch }, { board }) {
      const savedBoard = await boardService.save(board)
      if (board._id) {
        commit({ type: 'setBoard', board: savedBoard })
      } else {
        dispatch({ type: 'loadBoards' })
      }
    },

  }
}
