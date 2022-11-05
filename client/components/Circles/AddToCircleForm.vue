<!-- Form for creating freets (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'AddToCircleForm',
  mixins: [BlockForm],
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
      callback: () => {
        const message = 'Successfully added user to circle!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
