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
      <div v-for="favorite_event in favorited_events">
        <h3>{{ favorite_event.title }}</h3>
        <h3>{{ favorite_event.venue }}</h3>
        <h3>{{ cleanTime(favorite_event.start_time) }}</h3>
        <router-link v-bind:to="`/events/${favorite_event.id}`">Show Info</router-link>
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
      favorited_events: [],
    };
  },
  created: function () {
    axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.user = response.data;
      this.favorited_events = response.data.favorited_events;
      console.log(this.favorited_events);
    });
  },
  methods: {
    cleanTime: function (dateTime) {
      return moment(dateTime).format("dddd, MMMM Do h:mm A");
    },
  },
};
</script>