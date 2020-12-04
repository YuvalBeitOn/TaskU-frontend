import { socketService } from '../services/socket.service.js'

export const socketStore = {
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {
        setupSockets() {
            socketService.setup()
        },
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

        }
    }
}