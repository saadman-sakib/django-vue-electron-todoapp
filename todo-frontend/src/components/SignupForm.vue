<template>
  <div class="main">
    <h1>Sign Up</h1>
    <br />
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :counter="20"
        :rules="nameRules"
        label="Name"
        name="input-10-1"
        outlined
        dense
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        hint="At least 8 characters"
        outlined
        dense
        @click:append="show1 = !show1"
      ></v-text-field>

      <v-text-field
        v-model="password2"
        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.equal]"
        :type="show2 ? 'text' : 'password'"
        name="input-10-1"
        label="Confirm Password"
        hint="Passwords must match"
        outlined
        dense
        @click:append="show2 = !show2"
      ></v-text-field>
        <v-btn :disabled="!valid" class="mr-4" color="primary" @click="signUp" >
          Submit
        </v-btn>
        <small>Already Have an Account?</small>
        <v-btn @click="update" text color="purple">Login</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
      ],
      show1: false,
      show2: false,
      password: "",
      password2: "",
      rules: {
        required: (value) => !!value || "Required.",
        equal: (value) => value === this.password || "Passwords didn't match!",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
    };
  },

  methods: {
    signUp(e){
      e.preventDefault();

      var requestOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"username":this.name, "password": this.password}),
        redirect: 'follow'
      };

      fetch("https://todoappbackendapi.herokuapp.com/register/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

      this.$emit('signUp', false)
    },
    update(){
      this.$emit('update', false)
    }
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