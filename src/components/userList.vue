<template>
  <aside>
    <h1>Users & Rooms</h1>
    <p v-for="user in list" :key="user.id">
      <span v-if="user.username == 'this.myUsername'">me </span
      >{{ user.username }}
    </p>
  </aside>
</template>

<script>
export default {
  name: "userList",
  components: {},
  props: {
    list: [],
    myUsername: null,
  },
  data: function () {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>
<style>
aside {
  align-self: right;
}
</style>