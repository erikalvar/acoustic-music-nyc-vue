<template>
  <div class="events-edit">
    <section>
      <div class="container">
        <div class="row">

          <!--  start blog left-->
          <div class="col-lg-8 col-md-12 sm-margin-50px-bottom">
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
                <textarea v-model="event.description"></textarea>
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
                <label>Start Time:</label>
                <datetime type="datetime" v-model="event.end_time" use12-hour></datetime>
              </div>
              <div class="form-group">
                <label>End Time:</label>
                <datetime type="datetime" v-model="event.end_time" use12-hour></datetime>
              </div>
              <input type="submit" class="btn btn-primary" value="Submit" />
            </form>
          </div>
          <!--  end blog left-->

          <!--  start blog right-->
          <div class="col-lg-4 col-md-12">
            <div class="side-bar padding-30px-left md-no-padding-left">
              <div class="widget search padding-30px-all md-padding-20px-all shadow-theme">
                <div class="widget-title margin-35px-bottom">
                  <h5>Add Tags</h5>
                  <div v-for="tag in tags">
                    <input type="checkbox" id="tag" :value="tag.id" v-model="selectedTagsIds">
                    <label for="tag">#{{ tag.name }}</label>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <!--  end blog right-->

        </div>
      </div>
    </section>
    
    
    
    
    <!-- <form v-on:submit.prevent="editEvent">
      <h1>Edit an Event</h1>
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
        <label>Start Time:</label>
        <datetime type="datetime" v-model="event.start_time" use12-hour></datetime>
      </div>
      <div class="form-group">
        <label>End Time:</label>
        <datetime type="datetime" v-model="event.end_time" use12-hour></datetime>
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" /> <br>
      <button v-on:click="destroyEvent()">Delete Event</button>
      <ul>
        <li class="text-danger">{{ errors }}</li>
      </ul>
    </form>

    <br>
    
    <div v-for="tag in tags">
      <input type="checkbox" id="tag" :value="tag.id" v-model="selectedTagsIds">
      <label for="tag">#{{ tag.name }}</label>
    </div> -->
    


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
      event: {},
      tags: [],
      selectedTagsIds: [],
    };
  },
  created: function () {
    axios.get(`/api/events/${this.$route.params.id}`).then((response) => {
      this.event = response.data;
      console.log(this.event);
      this.selectedTagsIds = this.event.tags.map((tag) => tag.id);
    });
    axios.get("/api/tags").then((response) => {
      this.tags = response.data;
      console.log(this.tags);
    });
  },
  methods: {
    editEvent: function () {
      var params = {
        errors: [],
        title: this.event.title,
        description: this.event.description,
        venue: this.event.venue,
        venue_address: this.event.venue_address,
        image_url: this.event.image_url,
        tickets_url: this.event.tickets_url,
        start_time: this.event.start_time,
        end_time: this.event.end_time,
        tag_ids: this.selectedTagsIds,
      };
      axios
        .patch(`/api/events/${this.event.id}`, params)
        .then((response) => {
          this.$router.push(`/events/${response.data.id}`);
        })
        .catch((error) => {
          console.log(error.response.data);
          this.errors = error.response.data.errors;
        });
    },
    destroyEvent: function () {
      if (confirm("Are you sure you want to delete event?")) {
        axios.delete(`/api/events/${this.event.id}`).then((response) => {
          console.log("Event successfully deleted", response.data);
          this.$router.push("/");
        });
      }
    },
  },
};
</script>
