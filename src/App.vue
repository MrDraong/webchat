<template>
  <div id="app">
    <router-view></router-view>
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
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>