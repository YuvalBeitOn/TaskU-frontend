import { boardService } from '@/services/board.service.js';
export const boardStore = {
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
            console.log(board,'wired')
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
    },
};
