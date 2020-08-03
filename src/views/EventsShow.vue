<template>
  <div class="events-show">

    <!-- start blog Section -->
    <section>
      <div class="container">

        <div class="row justify-content-center">
          <div class="col-lg-10 col-md-11">
            <!-- start content  -->
            <h3 class="margin-15px-top font-weight-600 font-size40 sm-font-size28 xs-font-size24 line-height-40 xs-line-height-30">{{ currentEvent.title }}</h3>
            <img v-bind:src="`${currentEvent.image_url}`" class="margin-30px-bottom" alt="..." /><br>
            <span class="text-extra-dark-gray font-size14"><span class="font-weight-600">{{ cleanTime(currentEvent.start_time) }}</span> </span> 
            <h3 class="margin-15px-top font-weight-600 font-size22 sm-font-size28 xs-font-size24 line-height-20 xs-line-height-30">@{{ currentEvent.venue }}</h3>
            <h3 class="margin-15px-top font-weight-600 font-size16 sm-font-size28 xs-font-size24 line-height-20 xs-line-height-30">{{ currentEvent.venue_address }}</h3>
            <p>{{ currentEvent.description }}</p>
            <p>Tickets: <a :href="`${currentEvent.tickets_url}`">{{ currentEvent.tickets_url }}</a></p>
            <h6>Tags:</h6>
            <div v-for="tag in tags">
              <p>#{{ tag.name }}</p>
            </div> 
            

            <!-- end content -->

          </div>
        </div>
      </div>
    </section>
    <!-- end blog section -->





    <!-- <h1>{{ currentEvent.title }}</h1>
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

    <!-- <h3>Tags:</h3>
    <div v-for="tag in tags">
      <p>#{{ tag.name }}</p>
    </div> --> 

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