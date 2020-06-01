// vue-tasks-client/src/components/login/Login.vue
<template>
  <div>
    <h1>Login</h1>
    <div>
      <label for="username">Username:</label>
      <input type="text" v-model="username" />
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" v-model="password" autocomplete="new-password" />
    </div>
    <button @click="doLogin(username, password)">Login</button>
  </div>
</template>

<script>

import { doLoginApi } from "./../../services/api";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      // username: "registered_user1",
      // password: "111",
      username: "neylanio",
      password: "123456",
      userId: 0
    };
  },
  methods: {
    ...mapMutations(["setUserId"]),
    doLogin(username, password) {
      doLoginApi(username, password).then(
        result => {
          this.userId = result.data.userId;
          this.setUserId(this.userId);
          localStorage.token = result.data.token;
          this.$router.push({ name: "listTaskgroup" });
        },
        error => {
          console.error(error.response.data.error_message);
        }
      );
    }
  }
};
</script>
