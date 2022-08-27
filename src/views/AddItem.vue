<template>
<ModalWindow v-model="openWindow">
  ...
</ModalWindow>
</template>

<script>
import ModalWindow from "@/components/Modal";
export default {
  name: "AddItem",
  components: {ModalWindow},
  props: ["open"],
  data() {
    return {
      openWindow: false
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
  }
}
</script>

<style lang="scss" scoped>

</style>