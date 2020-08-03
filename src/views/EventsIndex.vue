<template>
  <div class="events-index">

    <!-- start blog Section -->
    <section>
      <div class="container">
        <div class="row">

          <!--  start blog left-->
          <div class="col-lg-8 col-md-12 sm-margin-50px-bottom">

            <div class="card margin-40px-bottom border-0 bg-light rounded-0" v-for="event in filterBy(filterBy(filteredByTag, titleFilter), formattedDate)">
              <div class="row no-gutters list-blog">

                <div class="col-md-5">
                  <div class="bg-img cover-background h-100 min-height-250" data-overlay-dark="0" data-background="img/blog/list-1.jpg"></div>
                </div>
                <div class="col-md-7">
                  <div class="card-body">

                    <span class="category"><a href="#!">Adventure</a></span>

                    <h5><a href="standard-post.html">{{ event.title }}</a></h5>
                    <p>@{{ event.venue }}</p>

                    <div class="meta">
                      <span class="date">{{ cleanTime(event.start_time) }}</span>
                      <span class="author">
                        <button v-on:click="toggleFavorite(event)" v-if="!event.favorited">Favorite</button>
                        <button v-on:click="toggleFavorite(event)" v-else>Unfavorite</button>  
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
          <!--  end blog left-->

          <!--  start blog right-->
          <div class="col-lg-4 col-md-12">
            <div class="side-bar padding-30px-left md-no-padding-left">
              <div class="widget search padding-30px-all md-padding-20px-all shadow-theme">
                <div class="widget-title margin-35px-bottom">
                  <h3>Search</h3>
                </div>
                <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="Type here..." v-model="titleFilter" list="titles" aria-label="search events" aria-describedby="button-addon2">
                  <div class="input-group-append">
                    <button class="btn btn-primary" type="button" id="button-addon2"><span class="ti-search"></span></button>
                  </div>
                </div>
              </div>

              <div class="widget padding-30px-all md-padding-20px-all shadow-theme">
                <div class="widget-title margin-35px-bottom">
                  <h3>Select Date</h3>
                </div>
                <ul class="widget-list no-margin-bottom">
                  <v-date-picker v-model="date" mode="single" is-inline/>
                  <button v-on:click="resetDate">Reset</button>
                </ul>
              </div>

              <div class="widget padding-30px-all md-padding-20px-all shadow-theme">
                <div class="widget-title margin-35px-bottom">
                  <h3>Tags</h3>
                </div>
                <ul class="tags no-margin-bottom" v-for="tag in tags">
                  <li><input type="checkbox" id="tag.id" :value="tag" v-model="selectedTags">
                  <label for="tag">#{{ tag.name }}</label></li>
                </ul>
              </div>

              <!-- <div class="widget padding-30px-all md-padding-20px-all shadow-theme">
                <div class="widget-title margin-35px-bottom">
                  <h3>Recent Posts</h3>
                </div>
                <div class="media margin-20px-bottom">
                  <img src="img/blog/blog-6.jpg" class="mr-4" alt="" />
                  <div class="media-body">
                    <h5 class="no-margin-top margin-5px-bottom font-size15 font-weight-500"><a href="#" class="text-extra-dark-gray">She is known for playing</a></h5>
                    <span class="font-size14">20 Mar, 2020</span>
                  </div>
                </div>
                <div class="media margin-20px-bottom">
                  <img src="img/blog/blog-7.jpg" class="mr-4" alt="" />
                  <div class="media-body">
                    <h5 class="no-margin-top margin-5px-bottom font-size15 font-weight-500"><a href="#" class="text-extra-dark-gray">Craft a life you love</a></h5>
                    <span class="font-size14">12 Mar, 2020</span>
                  </div>
                </div>
                <div class="media margin-20px-bottom">
                  <img src="img/blog/blog-8.jpg" class="mr-4" alt="" />
                  <div class="media-body">
                    <h5 class="no-margin-top margin-5px-bottom font-size15 font-weight-500"><a href="#" class="text-extra-dark-gray">Wonderland of ice place</a></h5>
                    <span class="font-size14">17 Feb, 2020</span>
                  </div>
                </div>
                <div class="media">
                  <img src="img/blog/blog-5.jpg" class="mr-4" alt="" />
                  <div class="media-body">
                    <h5 class="no-margin-top margin-5px-bottom font-size15 font-weight-500"><a href="#" class="text-extra-dark-gray">Publish your passions</a></h5>
                    <span class="font-size14">12 Jan, 2020</span>
                  </div>
                </div>
              </div> -->

              <!-- <div class="widget padding-30px-all md-padding-20px-all shadow-theme">
                <div class="widget-title margin-35px-bottom">
                  <h3>Instagram</h3>
                </div>
                <ul class="insta-link text-center no-margin-bottom">
                  <li>
                    <a href="#"><img src="img/blog/insta-1.jpg" alt=""></a>
                  </li>
                  <li>
                    <a href="#"><img src="img/blog/insta-2.jpg" alt=""></a>
                  </li>
                  <li>
                    <a href="#"><img src="img/blog/insta-3.jpg" alt=""></a>
                  </li>
                  <li>
                    <a href="#"><img src="img/blog/insta-4.jpg" alt=""></a>
                  </li>
                  <li>
                    <a href="#"><img src="img/blog/insta-5.jpg" alt=""></a>
                  </li>
                  <li>
                    <a href="#"><img src="img/blog/insta-6.jpg" alt=""></a>
                  </li>
                </ul>
              </div> -->

              <div class="widget padding-30px-all md-padding-20px-all shadow-theme">
                <div class="widget-title margin-35px-bottom">
                  <h3>Follow us</h3>
                </div>
                <div class="bg-light padding-20px-all">
                  <ul class="social-links no-margin text-center">
                    <li>
                      <a href="javascript:void(0)"><i class="fab fa-facebook-f"></i></a>
                    </li>
                    <li>
                      <a href="javascript:void(0)"><i class="fab fa-twitter"></i></a>
                    </li>
                    <li>
                      <a href="javascript:void(0)"><i class="fab fa-instagram"></i></a>
                    </li>
                    <li>
                      <a href="javascript:void(0)"><i class="fab fa-dribbble"></i></a>
                    </li>
                    <li>
                      <a href="javascript:void(0)"><i class="fab fa-linkedin-in"></i></a>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- <div class="widget">
                <div class="bg-img text-center padding-30px-all cover-background" data-overlay-dark="5" data-background="img/content/testimonial.jpg">
                  <div class="owl-carousel owl-theme" id="testmonials-carousel">
                    <div>
                      <i class="fas fa-quote-left font-size24 text-white margin-30px-bottom"></i>
                      <p class="text-white">Stotam rem aperiam, eaquelim ipsa quae ab illo inventore veritatis et architecto.</p>
                      <h6 class="no-margin-bottom text-white font-size18 font-weight-400">- John Mariya</h6>
                    </div>
                    <div>
                      <i class="fas fa-quote-left font-size24 text-white margin-30px-bottom"></i>
                      <p class="text-white">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit onsequuntur.</p>
                      <h6 class="no-margin-bottom text-white font-size18 font-weight-400">- Maria Parker</h6>
                    </div>
                  </div>
                </div>
              </div> -->

            </div>
          </div>
          <!--  end blog right-->

        </div>
      </div>
    </section>
    <!-- end blog section -->
 
 
 
    <!-- <h1>Acoustic Music NYC</h1>

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

    <div v-for="event in filterBy(filterBy(filteredByTag, titleFilter), formattedDate)">
      <div v-if="event.moderator_id">
        <h3>{{ event.title }}</h3>
        <p>{{ event.favorites_info }}</p>
        <p>@{{ event.venue }}</p>
        <p>{{ cleanTime(event.start_time) }}</p>
        <img v-bind:src="`${event.image_url}`">
        <br>
        <router-link v-bind:to="`/events/${event.id}`">Show Info</router-link>
        <br>
        <button v-on:click="toggleFavorite(event)" v-if="!event.favorited">Favorite</button>
        <button v-on:click="toggleFavorite(event)" v-else>Unfavorite</button>
      </div>
      
    </div> -->

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
      user_id: "",
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
      // console.log(this.events.first.favoritesInfo);
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
      console.log(this.user_id);
    },
    toggleFavorite: function (event) {
      var params = {
        id: event.id,
      };
      axios
        .post(`/api/events/${event.id}/toggle_favorite`, params)
        .then((response) => {
          console.log(response.data, "favorite toggled");
          event.favorited = response.data.favorited;
        });
      // .then.catch((error) => {
      //   console.log(error.response.data.errors);
      //   this.errors = error.response.data.errors;
      // });
    },
  },
};
</script>