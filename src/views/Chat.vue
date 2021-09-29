<template>
  <div class="chat">
    <h1>WebChat</h1>
    <section class="content">
      <aside>
        <h2>Users</h2>
        <p v-for="user in users" :key="user.id">
          <!--<span v-if="user.username == 'this.clientUsername'">me </span
          >-->{{ user.username }}
        </p>
        <h2>Rooms</h2>
        <a v-on:click="general">General</a>
        <br />
        <a v-on:click="other">Other</a>
      </aside>
      <div class="room">
        <div v-for="msg in messages" :key="msg.id">
          {{ msg.sender }} say : {{ msg.content }}
        </div>
      </div>
    </section>
    <input v-model="message" type="text" />
    <button v-on:click="sendMessage">Send</button>
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
      chatName: "",
    };
  },
  methods: {
    sendMessage: function () {
      this.socket.emit("send message", {
        content: this.message,
        sender: this.clientUsername,
        chatName: this.chatName,
      });
      this.message = "";
    },
    general: function () {
      this.chatName = "general";
      this.socket.emit("join room", this.chatName);
    },
    other: function () {
      this.chatName = "other";
      this.socket.emit("join room", this.chatName);
    },
  },
  mounted() {
    this.clientUsername = this.$route.params.id;
    this.chatName = "general";
    this.socket = io("localhost:3301");

    this.socket.on("new user", (users) => {
      this.users = users;
    });

    this.socket.on("joined", (data) => {
      this.messages = data;
    });

    this.socket.on("new message", (data) => {
      this.messages.push(data);
      console.log(this.messages);
    });
    this.socket.emit("join server", this.clientUsername);
    this.socket.emit("join room", this.chatName);
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