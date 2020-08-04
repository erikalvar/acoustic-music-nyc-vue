<template>
  <div class="users-show">

  <!-- start blog Section -->
    <section>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <!-- start content  -->
            <div class="bg-light padding-70px-all xs-padding-30px-all margin-30px-bottom">
              
              <span class="font-size22 xs-font-size20 text-extra-dark-gray font-weight-600">Username: {{ user.username }}</span>
              <p></p><span class="font-size22 xs-font-size20 text-extra-dark-gray font-weight-600">Email: {{ user.email }}</span>
              <br><br>
              <span class="font-size22 xs-font-size20 text-extra-dark-gray font-weight-600"><router-link :to="`/users/${user.id}/edit`">Edit Profile</router-link></span>
              <br>
              <span class="font-size22 xs-font-size20 text-extra-dark-gray font-weight-600"><router-link v-if="user.moderator==true" to="/events/approve">Approve Events</router-link></span>
            </div>
            <h5 class="margin-15px-top font-weight-600 font-size32 sm-font-size28 xs-font-size24 line-height-40 xs-line-height-30">Favorited Events</h5>

            <div class="col-lg-8 col-md-12 sm-margin-50px-bottom">

            <div class="card margin-40px-bottom border-0 bg-light rounded-0" v-for="favoriteEvent in favoritedEvents">
              <div class="row no-gutters list-blog">

                <div class="col-md-5">
                  <div class="bg-img cover-background h-100 min-height-250" data-overlay-dark="0" :data-background="`${favoriteEvent.image_url}`" :style="`background-image: url(${favoriteEvent.image_url});`"></div>
                </div>
                <div class="col-md-7">
                  <div class="card-body">

                    <!-- <span class="category"><a href="#!">Adventure</a></span> -->

                    <!-- <h5><a href="standard-post.html">{{ event.title }}</a></h5> -->
                    <h5><router-link v-bind:to="`/events/${favoriteEvent.id}`">{{ favoriteEvent.title }}</router-link></h5>
                    <p>@{{ favoriteEvent.venue }}</p>

                    <div class="meta">
                      <span class="date">{{ cleanTime(favoriteEvent.start_time) }}</span>
                      <span class="author">
                        <button v-on:click="toggleFavorite(favoriteEvent)">Unfavorite</button> 
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- start pager  -->
            <div class="margin-50px-top">
              <div class="pagination text-small text-uppercase text-extra-dark-gray">
                <ul>
                  <li><a href="javascript:void(0);"><i class="fas fa-long-arrow-alt-left margin-5px-right xs-display-none"></i> Prev</a></li>
                  <li class="active"><a href="javascript:void(0);">1</a></li>
                  <li><a href="javascript:void(0);">2</a></li>
                  <li><a href="javascript:void(0);">3</a></li>
                  <li><a href="javascript:void(0);">Next <i class="fas fa-long-arrow-alt-right margin-5px-left xs-display-none"></i></a></li>
                </ul>
              </div>
            </div>
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
</style>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data: function () {
    return {
      message: "Welcome to Events Show",
      user: {},
      favoritedEvents: [],
      // favoritedEventIds: [],
    };
  },
  created: function () {
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
    cleanTime: function (dateTime) {
      return moment(dateTime).format("dddd, MMMM Do h:mm A");
    },
    toggleFavorite: function (favoriteEvent) {
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