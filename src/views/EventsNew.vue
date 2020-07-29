<template>
  <div class="events-new">

    <form v-on:submit.prevent="createEvent">
      <h1>Submit an Event</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Title:</label>
        <input type="text" class="form-control" v-model="newEventTitle">
      </div>
      <div class="form-group">
        <label>Description:</label>
        <textarea v-model="newEventDescription" ></textarea>
      </div>
      <div class="form-group">
        <label>Venue:</label>
        <input type="text" class="form-control" v-model="newEventVenue">
      </div>
      <div class="form-group">
        <label>Venue Address:</label>
        <!-- <input ref="autocomplete" placeholder="" class="search-location" onfocus="value = " type="text" /> -->
        <input ref="autocomplete" 
        placeholder="Search" 
        class="search-location"
        onfocus="value = ''" 
        type="text" />
        <!-- <input type="text" class="form-control" v-model="newEventVenueAddress"> -->
      </div>
      <div class="form-group">
        <label>Image Url:</label>
        <input type="text" class="form-control" v-model="newEventImageUrl">
      </div>
      <div class="form-group">
        <label>Tickets Url:</label>
        <input type="text" class="form-control" v-model="newEventTicketsUrl">
      </div>
      <div class="form-group">
        <label>Start Time:</label>
        <datetime type="datetime" v-model="newEventStartTime" use12-hour></datetime>
      </div>
      <div class="form-group">
        <label>End Time:</label>
        <datetime type="datetime" v-model="newEventEndTime" use12-hour></datetime>
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>

    <br>
    <!-- tags box -->
    <div v-for="tag in tags">
      <input type="checkbox" id="tag" :value="tag.id" v-model="selectedTags">
      <label for="tag">#{{ tag.name }}</label>
    </div>
    <!-- <span>Checked names: {{ selectedTags }}</span> -->
    

  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      errors: [],
      events: [],
      newEventTitle: "",
      newEventDescription: "",
      newEventVenue: "",
      newEventVenueAddress: this.place,
      newEventImageUrl: "",
      newEventTicketsUrl: "",
      newEventStartTime: "",
      newEventEndTime: "",
      tags: [],
      selectedTags: [],
      place: "",
    };
  },
  created: function () {
    axios.get("/api/tags").then((response) => {
      this.tags = response.data;
      // console.log(this.tags);
    });
  },
  mounted() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.$refs.autocomplete,
      { types: ["geocode"] }
    );
    this.autocomplete.addListener("place_changed", () => {
      let place = this.autocomplete.getPlace().formatted_address;
      this.place = place;
      console.log(place);
    });
  },
  methods: {
    createEvent: function () {
      var params = {
        title: this.newEventTitle,
        description: this.newEventDescription,
        venue: this.newEventVenue,
        venue_address: this.place,
        image_url: this.newEventImageUrl,
        tickets_url: this.newEventTicketsUrl,
        start_time: this.newEventStartTime,
        end_time: this.newEventEndTime,
        tag_ids: this.selectedTags,
      };
      axios
        .post("/api/events", params)
        .then((response) => {
          console.log("Successfully added", response.data);
          this.events.push(response.data);
        })
        .then((response) => {
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
    handleInput: function (input) {
      this.newEventVenueAddress = input;
    },
  },
};
</script>
