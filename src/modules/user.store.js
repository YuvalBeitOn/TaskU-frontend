import { userService } from "@/services/user.service.js";

export const userStore = {
  state: {
    users: []
  },
  getters: {
    users(state) {
      return state.users;
    }
  },
  mutations: {
    setUsers(state, { users }) {
      state.users = users;
    },
    updateUser(state, { user }) {
      const idx = state.users.findIndex(currUser => user._id === currUser._id);
      state.users.splice(idx, 1, user);
    },
    deleteuser(state, { userId }) {
      const idx = state.users.findIndex(user => user._id === userId);
      state.users.splice(idx, 1);
    },
    addUser(state, { user }) {
      state.users.unshift(user);
    }
  },
  actions: {
    async loadUsers(context) {
      const users = await userService.getUsers();
      context.commit({ type: "setUsers", users });
    },
    async loadUser({ userId }) {
      const user = await userService.getById(userId);
      return user;
    },
    async removeUser(context, { userId }) {
      await userService.remove(userId);
      context.commit({ type: "removeUser", userId });
    },
    async upadteUser({ commit }, { user }) {
      const savedUser = await userService.save(user);
      commit({ type: "updateUser", user: savedUser });
      return savedUser;
    },
    async addUser({ commit }, { user }) {
      const savedUser = await userService.save(user);
      commit({ type: "addUser", user: savedUser });
      return savedUser;
    }
  }
};
