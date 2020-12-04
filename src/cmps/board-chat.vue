<template>
  <section class="board-chat">
    <section class="chat-container flex column">
      <div class="header-chat flex space-between align-center">
        {{topicName}} Chat
        <button class="btn-close">
          <i @click="emitClose" class="fas fa-times"></i>
        </button>
      </div>
      <div class="msg-container grow flex column">
        <template v-if="msgs">
          <div class="chat-msg flex " v-for="(msg, idx) in msgs" :key="idx">
        <avatar :user="user" />

         
            <strong class="from-msg">{{ msg.from }}:</strong><span>{{ msg.txt }} </span> 
           <div v-show="isTypeing">
  {{msgTyping}}
  </div>
          </div>
        </template>
      </div>
      <div class="footer-chat flex align-center">
        <input
          type="text" @keydown.enter="sendMsg"
          v-model="msg.txt"
          placeholder="Write a massage..."
          name=""
          id=""
        /><i v-tooltip.top="'Send Msg'" @click="sendMsg" class="send-btn fas fa-paper-plane"></i>
      </div>
    </section>
  </section>
</template>
<script>
// Every line with @@ need to be without a comment
import {socketService} from '@/services/socket.service.js' 
import Avatar from '@/cmps/user-avatar.vue'
 Avatar 

export default {
  name: 'board-chat',
  data() {
    return {
      msgs: [],
      msg: {from:null,txt:''}, // change to login user
      topic:null,
       isTypeing:false,
      msgTyping:'',
    }
  },
computed:{
  topicName(){
    return this.$store.getters.board.name
  },
  user(){
   return this.$store.getters.user
  }
},
  methods: {
    emitClose() {
      this.$emit('closeChat')
    },
    
     userTyping(){
      var timer = null
        socketService.emit('typing',this.msg.from) 
      clearTimeout(timer); 
       timer = setTimeout(()=>{
          socketService.emit('reset is typing') 
        },2500)
    },
    addMsg(msg){
      this.msgs.push(msg)
    },
    sendMsg() {
      if (!this.msg.txt) return;
      socketService.emit('reset is typing')  
      socketService.emit('chat newMsg', this.msg) 
      this.msg.txt=''
    },
    updateTopic(){
const { boardId } = this.$route.params;
    this.topic = boardId
    console.log('topic IS:',this.topic);
    }
  },
  created(){
    this.msg.from = this.$store.getters.user.fullName 
    console.log('this.msg.from:', this.msg.from)
    this.updateTopic();
    socketService.emit('chat topic', this.topic)
    socketService.on('history msg',msgs=>this.msgs = msgs)
    socketService.on('chat addMsg', this.addMsg)
    socketService.on('isTyping',(boolen)=>this.isTypeing=boolen)
    socketService.on('msg',(msg)=>this.msgTyping=msg)
  },
    destroyed() {
    this.msgs = []
    socketService.off('chat addMsg', this.addMsg)
    // socketService.terminate();
  },
  watch:{
     '$route.params.boardId'(){
       console.log('TOPIC HAS CHANGED');
     this.updateTopic();

     }
  },
  components:{
    Avatar

  }
}
</script>
 