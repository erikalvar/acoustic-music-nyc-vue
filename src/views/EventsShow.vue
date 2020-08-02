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
    <br>
    <button v-on:click="toggleFavorite()" v-if="!currentEvent.favorited">Favorite</button>
    <button v-on:click="toggleFavorite()" v-else>Unfavorite</button>
    <!-- <button v-on:click="favoriteEvent">Favorite</button> -->
    <!-- <button v-on:click="unFavoriteEvent">Un-Favorite</button> -->

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
// import StaticMap from "vue-static-map";
// import func from "../../vue-temp/vue-editor-bridge";
export default {
  components: {},
  data: function () {
    return {
      message: "Welcome to Events Show",
      currentEvent: {},
      address: "",
      tags: [],
      errors: [],
      // favoritedEventIds: [],
      // userId: "",
    };
  },
  created: function () {
    axios.get(`/api/events/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.currentEvent = response.data;
      this.tags = response.data.tags;
      this.address = response.formatted_address;
      console.log(this.tags);
    });
    // axios.get(`/api/users/${getUserId()}`).then((response) => {
    //   this.favoritedEventIds = response.data;
    //   console.log(this.event);
    //   this.selectedTagsIds = this.event.tags.map((tag) => tag.id);
    // });
  },
  methods: {
    cleanTime: function (dateTime) {
      return moment(dateTime).format("dddd, MMMM Do h:mm A");
    },
    toggleFavorite: function () {
      var params = {
        id: this.currentEvent.id,
      };
      axios
        .post(`/api/events/${this.currentEvent.id}/toggle_favorite`, params)
        .then((response) => {
          console.log("Toggled!");
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
    // favoriteEvent: function () {
    //   var params = {
    //     event_id: this.currentEvent.id,
    //   };
    //   axios
    //     .post("/api/favorites", params)
    //     .then((response) => {
    //       console.log(response.data);
    //     })
    //     .catch((error) => {
    //       console.log(error.response.data.errors);
    //       this.errors = error.response.data.errors;
    //     });
    // },
    // getUserId: function () {
    //   return localStorage.getItem("user_id");
    // },
    // unFavoriteEvent: function () {
    //   axios.delete(`/api/favorites/${this.current.id}`).then((response) => {
    //     console.log("Event successfully un-favorited", response.data);
    //   });
    // },
  },
};
</script>