<template>
  <div class="signup">
    <section class="background">
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-6 border-all box-shadow-light pagebox">
            <form v-on:submit.prevent="submit">
              <h3 class="title margin-10px-top">Create Profile</h3>
              <ul>
                <li class="text-danger" v-for="error in errors">{{ error }}</li>
              </ul>
              <div class="form-group">
                <label>Username:</label>
                <input type="text" class="form-control" v-model="username" />
              </div>
              <div class="form-group">
                <label>Email:</label>
                <input type="text" class="form-control" v-model="email" />
              </div>
              <div class="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="password"
                />
              </div>
              <div class="form-group">
                <label>Password Confirmation:</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="passwordConfirmation"
                />
              </div>
              <div class="margin-10px-bottom">
                <input type="submit" class="btn butn" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Username:</label> 
        <input type="text" class="form-control" v-model="username">
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" class="form-control" v-model="email">
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" class="form-control" v-model="password">
      </div>
      <div class="form-group">
        <label>Password confirmation:</label>
        <input type="password" class="form-control" v-model="passwordConfirmation">
      </div>
      <input type="submit" class="btn btn-primary" value="Submit">
    </form> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
    };
  },
  methods: {
    submit: function() {
      var params = {
        username: this.username,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      axios
        .post("/api/users", params)
        .then((response) => {
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
