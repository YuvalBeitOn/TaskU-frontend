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
      return JSON.parse(JSON.stringify(state.users))
    },
    user(state) {
      return JSON.parse(JSON.stringify(state.loggedInUser))
    },
    guestUser() {
      return {
        _id: '5fcc0bad7f43ed9b6a6da85a',
        email: 'guestUser@tasku.com',
        fullName: 'Guest',
        isAdmin: false
      }
    }
  },
  mutations: {
    insertUserNotif(state, { notif }) {
      state.loggedInUser.notifications.unshift(notif)
      console.log('Notif got here', notif);
    },
    setUsers(state, { users }) {
      state.users = users
    },
    setUser(state, { user }) {
      console.log('user:', user)
      state.loggedInUser = user
    },
    updateUser(state, { user }) {
      const idx = state.users.findIndex(currUser => currUser._id === user._id)
      state.users.splice(idx, 1, user)
      if (state.loggedInUser._id === user._id) state.loggedInUser = user
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
      try {
        const users = await userService.getUsers()
        commit({ type: 'setUsers', users })
      } catch (err) {
        console.log('ERROR:cant find users')
        throw err
      }
    },
    async loadUser({ commit }, { userId }) {
      console.log('userId:', userId)
      try {
        const user = await userService.getById(userId)
        console.log('try')
        commit({ type: 'setUser', user })
      } catch (err) {
        console.log('ERROR:cant find user')
        throw err
      }
    },
    async removeUser({ commit }, { userId }) {
      try {
        await userService.remove(userId)
        commit({ type: 'removeUser', userId })
      } catch (err) {
        console.log('ERROR: cant remove user')
        throw err
      }
    },
    async updateUser({ commit }, { user }) {
      console.log('user store:', user)
      try {
        const savedUser = await userService.save(user)
        commit({ type: 'updateUser', user: savedUser })
        console.log('user after update:', savedUser);
        return savedUser
      } catch (err) {
        console.log('ERROR:cant updated user!')
        throw err
      }
    },
    async addUser({ commit }, { user }) {
      try {
        const savedUser = await userService.save(user)
        commit({ type: 'addUser', user: savedUser })
        return savedUser
      } catch (err) {
        console.log('ERROR:cant add user')
        throw err
      }
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
      } catch (err) {
        console.log('USER STORE ERROR TYPE:', err.response.status)
        throw err
      }
    },
    async logout(context) {
      context.dispatch({ type: 'deletePrivateSocket' })
      try {
        await userService.logout()
        context.commit({ type: 'setUsers', users: [] })
        context.commit({ type: 'setUser', user: null })
      } catch (err) {
        console.log('ERROR:cant logout')
        throw err
      }
    },
    async signup(context, { userCred }) {
      console.log('store got the user cred', userCred)
      try {
        const user = await userService.signup(userCred)
        context.commit({ type: 'setUser', user })
        return user
      } catch (err) {
        console.log('CANT SIGN UP ')
        throw err
      }
    },
    // async uploadUserImg(context, { img }) {
    //   console.log('the image',img, context, 'context')
    // }
    async sendNotif(context, { notif }) {
      console.log('notif in store:', notif)
      await userService.sendNotif(notif)

      // context.commit({ type: 'setUser', user })
    }
  }
}
