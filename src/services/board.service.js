import { httpService } from './http.service';
import {boardUtils} from './board-utils.service';
export const boardService = {
    query,
    getById,
    remove,
    save,
    getEmptyBoard
};

function query() {
    return httpService.get('board');
}

function getById(boardId) {
    return httpService.get(`board/${boardId}`);
}

function remove(boardId) {
    return httpService.delete(`board/${boardId}`);
}

function save(board) {
    const savedBoard = board._id ? _update(board) : _add(board);
    return savedBoard;
}

async function _add(board) {
    return httpService.post(`board/`, board);
}

async function _update(board) {
    return httpService.put(`board/${board._id}`, board);
}

function getEmptyBoard(){
    const board = boardUtils.getEmptyBoard()
    return board
}
