<template>
  <div class="chat">
    <h1>Chat</h1>
    <p v-for="user in users" :key="user.id">{{ user.name }}</p>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "Chat",
  components: {},
  props: {
    username: String,
  },
  data: function () {
    return {
      message: "",
      socket: null,
      userid: null,
      users: [],
    };
  },
  methods: {
    sendMessage: function () {
      this.socket.emit("SEND_MESSAGE", {
        message: this.message,
      });
      this.message = "";
    },
  },
  mounted() {
    this.socket = io("localhost:8080");
    this.socket.emit("join server", this.username);
    this.socket.on("new user", (users) => {
      this.users = users;
    });

    this.socket.on("new message", (data) => {
      this.messages = [...this.messages, data];
    });

    this.socket.on("userid", (userid) => {
      if (this.userid == null) {
        this.userid = userid;
      }
    });
  },
};
</script>
