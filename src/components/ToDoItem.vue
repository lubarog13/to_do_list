<template>
<div class="item row">
  <div class="item__check" :class="{'active': item.complete}" @click="updateItem"/>
  <div class="item__text">{{item.text}}</div>
  <div class="item__status" :style="{color: item.complete? '#134EC1':  '#F89B11'}">{{item.complete? "Выполнено": "В работе"}}</div>
  <div class="item__date">{{item.date.format('DD.MM.YYYY')}}</div>
</div>
</template>

<script>
export default {
  name: "ToDoItem",
  props: ["item"],
  methods: {
    updateItem() {
      this.$emit('update', this.item)
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  height: 58px;
  border-top: 1px solid #EEEBE9;
  border-bottom: 1px solid #EEEBE9;
  border-collapse: collapse;
  display: grid;
  grid-template-columns: 80px 2fr 1fr 1fr;
  @media (max-width: 441px) {
    grid-template-columns: 40px 2fr 1fr 1fr;
  }
  &:hover {
    background: #F6F9FF;
  }
  &__check {
    width: 20px;
    height: 20px;
    border: 1px solid #16191D;
    border-radius: 50%;
    margin-left: 40px;
    margin-right: 20px;
    cursor: pointer;
    &.active {
      border: 1px solid #134EC1;
      background: url("../assets/images/check.svg") center center no-repeat;
      box-shadow: 0px 4px 4px rgba(19, 78, 193, 0.15);
    }
    @media (max-width: 441px) {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
  &__text {
    padding: 0 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 3;
    max-height: 3*12px
  }
  &__date {
    padding-left: 10px;
  }
  @media (max-width: 723px) {
    font-size: 12px;
  }
}
</style>