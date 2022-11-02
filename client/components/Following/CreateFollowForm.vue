<!-- Form for creating freets (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateFollowForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/follows/',
      method: 'POST',
      hasBody: true,
      fields: [
      {id: 'username', label: 'Username', value: ''},
      ],
      title: 'Follow user',
      refreshFollowing: true,
      refreshFollowers: true,
      callback: () => {
        const message = 'Successfully followed!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
