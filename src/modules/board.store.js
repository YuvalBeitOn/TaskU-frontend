import { boardService } from '@/services/board.service.js';
export const boardStore = {
    state: {
        boards: [],
        currBoard: null,
        searchBoard:null,
        filterBy: null,
    },
    getters: {
        boards(state) {
            if(!state.searchBoard) return state.boards;
            return state.boards.filter(board=>board.name.toLowerCase().includes(state.searchBoard.toLowerCase()))
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
        setSearch(state,{searchBoard}){
            console.log('searchBoard:', searchBoard)
            state.searchBoard = searchBoard
            console.log('state.searchBoard:', state.searchBoard)
        }

    },
    actions: {
        async loadBoards(context) {
            console.log('context:', context)
            const boards = await boardService.query();
            context.commit({ type: 'setBoards', boards });
        },
        async loadBoard({ commit }, { boardId }) {
            const board = await boardService.getById(boardId);
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
                console.log('savedBoard:', savedBoard)
                dispatch({ type: 'loadBoards' })
            }
        },
    }
};
