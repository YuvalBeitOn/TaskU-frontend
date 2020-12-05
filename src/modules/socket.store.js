import { socketService } from '../services/socket.service'

socketService.on('updated board', board => {
    this.$store.commit({
        type: 'setBoard',
        board
    })
})
socketService.on('load boards', boards => {
    console.log('boards length', boards.length)
    this.$store.commit({
        type: 'setBoards',
        boards
    })
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
            console.log('**************************UPDATE THE BOARD IS ON************');
            socketService.emit('update board', board)
        },
        loadAllBoards() {
            console.log('**************************UPDATE THE BOARDsssss************');
            socketService.emit('load boards')
        },
        turnOffSocket() {
            console.log('turning off');
            socketService.terminate();
        },
        createPrivateSocket(context, { userId }) {
            socketService.emit('createPrivateSocket', userId)
        },
        deleteUserSocket(context) {
            let userId = context.rootGetters.loggedInUser._id
            socketService.emit('deleteUserSocket', userId)
        },
    }
}