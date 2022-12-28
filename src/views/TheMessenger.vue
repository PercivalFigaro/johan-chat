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
      newMessage: '',
      errorMessage: '',
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
    theMessages() {
      if (userStore()) {
        return userStore().messages;
      } else {
        return null;
      }
    },
    userIsLoggedIn() {
      return userStore().userIsLoggedIn;
    },
  },
  async created() {
    await userStore().fetchMessages();
  },
  async mounted() {
    await pb
      .collection('messages')
      .subscribe('*', async ({ action, record }) => {
        if (action === 'create') {
          const user = await pb.collection('users').getOne(record.user);
          record.expand = { user };
          await userStore().fetchMessages();
        }
      });
  },
  async unmounted() {
    await pb.collection('messages').unsubscribe();
  },
  methods: {
    async sendNewMessage() {
      try {
        const data = {
          text: this.newMessage,
          user: this.user.record.id,
        };
        await pb.collection('messages').create(data);
        this.newMessage = '';
        this.errorMessage = '';
      } catch (error) {
        if (
          error.data.data?.text?.message ===
          'Must be less than 280 character(s).'
        ) {
          this.errorMessage = 'Message must be less than 280 characters!';
        }
      }
    },
  },
};
</script>

<template>
  <div>
    <h1 v-if="userName" class="text-center mt-3">Hello, {{ userName }}</h1>
    <div v-else class="mt-3">
      <h4 class="text-center">To see the messages, log in.</h4>
    </div>
  </div>
  <!-- User messages -->
  <div style="height: 75vh" class="overflow-auto d-flex flex-column-reverse">
    <div v-if="theMessages && userIsLoggedIn">
      <UserMessage
        v-for="message in theMessages"
        :key="message.id"
        :author="message.expand.user.username"
        :currentUser="userName"
        :content="message.text"
      />
    </div>
  </div>
  <div v-if="userIsLoggedIn" class="text-center m-3">
    <input type="text" v-model="newMessage" @keyup.enter="sendNewMessage" />
    <button type="submit" @click.prevent="sendNewMessage">Send</button>
  </div>
  <div v-if="errorMessage" class="text-center" style="color: red">
    {{ errorMessage }}
  </div>
</template>
