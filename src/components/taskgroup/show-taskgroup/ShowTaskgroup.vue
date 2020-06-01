// src/components/taskgroup/show-taskgroup/ShowTaskgroup.vue
<template>
  <div>
    <h1>Show Taskgroup - id: {{ id }}</h1>

    <label for="id">Id: {{ taskgroup.id }}</label>
    <br />

    <label for="name">Name: {{ taskgroup.name }}</label>
    <br />

    <label for="description">Description: {{ taskgroup.description }}</label>
    <br />

    <label for="frequence_type"
      >Frequence Type: {{ taskgroup.frequence_type }}</label
    >
    <br />
    <list-taskitem></list-taskitem><br>

----------------------------------------------------------------------------------------

    <div>
      <div v-if="Add == 1">
        <div class="row">
          <label for="Checked">Checked</label>
            <input type="checkbox" v-model="taskgrouplistitem.checked"/>
        </div>
        <div class="row">
          <label for="Name">Name</label>
          <input type="text" v-model="taskitem.name">
        </div>
        <div class="row">
          <label for="Description">Description</label>
          <input type="text" v-model="taskitem.description">
        </div>
        <div>
          <button @click="createTaskitem()">Save</button>
        </div>
      </div>
    </div>
    <br><br>

    <button v-if="Add == 0" @click="toAdd(1)">Add</button>
    <button @click="voltar()">Back</button>
    <button @click="logout()">Logout</button>
  </div>
</template>

<script>
import { getTaskgroupApi, createTasklistApi, createTaskgrouplistpApi } from "./../../../services/api";
import ListTaskitem from "./../../taskitem/list-taskitem/ListTaskitem";
import { mapState, mapMutations } from "vuex";

export default {
  props: ["id"],
  components: {
    "list-taskitem": ListTaskitem
  },

  data(){
    return {
      Add: 0,
      taskitem: {
        name: "",
        description: "",
      },
      taskgrouplistitem: {
        task_id: 0,//task comum
        task_list_id: 0,//group
        checked: false,
      }
    }
  },

  computed: {
    ...mapState(["taskgroup"])
  },
  mounted: function() {
    getTaskgroupApi(this.id).then(response => {
      this.setTaskgroup(response.data.data);
    });
  },
  methods: {
    ...mapMutations(["setTaskgroup"]),

    toAdd() {
      this.Add = 1;
    },


    createTaskitem(){
      const { taskgrouplistitem, id } = this

      createTasklistApi(this.taskitem).then(function(result) {

        localStorage.setItem("id",result.data.data.id);

        taskgrouplistitem.task_id = result.data.data.id*1;//id do Task
        taskgrouplistitem.task_list_id = id*1;//id do Group

        createTaskgrouplistpApi(taskgrouplistitem).then(function(result) {
          location.reload();
        });

      });

    },

    voltar(){
      this.$router.push({ name: "listTaskgroup" });
    },

    logout(){
      const isLogged = localStorage.getItem('token');
      if(isLogged){
        localStorage.removeItem('token');
        this.$router.push({ name: "login" });
      }
    }
  }
};
</script>
