<template>
  <div class="events-index">
    <h1>Acoustic Music NYC</h1>

    <v-date-picker
    v-model="date"
    mode="single"
    is-inline
    />

    <button v-on:click="resetDate">Reset</button>


    <div>
      <input type="text" class="form-control" v-model="titleFilter" placeholder="Search" list="titles">
    </div>

    <div v-for="tag in tags">
      <input type="checkbox" id="tag.id" :value="tag" v-model="selectedTags">
      <label for="tag">#{{ tag.name }}</label>
    </div>
    <!-- <span>Checked Tags: {{ selectedTags }}</span> -->

    <!-- <div v-for="event in filterBy(events, titleFilter)"> -->
    <div v-for="event in filterBy(filterBy(filteredByTag, titleFilter), formattedDate)">
      <div v-if="event.moderator_id">
        <h3>{{ event.title }}</h3>
        <p>{{ event.favorites_info }}</p>
        <p>@{{ event.venue }}</p>
        <p>{{ cleanTime(event.start_time) }}</p>
        <img v-bind:src="`${event.image_url}`">
        <br>
        <router-link v-bind:to="`/events/${event.id}`">Show Info</router-link>
        <br>
        <button v-on:click="toggleFavorite(event)" v-if="!event.favorited">Favorite</button>
        <button v-on:click="toggleFavorite(event)" v-else>Unfavorite</button>
        <!-- <button v-on:click="favoriteEvent(event)">Favorite</button> -->
        <!-- <div class="like-icon mx-2 <%= 'red' if current_user.favorited?(cocktail) %>" data-id="<%= cocktail.id %>">
          <i class="fas fa-heart"></i> -->
        <!-- </div> -->
      </div>
      
    </div>

  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
import moment from "moment";
import { DatePicker } from "v-calendar";
export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      events: [],
      titleFilter: "",
      tags: [],
      selectedTags: [],
      selectedDate: new Date(),
      selectAttribute: {
        highlight: true,
      },
      date: new Date(),
      formattedDate: "",
      user_id: "",
    };
  },
  computed: {
    filteredByTag() {
      return this.getByTag(this.events, this.selectedTags);
    },
  },
  watch: {
    date: function () {
      this.formattedDate = moment(this.date).format("YYYY-MM-DD");
      // console.log("test");
    },
  },
  created: function () {
    axios.get("/api/events").then((response) => {
      console.log("All Events:", response.data);
      this.events = response.data;
      // console.log(this.events.first.favoritesInfo);
    });
    axios.get("/api/tags").then((response) => {
      this.tags = response.data;
      // console.log(this.tags);
    });
  },
  methods: {
    cleanTime: function (dateTime) {
      return moment(dateTime).format("dddd, MMMM Do h:mm A");
    },
    getByTag: function (events, selectedTags) {
      // console.log("selectedTags", selectedTags);
      if (selectedTags.length === 0) {
        return events;
      }
      selectedTags.forEach((tag) => {
        events = this.filterBy(events, tag.name);
      });
      return events;
    },
    resetDate() {
      this.date = new Date();
      // this.formattedDate = null;
      setTimeout(() => (this.formattedDate = null), 500);
      console.log(this.user_id);
    },
    toggleFavorite: function (event) {
      var params = {
        id: event.id,
      };
      axios
        .post(`/api/events/${event.id}/toggle_favorite`, params)
        .then((response) => {
          console.log("favorite toggled");
        });
      // .then.catch((error) => {
      //   console.log(error.response.data.errors);
      //   this.errors = error.response.data.errors;
      // });
    },
  },
};
</script>