<template>
  <div id="nav">
    <input type="text" v-model="username" />
    <router-link :to="{ path: '/user/' + this.username }">
      <button>Join</button></router-link
    >
  </div>
</template>

<script>
export default {
  name: "Join",
  components: {},
  data: function () {
    return {
      username: "",
    };
  },
};
</script>
