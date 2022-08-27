<template>
<div class="modal" v-if="value">
  <div class="modal__card">
    <div class="modal__close" @click="closeWindow">x</div>
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: "ModalWindow",
  props: ["value"],
  methods: {
    closeWindow() {
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  &__card {
    padding: 40px;
    max-width: 95%;
    max-height: 95%;
    position: relative;
    background: #FFFFFF;
    border: 1px solid #DDE2E4;
    box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
  }
  &__close {
    position: absolute;
    right: 40px;
    top: 40px;
    width: 22px;
    height: 22px;
    background: #314B99;
    border-radius: 5px;
    padding: 8px;
    color: white;
    font-size: 12px;
    line-height: 6px;
    cursor: pointer;
    &:hover {
      background-color: #2a4081;
    }
  }
}
</style>