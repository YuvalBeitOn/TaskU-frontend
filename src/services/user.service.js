import { httpService } from "./http.service";

export const userService = {
  getUsers,
  getById,
  remove,
  save
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

async function _add(user) {
  return httpService.post(`user/`, user);
}

async function _update(user) {
  return httpService.put(`user/${user._id}`, user);
}
