<template>
  <div>
    <label>{{ taskitemsOverview }}</label>
    <br />

    <ul>
      <li v-for="taskitem in formattedTaskitems" :key="taskitem.id">
        <div>
          <label>checked:</label>
          <input type="checkbox" v-model="taskitem.checked" @click="updateTaskitem(taskitem)"/>
        </div>

        <label v-if="edit == 0">Name:{{ taskitem.name }}</label><button v-if="edit == 0" @click="toEdit(taskitem.task_id)">Update</button>
        <label v-if="edit == 1">Name:</label>
        <input v-if="edit == 1 && taskitem.task_id == task_id" type="text" v-model="taskitem.name"/>
        <button v-if="edit == 1 && taskitem.task_id == task_id" @click="updateNameTaskitem(taskitem.task_id, taskitem.name)">Confirm</button>
        <br />

        <label>Description:{{ taskitem.description }}</label>
        <br>
        <button @click="toDelete(taskitem.taskitem_id, taskitem.task_id)">Delete</button>
        <br>
        <br>
      </li>
    </ul>


  </div>
</template>

<script>
import { updateTaskitemApi, deleteTasklistApi, deleteTaskgrouplistApi, updateNameTaskitemApi } from "./../../../services/api";
import { mapState, mapMutations } from "vuex";

export default {

  data() {
    return {
      edit: 0,
      task_id: 0
    }
  },

  methods: {
    ...mapMutations(["setTaskitem", "setNameTaskitem"]),

    toEdit(id){
      this.task_id = id;
      this.edit = 1;
    },

    formatTaskitem(taskitem) {
      return {
        taskitem_id: taskitem.id,
        task_id: taskitem.task.id,
        checked: taskitem.checked,
        name: taskitem.task.name,
        description: taskitem.task.description
      };
    },
    isTaskitemChecked({ checked }) {
      return checked;
    },

    updateTaskitem(taskitem) {
      const mutableTaskitem = {
        id: taskitem.taskitem_id,
        checked: !taskitem.checked
      };
      updateTaskitemApi(mutableTaskitem).then(function(result){
        location.reload();
      });
    },

    updateNameTaskitem(idd, namee) {
      const mutableTaskitem = {
        id: idd,
        name: namee
      };

      updateNameTaskitemApi(mutableTaskitem).then(function(result){
        location.reload();
      });
    },

    toDelete(taskitem_id, task_id){

      const id = task_id * 1;
      const id2 = taskitem_id * 1;

        deleteTaskgrouplistApi(id2).then(function(result) {
          deleteTasklistApi(id).then(function(result) {
            location.reload();
          });
        });

    }

  },
  computed: {
    ...mapState(["taskitems"]),
    formattedTaskitems: function() {
      const { taskitems, formatTaskitem } = this;

      if (!taskitems) {
        return [];
      }

      return taskitems.map(formatTaskitem);
    },
    taskitemsOverview: function() {
      const { formattedTaskitems, isTaskitemChecked } = this;

      const length = formattedTaskitems.length;
      const checkedLength = formattedTaskitems.filter(isTaskitemChecked).length;

      return `${checkedLength} of ${length} are checked`;
    }
  }
};
</script>
