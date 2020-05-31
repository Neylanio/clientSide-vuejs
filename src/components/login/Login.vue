<template>
  <div>
    <h1>Login</h1>
    <div>
      <label>Username:</label>
      <input type="text" v-model="username" />
    </div>
    <div>
      <label>Password:</label>
      <input type="password" autocomplete="new-password" v-model="password" />
    </div>
    <button @click="doLogin(username, password)">Login</button>
  </div>
</template>

<script>
import { doLoginApi } from "../../services/api.js";

export default {
  data() {
    return {
      username: "registered_user1",
      password: "111"
    };
  },
  methods: {
    doLogin(username, password) {
      doLoginApi(username, password).then(
        result => {
          localStorage.token = result.data.token;
          this.$router.push({ name: "listTaskgroup" });
        },
        error => console.log(error.response.data.error_message)
      );
    }
  }
};
</script>
