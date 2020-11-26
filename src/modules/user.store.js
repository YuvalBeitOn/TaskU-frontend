import { userService } from '@/services/user.service.js'

export const userStore = {
  state: {
    users: [],
    currUser: null
  },
  getters: {
    users(state) {
      return state.users
    },
    user(state) {
      return state.currUser
    }
  },
  mutations: {
    setUsers(state, { users }) {
      state.users = users
    },
    setUser(state, { user }) {
      state.currUser = user
    },
    updateUser(state, { user }) {
      const idx = state.users.findIndex(currUser => user._id === currUser._id)
      state.users.splice(idx, 1, user)
    },
    deleteUser(state, { userId }) {
      const idx = state.users.findIndex(user => user._id === userId)
      state.users.splice(idx, 1)
    },
    addUser(state, { user }) {
      state.users.unshift(user)
    }
  },
  actions: {
    async loadUsers({commit}) {
      const users = await userService.getUsers()
      console.log('users:', users)
      commit({ type: 'setUsers', users })
    },
    async loadUser({commit},{ userId }) {
      const user = await userService.getById(userId)
      commit({ type: 'setUser', user })
    },
    async removeUser({commit}, { userId }) {
      await userService.remove(userId)
    commit({ type: 'removeUser', userId })
    },
    async upadteUser({ commit }, { user }) {
      const savedUser = await userService.save(user)
      commit({ type: 'updateUser', user: savedUser })
      return savedUser
    },
    async addUser({ commit }, { user }) {
      const savedUser = await userService.save(user)
      commit({ type: 'addUser', user: savedUser })
      return savedUser
    }
  }
}
