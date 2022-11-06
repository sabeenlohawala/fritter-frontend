<!-- Default page that also displays freets -->

<template>
    <main
    >
      <section v-if="$store.state.username">
        <header>
          <h2>Circle: {{this.$route.params.circlename}}</h2>
        </header>
        <button @click="backToAllCircles">
            Back to all circles
          </button>
        <AddToCircleForm @add-member="addMember"/>
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
              Circle members
            </h2>
          </div>
        </header>
        <section
          v-if="this.circleMembers.length"
        >
          <CircleMemberComponent @delete-member="deleteMember"
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
        },
        addMember(member){
          this.circleMembers.push(member);
        },
        deleteMember(member){
          this.circleMembers = this.circleMembers.filter(user => user != member);
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
  
  h2 {
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  color: #7e61b9;
}

h3 {
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  color: #7e61b9;
}

button:hover{
  background-color: #c3b0e6; /* Green */
  border-radius: 6px;
  /* border: 2px solid black; */
  color: white;
  padding: 5px 5px;
  margin:1px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.8em;
}

button {
  background-color: white; /* Green */
  border: 2px solid #c3b0e6;
  color: rgb(126, 97, 185);
  border-radius: 6px;
  padding: 5px 5px;
  margin:1px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.8em;
}
  
  section .scrollbox {
    flex: 1 0 50vh;
    padding: 3%;
    overflow-y: scroll;
  }
  </style>
  