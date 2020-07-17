<template>
  <div class="events-new">
    <h1>{{ message }}</h1>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      message: "Welcome to Events",
      events: []
    };
  },
  created: function() {
    axios.get("/api/events").then(response => {
      console.log("All Events:", response.data);
      this.events = response.data;
    });
  },
  methods: {}
};
</script>