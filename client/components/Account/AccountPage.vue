<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>Welcome @{{ $store.state.username }}!</h2>
      </header>
    </section>
    <section>
      <button class="profile" @click="viewFollowers">
          Your followers
      </button>
      <button class="profile" @click="viewFollowing">
          Your following
      </button>
      <button class="profile" @click="viewCircles">
          Your circles
      </button>
      <button class="profile" @click="viewMutes">
          Your mutes
      </button>
    </section>
    <section>
      <header>
        <h2>Account settings</h2>
      </header>
      <ChangeUsernameForm />
      <ChangePasswordForm />
    </section>
    <section>
      <header>
        <h2>Account management</h2>
      </header>
      <LogoutForm />
      <DeleteAccountForm />
    </section>
  </main>
</template>

<script>
import ChangeUsernameForm from '@/components/Account/ChangeUsernameForm.vue';
import ChangePasswordForm from '@/components/Account/ChangePasswordForm.vue';
import DeleteAccountForm from '@/components/Account/DeleteAccountForm.vue';
import LogoutForm from '@/components/Account/LogoutForm.vue';

export default {
  name: 'AccountPage',
  components: {
    ChangeUsernameForm,
    ChangePasswordForm,
    DeleteAccountForm,
    LogoutForm
  },
  methods: {
    viewFollowers() {
      this.$router.push({name: 'Followers'});
    },
    viewFollowing() {
      this.$router.push({name: 'Following'});
    },
    viewCircles(){
      this.$router.push({name: 'Circles'});
    },
    viewMutes() {
      this.$router.push({name: 'Mutes'});
    }
  }
};
</script>

<style>
h2 {
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    color: #7e61b9;
  }

button:hover{
  box-shadow: 0 2px 6px 0 rgba(0,0,0, 0.2);
  background-color: #c3b0e6; /* Green */
  border-radius: 6px;
  color: white;
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

.profile{
  display:inline-block;
  align-items:center;
  padding: 15px 10px;
  width:24.75%;
  text-align: center;
  text-decoration: none;
  font-size: 0.8em;
}
</style>