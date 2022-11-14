<template>
    <nav>
      <router-link to="/">retour</router-link>
    </nav>
    <img alt="Vue logo" src="../assets/logo.png">
    <form class="signup-form">
      <label for="email">email :</label>
      <input class="input-email" v-model="email" />

      <label for="password">mot de passe :</label>
      <input class="input-password" v-model="password" placeholder="(au moins 8 caractères)" />

      <InputFile :inputFileText="inputFileText"/>
  
      <label for="pseudo">Choisissez un pseudo :</label>
      <input class="pseudo"/>
  
      <Button :buttonText="buttonText" />
    </form>
  </template>
    
  <script>
  
  import InputFile from '@/components/InputFile.vue';
  import Button from '@/components/Button.vue';

  export default {
    name: 'SignupView',
    components: {
      InputFile,
      Button,
    },
    data() {
      return {
        buttonText: "S'inscrire",
        inputFileText: "Choisissez une photo de profil :"
      };
    },
  };
  </script>
    
  <style scoped lang="scss">
  @import '@/assets/index.scss';

  nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: $color-tertiary;
      &.router-link-exact-active {
        color: $color-primary;
      }
    }
  }
  .signup-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 400px;
    width: 800px;
    border: 1px solid $color-primary;
  }
  .signup-form :nth-child(2n) {
    margin-bottom: 10px;
  }
 
  </style>