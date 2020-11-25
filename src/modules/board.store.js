import { boardService } from '@/services/board.service.js';
export const boardStore = {
<<<<<<< HEAD
  state: {
    boards: [],
    currBoard: null,
    filterBy: null,
  },
  getters: {
    boards(state) {
      return state.boards;
    },
    board(state) {
      return state.currBoard;
    },
  },
  mutations: {
    setBoards(state, { boards }) {
      const boardsDisplay = boards.map((board) => {
        board = { _id: board._id, name: board.name };
        return board;
      });
      state.boards = boardsDisplay;
    },
    setBoard(state, { board }) {
      state.currBoard = board;
    },
    removeBoard(state, { boardId }) {
      state.boards = state.boards.filter((board) => board._id !== boardId);
    },
  },
  actions: {
    async loadBoards({ commit }) {
      const boards = await boardService.query();
      commit({ type: 'setBoards', boards });
    },
    async loadBoard({ commit }, { boardId, board }) {
      if (board) {
        commit({ type: 'setBoard', board });
      } else {
        const board = await boardService.getById(boardId);
        commit({ type: 'setBoard', board });
      }
    },
    async removeBoard({ commit }, { boardId }) {
      await boardService.remove(boardId);
      commit({ type: 'removeBoard', boardId });
    },
    async updateBoard({ commit }, { board }) {
      const savedBoard = await boardService.save(board);
      commit({ type: 'setBoard', board: savedBoard });
=======
    state: {
        boards: [],
        currBoard: null,
        filterBy: null,
    },
    getters: {
        boards(state) {
            return state.boards;
        },
        board(state) {
            return state.currBoard;
        },
    },
    mutations: {
        setBoards(state, { boards }) {
            const miniBoards = boards.map((board) => {
                board = { _id: board._id, name: board.name };
                return board;
            });
            state.boards = miniBoards;
        },
        setBoard(state, { board }) {
            state.currBoard = board;
        },
        removeBoard(state, { boardId }) {
            state.boards = state.boards.filter((board) => board._id !== boardId);
        },

    },
    actions: {
        async loadBoards({ commit }) {
            const boards = await boardService.query();
            commit({ type: 'setBoards', boards });
        },
        async loadBoard({ commit }, { boardId }) {
            const board = await boardService.getById(boardId);
            console.log(board, 'wired')
            commit({ type: 'setBoard', board });
        },
        async removeBoard({ commit }, { boardId }) {
            await boardService.remove(boardId);
            commit({ type: 'removeBoard', boardId });
        },
        async saveBoard({ commit, dispatch }, { board }) {
            const savedBoard = await boardService.save(board);
            if (board._id) {
                commit({ type: 'setBoard', board: savedBoard })
            } else {
                dispatch({ type: 'loadBoards' })
            }
        },
>>>>>>> 7c14fc5de3d186fd6f0b4a77d4dc15f0899a56d6
    },
};
