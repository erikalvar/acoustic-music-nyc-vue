<template>
  <div class="login">
    <section class="background">
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-6 border-all box-shadow-light pagebox">
            <form v-on:submit.prevent="submit">
              <h3 class="title margin-10px-top">Login</h3>
              <ul>
                <li class="text-danger" v-for="error in errors">{{ error }}</li>
              </ul>
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
              <div class="margin-10px-bottom">
                <input
                  type="submit"
                  class="btn butn margin-10px-bottom"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <!-- <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push("/");
        })
        .catch((error) => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
