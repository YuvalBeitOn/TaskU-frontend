<template>
  <section class="board-search">
         <input
            class="input-search"
            type="text"
            @input="emitSearch"
            v-model="searchBoard"
            placeholder="Search"
        />
  </section>
</template>

<script>
import lodash from 'lodash'
export default {
  name: "board-search",
  data(){
    return{
       searchBoard: ''
    }
  },
     methods: {
        emitSearch() {
            const searchBoard = JSON.parse(JSON.stringify(this.searchBoard))
            this.$emit('searchBoard', searchBoard)
        },},
        created(){
          this.emitSearch = lodash.debounce(this.emitSearch, 500)
        }
        
};
</script>
