<template>
    <div class="header-app">
        <nav>
            <router-link to="/publications">Toutes les publications</router-link> |
            <router-link to="/publier">Publier</router-link> |
            <router-link to="/">Se déconnecter</router-link>
        </nav>
        <img alt="Vue logo" src="../assets/logo.png">
    </div>
    <div class="form-contener">
        <form v-if="$data.post" class="create-post-form" @submit.prevent="modifyPost">

            <label for="text">Votre texte : </label>
            <textarea id="text" v-model="text"></textarea>

            <img :src="imageUrl" />

            <label class="image style-button" for="image">Modifier l'image</label>
            <input type="file" id="image" class="image-input" name="image" accept="image/png, image/jpeg"
                @change="handleFileUpload($event)" />

            <Button v-if="rightToChange" :buttonText="buttonText" />
        </form>

        <Button v-if="!rightToChange" :buttonText="buttonTextUnauthorized" @click="redirection" />
    </div>



</template>

<script>

import axios from 'axios';
import Button from '@/components/Button.vue';

export default {
    name: 'ModifyPostView',
    components: {
        Button
    },
    data() {
        return {
            buttonText: 'enregistrer les modifications',
            buttonTextUnauthorized: 'vous ne pouvez pas modifier ce compte',
            posts: null,
            text: '',
            userPseudo: '',
            file: '',
            user: '',
            postId: '',
            imageUrl: '',
            rightToChange: false
        }
    },
    created() {
        this.user = JSON.parse(localStorage.user);

        axios.get('http://localhost:3000/api/post/' + this.postId, {
            headers: {
                'Authorization': `Bearer ${this.user.token}`
            }
        })
            .then(response => {
                console.log(response.data);
                this.post = response.data;
            })
            .then(() => {
                if ((this.post.userId === this.user.userId) || this.user.isAdmin) {
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
            this.$router.push('/publications');

        },
        modifyPost() {

            let formData = new FormData();

            formData.append('text', this.text);
            formData.append('modifiedBy', this.user.pseudo);
            if (this.file) { formData.append('image', this.file) }

            console.log(formData);

            axios.put('http://localhost:3000/api/post/' + this.postId,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${this.user.token}`
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
            // this.imageUrl = ;
            console.log(this.file);
        },
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
</style>