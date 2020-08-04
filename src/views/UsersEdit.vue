<template>
  <div class="users-edit">

    <section>
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-6 border-all pagebox">
            <form v-on:submit.prevent="editUser">
              <h3 class="title margin-10px-top">Edit Profile</h3>
              <ul>
                <li class="text-danger" v-for="error in errors">{{ error }}</li>
              </ul>
              <div class="form-group">
                <label>Username:</label>
                <input type="text" class="form-control" v-model="user.username">
              </div>
              <div class="form-group">
                <label>Email:</label>
                <input type="text" class="form-control" v-model="user.email">
              </div>
              <div class="form-group">
                <label>Password:</label>
                <input type="text" class="form-control" v-model="user.password">
              </div>
              <div class="form-group">
                <label>Password Confirmation:</label>
                <input type="text" class="form-control" v-model="user.passwordConfirmation">
              </div>
              <input type="submit" class="btn btn-primary" value="Submit" /> 
              <button class="btn btn-outline-danger btn-block margin-10px-bottom" v-on:click="destroyUser()">Delete User</button>
            </form>
          </div>
        </div>
      </div>
    </section>


    <!-- <form v-on:submit.prevent="editUser">
      <h1>Edit Profile</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Username:</label>
        <input type="text" class="form-control" v-model="user.username">
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="text" class="form-control" v-model="user.email">
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="text" class="form-control" v-model="user.password">
      </div>
      <div class="form-group">
        <label>Password Confirmation:</label>
        <input type="text" class="form-control" v-model="user.passwordConfirmation">
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" /> <br>
    </form>
    <button v-on:click="destroyUser()">Delete User</button> -->

  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      errors: [],
      user: {},
    };
  },
  created: function () {
    axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {
    editUser: function () {
      var params = {
        errors: [],
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
        password_confirmation: this.user.passwordConfirmation,
      };
      axios
        .patch(`/api/users/${this.user.id}`, params)
        .then((response) => {
          this.$router.push(`/users/${response.data.id}`);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function () {
      if (confirm("Are you sure you want to delete user?")) {
        axios.delete(`/api/users/${this.user.id}`).then((response) => {
          console.log("User successfully deleted", response.data);
          this.$router.push("/");
        });
      }
    },
  },
};
</script>
