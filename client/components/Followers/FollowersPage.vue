<!-- Default page that also displays freets -->

<template>
  <main>
    <section v-if="$store.state.username">
      <header>
        <h2>Welcome @{{ $store.state.username }}</h2>
      </header>
    </section>
    <section v-else>
      <header>
        <h2>Welcome to Fritter!</h2>
      </header>
      <article>
        <h3>
          <router-link to="/login">
            Sign in
          </router-link>
          to view followers.
        </h3>
      </article>
    </section>
    <section>
      <header>
        <div class="left">
          <h2>
            Viewing all followers
          </h2>
        </div>
      </header>
      <section
        v-if="$store.state.followers.length"
      >
        <FollowerComponent
          v-for="follower in $store.state.followers"
          :key="follower.id"
          :follower="follower"
        />
      </section>
      <article
        v-else
      >
        <h3>No followers found.</h3>
      </article>
    </section>
  </main>
</template>

<script>
import FollowerComponent from '@/components/Followers/FollowerComponent.vue';

export default {
  name: 'FollowersPage',
  components: {FollowerComponent},
  async mounted() {
    const url = `/api/follows/followers`;
    try {
      const r = await fetch(url);
      const res = await r.json();
      if (!r.ok) {
        throw new Error(res.error);
      }

      this.$store.commit('updateFollowers', res);
    } catch (e) {

      this.$set(this.alerts, e, 'error');
      setTimeout(() => this.$delete(this.alerts, e), 3000);
    }
  }
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

header, header > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    margin-right: 10px;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}
</style>
