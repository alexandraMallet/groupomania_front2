<template>
    <Header />
    <div class="form-contener">
        <form class="create-post-form" @submit.prevent="submitPost">

            <label for="text">Que souhaitez-vous partager aujourd'hui ?</label>
            <textarea id="text" v-model="text" placeholder="votre texte ici"></textarea>


            <label class="image style-button" for="image">Choisir une image</label>
            <input type="file" id="image" class="image-input" name="image" accept="image/png, image/jpeg"
                @change="handleFileUpload($event)" />

            <div class="base-image-input">
                <img :src="selectedImageUrl">
            </div>

            <Button :buttonText="buttonText" />
        </form>

    </div>
</template>

<script>

import axios from 'axios';
import Header from '@/components/Header.vue';
import Button from '@/components/Button.vue';

export default {
    name: 'CreatePostView',
    components: {
        Button,
        Header
    },
    data() {
        return {
            buttonText: 'publier',
            text: '',
            file: '',
            selectedImageUrl: ''
        }
    },
    methods: {
        submitPost() {

            const userLogged = JSON.parse(localStorage.userLogged);
            const userPseudo = localStorage.userPseudo;

            let formData = new FormData();
            formData.append('userPseudo', userPseudo);
            formData.append('text', this.text);
            formData.append('image', this.file);

            console.log(formData);

            axios.post('http://localhost:3000/api/post',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${userLogged.token}`
                    }
                }
            ).then(function () {
                console.log('publication publiée !');
            })
                .then(() => { this.$router.push('/') })
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
                this.selectedImageUrl = event.target.result
            }
            reader.readAsDataURL(file)
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/index.scss';


.base-image-input {
    height: 100px;
    background-size: cover;
    background-position: center center;

    img {
        height: 100px;
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
</style>