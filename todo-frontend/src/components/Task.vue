<template>
  <div>
    <br />
    <br />
    <v-card
      :loading="loading"
      class="mx-auto task"
      :class="IsDone === true ? 'done' : ''"
      width="600"
      outlined
    >
      <template slot="progress">
        <v-progress-linear
          color="orange"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
      <div class="contents">
        <h1 class="headline mb-1">{{ title }}</h1>
        <div class="date">
          <v-chip color="orange" outlined>{{ date_time }}</v-chip>
        </div>
        <br /><br />
        <v-row align="center" justify="space-between">
          <v-btn @click="update"  depressed color="primary"> Update </v-btn>
          <v-btn
            v-if="IsDone == true"
            @click="undone"
            depressed
            color="orange"
          >
            Mark Undone
          </v-btn>
          <v-btn v-else @click="done" depressed color="success">
            Mark Done
          </v-btn>
          <v-btn @click="deleteTask" depressed color="error"> Delete </v-btn>
        </v-row>
      </div>
    </v-card>
    <UpdateTaskForm
      @close="close"
      @updateTask="updateTask"
      v-if="showUpdateForm"
      :task="{
        id: this.id,
        title: this.taskname,
        time: this.time,
        is_done: this.is_done,
      }"
    />
  </div>
</template>

<script>
import UpdateTaskForm from "./UpdateTaskForm.vue";
export default {
  components: {
    UpdateTaskForm,
  },
  props: ["id", "taskname", "time", "is_done", "token"],
  data() {
    return {
      IsDone: this.is_done,
      date_time: "",
      loading: false,
      title: this.taskname,
      showUpdateForm: false,
    };
  },
  methods: {
    done() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.IsDone = true;
        this.PutFetch(this.id, this.title, this.time, this.IsDone);
      }, 1000);
    },
    undone() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.IsDone = false;
        this.PutFetch(this.id, this.title, this.time, this.IsDone);
      }, 1000);
    },
    parseTime(time) {
      var date = new Date(time);
      return date.toLocaleString();
    },
    update() {
      this.showUpdateForm = !this.showUpdateForm;
    },
    updateTask(object) {
      var updateTask = {};
      updateTask.title = object.name;
      this.title = object.name;

      updateTask.time = object.date + "T" + object.time + "Z";
      this.date_time = this.parseTime(updateTask.time);

      updateTask.is_done = this.IsDone;

      this.showUpdateForm = false;

      this.PutFetch(this.id, this.title, updateTask.time, this.is_done);
    },
    close() {
      this.showUpdateForm = false;
    },
    deleteTask() {
      this.$emit("deleteTask", this.id);
      console.log("gg1");
      this.deleteFetch();
    },
    PutFetch(id, title, time, is_done) {
      var requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${this.token}`,
        },
        body: JSON.stringify({ title: title, time: time, is_done: is_done }), //"2021-04-06T06:00:00Z",
        redirect: "follow",
      };

      fetch(`http://localhost:8000/todos/${id}/`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    },
    deleteFetch() {
      var requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${this.token}`,
        },
        redirect: "follow",
      };

      fetch(`http://localhost:8000/todos/${this.id}/`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    },
  },
  mounted() {
    this.date_time = this.parseTime(this.time);
    console.log("gg");
  },
};
</script>

<style scoped>
.task {
  height: 250px;
}
.done {
  border-left: greenyellow solid 10px;
}
.contents {
  padding: 40px;
}
.row {
  margin: 5px;
}
</style>