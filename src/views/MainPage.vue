<template>
<div class="list">
  <div class="list__title row">
    <ul>
      <li style="--i:1">T</li>
      <li style="--i:1.3">o</li>
      <li style="--i:1.6"><span> </span></li>
      <li style="--i:1.9">d</li>
      <li style="--i:2.2">o</li>
      <li style="--i:2.5"><span> </span></li>
      <li style="--i:2.8">l</li>
      <li style="--i:3.1">i</li>
      <li style="--i:3.4">s</li>
      <li style="--i:3.7">t</li>
      </ul>
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
    <div></div>
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
      if (this.filter==0) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        items = this.items.sort((item1, item2) => item1.date-item2.date)
      }
      else {
        items = [...this.items.filter(item => !item.complete), ...this.items.filter(iiem => iiem.complete)]
      }
      return items.filter(item => item.text.includes(this.searchString) || item.date.format('DD.MM.YYYY').includes(this.searchString) || (item.complete===true && "Выполнено".includes(this.searchString)) || (item.complete===false && "В работе".includes(this.searchString)))
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
  overflow-x: clip;
  &__title {
    justify-content: space-between;
    padding-left: 40px;
    margin-bottom: 30px;
    ul {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 132%;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      list-style-type: none;
      li {
        animation-name: rotating;
        animation-duration: calc(var(--i) * 1s);
        span {
          display: inline-block;
          width: 10px;
        }
      }
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
   max-width: 100%;
    @media (max-width: 700px) {
      font-size: 12px;
    }
    @media (max-width: 405px) {
      display: block;
      padding-left: 20px;
      &__search {
        width: 70%;
      }
    }
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
      @media (max-width: 545px) {
        display: none;
      }
    }
    select {
      border: none;
      background: inherit;
      font: inherit;
    }
  }
  .head {
    margin: 0 0 16px;
    height: 32px;
    width: calc(100%);
    display: grid;
    grid-template-columns:80px 2fr 1fr 1fr;
    @media (max-width: 441px) {
      grid-template-columns: 40px 2fr 1fr 1fr;
    }
    &__item1 {
      border-left: 1px solid #C4C4C4;
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 20px;
      padding-right: 10px;
    }
    &__item2 {
      padding-left: 20px;
      border-left: 1px solid #C4C4C4;
      padding-right: 10px;
      @media (max-width: 1200px) {
        flex: 1.5;
      }
    }
    &__item3 {
      padding-left: 20px;
      border-left: 1px solid #C4C4C4;
      @media (max-width: 1200px) {
        flex: 0.8;
      }
      @media (max-width: 775px) {
        flex: 0.5;
      }
    }
    @media (max-width: 723px) {
      font-size: 12px;
    }
  }
}

/* keyframes */
@keyframes rotating {
  0% {
    opacity: 0;
    transform: rotateX(0deg);
  }

  100% {
    opacity: 1;
    transform: rotateX(720deg);
  }
}
</style>