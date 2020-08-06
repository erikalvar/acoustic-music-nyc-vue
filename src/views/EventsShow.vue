<template>
  <div class="events-show">
    <!-- start blog Section -->
    <section>
      <div class="container bg-light  border-all">
        <div class="row justify-content-center">
          <div class="col-lg-10 col-md-11">
            <!-- start content  -->
            <h3
              class="heading margin-30px-top font-weight-600 font-size40 sm-font-size28 xs-font-size24 line-height-40 xs-line-height-30"
            >
              {{ currentEvent.title }}
            </h3>
            <img
              v-bind:src="`${currentEvent.image_url}`"
              class="center margin-10px-bottom"
              alt="..."
            /><br />
            <span class="text-extra-dark-gray font-size18"
              ><span class="font-weight-600">{{
                cleanTime(currentEvent.start_time)
              }}</span>
            </span>
            <h3
              class="margin-15px-top font-weight-600 font-size22 sm-font-size28 xs-font-size24 line-height-20 xs-line-height-30"
            >
              @{{ currentEvent.venue }}
            </h3>
            <h3
              class="margin-15px-top font-weight-600 font-size18 sm-font-size28 xs-font-size24 line-height-20 xs-line-height-30"
            >
              {{ currentEvent.venue_address }}
            </h3>
            <p>{{ currentEvent.description }}</p>
            <div v-if="currentEvent.tickets_url">
              <p>
                Tickets:
                <a :href="`${currentEvent.tickets_url}`">{{
                  currentEvent.tickets_url
                }}</a>
              </p>
            </div>

            <button
              class="btnuf"
              v-on:click="toggleFavorite()"
              v-if="!currentEvent.favorited"
            >
              <i class="fas fa-star"></i>
            </button>
            <button class="btnf" v-on:click="toggleFavorite()" v-else>
              <i class="fas fa-star margin-20px-bottom"></i>
            </button>

            <div>
              <div>
                <div v-for="tag in tags">
                  <span for="tag">#{{ tag.name }}</span>
                </div>
              </div>
            </div>
            <div class="right">
              <router-link :to="`/events/${currentEvent.id}/edit`"
                >Edit</router-link
              >
            </div>

            <!-- end content -->
          </div>
        </div>
      </div>
    </section>
    <!-- end blog section -->
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import moment from "moment";
// import StaticMap from "vue-static-map";
// import func from "../../vue-temp/vue-editor-bridge";
export default {
  components: {},
  data: function() {
    return {
      message: "Welcome to Events Show",
      currentEvent: {},
      address: "",
      tags: [],
      errors: [],
    };
  },
  created: function() {
    axios.get(`/api/events/${this.$route.params.id}`).then((response) => {
      // console.log(response.data);
      this.currentEvent = response.data;
      this.tags = response.data.tags;
      this.address = response.formatted_address;
      // console.log(this.tags);
    });
  },
  methods: {
    cleanTime: function(dateTime) {
      return moment(dateTime).format("dddd, MMMM Do h:mm A");
    },
    toggleFavorite: function() {
      var params = {
        id: this.currentEvent.id,
      };
      axios
        .post(`/api/events/${this.currentEvent.id}/toggle_favorite`, params)
        .then((response) => {
          console.log(response.data, "favorite toggled");
          this.currentEvent.favorited = response.data.favorited;
        });
    },
  },
};
</script>
