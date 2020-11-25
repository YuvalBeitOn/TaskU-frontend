import { httpService } from './http.service'

export const boardService = {
    getBoards,
    getById,
    remove,
    save
}

function getBoards() {
    return httpService.get('board')
}

function getById(boardId) {
    return httpService.get(`board/${boardId}`)
}

function remove(boardId) {
    return httpService.delete(`board/${boardId}`)
}

function save(board) {
    const savedboard = (board._id) ? _update(board) : _add(board)
    return savedboard;
}

async function _add(board) {
    return httpService.post(`board/`, board)
}

async function _update(board) {
    return httpService.put(`board/${board._id}`, board)
}