<template>
  <div class="events-approve-index">
    <h1>Acoustic Music NYC</h1>

    <div>
      <input type="text" class="form-control" v-model="titleFilter" placeholder="Search" list="titles">
    </div>

    <div v-for="tag in tags">
      <input type="checkbox" id="tag.id" :value="tag" v-model="selectedTags">
      <label for="tag">#{{ tag.name }}</label>
    </div>
    <!-- <span>Checked Tags: {{ selectedTags }}</span> -->

    <!-- <div v-for="event in filterBy(events, titleFilter)"> -->
    <div v-for="event in filterBy(filteredByTag, titleFilter)">
      
      <h1>{{ event.title }}</h1>
      <p>Venue: {{ event.venue }}</p>
      <p>Venue Address: {{ event.venue_address }}</p>
      <p>Start: {{ cleanTime(event.start_time) }}</p>
      <p>End: {{ cleanTime(event.end_time) }}</p>
      <p>Description: {{ event.description }}</p>
      <img v-bind:src="`${event.image_url}`">
      <p>Tickets: {{ event.tickets_url }}</p>

      <h3>Tags:</h3>
      <p>{{ event.tags }}</p>

      <div>
        <router-link :to="`/events/${event.id}/edit`">Edit</router-link>
      </div>
        <button v-on:click="approveEvent(event)">Approve Event</button>      
      
    </div>

  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
import moment from "moment";
export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      events: [],
      titleFilter: "",
      tags: [],
      selectedTags: [],
    };
  },
  computed: {
    filteredByTag() {
      return this.getByTag(this.events, this.selectedTags);
    },
  },
  created: function () {
    axios.get("/api/events").then((response) => {
      this.events = this.filterBy(response.data, 0, "moderator_id");
      console.log("Pending Events:", this.events);
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
    approveEvent: function (event) {
      var params = {
        approved: true,
      };
      axios
        .patch(`/api/events/${event.id}`, params)
        .then((response) => {
          this.events.splice(this.events.indexOf(event), 1);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>