<!-- Reusable component representing a single freet and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
    <article
      class="mute"
    >
      <header>
        <p v-if="mute.phrase">Muted phrase: {{ mute.phrase }}</p>
        <p v-if="mute.account">Muted account: {{ mute.account }}</p>
        <p v-if="mute.circlename"> Muted circle: {{ mute.circlename }}</p>
        <p v-if="mute.startTime">Mute start time: {{ mute.startTime }}</p>
        <p v-if="mute.endTime">Mute end time: {{ mute.endTime }}</p>
        <p v-if="mute.durationEnd">Mute expiration date: {{mute.durationEnd}}</p>
        <p v-else>Mute expiration date: never</p>
        <div
          v-if="$store.state.username"
          class="actions"
        >
          <button @click="deleteMute">
            ❌ Delete
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
    name: 'MuteComponent',
    props: {
      // Data from the stored following
      mute: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        alerts: {} // Displays success/error messages encountered during freet modification
      };
    },
    computed: {
        muteDuration() {
            if (this.mute.durationEnd){
                return 'HERE'
            }
            return "NOT"
        }
    },
    methods: {
      deleteMute() {
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
          const r = await fetch(`/api/mutes/${this.mute._id}`, options);
          if (!r.ok) {
            const res = await r.json();
            throw new Error(res.error);
          }
  
        //   this.$store.commit('refreshCirclenames');
          location.reload()
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
  .mute {
      border: 1px solid #111;
      padding: 20px;
      position: relative;
  }
  </style>  