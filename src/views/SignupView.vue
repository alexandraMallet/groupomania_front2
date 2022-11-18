<template>
  <nav>
    <router-link to="/">retour</router-link>
  </nav>
  <img alt="Vue logo" src="../assets/logo.png">
  <form class="signup-form" @submit.prevent="signup">
    <label for="email">email :</label>
    <input class="input-email" v-model="email" />

    <label for="password">Choisissez un mot de passe (au moins 8 caractères, sans espace) :</label>
    <input class="input-password" v-model="password" />

    <label for="pseudo">Choisissez un pseudo :</label>
    <input class="pseudo" v-model="pseudo" />

    <label class="image style-button" for="image">Choisir une photo de profil</label>
    <input type="file" id="image" class="image-input" name="image" accept="image/png, image/jpeg"
      @change="handleFileUpload($event)" />
      
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
      email: '',
      pseudo: '',
      password: '',
      file: ''
    }
  },
  methods: {
    signup() {

      let formData = new FormData();
      formData.append('email', this.email);
      formData.append('pseudo', this.pseudo);
      formData.append('password', this.password);
      formData.append('image', this.file);
      console.log(formData);


      axios.post('http://localhost:3000/api/auth/signup', 
        formData
      )
        .then(function (response) {
          console.log(formData);
          const user = response.data;
          localStorage.setItem('user', JSON.stringify(user));
        })
        .then(() => { this.$router.push('/publications') })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
      console.log(this.file);
    },
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

.image-input {
  display: none;
}

.style-button {
  display: block;
  height: fit-content;
  width: fit-content;
  padding: 10px 20px 10px 20px;
  font-size: 12px;
  background-color: $color-primary;
  color: $color-tertiary;
  border-radius: 50px;
  border: none;
}
</style>