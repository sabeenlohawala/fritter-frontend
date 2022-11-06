<!-- A basic navigation bar component -->
<!-- Example of a component which is included on all pages (via App.vue) -->
<!-- This navbar takes advantage of both flex and grid layouts for positioning elements; feel free to redesign as you see fit! -->

<template>
  <nav>
    <div class="left">
      <img src="../../public/logo.svg">
      <h1 class="title">
        Fritter
      </h1>
    </div>
    <div class="right">
      <router-link 
        v-if="$store.state.username"
        to="/feed"
      >
        Feed
      </router-link>
      <router-link to="/">
        Browse
      </router-link>
      <router-link 
        v-if="$store.state.username"
        to="/followers"
      >
        Followers
      </router-link>
      <router-link 
        v-if="$store.state.username"
        to="/following"
      >
        Following
      </router-link>
      <router-link 
        v-if="$store.state.username"
        to="/circles"
      >
        Circles
      </router-link>
      <router-link 
        v-if="$store.state.username"
        to="/mutes"
      >
        Mutes
      </router-link>
      <router-link
        v-if="$store.state.username"
        to="/account"
      >
        Account
      </router-link>
      <router-link
        v-else
        to="/login"
      >
        Login
      </router-link>
    </div>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in $store.state.alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </nav>
</template>

<style scoped>
nav {
    padding: 1.5vw 2vw;
    background-color: #c3b0e6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

.title {
    font-size: 32px;
    margin: 0 5px;
}

img {
    height: 32px;
}

.left {
	display: flex;
	align-items: center;
}

.right {
    font-size: 20px;
    display: grid;
    gap: 16px;
    grid-auto-flow: column;
    align-items: center;
    font-family:Verdana, Geneva, Tahoma, sans-serif
}

.right a {
    margin-left: 5px;
}

.alerts {
    width: 25%;
}

h1 {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
