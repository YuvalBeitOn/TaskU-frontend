import {socketService} from '../services/socket.service.js'

export const socketStore = {
    state: {
        
    },
    getters: {
        
    },
    mutations: {

    },
    actions: {
        updateBoard(context, {board}) {
            console.log('**************************UPDATE THE BOARD IS ON************');
            socketService.emit('update board',board)
        },
        loadAllBoards(){
            console.log('**************************UPDATE THE BOARDsssss************');

        socketService.emit('load boards')
        },
        turnOffSocket(){
            console.log('turning off');
            socketService.terminate();
        }
        // getChatHistory(context, {chatId}) {
        //     socket.emit('getHistory', chatId)
        // }
    }
}