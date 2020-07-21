<template>
  <div class="events-edit">
    <form v-on:submit.prevent="editEvent">
      <h1>Edit an Event</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Title:</label>
        <input type="text" class="form-control" v-model="event.title">
      </div>
      <div class="form-group">
        <label>Description:</label>
        <textarea v-model="event.description" ></textarea>
      </div>
      <div class="form-group">
        <label>Venue:</label>
        <input type="text" class="form-control" v-model="event.venue">
      </div>
      <div class="form-group">
        <label>Venue Address:</label>
        <input type="text" class="form-control" v-model="event.venue_address">
      </div>
      <div class="form-group">
        <label>Image Url:</label>
        <input type="text" class="form-control" v-model="event.image_url">
      </div>
      <div class="form-group">
        <label>Tickets Url:</label>
        <input type="text" class="form-control" v-model="event.tickets_url">
      </div>
      <div class="form-group">
        <label>Event Tags (array):</label>
        <input type="text" class="form-control" v-model="event.tag_ids">
      </div>
      <div class="form-group">
        <label>Start Time:</label>
        <datetime type="datetime" v-model="event.start_time" use12-hour></datetime>
      </div>
      <div class="form-group">
        <label>End Time:</label>
        <datetime type="datetime" v-model="event.end_time" use12-hour></datetime>
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" /> <br>
      <button v-on:click="destroyEvent()">Delete Event</button>
    </form>

  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      errors: [],
      event: {},
      allTags: {}
    };
  },
  created: function() {
    axios.get(`/api/events/${this.$route.params.id}`).then(response => {
      this.event = response.data;
      console.log(this.event);
    });
  },
  methods: {
    editEvent: function() {
      var params = {
        errors: [],
        title: this.title,
        description: this.description,
        venue: this.venue,
        venue_address: this.venue_address,
        image_url: this.image_url,
        tickets_url: this.tickets_url,
        start_time: this.start_time,
        end_time: this.end_time,
        tag_ids: this.tag_ids
      };
      axios
        .patch(`/api/events/${this.event.id}`)
        .then(response => {
          this.$router.push(`/events/${response.data.id}`);
        })
        .catch(error => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
    destroyEvent: function() {
      if (confirm("Are you sure you want to delete event?")) {
        axios.delete(`/api/events/${this.event.id}`).then(response => {
          console.log("Event successfully deleted", response.data);
          this.$router.push("/events");
        });
      }
    }
  }
};
</script>
