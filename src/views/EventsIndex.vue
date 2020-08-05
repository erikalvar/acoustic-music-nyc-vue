<template>
  <div class="events-index">
    <!-- start blog Section -->
    <section class="background">
      <div class="container">
        <div class="row">
          <!--  start blog left-->
          <div class="col-lg-8 col-md-12 sm-margin-50px-bottom centerStuff">
            <div
              class="card margin-10px-bottom border-width-1 bg-light rounded-0 "
              v-for="event in filterBy(
                filterBy(filteredByTag, titleFilter),
                formattedDate
              ).slice(0, showNumber)"
            >
              <div v-if="event.moderator_id">
                <div
                  class="row no-gutters list-blog card-event no-padding no-margin"
                >
                  <div class="col-md-5">
                    <!-- <div
                      class="bg-img cover-background h-100 min-height-150"
                      data-overlay-dark="0"
                      :data-background="`${event.image_url}`"
                      :style="`background-image: url(${event.image_url});`"
                    ></div> -->
                    <router-link v-bind:to="`/events/${event.id}`">
                      <div
                        class="bg-img cover-background h-100 min-height-150"
                        data-overlay-dark="0"
                        :data-background="`${event.image_url}`"
                        :style="`background-image: url(${event.image_url});`"
                      ></div>
                    </router-link>
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
                        <span class="author">
                          <button
                            class="btnuf"
                            v-on:click="toggleFavorite(event)"
                            v-if="!event.favorited"
                          >
                            <i class="fas fa-star"></i>
                          </button>
                          <button
                            class="btnf"
                            v-on:click="toggleFavorite(event)"
                            v-else
                          >
                            <i class="fas fa-star"></i>
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- start pager  -->
            <div class="text-center">
              <button class="btn butn" v-on:click="upNumber">
                Show more
              </button>
            </div>

            <!-- end pager  -->
          </div>
          <!--  end blog left-->

          <!--  start blog right-->
          <div class="col-lg-4 col-md-12">
            <div class="side-bar padding-30px md-no-padding-left">
              <div
                class="widget search padding-30px-all md-padding-20px-all shadow-theme"
              >
                <div class="d-flex justify-content-center input-group mb-3">
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

                  <div class="widget-list no-margin text-center">
                    <v-date-picker v-model="date" mode="single" is-inline />
                    <button
                      class="btn btn-primary text-center"
                      v-on:click="resetDate"
                    >
                      Reset Calendar
                    </button>
                  </div>
                </div>
              </div>

              <div
                class="widget padding-30px-all md-padding-20px-all shadow-theme"
              >
                <div class="widget-title margin-35px-bottom">
                  <h3 class="heading">Tags</h3>
                </div>
                <ul class="tags no-margin-bottom" id="check-buttons">
                  <li v-for="tag in tags" class="tag-btn">
                    <input
                      v-model="selectedTags"
                      :value="tag"
                      type="checkbox"
                      id="toggle"
                      class="chk-btn"
                    /><a class="bc" for="toggle" href="jvascript:void(0)">{{
                      tag.name
                    }}</a>
                  </li>
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
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
import moment from "moment";
import { DatePicker } from "v-calendar";
export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
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
      showNumber: 10,
    };
  },
  computed: {
    filteredByTag() {
      return this.getByTag(this.events, this.selectedTags);
    },
  },
  watch: {
    date: function() {
      this.formattedDate = moment(this.date).format("YYYY-MM-DD");
      // console.log("test");
    },
  },
  created: function() {
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
    resetDate() {
      this.date = new Date();
      // this.formattedDate = null;
      setTimeout(() => (this.formattedDate = null), 500);
      console.log(this.user_id);
    },
    toggleFavorite: function(event) {
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
    upNumber: function() {
      this.showNumber += 10;
      console.log(this.showNumber);
    },
  },
};
</script>
