<!-- Default page that also displays freets -->

<template>
    <main>
      <section v-if="$store.state.username">
        <header>
          <h2>Welcome @{{ $store.state.username }}!</h2>
        </header>
        <CreateFreetForm />
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
            to view your feed.
          </h3>
        </article>
      </section>
      <section v-if="$store.state.username">
        <header>
          <div class="left">
            <h2>
              Viewing feed
              <!-- <span v-if="$store.state.filter">
                by @{{ $store.state.filter }}
              </span> -->
            </h2>
          </div>
        </header>
        <section
          v-if="$store.state.feed.length"
        >
          <FreetComponent
            v-for="freet in $store.state.feed"
            :key="freet.id"
            :freet="freet"
          />
        </section>
        <article
          v-else
        >
          <h3>No freets found.</h3>
        </article>
      </section>
    </main>
  </template>
  
  <script>

  import FreetComponent from '@/components/Freet/FreetComponent.vue';
  import CreateFreetForm from '@/components/Freet/CreateFreetForm.vue';
  
  export default {
    name: 'FeedPage',
    components: {FreetComponent, CreateFreetForm},
    // data:{
    //   feed:[]
    // },
    async mounted() {
      const url = `/api/feeds`;
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.$store.commit('updateFilter', this.value);
        this.$store.commit('updateFeed', res);
      } catch (e) {
        // if (this.value === this.$store.state.filter) {
        //   // This section triggers if you filter to a user but they
        //   // change their username when you refresh
        //   this.$store.commit('updateFilter', null);
        //   this.value = ''; // Clear filter to show all users' freets
        //   this.$store.commit('refreshFeed');
        // } else {
        //   // Otherwise reset to previous fitler
        //   this.value = this.$store.state.filter;
        // }

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

  h2 {
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    color: #7e61b9;
  }
  </style>
  