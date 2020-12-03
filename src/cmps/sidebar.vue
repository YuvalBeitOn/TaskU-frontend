<template>
  <section class="side-bar-board-app">
      <button class=" cls-btn close-btn ">
      <i @click.stop="closeBtn" class="cls-icon fas fa-times"></i>
    </button>
    <div>
      <slot>No have content yet....</slot>
    </div>
     <div
          class="back-drop-layer"
          
          @click.stop="closeBtn"
        ></div>
  </section>
  
</template>

<script>
export default {
methods:{
    closeBtn(){
        this.$emit('closeBtn')

    }
}
}
</script>
<style lang="scss">

</style>

