<template>
    <Header />
    <div v-if="rightToModify" class="form-contener">
        <form v-if="$data.user" class="create-post-form" @submit.prevent="modifyUser">

            <label for="email">email :</label>
            <input class="input-email" id="email" v-model="email" />

            <label for="password">nouveau mot de passe, le cas échéant :</label>
            <input class="input-password" id="password" v-model="password" />

            <label for="userPseudo">Pseudo :</label>
            <input class="user-pseudo" id="userPseudo" v-model="userPseudo" />


            <label class="image style-button" for="image">Modifier votre photo de profil</label>
            <input type="file" id="image" class="image-input" name="image" accept="image/png, image/jpeg"
                @change="handleFileUpload($event)" />

            <div class="preview-image">
                <img :src="avatarUrl"/>
            </div>

            <Button v-if="rightToModify" :buttonText="buttonTextSave" />
        </form>
    </div>

    <div v-else class="unauthorized">
        <img :src="avatarUrl"/>
        <p>Ce compte n'est pas le vôtre,
            <br />vous ne pouvez pas le modifier.
        </p>
        <Button :buttonText="buttonTextUnauthorized" @click="redirection" />

    </div>
</template>

<script>

import axios from 'axios';
import Button from '@/components/Button.vue';
import Header from '@/components/Header.vue';
import UserCard from '@/components/UserCard.vue';

export default {
    name: 'ModifyUserView',
    components: {
        Button,
        Header,
        UserCard
    },
    data() {
        return {
            buttonTextSave: 'enregistrer les modifications',
            buttonTextUnauthorized: 'revenir aux publications',
            userLoggedPseudo: '',
            userPseudo: '',
            email: '',
            file: '',
            password: '',
            user: {},
            userLogged: {},
            userId: '',
            avatarUrl: '',
            rightToModify: false
        }
    },
    created() {
        this.userLogged = JSON.parse(localStorage.userLogged);
        this.userLoggedPseudo = localStorage.userLoggedPseudo;
        this.userId = this.$route.params.id;
        console.log(this.userId)


        axios.get('http://localhost:3000/api/auth/' + this.userId, {
            headers: {
                'Authorization': `Bearer ${this.userLogged.token}`
            }
        })
            .then(response => {
                console.log(response.data);
                this.user = response.data;
            })
            .then(() => {
                if ((this.userId === this.userLogged.userId)) {
                    this.rightToModify = true;
                }
            })
            .then(() => {
                this.userPseudo = this.userLoggedPseudo;
                this.avatarUrl = this.user.avatarUrl;
                this.email = this.user.email;
            })
            .catch(error => console.log(error));
    },
    methods: {
        redirection() {
            this.$router.push('/');

        },
        setUserPseudoInLocalStorage() {
            const userLoggedPseudo = this.userPseudo;
            console.log(userLoggedPseudo)
            localStorage.setItem('userLoggedPseudo', userLoggedPseudo)
        },
        modifyUser() {

            this.userPseudo = this.userPseudo;
            console.log(this.userPseudo)


            let formData = new FormData();

            formData.append('pseudo', this.userPseudo);
            formData.append('email', this.user.email);
            formData.append('image', this.file);
            if (this.password) { formData.append('password', this.password) };

            console.log(formData);

            axios.put('http://localhost:3000/api/auth/' + this.userId,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${this.userLogged.token}`
                    }
                }
            )
                .then(() => this.setUserPseudoInLocalStorage())
                .then(() => { this.$router.push('/utilisateurice/' + this.userId) })
            // .catch(() => {console.log('erreur')});
        },

        handleFileUpload(event) {
            this.file = event.target.files[0];
            console.log(this.file)
            this.imagePreview(this.file)
        },
        imagePreview(file) {
            let reader = new FileReader();
            reader.onload = event => {
                this.avatarUrl = event.target.result
            }
            reader.readAsDataURL(file)
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/styles/index.scss';

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
      border-color: $color-secondary;
    }

    .image-input {
      display: none;
    }

    .preview-image {
      height: 100px;
      margin-top: 20px;
      background-size: cover;
      background-position: center center;

      img {
        height: 100px;
      }
    }

  }

  .style-button {
    display: block;
    height: 30px;
    width: 200px;
    background-color: $color-secondary;
    color: $color-tertiary;
    border-radius: 50px;
    border: 1px solid $color-primary;
    @include center;
    margin: 10px;
    font-family: 'Lato';
    font-weight: 700;
    font-size: 12px;

    &:hover {
      cursor: pointer;
      transform: scale(1.01);
      box-shadow: 0 3px 5px 0 $color-primary;
    }
  }

  button {
    margin-top: 30px;
  }

  .unauthorized {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        height: 100px;
        border-radius: 50px;
        border: 2px solid $color-tertiary;
      }
  }

</style>