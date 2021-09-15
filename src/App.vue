<template>
  <div id="app">
    <h2>Chat</h2>
    <p>{{ userid }}</p>
    <input v-model="message" />
    <button v-on:click="sendMessage('hello')">Send Message</button>
    <p v-for="message in messages" :key="message">{{ message.message }}</p>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "App",
  components: {},
  data: function () {
    return {
      message: "",
      messages: [],
      counter: 0,
      socket: null,
      userid: null,
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
    this.socket.on("MESSAGE", (data) => {
      this.messages = [...this.messages, data];
    });
    //this.socket.on("new user")
    this.socket.on("userid", (userid) => {
      if (this.userid == null) {
        this.userid = userid;
      }
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
