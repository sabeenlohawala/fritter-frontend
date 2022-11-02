<!-- Default page that also displays freets -->

<template>
  <main>
    <section v-if="$store.state.username">
      <header>
        <h2>Welcome @{{ $store.state.username }}</h2>
      </header>
      <CreateFollowForm />
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
          to view following.
        </h3>
      </article>
    </section>
    <section v-if="$store.state.username">
      <header>
        <div class="left">
          <h2>
            Viewing all following
          </h2>
        </div>
      </header>
      <section
        v-if="$store.state.following.length"
      >
        <FollowingComponent
          v-for="following in $store.state.following"
          :key="following.id"
          :following="following"
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
import FollowingComponent from '@/components/Following/FollowingComponent.vue';
import CreateFollowForm from '@/components/Following/CreateFollowForm.vue';

export default {
  name: 'FollowingPage',
  components: {FollowingComponent, CreateFollowForm},
  async mounted() {
    const url = `/api/follows/following`;
    try {
      const r = await fetch(url);
      const res = await r.json();
      if (!r.ok) {
        throw new Error(res.error);
      }

      this.$store.commit('updateFollowing', res);
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
