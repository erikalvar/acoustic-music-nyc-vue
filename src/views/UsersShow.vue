<template>
  <div class="users-show">
    <p>Username: {{ user.username }}</p>
    <p>Email: {{ user.email }}</p>

    <div>
      <router-link :to="`/users/${user.id}/edit`">Edit Profile</router-link>
    </div>

    <div>
      <router-link v-if="user.moderator==true" to="/events/approve">Approve Events</router-link>      
    </div>

    <div>
      <h3>Favorited Events</h3>
      <div v-for="favoriteEvent in favoritedEvents">
        <h3>{{ favoriteEvent.title }}</h3>
        <p>{{ favoriteEvent.venue }}</p>
        <p>{{ cleanTime(favoriteEvent.start_time) }}</p>
        <router-link v-bind:to="`/events/${favoriteEvent.id}`">Show Info</router-link>
        <br>
        <button v-on:click="toggleFavorite(favoriteEvent)">Toggle Favorite</button>

        <!-- <button v-on:click="removeFavorite(favoriteEvent)">Remove Favorite</button> -->
        <br>
        <br>
        <!-- <input type="checkbox" id="favoritedEvent" :value="favorite.id" v-model="favoritedEventIds">
        <label for="favoritedEvent">Favorited</label> -->
      </div>
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
      user: {},
      favoritedEvents: [],
      // favoritedEventIds: [],
    };
  },
  created: function () {
    axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.user = response.data;
      this.favoritedEvents = response.data.favorited_events;
      // console.log(this.favoritedEvents);
      // this.favoritedEventIds = response.data.favorites;
      // console.log(this.favoritedEventIds);
    });
  },
  methods: {
    cleanTime: function (dateTime) {
      return moment(dateTime).format("dddd, MMMM Do h:mm A");
    },
    toggleFavorite: function (favoriteEvent) {
      var params = {
        id: favoriteEvent.id,
      };
      axios
        .post(`/api/events/${favoriteEvent.id}/toggle_favorite`, params)
        .then((response) => {
          console.log("favorite toggled");
        })
        .then(
          this.favoritedEvents.splice(
            this.favoritedEvents.indexOf(favoriteEvent.id),
            1
          )
        )
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
    //   removeFavorite: function (favoriteEvent) {
    //     console.log(favoriteEvent.id);
    //     const favoriteId = this.user.favorites.id.filter(
    //       this.user.favorites.id === favoriteEvent.id
    //     );
    //     console.log(favoriteId);
    //   },
  },
};
</script>