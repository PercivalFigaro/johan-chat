<script>
import { userStore } from '@/stores/user';
import UserMessage from '@/components/UserMessage.vue';

export default {
  components: {
    UserMessage,
  },
  data() {
    return {
      user: userStore().user,
      messages: userStore().messages,
    };
  },
  computed: {
    userName() {
      if (
        this.user &&
        Object.keys(this.user).length === 0 &&
        Object.getPrototypeOf(this.user) === Object.prototype
      ) {
        return 'you are not logged in.';
      } else {
        return this.user.record.username;
      }
    },
  },
  async mounted() {
    await userStore().fetchMessages();
  },
};
</script>

<template>
  <div>
    <h1>Hello, {{ userName }}</h1>
  </div>
  <div v-if="messages.length > 0">
    <UserMessage
      v-for="message in messages"
      :key="message.id"
      :author="message.expand.user.username"
      :content="message.text"
    />
  </div>
</template>
