<script>
import { userStore } from '@/stores/user';
import UserMessage from '@/components/UserMessage.vue';
import pb from '@/main';

export default {
  components: {
    UserMessage,
  },
  data() {
    return {
      user: userStore().user,
      messages: userStore().messages,
      userIsLoggedIn: userStore().userIsLoggedIn,
      newMessage: '',
    };
  },
  computed: {
    userName() {
      if (
        this.user &&
        Object.keys(this.user).length === 0 &&
        Object.getPrototypeOf(this.user) === Object.prototype
      ) {
        return null;
      } else {
        return this.user.record.username;
      }
    },
  },
  async mounted() {
    await userStore().fetchMessages();
    // pb.collection('messages').subscribe('*', async ({ action, record }) => {
    //   if (action === 'create') {
    //     this.messages = [...this.messages, record];
    //     console.log('got here');
    //   }
    // });
  },
  methods: {
    async sendNewMessage() {
      const data = {
        text: this.newMessage,
        user: this.user.record.id,
      };
      await pb.collection('messages').create(data);
    },
  },
};
</script>

<template>
  <div>
    <h1 v-if="userName">Hello, {{ userName }}</h1>
    <div v-else class="mt-3">
      <h4 class="text-center">To see the messages, log in.</h4>
    </div>
  </div>
  <div v-if="messages.length > 0 && userIsLoggedIn">
    <UserMessage v-for="message in messages" :key="message.id" :author="message.expand.user.username"
      :content="message.text" />
  </div>
  <div v-if="userIsLoggedIn" class="m-auto">
    <input type="text" v-model="newMessage" @keyup.enter="sendNewMessage" />
    <button type="submit" @click.prevent="sendNewMessage">Send</button>
  </div>
</template>
