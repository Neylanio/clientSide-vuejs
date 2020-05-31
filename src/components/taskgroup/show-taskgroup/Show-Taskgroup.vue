<template>
  <div>
    <h1>Show Taskgroup - id: {{id}}</h1>
    <label for="id">Id: {{taskgroup.id}}</label>
    <br>

    <label for="name">Name: {{taskgroup.name}}</label>
    <br>

    <label for="description">Description: {{taskgroup.description}}</label>
    <br>

    <label for="frequence_type">frequence Type: {{taskgroup.frequence_type}}</label>
    <br>
    <br>
    <div>
      <!-- <h2 v-if="formattedTaskitems.length > 0">Task_in_Lists [{{formattedTaskitems.length}}]</h2>
      <ul>
        <li v-for="taskitem in formattedTaskitems" :key="taskitem.id">
          <span v-if="taskitem.checked != null">Checked: {{taskitem.checked}}<br></span>
          <span v-if="taskitem.name != null">Name: {{taskitem.name}}<br></span>
          <span v-if="taskitem.description != null">Description: {{taskitem.description}}<br></span>
        </li>
      </ul> -->
      <h2 v-if="task_in_lists.length > 0">Task_in_Lists [{{task_in_lists.length}}]</h2>
      <ul>
        <li v-for="task_in in task_in_lists" :key="task_in.task.id">
          <span v-if="task_in.checked != null">Checked: {{task_in.checked}}<br></span>
          <span v-if="task_in.task.name != null">Name: {{task_in.task.name}}<br></span>
          <span v-if="task_in.task.description != null">Description: {{task_in.task.description}}</span><br><br>
        </li>
      </ul>

    </div>
    <button @click="voltar()">Voltar</button>
    <button @click="logout()">logout</button>
  </div>
</template>

<script>

import { getTaskgroupApi } from './../../../services/api';
export default {
  props: ["id"],
  data() {
    return {
      taskgroup: {},
      task_in_lists: []
    };
  },
  mounted: function() {
    getTaskgroupApi(this.id).then(response => {
      this.taskgroup = response.data.data;
      this.task_in_lists = response.data.data.task_in_lists;
    });
  },
  methods: {
    // formatTaskItem(taskitem){
    //   return {
    //       id: taskitem.task.id,
    //       checked: taskitem.checked,
    //       name: taskitem.task.name,
    //       description: taskitem.task.description
    //   };
    // },
    voltar() {
      this.$router.push({ name: "listTaskgroup" });
    },
    logout() {
      const isLogged = localStorage.getItem('token');
      if(isLogged){
        localStorage.removeItem('token');
        this.$router.push({ name: "login" });
      }
    }
  },
  // computed: {
  //   formattedTaskitems: function () {
  //     if(!this.taskgroup.task_in_lists){
  //       return [];
  //     }

  //     const { task_in_lists: taskItems } = this.taskgroup;

  //     return taskItems.map(this.formatTaskItem);

  //   }
  // }
};
</script>

<style>

</style>
