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
      border: 1px solid #111;
      padding: 20px;
      position: relative;
  }
  </style>  