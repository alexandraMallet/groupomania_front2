<template>

  <div class="connexion-container">
    <div class="connexion-container-small">
      <mq-responsive target="sm-" tag="div">
        <Header />
      </mq-responsive>

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

        <div class="return">
          <Button @click="redirectLogin" :buttonText="buttonBackLogin" />
        </div>

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

          <div class="base-image-input">
            <img :src="selectedImageUrl">
          </div>

          <Button :buttonText="buttonTextSignup" />
        </form>

      </div>
    </div>


    <mq-responsive target="md+" tag="div">
      <div class="connexion-large">
        <img src="@/assets/logo.png" />
      </div>
    </mq-responsive>

  </div>

</template>

<script>
import axios from 'axios';
import { MqResponsive } from "vue3-mq";
import Header from '@/components/Header.vue';
import Button from '@/components/Button.vue';

export default {
  name: 'LoginView',
  components: {
    Button,
    Header,
    MqResponsive
  },
  data() {
    return {
      buttonTextLogin: "Se connecter",
      buttonTextRedirect: "S'inscrire",
      buttonTextSignup: "Envoyer",
      buttonBackLogin: "Retour",
      selectedImageUrl: '',
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
          const userLogged = {
            userId: user.userId,
            isAdmin: user.isAdmin,
            token: user.token
          }
          console.log(userLogged);
          const userLoggedPseudo = user.pseudo;
          console.log(userLoggedPseudo);
          localStorage.setItem('userLogged', JSON.stringify(userLogged));
          localStorage.setItem('userLoggedPseudo', userLoggedPseudo);
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
          const userLogged = {
            userId: user.userId,
            isAdmin: user.isAdmin,
            token: user.token
          }
          console.log(userLogged);
          const userLoggedPseudo = user.pseudo;
          console.log(userLoggedPseudo);
          localStorage.setItem('userLogged', JSON.stringify(userLogged));
          localStorage.setItem('userLoggedPseudo', userLoggedPseudo);
        })
        .then(() => { this.$router.push('/') })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
      console.log(this.file)
      this.imagePreview(this.file)
    },
    imagePreview(file) {
      let reader = new FileReader();
      reader.onload = event => {
        this.selectedImageUrl = event.target.result
      }
      reader.readAsDataURL(file)
    }
  }
};
</script>
  
<style scoped lang="scss">
@import '@/assets/index.scss';

.connexion-container {
  display: flex;
  justify-content: space-around;
}

.connexion-container-small {
  width: 100%;

  @include md {
    width: 70%;
  }

  @include lg {
    width: 70%;
  }
}

.login-contener {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 300px;
  width: 100%;
  margin-top: 200px;

  @include md {
    margin: 200px 50px;
  }

  @include lg {
    margin: 200px 50px;
    width: 90%;
  }

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
      border-color: $color-secondary;
    }

    .input-password {
      border-color: $color-secondary;
    }

    p {
      font-size: 12px;
      margin-bottom: 30px;
    }
  }

  .redirect-signup {
    display: flex;
    justify-content: right;
    margin-top: 20px;
    margin-right: 20px;
  }
}

.signup-container {

  height: 300px;
  width: 100%;

  form {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;

    input {
      margin-top: 10px;
      height: 30px;
      width: 300px;
      margin-bottom: 20px;
      border-color: $color-secondary;
    }

    .image-input {
      display: none;
    }

    .base-image-input {
      height: 100px;
      margin-top: 20px;
      background-size: cover;
      background-position: center center;

      img {
        height: 100px;
      }
    }

  }

  .return {
    margin-left: 20px;
    margin-top: 30px;

    button {
      margin-bottom: 0;
    }
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



.connexion-large {

  img {
    width: 500px;
    margin-right: 70px;
  }
}
</style>