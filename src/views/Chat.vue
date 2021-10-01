<template>
  <div class="chat">
    <h1>WebChat</h1>
    <section class="content">
      <aside>
        <h2>Users</h2>
        <ul>
          <li v-for="user in users" :key="user.id">{{ user.username }}</li>
        </ul>
        <h2>Rooms</h2>
        <a v-on:click="general">General</a>
        <br />
        <a v-on:click="other">Other</a>
      </aside>
      <div class="room">
        <div class="messages">
          <div v-for="msg in messages" :key="msg.id">
            {{ msg.sender }} say : {{ msg.content }}
          </div>
        </div>
        <div class="send">
          <input v-model="message" type="text" />
          <button v-on:click="sendMessage">Send</button>
        </div>
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
      this.socket.emit("leave room", this.chatName);
      this.chatName = "general";
      this.socket.emit("join room", this.chatName);
    },
    other: function () {
      this.socket.emit("leave room", this.chatName);
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
      console.log(this.messages);
    });

    this.socket.on("new message", (data) => {
      this.messages.push(data);
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
a:hover {
  color: wheat;
}
aside {
  font-size: 1.2rem;
  background-color: #b3f5bd;
  color: white;
  width: 20%;
}
ul {
  padding: 0%;
}
li {
  list-style: none;
}

input {
  width: 80%;
  padding: 0%;
}
button {
  width: 15%;
  padding: 0%;
}

.chat {
  width: 100%;
  height: 100%;
}
.room {
  width: 70%;
}
.messages {
  border: 8px double #b3ebf5;
  border-radius: 4%;
  height: 95%;
}
.content {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.send {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>