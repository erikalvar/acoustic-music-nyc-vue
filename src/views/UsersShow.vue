<template>
  <div class="users-show">
    <p>Username: {{ user.username }}</p>
    <p>Email: {{ user.email }}</p>

    <div>
      <router-link :to="`/users/${user.id}/edit`">Edit Profile</router-link>
    </div>


  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      message: "Welcome to Events Show",
      user: {}
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {}
};
</script>