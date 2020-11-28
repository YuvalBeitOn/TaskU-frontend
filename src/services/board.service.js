import { httpService } from './http.service';
import {boardUtils} from './board-utils.service';
import {utilService} from './util.service'
export const boardService = {
    query,
    getById,
    remove,
    save,
    getEmptyBoard,
    getEmptyGroup,
    getEmptyTask,
    getEmptyPost
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
    board.statuses.forEach(status=>status.id=utilService.makeId())
    board.priorities.forEach(priority=>priority.id=utilService.makeId())
    board.groups.forEach(group=>{
        group.id=utilService.makeId()
        group.tasks.forEach(task=>{
            task.id = utilService.makeId()
            task.status.id =utilService.makeId()
            task.priority.id =utilService.makeId()
        })
    }
        )
    return board
}
function getEmptyTask(){
   const task =  boardUtils.getEmptyTask()
   task.id = utilService.makeId()
   task.status.id =utilService.makeId()
   task.priority.id =utilService.makeId()
   return task
}

function getEmptyGroup(){
    const group = boardUtils.getEmptyGroup()
    group.id = utilService.makeId()
    group.tasks.forEach(task => {
        task.id = utilService.makeId()
        task.status.id =utilService.makeId()
        task.priority.id =utilService.makeId()
    });
    return group
}

function getEmptyPost(){
    const post = boardUtils.getEmptyPost()
    post.id = utilService.makeId()
    return post
}