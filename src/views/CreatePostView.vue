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

<!-- <template>
    <div class="base-image-input" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
        <span v-if="!imageData" class="placeholder">
            Choose an Image
        </span>
        <input class="file-input" ref="fileInput" type="file" @input="onSelectFile">
    </div>
</template> -->

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
            console.log(this.file);

            let reader = new FileReader();
            reader.onload = function (event) {
                this.selectedImageUrl = event.target.result;
            }
            console.log(this.selectedImageUrl);
            reader.readAsDataURL(event.target.files[0]);



            // this.$emit('input', files[0])
        }
        // changeImage(e) {
        //     this.loadedImage = e.target.files[0]
        //     let reader = new FileReader()
        //     reader.onload = function (e) {
        //         this.selectedImageUrl = e.target.result;
        //     }
        //     reader.readAsDataURL(e.target.files[0]);
        // }
        // onSelectFile() {
        //     const input = this.$refs.fileInput
        //     const files = input.files
        //     if (files && files[0]) {
        //         const reader = new FileReader
        //         reader.onload = e => {
        //             this.imageData = e.target.result
        //         }
        //         reader.readAsDataURL(files[0])
        //         this.$emit('input', files[0])
        //     }
        // }
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

.base-image-input {
    display: block;
    width: 200px;
    height: 200px;
    cursor: pointer;
    background-size: cover;
    background-position: center center;
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