<template>

  <HeaderLoginSignup />

  <div class="login-contener">
    <form class="login" @submit.prevent="login">
      <label for="email">votre email :</label>
      <input class="input-email" v-model="email" />

      <label for="password">votre mot de passe :</label>
      <input class="input-password" v-model="password" placeholder="(au moins 8 caractères)" />

      <p>Identifiants oubliés ?
      <br/>Merci de prendre contact avec le service informatique.</p>

      <Button type="submit" :buttonText="buttonText" />
    </form>
  </div>
</template>
  
<script>
import axios from 'axios';
import HeaderLoginSignup from '@/components/HeaderLoginSignup.vue';
import Button from '@/components/Button.vue';

export default {
  name: 'LoginView',
  components: {
    Button,
    HeaderLoginSignup
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
          const user = response.data;
          localStorage.setItem('user', JSON.stringify(user));
        })
        .then(() => { this.$router.push('/publications') })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
};
</script>
  
<style scoped lang="scss">
@import '@/assets/index.scss';


.login-contener {

  height: 300px;
  width: 100%;

  form {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;

    input {
      margin-top: 10px;
      height: 30px;
      width: 300px;
    }

    .input-email {
      margin-bottom: 20px;
    }

    p {
      font-size: 12px;
      margin-bottom: 30px;
    }
  }
}
</style>