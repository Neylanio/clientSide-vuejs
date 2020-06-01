// src/components/taskgroup/list-taskgroup/ListTaskgroup.vue
<template>
  <div>
    <h1>List taskgroup</h1>
    <button v-if="add == 0" @click="addTaskgroup()">Add</button>
    <div v-if="add == 1">
      <div class="row">
        <label for="Description">Description</label>
        <input type="text" v-model="taskgroupitem.description">
      </div>
      <div class="row">
        <label for="Frequence_type">Frequence_type</label>
        <input type="text" v-model="taskgroupitem.frequence_type">
      </div>
      <div class="row">
        <label for="Name">Name</label>
        <input type="text" v-model="taskgroupitem.name">
      </div>
      <div>
        <button @click="createTaskgroup()">Save</button>
      </div>
    </div>


    <ul>
      <li v-for="taskgroup in taskgroups" :key="taskgroup.id">
        <router-link
          :to="{ name: 'showTaskgroup', params: { id: taskgroup.id } }"
        >{{ taskgroup.name }}</router-link>
        &nbsp;&nbsp;<button @click="deleteTaskgroup(taskgroup.id)">Delete</button>
      </li>
    </ul><br>
    <div>
      <button @click="logout()">Logout</button>
    </div>
  </div>
</template>

<script>
import { getTaskgroupsApi, createTaskgroupApi, deleteTaskgroupApi } from "./../../../services/api";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      taskgroups: [],
      add: 0,
      taskgroupitem: {
        description: "",
        frequence_type: "",
        name: "",
        // userId: 0
      }
    };
  },
  mounted: function() {
    getTaskgroupsApi().then(response => {
      this.taskgroups = response.data.data;
      // console.log(this.taskgroups)
    });
  },

  computed: {
    ...mapState(["userId"]),
  },

  methods: {

    addTaskgroup() {
      this.add = 1;
    },

    createTaskgroup(){

      this.add = 0;

      createTaskgroupApi(this.taskgroupitem).then(function(result) {
        location.reload();
      });

    },

    deleteTaskgroup(id){

      deleteTaskgroupApi(id).then(function(result) {
        location.reload();
      });

    },

    logout(){
      const isLogged = localStorage.getItem('token');
      if(isLogged){
        localStorage.removeItem('token');
        this.$router.push({ name: "login" });
      }
    },

  }
};
</script>
