<template>
  <div class="events-index">
    <h1>{{ message }}</h1>

    <div v-for="event in events">
      <h3>{{ event.title }}</h3>
      <p>{{ event.start_time }}</p>
      <router-link v-bind:to="`/events/${event.id}`">Show Info</router-link>
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