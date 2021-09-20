<template>
  <div class="chat">
    <h1>WebChat</h1>
    <userList v-bind:list="this.users" v-bind:myUsername="this.username" />
  </div>
</template>

<script>
import io from "socket.io-client";
import userList from "../components/userList";
export default {
  name: "Chat",
  components: {
    userList,
  },
  data: function () {
    return {
      message: "",
      socket: null,
      username: "",
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
    this.username = this.$route.params.id;
    this.socket = io("localhost:8080");

    this.socket.emit("join server", this.username);

    this.socket.on("new user", (users) => {
      this.users = users;
    });

    this.socket.on("new message", (data) => {
      this.messages = [...this.messages, data];
    });
  },
};
</script>
