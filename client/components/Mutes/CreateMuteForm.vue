<!-- Reusable component representing a form in a block style -->
<!-- This is just an example; feel free to define any reusable components you want! -->

<template>
    <form @submit.prevent="submit">
      <h3>{{ title }}</h3>
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
        <div
            v-for="i in [0,1]"
        >
            <label :for="hoursDropdowns[i].id">{{hoursDropdowns[i].label}}:</label>
            <select :name="hoursDropdowns[i].id" :id="hoursDropdowns[i].id">
                <option 
                    v-for="hour in ['',1,2,3,4,5,6,7,8,9,10,11,12]"
                    :name="hoursDropdowns[i].id"
                    :value="hoursDropdowns[i].value"
                    @input="hoursDropdowns[i].value = $event.target.value"
                >{{hour}}</option>
            </select>
            <label :for="minsDropdowns[i].id">{{minsDropdowns[i].label}}:</label>
            <select :name="minsDropdowns[i].id" :id="minsDropdowns[i].id">
                <option 
                    v-for="hour in ['',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59]"
                    :name="minsDropdowns[i].id"
                    :value="minsDropdowns[i].value"
                    @input="minsDropdowns[i].value = $event.target.value"
                >{{hour}}</option>
            </select>
            <label :for="AMPMDropdowns[i].id">{{AMPMDropdowns[i].label}}:</label>
            <select :name="AMPMDropdowns[i].id" :id="AMPMDropdowns[i].id">
                <option
                    v-for="hour in ['AM','PM']"
                    :name="AMPMDropdowns[i].id"
                    :value="AMPMDropdowns[i].value"
                    @input="AMPMDropdowns[i].value = $event.target.value"
                >{{hour}}</option>
            </select>
        </div>
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
  
  export default {
    name: 'CreateMuteForm',
    data() {
      /**
       * Options for submitting this form.
       */
      return {
        url: '/api/mutes', // Url to submit form to
        method: 'POST', // Form request method
        // hasBody: true, // Whether or not form request has a body
        fields:[
            {id: 'phrase', label: 'Word or Phrase', value: ''},
            {id: 'account', label: 'Account', value: ''},
            {id: 'circlename', label: 'Circle name', value: ''},
            {id: 'durationHours', label: 'Duration hours', value: ''},
            {id: 'durationMins', label: 'Duration mins', value: ''},
        ],
        hoursDropdowns:[
            {id: 'startHours', label: 'Start Time Hours', value: ''},
            {id: 'endHours', label: 'End Time Hours', value: ''},
        ],
        minsDropdowns:[
            {id: 'startMins', label: 'Minutes', value: ''},
            {id: 'endMins', label: 'Minutes', value: ''},
        ],
        AMPMDropdowns:[
            {id: 'startAMPM', label: 'AM/PM', value:''},
            {id: 'endAMPM', label: 'AM/PM', value:''}
        ],
        title: 'Create new mute',
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
        // if (this.hasBody) {
        let startHours = ''
        if (this.hoursDropdowns[0].value !== ''){
            startHours = this.AMPMDropdowns[0].value === "AM" ? str(int(this.hoursDropdowns[0].value)%12) : str(int(this.hoursDropdowns[0].value)%12 + 12)
            this.hoursDropdowns[0].value = ''
        }
        let endHours = ''
        if (this.hoursDropdowns[1].value !== ''){
            endHours = this.AMPMDropdowns[1].value === "AM" ? str(int(this.hoursDropdowns[1].value)%12) : str(int(this.hoursDropdowns[1].value)%12 + 12)
            this.hoursDropdowns[1].value = ''
        }
        options.body = JSON.stringify(Object.fromEntries(
        this.fields.map(field => {
            const {id, value} = field;
            field.value = '';
            return [id, value];
        }).concat(this.minsDropdowns.map(field => {
            const {id,value} = field;
            field.value = ''
            return[id,value]
        })).concat([['startHours',startHours],['endHours',endHours]])
        ));
        // }
  
        try {
            console.log(options.body)
          const r = await fetch(this.url, options);
          if (!r.ok) {
            // If response is not okay, we throw an error and enter the catch block
            const res = await r.json();
            throw new Error(res.error);
          }
  
          if (this.callback) {
            this.callback();
          }
          location.reload()
        } catch (e) {
          this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  form {
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
  </style>
  