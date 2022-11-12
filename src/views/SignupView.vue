<template>
    <nav>
      <router-link to="/">retour</router-link>
    </nav>
    <img alt="Vue logo" src="../assets/logo.png">
    <form class="signup-form">
      <InputEmail/>
  
      <InputPassword/>

      <InputFile :inputFileText="inputFileText"/>
  
      <label for="pseudo">Choisissez un pseudo :</label>
      <input class="pseudo"/>
  
      <Button :buttonText="buttonText" />
    </form>
  </template>
    
  <script>
  import InputEmail from '@/components/InputEmail.vue';
  import InputPassword from '@/components/InputPassword.vue';
  import InputFile from '@/components/InputFile.vue';
  import Button from '@/components/Button.vue';

  export default {
    name: 'SignupView',
    components: {
      InputEmail,
      InputPassword,
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
  .signup-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 400px;
    width: 800px;
    border: 1px solid #FD2D01;
  }
  .signup-form :nth-child(2n) {
    margin-bottom: 10px;
  }
 
  </style>