<template>
  <v-app>
    <v-main>
      <div  v-if="loading" class="loading">
      <v-progress-circular
        :size="200"
        color="primary"
        indeterminate
      ></v-progress-circular>
      </div>
      <SignupForm
        v-if="showSignUpForm && !token"
        class="card"
        @update="showLogin"
        @signUp="showLogin"
      />
      <LoginForm
        v-show="!showSignUpForm && !token && !loading"
        class="card"
        :incorrectPass="incorrectPass"
        @login="login"
        @update="showSignUp"
        @loading_sign="_loading"
      />
      <div v-if="token !== null && !loading">
        <AddTaskForm :token="token" @addTask="addTask" class="addtask" />
        <TaskList :token="token" @deleteTask="deleteTask" :tasks="tasks" />
        <br /><br /><br />
        <v-row justify="center">
          <v-btn
            class="btn"
            color="red"
            dark
            width="600"
            height="75"
            @click="logout"
          >
            <h1 class="log_out">Log Out</h1>
          </v-btn>
        </v-row>
        <br /><br /><br />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import SignupForm from "./components/SignupForm.vue";
import LoginForm from "./components/LoginForm.vue";
import TaskList from "./components/TaskList.vue";
import AddTaskForm from "./components/AddTaskForm.vue";

export default {
  name: "App",

  components: {
    SignupForm,
    LoginForm,
    TaskList,
    AddTaskForm,
  },

  data() {
    return {
      token: localStorage.getItem("token"),
      username: "",
      password: "",
      showSignUpForm: false,
      loading: false,
      tasks: [],
      incorrectPass: false,
    };
  },
  methods: {
    showLogin(data) {
      this.showSignUpForm = data;
    },
    showSignUp(data) {
      this.showSignUpForm = data;
    },
    logout() {
      localStorage.removeItem("token");
      this.token = null;
    },
    addTask(task) {
      var newTask = {};
      newTask.title = task.name;
      newTask.time = task.date + "T" + task.time + "Z";
      newTask.is_done = false;
      newTask.id = this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1;
      this.tasks.push(newTask);
      this.addFetch(this.token, newTask.title, newTask.time);
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => {
        return task.id !== id;
      });
    },
    addFetch(token, title, time) {
      var requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ title: title, time: time }), //"2021-04-06T06:00:00Z",
        redirect: "follow",
      };

      fetch("https://todoappbackendapi.herokuapp.com/todos/", requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    },
    login(token) {
      if (token !== undefined ) {
        this.token = token;
        localStorage.setItem("token", token);
        this.fetchAllTask();
      }else{
        this.incorrectPass = true;
        this.loading = false;
      }
    },
    _loading(data) {
      this.loading = data;
    },
    fetchAllTask() {
      var requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${this.token}`,
        },
        redirect: "follow",
      };
      fetch("https://todoappbackendapi.herokuapp.com/todos/", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          this.tasks = result;
          this.loading = false;
        })
        .catch((error) => console.log("error", error));
    },
  },
  mounted() {
    if (localStorage.getItem("token") !== null) {
      this.loading = true;
      this.fetchAllTask();
    }
  },
};
</script>

<style>
.card {
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  width: 40%;
  position: 200 100;
  padding: 30px;
  background: rgb(34, 34, 34);
  border-radius: 5px;
}

.addtask {
  margin-top: 40px;
}

.btn {
  margin-left: auto;
  margin-right: auto;
  align-content: center;
}

.log_out {
  font-weight: 400;
  color: rgb(46, 27, 16);
}

.loading{
  display: grid;
  place-items: center;
  margin-top: 300px;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #121212;
}

/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: orange;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: orange;
}
</style>
