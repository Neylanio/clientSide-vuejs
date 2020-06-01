// src/store/store.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    userId: 0,
    taskgroup: {},
    taskitems: []
  },
  mutations: {
    setTaskgroup(state, taskgroup) {
      state.taskgroup = taskgroup;
      state.taskitems = taskgroup.task_in_lists;
    },
    setTaskitem(state, taskitem) {
      const stateTaskitem = state.taskitems.find(e => e.id === taskitem.id);

      const mutableTaskitem = {
        ...stateTaskitem,
        checked: taskitem.checked
      };

      const index = state.taskitems.indexOf(stateTaskitem);
      Object.assign(state.taskitems[index], mutableTaskitem);
    },

    setNameTaskitem(state, taskitem) {
      const stateTaskitem2 = state.taskitems.find(e => e.id === taskitem.id);

      const mutableTaskitem2 = {
        ...stateTaskitem2,
        name: taskitem.name
      };

      const index2 = state.taskitems.indexOf(stateTaskitem2);
      console.log(index2)
      Object.assign(state.taskitems[index2], mutableTaskitem2);
    },

    setUserId(state, id){
      state.userId = id;
    }
  }
});
