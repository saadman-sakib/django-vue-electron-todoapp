<template>
  <div>
    <div v-for="task in tasks" :key="task.id">
      <Task @deleteTask="deleteTask" :token="token" :taskname="task.title" :id="task.id" :time="task.time" :is_done="task.is_done" />
    </div>
  </div>
</template>

<script>
import Task from "./Task.vue";

export default {
  props: ["tasks", "token"],
  data() {
    return {
      taskList: this.tasks
    }
  },
  components: {
    Task,
  },
  methods: {
    deleteTask(id){
      this.$emit('deleteTask', id);
    }
  },
};
</script>

<style>
</style>