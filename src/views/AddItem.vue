<template>
<ModalWindow v-model="openWindow">
  <form @submit.prevent="add">
  <h2>Создать новую задачу</h2>
  <label for="description">Описание</label>
  <input v-model="text" id="description" placeholder="Введите описание">
  <button>Создать</button>
  </form>
</ModalWindow>
</template>

<script>
import ModalWindow from "@/components/Modal";
import {mapActions} from "vuex";
export default {
  name: "AddItem",
  components: {ModalWindow},
  props: ["open"],
  data() {
    return {
      openWindow: false,
      text: ''
    }
  },
  watch: {
    open(newVal) {
      this.openWindow=newVal
    },
    openWindow(newVal) {
      if (!newVal) {
        this.$emit('close')
      }
    }
  },
  methods: {
    ...mapActions({
      'addItem': "addToDoItem"
    }),
    add() {
      this.addItem(this.text)
      this.text=""
      this.openWindow = false
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  width: 320px;
  max-width: 100%;
  h2 {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 132%;
    margin-bottom: 30px;
    margin-top: 0;
  }
  label {
    font-size: 14px;
    line-height: 14px;
    color: #16191D;
    font-family: 'AGAvantGardeCyr Book', sans-serif;
    margin-bottom: 5px;
  }
  input {
    width: 100%;
    height: 40px;
    padding: 11px 16px;
    font-size: 14px;
    line-height: 132%;
    font-family: inherit;
    background: #FFFFFF;
    border: 1px solid #DDE2E4;
    border-radius: 8px;
    margin-bottom: 30px;
    &::placeholder {
      color: black;
      opacity: 0.5;
    }
  }
  button {
    width: fit-content;
    padding: 12px 40px;
    font-size: 18px;
    line-height: 132%;
    color: #314B99;
    background: #F0F5FF;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    margin: 0 auto;
    &:hover {
      background: #dde5ee;
    }
  }
}
</style>