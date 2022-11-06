<!-- Reusable component representing a single freet and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
    <article
      class="circlename"
    >
      <header>
        <h3 class="name">
          {{ circlename }}
        </h3>
        <div
          v-if="$store.state.username"
          class="actions"
        >
          <button @click="deleteCircle">
            ❌ Delete
          </button>
          <button @click="viewCircle">
            View
          </button>
        </div>
      </header>
      <section class="alerts">
        <article
          v-for="(status, alert, index) in alerts"
          :key="index"
          :class="status"
        >
          <p>{{ alert }}</p>
        </article>
      </section>
    </article>
  </template>
  
  <script>
  
  export default {
    name: 'CircleNameComponent',
    props: {
      // Data from the stored following
      circlename: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        alerts: {} // Displays success/error messages encountered during freet modification
      };
    },
    methods: {
      deleteCircle() {
        /**
         * Deletes this freet.
         */
        const params = {
          method: 'DELETE',
          callback: () => {
            this.$store.commit('alert', {
              message: 'Successfully deleted!', status: 'success'
            });
          }
        };
        this.request(params);
      },
      viewCircle(){
        this.$router.push({name: 'CircleMembers', params: { circlename: this.circlename }});
      },
      async request(params) {
        /**
         * Submits a request to the follower's endpoint
         * @param params - Options for the request
         * @param params.body - Body for the request, if it exists
         * @param params.callback - Function to run if the the request succeeds
         */
        const options = {
          method: params.method, headers: {'Content-Type': 'application/json'}
        };
        if (params.body) {
          options.body = params.body;
        }
  
        try {
          const r = await fetch(`/api/circles/${this.circlename}`, options);
          if (!r.ok) {
            const res = await r.json();
            throw new Error(res.error);
          }
  
          this.$store.commit('refreshCirclenames');
  
          params.callback();
        } catch (e) {
          this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .circlename {
    padding: 10px;
    position: relative;
    box-shadow: 0 2px 6px 0 rgba(0,0,0, 0.2);
    border-radius: 6px;
    background-color: white;
    margin:2px;
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

h3 {
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  padding: 0px;
  font-size: 1em;
  color: #7e61b9;
}
  </style>  