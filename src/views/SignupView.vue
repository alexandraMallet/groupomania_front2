<template>
    <nav>
      <router-link to="/">retour</router-link>
    </nav>
    <img alt="Vue logo" src="../assets/logo.png">
    <form class="signup-form">
      <InputEmail />
  
      <InputPassword />
  
      <label for="pseudo">Choisissez un pseudo :</label>
      <input class="pseudo"/>
  
      <label class="avatar-label" for="avatar">Choisissez une photo pour votre avatar :</label>
      <input type="file" class="avatar-input" name="avatar" accept="image/png, image/jpeg">
      <!-- <button @click="file.click()">Le contenu personnalisé de ton bouton</button>  -->
  
      <Button :buttonText="buttonText" />
    </form>
  </template>
    
  <script>
  import InputEmail from '@/components/InputEmail.vue';
  import InputPassword from '@/components/InputPassword.vue';
  import Button from '@/components/Button.vue';
  export default {
    name: 'SignupView',
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
        buttonText: "S'inscrire",
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
    text-align: center;
    align-items: center;
    height: 400px;
    width: 800px;
    border: 1px solid #FD2D01;
  }
  .signup-form :nth-child(2n) {
    margin-bottom: 10px;
    height: 50px;
  }
  .signup-form input[type=file] {
    height: 30px;
    width: 100px;
    display: flex;
    text-align: center;
    background-color: #FD2D01;
    color: #4E5166;
    border-radius: 50px;
    border: none;
    margin: 20px;
  }
  // .avatar-input {
  //   height: 30px;
  //   width: 100px;
  //   display: flex;
  //   text-align: center;
  //   background-color: #FD2D01;
  //   color: #4E5166;
  //   border-radius: 50px;
  //   border: none;
  //   margin: 20px;
  // }
  </style>