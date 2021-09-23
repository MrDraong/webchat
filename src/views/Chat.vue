<template>
  <div class="chat">
    <h1>WebChat</h1>
    <section class="content">
      <aside>
        <h2>Users</h2>
        <p v-for="user in users" :key="user.id">
          <span v-if="user.username == 'this.clientUsername'">me </span
          >{{ user.username }}
        </p>
        <h2>Rooms</h2>
        <a v-on:click="general">General</a>
        <br />
        <a v-on:click="other">Other</a>
      </aside>
      <div class="room">
        <p v-for="msg in messages" :key="msg.content">
          {{ msg.sender }} say : {{ msg.content }}
        </p>
        <input v-model="message" type="text" />
        <button v-on:click="sendMessage">Send</button>
      </div>
    </section>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "Chat",
  components: {},
  data: function () {
    return {
      message: "",
      messages: [],
      socket: null,
      clientUsername: "",
      users: [],
    };
  },
  methods: {
    sendMessage: function () {
      this.socket.emit("send message", {
        content: this.message,
        to: "general",
        sender: this.clientUsername,
        isChannel: true,
      });
      this.message = "";
    },
    general: function () {
      this.socket.emit("join room", "general");
    },
    other: function () {
      this.socket.emit("join room", "other");
    },
  },
  mounted() {
    this.clientUsername = this.$route.params.id;
    this.socket = io("localhost:3301");

    this.socket.emit("join server", this.clientUsername);

    this.socket.on("new user", (users) => {
      this.users = users;
    });

    this.socket.on("new message", (data) => {
      console.log(data);
      this.messages = [...this.messages, data];
    });

    this.socket.on("joined", (oldMessages) => {
      this.messages = oldMessages;
    });

    this.socket.emit("join room", "general");
  },
};
</script>
<style>
a {
  text-decoration: none;
}
aside {
  width: 30%;
}

.chat {
  width: 100%;
  height: 100%;
}
.room {
  border: 5px double cyan;
  width: 70%;
}
.content {
  height: 80%;
  display: flex;
  flex-direction: row;
}
</style>