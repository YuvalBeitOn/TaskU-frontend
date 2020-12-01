import { userService } from '@/services/user.service.js'

var localLoggedinUser = null
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user)

export const userStore = {
  state: {
    users: [],
    loggedInUser: localLoggedinUser
  },
  getters: {
    users(state) {
      return state.users
    },
    user(state) {
      return state.loggedInUser
    },
    guestUser() {
      return {
        _id: '5fc6599e75860a0fa94a9f60',
        email: 'guestUser@tasku.com',
        fullName: 'Guest',
        isAdmin: false
      }
    }
  },
  mutations: {
    setUsers(state, { users }) {
      state.users = users
    },
    setUser(state, { user }) {
      state.loggedInUser = user
    },
    updateUser(state, { user }) {
      const idx = state.users.findIndex(
        loggedInUser => user._id === loggedInUser._id
      )
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
    async loadUsers({ commit }) {
      const users = await userService.getUsers()
      commit({ type: 'setUsers', users })
    },
    async loadUser({ commit }, { userId }) {
      commit({ type: 'toggleIsLoading' })
      const user = await userService.getById(userId)
      commit({ type: 'setUser', user })
      setTimeout(() => {
        commit({ type: 'toggleIsLoading' })
      }, 2000)
    },
    async removeUser({ commit }, { userId }) {
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
    },
    async login(context, { userCred }) {
      try {
        if (userCred === 'guest') {
          const guestCred = {
            email: 'guestUser@tasku.com',
            password: 'guestpassword',
            isAdmin: false
          }
          const user = await userService.login(guestCred)
          context.commit({ type: 'setUser', user })
          return user
        } else {
          const user = await userService.login(userCred)
          context.commit({ type: 'setUser', user })
          return user
        }
      } catch {
        console.log('catching the error yo')
      }
    },
    async logout(context) {
      await userService.logout()
      context.commit({ type: 'setUsers', users: [] })
      context.commit({ type: 'setUser', user: null })
    },
    async signup(context, { userCred }) {
      console.log('store got the user cred', userCred)
      const user = await userService.signup(userCred)
      context.commit({ type: 'setUser', user })
      return user
    }
  }
}
