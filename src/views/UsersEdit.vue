<template>
  <div class="users-edit">
    <section>
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-6 border-all pagebox">
            <form v-on:submit.prevent="editUser">
              <h3 class="title margin-10px-top">Edit Profile</h3>
              <div class="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="user.username"
                />
              </div>
              <div class="form-group">
                <label>Email:</label>
                <input type="text" class="form-control" v-model="user.email" />
              </div>
              <div class="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="user.password"
                />
              </div>
              <div class="form-group">
                <label>Password Confirmation:</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="user.passwordConfirmation"
                />
              </div>
              <ul>
                <li class="text-danger" v-for="error in errors">{{ error }}</li>
              </ul>
              <input type="submit" class="btn butn" value="Submit" />
              <button
                class="btn butn btn-outline-danger btn-block margin-10px-bottom margin-10px-top"
                v-on:click="destroyUser()"
              >
                Delete User
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      errors: [],
      user: {},
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
      // console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {
    editUser: function() {
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
          // console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function() {
      if (confirm("Are you sure you want to delete user?")) {
        axios.delete(`/api/users/${this.user.id}`).then((response) => {
          console.log("User successfully deleted", response.data);
          localStorage.removeItem("jwt");
          localStorage.removeItem("user_id");
          this.$router.push("/");
        });
      }
    },
  },
};
</script>
