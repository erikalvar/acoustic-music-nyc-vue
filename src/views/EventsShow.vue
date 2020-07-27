<template>
  <div class="events-show">
    <h1>{{ currentEvent.title }}</h1>
    <p>Venue: {{ currentEvent.venue }}</p>
    <p>Venue Address: {{ currentEvent.venue_address }}</p>
    <p>Satrt: {{ cleanTime(currentEvent.start_time) }}</p>
    <p>End: {{ cleanTime(currentEvent.end_time) }}</p>
    <p>Description: {{ currentEvent.description }}</p>
    <img v-bind:src="`${currentEvent.image_url}`">
    <p>Tickets: {{ currentEvent.tickets_url }}</p>
    <div>
      <router-link :to="`/events/${currentEvent.id}/edit`">Edit</router-link>
    </div>

    <h3>Tags:</h3>
    <div v-for="tag in tags">
      <p>#{{ tag.name }}</p>
    </div>

  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data: function () {
    return {
      message: "Welcome to Events Show",
      currentEvent: {},
      tags: [],
    };
  },
  created: function () {
    axios.get(`/api/events/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.currentEvent = response.data;
      this.tags = response.data.tags;
      console.log(this.tags);
    });
  },
  methods: {
    cleanTime: function (dateTime) {
      return moment(dateTime).format("dddd, MMMM Do h:mm A");
    },
  },
};
</script>