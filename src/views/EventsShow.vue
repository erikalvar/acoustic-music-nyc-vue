<template>
  <div class="events-show">
    <h1>{{ currentEvent.title }}</h1>
    <p>Venue: {{ currentEvent.venue }}</p>
    <p>Start: {{ currentEvent.venue_address }}</p>
    <p>End: {{ currentEvent.start_time }}</p>
    <p>Venue: {{ currentEvent.end_time }}</p>
    <p>Description: {{ currentEvent.description }}</p>
    <p>{{ currentEvent.image_url }}</p>
    <p>Tickets: {{ currentEvent.tickets_url }}</p>
    <!-- <div v-for="tag in tags">
      <p>Tags: {{ tag }}</p>
    </div> -->
    <div>
      <router-link :to="`/events/${currentEvent.id}/edit`">Edit</router-link>
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
      currentEvent: {}
      // tags: this.currentEvent.tags
    };
  },
  created: function() {
    axios.get(`/api/events/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.currentEvent = response.data;
    });
  },
  methods: {}
};
</script>