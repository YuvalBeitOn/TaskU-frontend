import { boardService } from '@/services/board.service.js'
export const boardStore = {
  state: {
    boards: [],
    currBoard: null,
    searchBoard: null,
    filterBy: { status: 'All', priority: 'All', searchTerm: '' },
    isLoading:false,
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
      if (filterBy.searchTerm !== '') {
        filteredBoard.groups.forEach(group => {
          group.tasks = group.tasks.filter(task => {
            return task.txt.toLowerCase().includes(filterBy.searchTerm.toLowerCase())
          })
        })
      }
      return filteredBoard;
    },
    defaultBoardId(state) {
      return state.boards[0]._id
    },
    filterBy(state) {
      return JSON.parse(JSON.stringify(state.filterBy))
    },
    isLoading(state){
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
      console.log('searchBoard:', searchBoard)
      state.searchBoard = searchBoard
      console.log('state.searchBoard:', state.searchBoard)
    },
    setFilterBy(state, { filterBy }) {
      console.log('filterBy in store:', filterBy);
      state.filterBy = filterBy;
    },
    toggleIsLoading(state){
      console.log('state.isLoading:', state.isLoading)
      state.isLoading = !state.isLoading
    }
  },
  actions: {
    async loadBoards(context) {
      console.log('context:', context)
      const boards = await boardService.query()
      context.commit({ type: 'setBoards', boards })
    },
    async loadBoard({ commit }, { boardId }) {
      commit({type:'toggleIsLoading'})
      const board = await boardService.getById(boardId)
      commit({ type: 'setBoard', board })
      setTimeout(()=>{
        commit({type:'toggleIsLoading'})
      },2000)
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
        console.log('savedBoard:', savedBoard)
        dispatch({ type: 'loadBoards' })
      }
    },

  }
}
