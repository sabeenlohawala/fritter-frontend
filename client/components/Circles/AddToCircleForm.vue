<!-- Reusable component representing a form in a block style -->
<!-- This is just an example; feel free to define any reusable components you want! -->

<template>
  <form @submit.prevent="submit">
    <h3>{{ title }}</h3>
    <p>You must either follow or be followed by a user to add them to a Circle.</p>
    <article
      v-if="fields.length"
    >
      <div
        v-for="field in fields"
        :key="field.id"
      >
        <label :for="field.id">{{ field.label }}:</label>
        <textarea
          v-if="field.id === 'content'"
          :name="field.id"
          :value="field.value"
          @input="field.value = $event.target.value"
        />
        
        <input
          v-else
          :type="field.id === 'password' ? 'password' : 'text'"
          :name="field.id"
          :value="field.value"
          @input="field.value = $event.target.value"
        >
      </div>
    </article>
    <article v-else>
      <p>{{ content }}</p>
    </article>
    <button
      type="submit"
    >
      {{ title }}
    </button>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </form>
</template>

<script>
// import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'AddToCircleForm',
  data() {
    return {
      url: '/api/circles/',
      method: 'POST',
      hasBody: true,
      containsName: true,
      fields: [
      {id: 'circlename', label: 'Circlename', value: `${this.$route.params.circlename}`},
      {id: 'username', label: 'Username', value: ''},
      ],
      title: 'Add user to circle',
      refreshCirclenames: true,
      alerts: {}, // Displays success/error messages encountered during form submission
      callback: () => {
        const message = 'Successfully added user to circle!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  },
  methods: {
    async submit() {
      /**
        * Submits a form with the specified options from data().
        */
      const options = {
        method: this.method,
        headers: {'Content-Type': 'application/json'},
        credentials: 'same-origin' // Sends express-session credentials with request
      };
      if (this.hasBody) {
        options.body = JSON.stringify(Object.fromEntries(
          this.fields.map(field => {
            const {id, value} = field;
            field.value = '';
            return [id, value];
          })
        ));
      }

      try {
        // console.log(options)
        const r = await fetch(this.url, options);
        if (!r.ok) {
          // If response is not okay, we throw an error and enter the catch block
          const res = await r.json();
          throw new Error(res.error);
        }

        if(this.refreshCirclenames){
          this.$store.commit('refreshCirclenames');
        }

        if (this.callback) {
          this.callback();
        }
        this.$emit('add-member', JSON.parse(options.body)["username"]);
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

<!-- <script>
export default {
  name: 'BlockForm',
  data() {
    /**
     * Options for submitting this form.
     */
    return {
      url: '', // Url to submit form to
      method: 'GET', // Form request method
      hasBody: false, // Whether or not form request has a body
      setUsername: false, // Whether or not stored username should be updated after form submission
      refreshFreets: false, // Whether or not stored freets should be updated after form submission
      refreshFeed: false, // Whether or not stored freets should be updated after form submission
      refreshFollowers:false,
      refreshFollowing:false,
      refreshCirclenames:false,
      alerts: {}, // Displays success/error messages encountered during form submission
      callback: null // Function to run after successful form submission
    };
  },
  methods: {
    async submit() {
      /**
        * Submits a form with the specified options from data().
        */
      const options = {
        method: this.method,
        headers: {'Content-Type': 'application/json'},
        credentials: 'same-origin' // Sends express-session credentials with request
      };
      if (this.hasBody) {
        options.body = JSON.stringify(Object.fromEntries(
          this.fields.map(field => {
            const {id, value} = field;
            field.value = '';
            return [id, value];
          })
        ));
      }

      try {
        // console.log(options.body)
        const r = await fetch(this.url, options);
        if (!r.ok) {
          // If response is not okay, we throw an error and enter the catch block
          const res = await r.json();
          throw new Error(res.error);
        }

        if (this.setUsername) {
          const text = await r.text();
          const res = text ? JSON.parse(text) : {user: null};
          this.$store.commit('setUsername', res.user ? res.user.username : null);
        }

        if (this.refreshFreets) {
          this.$store.commit('refreshFreets');
        }

        if (this.refreshFeed) {
          this.$store.commit('refreshFeed');
        }

        if (this.refreshFollowers) {
          this.$store.commit('refreshFollowers');
        }

        if (this.refreshFollowing) {
          this.$store.commit('refreshFollowing');
        }

        if(this.refreshCirclenames){
          this.$store.commit('refreshCirclenames');
        }

        if (this.callback) {
          this.callback();
        }
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script> -->

<style scoped>
form {
  /* border: 1px solid #111; */
  box-shadow: 0 2px 6px 0 rgba(0,0,0,0.2);
  border-radius: 6px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 14px;
  position: relative;
  background-color: white;
}

article > div {
  display: flex;
  flex-direction: column;
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  font-size:0.8em;
}

form > article p {
  margin: 0;
}

form h3,
form > * {
  margin: 0.3em 0;
}

form h3 {
  margin-top: 0;
  color: #7e61b9;
  font-family:Verdana, Geneva, Tahoma, sans-serif;
}

textarea {
  border: 1px solid black;
  border-radius: 6px;
  font-family: inherit;
  font-size: inherit;
}

input {
  border:1px solid black;
  border-radius: 6px;
}

button:hover{
  background-color: #b49de3; /* Green */
  border-radius: 6px;
  /* border: 2px solid black; */
  color: white;
  padding: 10px 5px;
  margin:1px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.8em;
}

button {
  background-color: white; /* Green */
  border: 2px solid #b49de3;
  color: #7e61b9;;
  border-radius: 6px;
  padding: 10px 5px;
  margin:1px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.8em;
}

p {
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    font-size: 0.8em;
}
</style>

