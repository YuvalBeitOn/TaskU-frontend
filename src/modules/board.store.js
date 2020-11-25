import {boardService} from '@/services/board.service.js' 
export const boardStore = {
    state:{
        boards:[],
        currBoard:null,
        filterBy:null
    },
    getters:{
       boards(state){
        return state.boards;
       } ,
       board(state){
        return state.currBoard;
       } ,
       groups(state){
           return state.currBoard.groups
       }

    },
    mutations:{
        setBoards(state,{boards}){
            state.boards = boards;
        },
        setBoard(state,{board}){
            state.currBoard = board;
        },
        removeBoard(state, {boardId}) {
            state.boards = state.boards.filter(board => board._id !== boardId)
        },
        updateBoards(state,{board}){
            state.currBoard = board;
            const idx = state.boards.findIndex(currBoard => currBoard._id === board._id);
            state.boards.splice(idx,1,board);
        },
        addBoard(state,{board}){
            state.boards.push(board)
        }

    },
    actions:{
       async loadBoards({commit}){
        const boards = await boardService.query()
        commit({type:'setBoards',boards})
       },
       async loadBoard({commit},{boardId}){
        const board = await boardService.getById(boardId)
        commit({type:'setBoard',board})
       },
       async removeBoard({commit},{boardId}){
         await boardService.remove(boardId)
        commit({type:'removeBoard',boardId})
       },
       async saveBoard({commit},{board}){
        const actionType =  board._id ? 'updateBoards' : 'addBoard'
        const savedBoard = await boardService.save(board)
        commit({type:actionType,board:savedBoard})
       }

    }
}