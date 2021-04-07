<template>
  <div class="main">
    <h1>Sign In</h1>
    <br />
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        label="Name"
        name="input-10-1"
        outlined
        dense
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        outlined
        dense
        @click:append="show1 = !show1"
      ></v-text-field>

      <v-alert
      dense
      outlined
      type="error"
      v-if="incorrectPass"
    >
      Incorrect Password
    </v-alert>

      <v-btn :disabled="!valid" color="primary" class="mr-4" @click="submit">
        Submit
      </v-btn>
      <small>Dont have ay account?</small>
      <v-btn text @click="signUp" color="purple"> Sign Up </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  props:['incorrectPass'],
  data() {
    return {
      valid: true,
      show1: false,
      name: "",
      password: "",
      token: "",
    };
  },

  methods: {
    submit(e) {
      e.preventDefault();
      this.$emit("loading_sign", true);
      this.getAuthToken(this.name, this.password);
      // console.log(this.token);
    },
    signUp() {
      this.$emit("update", true);
    },
    getAuthToken(username, password) {
      var requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
        redirect: "follow",
      };

    fetch("https://todoappbackendapi.herokuapp.com/authtoken/", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          this.token = result.token;
          this.$emit("login", this.token);
          console.log(result.token);  
        })
        .catch((error) => console.log("error", error));
    },
  },
};
</script>

<style scoped>
h1 {
  font-weight: 300;
}
.main{
  min-width: 600px;
}
</style>