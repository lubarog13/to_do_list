import Vue from 'vue'
import Vuex from 'vuex'
import moment from "moment";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toDoItems: [
      {
        id: 1,
        text: "Пишите свои задачи здесь",
        complete: true,
        date: moment()
      },
      {
        id: 2,
        text: "Мы сохраним их в вашем браузере",
        complete: false,
        date: moment()
      },
    ]
  },
  getters: {
    getToDoItems(state) {
      return state.toDoItems
    }
  },
  mutations: {
    setToDoItem(state, item) {
      state.toDoItems.push(item)
    },
    setToDoItems(state, items) {
      state.toDoItems = items
    }
  },
  actions: {
    addToDoItem({state, commit}, text) {
      let item = {id: state.toDoItems.map(item => item.id).sort((a, b) => b-a)[0]+1, complete: false, text: text, date: moment()}
      commit('setToDoItem', item)
      localStorage.setItem("items", JSON.stringify(state.toDoItems))
    },
    initializeItems({commit}) {
      const items = JSON.parse(localStorage.getItem("items"))
      items.forEach(item => {
        item.date = moment(new Date(item.date))
      })
      if (items) {
        commit('setToDoItems', items)
      }
    },
    updateItem({state, commit}, item) {
      let items = state.toDoItems
      items[items.findIndex(i => i.id===item.id)] = item
      commit('setToDoItems', items)
      localStorage.setItem("items", JSON.stringify(state.toDoItems))
    }
  }
})
