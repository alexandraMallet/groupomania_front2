<template>
  <nav>
    <router-link to="/">retour</router-link>
  </nav>
  <img alt="Vue logo" src="../assets/logo.png">
  <form class="signup-form" @submit.prevent="signup">
    <label for="email">email :</label>
    <input class="input-email" v-model="email" />

    <label for="password">Choisissez un mot de passe (au moins 8 caractères, sans espace) :</label>
    <input class="input-password" v-model="password"/>

    <label for="pseudo">Choisissez un pseudo :</label>
    <input class="pseudo" v-model="pseudo"/>

    <label class="image" for="image">Choisissez une photo de profil :</label>
    <div class="style-input">
      <input type="file" class="image-input" name="image" accept="image/png, image/jpeg">
      <Button class="style-button" :buttonText="buttonInputFile" />
    </div>

    <Button :buttonText="buttonText" />
  </form>
</template>
    
<script>

import axios from 'axios'

import Button from '@/components/Button.vue';

export default {
  name: 'SignupView',
  components: {
    Button,
  },
  data() {
    return {
      buttonText: "S'inscrire",
      buttonInputFile: "Parcourir"
    };
  },
  methods: {
    signup() {
      axios.post('http://localhost:3000/api/auth/signup', {
        'email': this.email,
        'password': this.password,
        'pseudo': this.pseudo,
        'file': this.file
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

.style-input {
    position: relative;
    height: 50px;
    width: 700px;

    input {
        position: relative;
        z-index: 2;
        opacity: 0;
    }

    .style-button {
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 1;
    }
}
</style>