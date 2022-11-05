<!-- Default page that also displays freets -->

<template>
    <main>
      <section v-if="$store.state.username">
        <header>
          <h2>{{this.$route.params.circlename}} Circle</h2>
        </header>
        <button @click="backToAllCircles">
            BACK
          </button>
        <AddToCircleForm />
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
              Viewing all members
            </h2>
          </div>
        </header>
        <section
          v-if="this.circleMembers.length"
        >
          <CircleMemberComponent
            v-for="member in this.circleMembers"
            :key="member.id"
            :member="member"
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
  import CircleMemberComponent from '@/components/Circles/CircleMemberComponent.vue';
  import AddToCircleForm from '@/components/Circles/AddToCircleForm.vue';
  
  export default {
    name: 'CircleMembersPage',
    components: {CircleMemberComponent, AddToCircleForm},
    data() {
        return{circleMembers:[],}
    },
    methods:{
        backToAllCircles(){
            this.$router.push({name: 'Circles'});
        }
    },
    async mounted() {
        const url = `/api/circles?circlename=${this.$route.params.circlename}`;
        try {
            const r = await fetch(url,{method: 'GET'});
            const res = await r.json();
            if (!r.ok) {
            throw new Error(res.error);
            }
            console.log()
            for (const item of res){
                this.circleMembers.push(item.member);
            }
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
  