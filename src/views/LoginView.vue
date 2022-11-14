<template>
  <nav>
    <router-link to="/">retour</router-link>
  </nav>
  <img alt="Vue logo" src="../assets/logo.png">
  <div class="login-contener">
    <form class="login" @submit.prevent="login">
      <label for="email">email :</label>
      <input class="input-email" v-model="email" />

      <label for="password">mot de passe :</label>
      <input class="input-password" v-model="password" placeholder="(au moins 8 caractères)" />

      <Button type="submit" :buttonText="buttonText" />
    </form>
  </div>
</template>
  
<script>
import axios from 'axios';

import Button from '@/components/Button.vue';
export default {
  name: 'LoginView',
  components: {
    Button,
  },
  data() {
    return {
      buttonText: "Se connecter",
    };
  },
  methods: {
    login() {
      axios.post('http://localhost:3000/api/auth/login', {
        'email': this.email,
        'password': this.password
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
};
</script>
  
<style scoped lang="scss">
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #4E5166;

    &.router-link-exact-active {
      color: #FD2D01;
    }
  }
}

.login-contener {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  height: 300px;
  width: 800px;
  border: 1px solid #FD2D01;
}
</style>