import { socketService } from '../services/socket.service'
import store from '../store/index'
import { eventBus } from '../services/event-bus.service'

socketService.on('updated board', board => {
    store.commit({
        type: 'setBoard',
        board
    })
})
socketService.on('load boards', boards => {
    store.commit({
        type: 'setBoards',
        boards
    })
})
socketService.on('insertUserNotif', (notif) => {
    store.commit({ type: 'insertUserNotif', notif })
})

socketService.on('update board', (board) => {
    store.commit({ type: 'setBoardById', board })
    eventBus.$emit('forceRerender')
})

export const socketStore = {
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        // setupSockets() {
        //     socketService.setup()
        // },
        updateBoard(context, { board }) {
            socketService.emit('update board', board)
        },
        loadAllBoards() {
            socketService.emit('load boards')
        },
        turnOffSocket() {
            socketService.terminate();
        },
        createPrivateSocket(context) {
            let userId = context.getters.user._id
            socketService.emit('createPrivateSocket', userId)
        },
        deletePrivateSocket(context) {
            let userId = context.getters.user._id
            socketService.emit('deletePrivateSocket', userId)
        },
    }
}