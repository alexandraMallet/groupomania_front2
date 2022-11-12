<template>
    <nav>
        <router-link to="/">retour</router-link>
    </nav>
    <img alt="Vue logo" src="../assets/logo.png">
    <div class="login-contener">
        <InputEmail/>
        <InputPassword/>
        <Button :buttonText="buttonText"/>
    </div>
  </template>
  
  <script>
  import InputEmail from '@/components/InputEmail.vue';
  import InputPassword from '@/components/InputPassword.vue';
  import Button from '@/components/Button.vue';
  export default {
    name: 'LoginView',
    props: {
      buttonText: {
        type: String,
        required: true,
      }
    },
    components: {
        InputEmail,
        InputPassword,
        Button,
    },
    data() {
        return {
            buttonText: "Se connecter",
        };
    },
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