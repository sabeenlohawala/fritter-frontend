import Vue from 'vue';
import VueRouter from 'vue-router';
import FreetsPage from './components/Freet/FreetsPage.vue';
import FollowersPage from './components/Followers/FollowersPage.vue';
import FollowingPage from './components/Following/FollowingPage.vue';
import AccountPage from './components/Account/AccountPage.vue';
import LoginPage from './components/Login/LoginPage.vue';
import NotFound from './NotFound.vue';

import FeedPage from './components/Feed/FeedPage.vue';

Vue.use(VueRouter);

const routes = [
  {path: '/', name: 'Home', component: FreetsPage},
  {path: '/feed', name: 'Feed', component: FeedPage},
  {path: '/followers', name: 'Followers', component: FollowersPage},
  {path: '/following', name: 'Following', component: FollowingPage},
  {path: '/account', name: 'Account', component: AccountPage},
  {path: '/login', name: 'Login', component: LoginPage},
  {path: '*', name: 'Not Found', component: NotFound}
];

const router = new VueRouter({routes});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from, next) => {
  if (router.app.$store) {
    if (to.name === 'Login' && router.app.$store.state.username) {
      next({name: 'Account'}); // Go to Account page if user navigates to Login and are signed in
      return;
    }

    if (to.name === 'Account' && !router.app.$store.state.username) {
      next({name: 'Login'}); // Go to Login page if user navigates to Account and are not signed in
      return;
    }

    if (to.name === 'Feed' && !router.app.$store.state.username) {
      next({name: 'Home'}); // Go to Login page if user navigates to Account and are not signed in
      return;
    }

    if (to.name === 'Followers' && !router.app.$store.state.username){
      next({name: 'Home'});
    }

    if (to.name === 'Following' && !router.app.$store.state.username){
      next({name: 'Home'});
    }
  }

  next();
});

export default router;
