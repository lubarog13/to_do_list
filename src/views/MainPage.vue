<template>
<div class="list">
  <div class="list__title row">
    <h1>To do list</h1>
    <div class="list__title__add-btn" @click="setShowAdd(true)">+</div>
  </div>
  <div class="list__filters row">
    <label for="search"><img src="../assets/images/search.svg" alt=""></label>
    <input class="list__filters__search" id="search" placeholder="Поиск Имени, статуса или даты" v-model="searchString">
    <div class="list__filters-item filter">
      <div class="filter__text">Сортировать по:</div>
      <select v-model="filter">
        <option value="0" selected>Дата</option>
        <option value="1">Статус</option>
      </select>
    </div>
  </div>
  <div class="list__content-head head row">
    <div class="head__item1">Описание</div>
    <div class="head__item2">Статус</div>
    <div class="head__item3">Дата</div>
  </div>
  <div class="list__content">
    <ToDoItem @update="changeItem" v-for="item in filteredItems" :key="item.id" :item="item"/>
  </div>
  <AddItem :open="showAdd" @close="setShowAdd(false)"/>
</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ToDoItem from "@/components/ToDoItem";
import AddItem from "@/views/AddItem";

export default {
  name: "MainPage",
  components: {AddItem, ToDoItem},
  data() {
    return {
      searchString: '',
      filter: 0,
      showAdd: false
    }
  },
  computed: {
    ...mapGetters({
      items: "getToDoItems"
    }),
    filteredItems() {
      let items = []
      if (this.filter===0) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        items = this.items.sort((item1, item2) => item1.date-item2.date)
      }
      else {
        items = [...this.items.filter(item => !item.complete), ...this.items.filter(iiem => iiem.complete)]
      }
      return items.filter(item => item.text.includes(this.searchString) || item.status.includes(this.searchString) || item.date.format('DD.MM.YYYY').includes(this.searchString))
    }
  },
  methods: {
    ...mapActions({
      initialize: "initializeItems",
      updateItem: "updateItem"
    }),
    changeItem(item) {
      item.complete = !item.complete
      this.updateItem(item)
    },
    setShowAdd(value) {
      this.showAdd = value
    }
  },
  mounted() {
    this.initialize()
  }
}
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  height: 100%;
  &__title {
    justify-content: space-between;
    padding-left: 40px;
    margin-bottom: 30px;
    h1 {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 132%;
      margin: 0;
      padding: 0;
    }
    &__add-btn {
      width: 40px;
      height: 40px;
      color: #314B99;
      font-size: 30px;
      background: #D6DBEB;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background: #c3c9e0;
      }
    }
  }
  &__filters {
    padding-left: 40px;
    margin-bottom: 30px;
    &__search {
      flex: 1;
      margin-right: 30px;
      height: 30px;
      border: none;
      padding: 10px;
      font: inherit;
      position: relative;
      margin-left: 6px;
      &::placeholder {
        color: #C4C4C4;
      }
    }
  }
  .filter {
    display: flex;
    align-items: inherit;
    &__text {
      margin-right: 15px;
    }
    select {
      border: none;
      background: inherit;
      font: inherit;
    }
  }
  .head {
    margin: 0 80px 16px;
    height: 32px;
    width: calc(100% - 160px);
    &__item1 {
      border-left: 1px solid #C4C4C4;
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 20px;
      flex: 3;
    }
    &__item2 {
      padding-left: 20px;
      border-left: 1px solid #C4C4C4;
      flex: 1.5;
      @media (max-width: 1200px) {
        flex: 1.5;
      }
    }
    &__item3 {
      padding-left: 20px;
      border-left: 1px solid #C4C4C4;
      flex: 1.2;
      @media (max-width: 1200px) {
        flex: 0.8;
      }
      @media (max-width: 775px) {
        flex: 0.5;
      }
    }
  }
}
</style>