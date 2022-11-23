<template>

  <Header />

  <div v-if="!showSignup" class="login-contener">
    <form class="login" @submit.prevent="login">
      <label for="email">votre email :</label>
      <input class="input-email" v-model="email" />

      <label for="password">votre mot de passe :</label>
      <input class="input-password" v-model="password" />

      <p>Identifiants oubliés ?
        <br />Merci de prendre contact avec le service informatique.
      </p>

      <Button type="submit" :buttonText="buttonTextLogin" />
    </form>
    <div class="redirect-signup">
      <p>Pas encore de compte ?</p>
      <Button @click="redirectSignup" :buttonText="buttonTextRedirect" />
    </div>
  </div>


  <div v-if="showSignup" class="signup-container">
    <form class="signup-form" @submit.prevent="signup">
      <label for="email">email :</label>
      <input class="input-email" id="email" v-model="email" />

      <label for="password">Choisissez un mot de passe (au moins 8 caractères, sans espace) :</label>
      <input class="input-password" id="password" v-model="password" />

      <label for="pseudo">Choisissez un pseudo :</label>
      <input class="pseudo" id="pseudo" v-model="pseudo" />

      <label class="image style-button" for="image">Choisir une photo de profil</label>
      <input type="file" id="image" class="image-input" name="image" accept="image/png, image/jpeg"
        @change="handleFileUpload($event)" />

      <Button :buttonText="buttonTextSignup" />
    </form>
    <Button @click="redirectLogin" :buttonText="buttonBackLogin" />

  </div>


</template>
  
<script>
import axios from 'axios';
import Header from '@/components/Header.vue';
import Button from '@/components/Button.vue';

export default {
  name: 'LoginView',
  components: {
    Button,
    Header
  },
  data() {
    return {
      buttonTextLogin: "Se connecter",
      buttonTextRedirect: "S'inscrire",
      buttonTextSignup: "Envoyer",
      buttonBackLogin: "Retour",
      showSignup: false
    };
  },
  created() {
    if (localStorage) {
      localStorage.clear();
    }
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
        .then(() => { this.$router.push('/') })
        .catch(function (error) {
          console.log(error);
        });
    },
    redirectSignup() {
      this.showSignup = true
    },
    redirectLogin() {
      this.showSignup = false
    },
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
        .then(() => { this.$router.push('/') })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
      console.log(this.file);
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

.signup-container {

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
    margin-bottom: 20px;

  }
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

button {
  margin-top: 30px;
}
}
</style>