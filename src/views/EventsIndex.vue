<template>
  <div class="events-index">
    <h1>{{ message }}</h1>

    <div>
      <input type="text" class="form-control" v-model="titleFilter" placeholder="Search" list="titles">
    </div>

    <div v-for="tag in tags">
      <input type="checkbox" id="tag" :value="tag.id" v-model="selectedTags">
      <label for="tag">{{ tag.name }}</label>
    </div>
    <span>Checked Tags: {{ selectedTags }}</span>

    <div v-for="event in filterBy(events, titleFilter)">
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
import Vue2Filters from "vue2-filters";
export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      message: "Welcome to Events",
      events: [],
      titleFilter: "",
      tags: [],
      selectedTags: [],
    };
  },
  created: function () {
    axios.get("/api/events").then((response) => {
      console.log("All Events:", response.data);
      this.events = response.data;
    });
    axios.get("/api/tags").then((response) => {
      this.tags = response.data;
      console.log(this.tags);
    });
  },
  methods: {},
};
</script>