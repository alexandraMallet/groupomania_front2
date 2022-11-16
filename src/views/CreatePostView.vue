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
        <form class="create-post-form" @submit.prevent="submitPost">

            <label for="post">Que souhaitez-vous partager aujourd'hui ?</label>
            <textarea id="post" v-model="post" placeholder="votre texte ici"></textarea>

            <label class="image" for="image">Choisissez une image :</label>
            <div class="style-input">
                <input type="file" id="image" class="image-input" name="image" accept="image/png, image/jpeg"
                    @change="handleFileUpload($event)" />
                <Button class="style-button" :buttonText="buttonInputFile" />
            </div>

            <Button :buttonText="buttonText" />

        </form>

    </div>



</template>

<script>

import axios from 'axios';
import Button from '@/components/Button.vue';

export default {
    name: 'CreatePostView',
    components: {
        Button
    },
    data() {
        return {
            buttonText: 'publier',
            buttonInputFile: 'parcourir',
            text: '',
            file: ''
        }
    },
    methods: {
        submitPost() {

            let formData = new FormData();
            formData.append('text', this.text);
            formData.append('file', this.file);

            axios.post('http://localhost:3000/api/post',
                formData,
                {
                    headers: {
                        //authentification : Bearer [store.token]
                    }
                }
            ).then(function () {
                console.log('publication publiée !');
            })
                .catch(function () {
                    console.log('erreur');
                });
        },

        handleFileUpload(event) {
            this.file = event.target.files[0];
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