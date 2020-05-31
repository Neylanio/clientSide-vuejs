// src/components/taskgroup/list-taskgroup/ListTaskgroup.vue
<template>
  <div>
    <h1>List taskgroup</h1>
    <ul>
      <li v-for="taskgroup in taskgroups" :key="taskgroup.id">
        <router-link :to="{name: 'showTaskgroup', params: {id: taskgroup.id}}">{{taskgroup.name}}</router-link>
      </li>
    </ul>
    <button @click="logout()">Logout</button>
  </div>
</template>

<script>
import { getTaskgroupsApi } from "./../../../services/api";

export default {
  data() {
    return {
      taskgroups: []
    };
  },
  mounted: function() {
    getTaskgroupsApi().then(
      result => (this.taskgroups = result.data.data),
      error => console.log(error.response.data.error_message)
    );
  },
  methods: {
    logout() {
      const isLogged = localStorage.getItem('token');
      if(isLogged){
        localStorage.removeItem('token');
        this.$router.push({ name: "login" });
      }
    }
  }
};
</script>
