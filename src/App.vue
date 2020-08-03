<template>
  <div id="app">

    <!-- start header section -->
    <header>
      <div class="navbar-default">
        <!-- start top search -->
        <div class="top-search bg-theme">
          <div class="container">
            <form class="search-form" action="search.html" method="GET" accept-charset="utf-8">
              <div class="input-group">
                <span class="input-group-addon cursor-pointer">
                  <button class="search-form_submit fas fa-search font-size18 text-white" type="submit"></button>
                </span>
                <input type="text" class="search-form_input form-control" name="s" autocomplete="off" placeholder="Type & hit enter...">
                <span class="input-group-addon close-search"><i class="fas fa-times font-size18 margin-10px-top"></i></span>
              </div>
            </form>
          </div>
        </div>
        <!-- end top search -->

        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-12">
              <div class="menu_area">
                <nav class="navbar navbar-expand-lg navbar-light no-padding">

                  <div class="navbar-header navbar-header-custom">
                    <!-- start logo -->
                    <a href="index.html" class="navbar-brand width-200px sm-width-180px xs-width-150px"><img id="logo" src="img/logos/logo.png" alt="logo"></a>
                    <!-- end logo -->
                  </div>

                  <div class="navbar-toggler"></div>

                  <!-- start menu area -->
                  <ul class="navbar-nav ml-auto" id="nav" style="display: none;">
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/about">About</router-link></li>
                    <li><router-link v-if="isLoggedIn()" to="/events/new">Submit Event</router-link></li>
                    <li><router-link v-if="!isLoggedIn()" to="/signup">Signup</router-link></li>
                    <li><router-link v-if="!isLoggedIn()" to="/login">Login</router-link></li>
                    <li><router-link v-if="isLoggedIn()" to="/logout">Logout</router-link></li>
                    <li><router-link v-if="isLoggedIn()" v-bind:to="`/users/${getUserId()}`">User Profile</router-link></li>
                  </ul>
                  <!-- end menu area -->

                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- end header section -->

    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-if="isLoggedIn()" to="/events/new">Submit Event</router-link>
      <router-link v-if="!isLoggedIn()" to="/signup">Signup</router-link> |
      <router-link v-if="!isLoggedIn()" to="/login">Login</router-link> 
      <router-link v-if="isLoggedIn()" to="/logout">Logout</router-link> |
      <router-link v-if="isLoggedIn()" v-bind:to="`/users/${getUserId()}`">User Profile</router-link>
    </div> -->
    
    <router-view/>

    <!-- start footer section -->
    <footer class="bg-light">
      <div class="padding-90px-top md-padding-70px-top sm-padding-50px-top">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-sm-6 sm-margin-40px-bottom">
              <img src="img/logos/logo.png" class="width-70" alt="" />
            </div>

            <div class="col-lg-2 col-sm-6 sm-margin-40px-bottom">
              <h3 class="footer-title-style1">Pages</h3>
              <ul class="list-style-1 no-margin-bottom">
                <li><a href="#!">Contact</a></li>
                <li><a href="#!">About Us</a></li>
                <li><a href="#!">portfolio</a></li>
              </ul>
            </div>

            <div class="col-lg-3 col-sm-6 mobile-margin-40px-bottom">
              <div class="padding-50px-left sm-no-padding-left">
                <h3 class="footer-title-style1">Link</h3>
                <ul class="list-style-1 no-margin-bottom">
                  <li><a href="#!">Terms Of Service</a></li>
                  <li><a href="#!">Privacy Policy</a></li>
                  <li><a href="#!">Service</a></li>
                </ul>
              </div>
            </div>
            <div class="col-lg-4 col-sm-6">
              <div class="padding-30px-left sm-no-padding-left">
                <h3 class="footer-title-style1">Subscribe</h3>
                <form class="rounded-pill newsletter-form">
                  <div class="input-group">
                    <input type="email" class="form-control pl-0" name="email" placeholder="Enter your email address">
                    <div class="input-group-append">
                      <button class="btn btn-white text-primary" type="submit"><i class="fas fa-arrow-right"></i></button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="padding-30px-bottom margin-60px-top row">
            <div class="col-12">
              <div class="float-left xs-width-100 text-center xs-margin-5px-bottom">
                <ul class="social-links no-margin">
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
                    <a href="javascript:void(0)"><i class="fab fa-linkedin-in"></i></a>
                  </li>
                  <li>
                    <a href="javascript:void(0)"><i class="fab fa-dribbble"></i></a>
                  </li>
                </ul>
              </div>
              <div class="float-right xs-width-100 text-center">
                <p class="text-medium-gray margin-5px-top xs-no-margin-top">&copy; 2020 Live is Powered by Chitrakoot Web</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <!-- end footer section -->
  </div>
</template>

<style>
</style>

<script>
export default {
  data: function () {
    return {
      flashMessage: "",
      userId: "",
    };
  },
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
  },
};
</script>
