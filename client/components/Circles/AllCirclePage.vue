<!-- Default page that also displays freets -->

<template>
    <main>
      <section v-if="$store.state.username">
        <header>
          <h2>Welcome @{{ $store.state.username }}</h2>
        </header>
        <CreateCircleForm />
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
            to view your circles.
          </h3>
        </article>
      </section>
      <section v-if="$store.state.username">
        <header>
          <div class="left">
            <h2>
              Viewing all circles
            </h2>
          </div>
        </header>
        <section
          v-if="$store.state.circlenames.length"
        >
          <CircleNameComponent
            v-for="circlename in $store.state.circlenames"
            :key="circlename.id"
            :circlename="circlename"
          />
        </section>
        <article
          v-else
        >
          <h3>No circles found.</h3>
        </article>
      </section>
    </main>
  </template>
  
  <script>
  import CircleNameComponent from '@/components/Circles/CircleNameComponent.vue';
  import CreateCircleForm from '@/components/Circles/CreateCircleForm.vue';
  
  export default {
    name: 'AllCirclePage',
    components: {CircleNameComponent, CreateCircleForm},
    async mounted() {
      const url = `/api/circles/circlenames`;
      try {
        const r = await fetch(url,{method: 'GET'});
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
  
        this.$store.commit('updateCirclenames', res);
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
  