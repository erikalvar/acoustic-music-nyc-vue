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
        <p>@{{ event.venue }}</p>
        <p>{{ cleanTime(event.start_time) }}</p>
        <img v-bind:src="`${event.image_url}`">
        <router-link v-bind:to="`/events/${event.id}`">Show Info</router-link>
        <button v-on:click="favoriteEvent(event)">Favorite</button>
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
    },
    favoriteEvent: function (event) {
      var params = {
        event_id: event.id,
      };
      axios
        .post("/api/favorites", params)
        .then((response) => {
          console.log("Successfully favorited", response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>