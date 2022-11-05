import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various compoentns.
 */
const store = new Vuex.Store({
  state: {
    filter: null, // Username to filter shown freets by (null = show all)
    freets: [], // All freets created in the app
    feed: [], // All freets contained in the user's feed
    followers: [],
    following: [],
    circlenames: [],
    username: null, // Username of the logged in user
    alerts: {} // global success/error messages encountered during submissions to non-visible forms
  },
  mutations: {
    alert(state, payload) {
      /**
       * Add a new message to the global alerts.
       */
      Vue.set(state.alerts, payload.message, payload.status);
      setTimeout(() => {
        Vue.delete(state.alerts, payload.message);
      }, 3000);
    },
    setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
       * @param username - new username to set
       */
      state.username = username;
    },
    updateFilter(state, filter) {
      /**
       * Update the stored freets filter to the specified one.
       * @param filter - Username of the user to fitler freets by
       */
      state.filter = filter;
    },
    updateFreets(state, freets) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.freets = freets;
    },
    updateFeed(state, feed) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.feed = feed;
    },
    async refreshFreets(state) {
      /**
       * Request the server for the currently available freets.
       */
      const url = state.filter ? `/api/users/${state.filter}/freets` : '/api/freets';
      const res = await fetch(url).then(async r => r.json());
      state.freets = res;
    },
    async refreshFeed(state) {
      /**
       * Request the server for the currently available freets in the feed.
       */
      const url = `/api/feeds`;
      const res = await fetch(url).then(async r => r.json());
      state.feed = res;
      console.log(state.feed)
    },
    updateFollowers(state, followers) {
      /**
       * Update the stored followers to the provided followers.
       * @param followers - Followers to store
       */
      state.followers = followers;
    },
    async refreshFollowers(state) {
      /**
       * Request the server for the currently available followers.
       */
      const url = `/api/follows/followers`;
      const res = await fetch(url).then(async r => r.json());
      state.followers = res;
    },
    updateFollowing(state, following) {
      /**
       * Update the stored followers to the provided followers.
       * @param following - Followers to store
       */
      state.following = following;
    },
    async refreshFollowing(state) {
      /**
       * Request the server for the currently available followers.
       */
      console.log('here')
      const url = `/api/follows/following`;
      const res = await fetch(url).then(async r => r.json());
      state.following = res;
    },
    updateCirclenames(state, res) {
      /**
       * Update the stored followers to the provided followers.
       * @param following - Followers to store
       */
      // for (const circle of circlemembers){
      //   if (!state.circlenames.includes(circle.circlename)){
      //     state.circlenames.push(circle.circlename);
      //   }
      // }
      state.circlenames = res;
    },
    async refreshCirclenames(state) {
      /**
       * Request the server for the currently available followers.
       */
      console.log('here')
      const url = `/api/circles/circlenames`;
      const res = await fetch(url, {method: 'GET'}).then(async r => r.json());
      // for (const circle of res){
      //   if (!state.circlenames.includes(circle.circlename)){
      //     state.circlenames.push(circle.circlename);
      //   }
      // }
      state.circlenames = res;
      console.log(state.circlenames);
    },
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;