<template>
    <Header />
    <div class="form-contener">
        <form v-if="$data.post" class="create-post-form" @submit.prevent="modifyPost">

            <label for="text">Votre texte : </label>
            <textarea id="text" v-model="text"></textarea>

            <!-- <img :src="imageUrl" /> -->

            <label class="image style-button" for="image">Modifier l'image</label>
            <input type="file" id="image" class="image-input" name="image" accept="image/png, image/jpeg"
                @change="handleFileUpload($event)" />

            <div class="base-image-input">
                <img :src="imageUrl">
            </div>

            <Button v-if="rightToChange" :buttonText="buttonText" />
        </form>

        <Button v-if="!rightToChange" :buttonText="buttonTextUnauthorized" @click="redirection" />
    </div>



</template>

<script>

import axios from 'axios';
import Header from '@/components/Header.vue';
import Button from '@/components/Button.vue';

export default {
    name: 'ModifyPostView',
    components: {
        Button,
        Header
    },
    data() {
        return {
            buttonText: 'enregistrer les modifications',
            buttonTextUnauthorized: 'vous ne pouvez pas modifier cette publication',
            post: '',
            text: '',
            userLoggedPseudo: '',
            file: '',
            userLogged: {},
            postId: '',
            imageUrl: '',
            selectedImageUrl: '',
            rightToChange: false
        }
    },
    created() {
        this.userLogged = JSON.parse(localStorage.userLogged);
        this.postId = this.$route.params.id;

        axios.get('http://localhost:3000/api/post/' + this.postId, {
            headers: {
                'Authorization': `Bearer ${this.userLogged.token}`
            }
        })
            .then(response => {
                console.log(response.data);
                this.post = response.data;
            })
            .then(() => {
                if ((this.post.userId === this.userLogged.userId) || this.userLogged.isAdmin) {
                    this.rightToChange = true;
                }
            })
            .then(() => {
                this.text = this.post.text;
                this.imageUrl = this.post.imageUrl;
            })
            .catch(error => console.log(error));
    },
    methods: {
        redirection() {
            this.$router.push('/');
        },
        modifyPost() {

            let formData = new FormData();
            this.userLoggedPseudo = JSON.stringify(localStorage.userLoggedPseudo);

            formData.append('text', this.text);
            formData.append('modifiedBy', this.userLoggedPseudo);
            if (this.file) { formData.append('image', this.file) }

            console.log(formData);

            axios.put('http://localhost:3000/api/post/' + this.postId,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${this.userLogged.token}`
                    }
                }
            )
                .then(() => { this.$router.push('/publications/' + this.postId) })
                .catch(function () {
                    console.log('erreur');
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
                this.imageUrl = event.target.result
            }
            reader.readAsDataURL(file)
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/index.scss';

.header-app {
    display: flex;
    justify-content: space-between;
}

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

.form-contener {
    height: fit-content;
    width: 95%;
    border: 1px solid $color-tertiary;
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

.style-button:hover {
    transform: scale(1.01);
    box-shadow: 0 3px 5px 0 $color-primary;
    cursor: pointer;
}

.base-image-input {
  height: 100px;
  background-size: cover;
  background-position: center center;

  img {
    height: 100px;
  }
}
</style>