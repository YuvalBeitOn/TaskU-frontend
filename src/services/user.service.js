import { httpService } from "./http.service";
import { utilService } from './util.service'


export const userService = {
  getUsers,
  getById,
  remove,
  save,
  login,
  signup,
  logout,
  getEmptyNotif,
  sendNotif
};


function getUsers() {
  return httpService.get("user");

}

function getById(userId) {
  return httpService.get(`user/${userId}`);

}

function remove(userId) {
  return httpService.delete(`user/${userId}`);
}

function save(user) {
  const saveduser = user._id ? _update(user) : _add(user);
  return saveduser;
}

async function login(userCred) {
  const user = await httpService.post('auth/login', userCred)
  return _handleLogin(user)
}

async function signup(userCred) {
  const user = await httpService.post('auth/signup', userCred)
  return _handleLogin(user)
}

async function logout() {
  await httpService.post('auth/logout');
  sessionStorage.clear();
}

async function _add(user) {
  return httpService.post(`user/`, user);
}

async function _update(user) {
  return httpService.put(`user/${user._id}`, user);
}

function _handleLogin(user) {
  sessionStorage.setItem('user', JSON.stringify(user))
  return user;
}

function getEmptyNotif() {
  return {
    id: utilService.makeId(),
    txt: '',
    type: '',
    byUser: null,
    toUserId: null,
    isRead: false,
    createdAt: Date.now()
  }
}

async function sendNotif(notif) {
  return httpService.post(`user/notif/${notif.toUserId}`, notif);
}