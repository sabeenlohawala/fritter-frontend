<!-- Default page that also displays freets -->

<template>
    <main>
      <section v-if="$store.state.username">
        <header>
          <h2>Your mutes</h2>
        </header>
        <CreateMuteForm />
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
            <!-- <h2>
              Viewing all mutes
            </h2> -->
          </div>
        </header>
        <section
          v-if="$store.state.circlenames.length"
        >
          <MuteComponent
            v-for="mute in this.mutes"
            :key="mute.id"
            :mute="mute"
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
  import MuteComponent from '@/components/Mutes/MuteComponent.vue';
  import CreateMuteForm from '@/components/Mutes/CreateMuteForm.vue';
  
  export default {
    name: 'MutePage',
    components: {MuteComponent, CreateMuteForm},
    data(){
      return {
        mutes: [],
      }
    },
    methods:{
      updateMutes(res){
        this.mutes = res;
      }
    },
    async mounted() {
      const url = `/api/mutes`;
      try {
        const r = await fetch(url,{method: 'GET'});
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
  
        // this.$store.commit('updateCirclenames', res);
        this.updateMutes(res)
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
  
  h2 {
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    color: #7e61b9;
  }
  </style>
  