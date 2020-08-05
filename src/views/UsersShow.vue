<template>
  <div class="users-show">
    <!-- start blog Section -->
    <section class="background">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6 col-md-4">
            <!-- start content  -->
            <div
              class="card card-event heading padding-40px-all xs-padding-30px-all margin-30px-bottom margin-30px-top border-all"
            >
              <h3 class="heading border-bottom padding-10px-bottom">
                Account Info
              </h3>
              <span
                class="font-size22 xs-font-size20 text-extra-dark-gray font-weight-600"
                >Username: {{ user.username }}</span
              >
              <p></p>
              <span
                class="font-size22 xs-font-size20 text-extra-dark-gray font-weight-600"
                >Email: {{ user.email }}</span
              >
              <br /><br />
              <span
                class="font-size22 xs-font-size20 text-extra-dark-gray font-weight-600"
                ><router-link class="btn butn" :to="`/users/${user.id}/edit`"
                  >Edit Profile</router-link
                ></span
              >
              <br />
              <span
                class="font-size22 xs-font-size20 text-extra-dark-gray font-weight-600"
                ><router-link
                  class="btn butn"
                  v-if="user.moderator == true"
                  to="/events/approve"
                  >Approve Events</router-link
                ></span
              >
            </div>
          </div>
          <div class="col-lg-8 col-md-6">
            <h5
              class="heading margin-15px-top font-weight-600 font-size32 sm-font-size28 xs-font-size24 line-height-40 xs-line-height-30"
            >
              Favorited Events
            </h5>

            <div class="col-lg-12 col-md-12 sm-margin-50px-bottom">
              <div
                class="card card-event margin-20px-bottom border-all rounded-0"
                v-for="favoriteEvent in favoritedEvents"
              >
                <div class="row no-gutters list-blog">
                  <div class="col-md-5">
                    <div
                      class="bg-img cover-background h-100 min-height-150"
                      data-overlay-dark="0"
                      :data-background="`${favoriteEvent.image_url}`"
                      :style="
                        `background-image: url(${favoriteEvent.image_url});`
                      "
                    ></div>
                  </div>
                  <div class="col-md-7">
                    <div class="card-body">
                      <!-- <span class="category"><a href="#!">Adventure</a></span> -->

                      <!-- <h5><a href="standard-post.html">{{ event.title }}</a></h5> -->
                      <h5>
                        <router-link
                          v-bind:to="`/events/${favoriteEvent.id}`"
                          >{{ favoriteEvent.title }}</router-link
                        >
                      </h5>
                      <p>@{{ favoriteEvent.venue }}</p>

                      <div class="meta">
                        <span class="date">{{
                          cleanTime(favoriteEvent.start_time)
                        }}</span>
                        <span class="author">
                          <button
                            class="btnf"
                            v-on:click="toggleFavorite(favoriteEvent)"
                          >
                            <i class="fas fa-star"></i>
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- start pager  -->

              <!-- end pager  -->
            </div>

            <!-- end content -->
          </div>
        </div>
      </div>
    </section>
    <!-- end blog section -->

    <!-- <p>Username: {{ user.username }}</p>
  <p>Email: {{ user.email }}</p>

  <div>
    <router-link :to="`/users/${user.id}/edit`">Edit Profile</router-link>
  </div>

  <div>
    <router-link v-if="user.moderator==true" to="/events/approve">Approve Events</router-link>      
  </div>

  <div>
    <h3>Favorited Events</h3>
    <div v-for="favoriteEvent in favoritedEvents">
    <h3>{{ favoriteEvent.title }}</h3>
    <p>{{ favoriteEvent.venue }}</p>
    <p>{{ cleanTime(favoriteEvent.start_time) }}</p>
    <router-link v-bind:to="`/events/${favoriteEvent.id}`">Show Info</router-link>
    <br>
    <button v-on:click="toggleFavorite(favoriteEvent)">Unfavorite</button>
     

    

    
    </div>
  </div> -->
  </div>
</template>

<style>
.h5 {
  -ms-flex-align: center;
}
</style>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data: function() {
    return {
      message: "Welcome to Events Show",
      user: {},
      favoritedEvents: [],
      // favoritedEventIds: [],
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
      // console.log(response.data);
      this.user = response.data;
      var test = response.data.favorited_events;
      // console.log(test);
      this.favoritedEvents = test.sort((a, b) =>
        a.start_time.localeCompare(b.start_time)
      );
      // console.log(this.favoritedEvents);

      // console.log(this.favoritedEvents);
      // this.favoritedEventIds = response.data.favorites;
      // console.log(this.favoritedEventIds);
    });
  },
  methods: {
    cleanTime: function(dateTime) {
      return moment(dateTime).format("dddd, MMMM Do h:mm A");
    },
    toggleFavorite: function(favoriteEvent) {
      var params = {
        id: favoriteEvent.id,
      };
      axios
        .post(`/api/events/${favoriteEvent.id}/toggle_favorite`, params)
        .then((response) => {
          console.log("favorite toggled");
        })
        .then(
          this.favoritedEvents.splice(
            this.favoritedEvents.indexOf(favoriteEvent),
            1
          )
        )
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
    //   removeFavorite: function (favoriteEvent) {
    //     console.log(favoriteEvent.id);
    //     const favoriteId = this.user.favorites.id.filter(
    //       this.user.favorites.id === favoriteEvent.id
    //     );
    //     console.log(favoriteId);
    //   },
  },
};
</script>
