<template>
  <div class="events-approve-index">
    <h1>Approve Events</h1>
    <!-- start blog Section -->
    <section>
      <div class="container">
        <div class="row">
          <!--  start blog left-->
          <div class="col-lg-8 col-md-12 sm-margin-50px-bottom">
            <div
              class="card margin-40px-bottom border-0 bg-light rounded-0"
              v-for="event in filterBy(
                filterBy(filteredByTag, titleFilter),
                formattedDate
              )"
            >
              <div class="row no-gutters list-blog">
                <div class="col-md-5">
                  <div
                    class="bg-img cover-background h-100 min-height-250"
                    data-overlay-dark="0"
                    :data-background="`${event.image_url}`"
                    :style="`background-image: url(${event.image_url});`"
                  ></div>
                </div>
                <div class="col-md-7">
                  <div class="card-body">
                    <h5>
                      <router-link v-bind:to="`/events/${event.id}`">{{
                        event.title
                      }}</router-link>
                    </h5>
                    <p>@{{ event.venue }}</p>
                    <div class="meta">
                      <span class="date">{{
                        cleanTime(event.start_time)
                      }}</span>
                      <div class="btn-group" role="group">
                        <div>
                          <router-link
                            class="btn butn"
                            :to="`/events/${event.id}/edit`"
                            >Edit</router-link
                          >
                        </div>
                        <button
                          class="btn butn"
                          v-on:click="approveEvent(event)"
                        >
                          Approve
                        </button>
                        <br />
                        <button
                          class="btn butn"
                          v-on:click="destroyEvent(event)"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--  end blog left-->

          <!--  start blog right-->
          <div class="col-lg-4 col-md-12">
            <div class="side-bar padding-30px-left md-no-padding-left">
              <div
                class="widget search padding-30px-all md-padding-20px-all shadow-theme"
              >
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search Events"
                    v-model="titleFilter"
                    list="titles"
                    aria-label="search events"
                    aria-describedby="button-addon2"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-primary"
                      type="button"
                      id="button-addon2"
                    >
                      <span class="ti-search"></span>
                    </button>
                  </div>
                </div>
              </div>

              <div
                class="widget padding-30px-all md-padding-20px-all shadow-theme"
              >
                <div class="widget-title margin-35px-bottom">
                  <h3>Tags</h3>
                </div>
                <ul class="tags no-margin-bottom" v-for="tag in tags">
                  <li>
                    <input
                      type="checkbox"
                      id="tag.id"
                      :value="tag"
                      v-model="selectedTags"
                    />
                    <label for="tag">#{{ tag.name }}</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!--  end blog right-->
        </div>
      </div>
    </section>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
import moment from "moment";
export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
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
  created: function() {
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
    cleanTime: function(dateTime) {
      return moment(dateTime).format("dddd, MMMM Do h:mm A");
    },
    getByTag: function(events, selectedTags) {
      // console.log("selectedTags", selectedTags);
      if (selectedTags.length === 0) {
        return events;
      }
      selectedTags.forEach((tag) => {
        events = this.filterBy(events, tag.name);
      });
      return events;
    },
    approveEvent: function(event) {
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
    destroyEvent: function(event) {
      if (confirm("Are you sure you want to delete event?")) {
        axios.delete(`/api/events/${event.id}`).then((response) => {
          console.log("Event successfully deleted", response.data);
          this.events.splice(this.events.indexOf(event), 1);
        });
      }
    },
  },
};
</script>
