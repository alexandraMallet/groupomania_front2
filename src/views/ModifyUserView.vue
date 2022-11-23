<template>
    <Header/>
    <div v-if="rightToModify" class="form-contener">
        <form v-if="$data.user" class="create-post-form" @submit.prevent="modifyUser">

            <label for="email">email :</label>
            <input class="input-email" id="email" v-model="email" />

            <label for="password">nouveau mot de passe, le cas échéant :</label>
            <input class="input-password" id="password" v-model="password" />

            <label for="pseudo">Pseudo :</label>
            <input class="pseudo" id="pseudo" v-model="pseudo" />

            <img :src="avatarUrl" />

            <label class="image style-button" for="image">Modifier votre photo de profil</label>
            <input type="file" id="image" class="image-input" name="image" accept="image/png, image/jpeg"
                @change="handleFileUpload($event)" />

            <Button v-if="rightToModify" :buttonText="buttonTextSave" />
        </form>
    </div>

    <div v-else>

        <UserCard v-if="$data.user" :key="user.id" :user="user"/>
        <p>Vous ne pouvez pas modifier ce compte</p>
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
            pseudo: '',
            email:'',
            file: '',
            password:'',
            user: '',
            userConnected: '',
            userId: '',
            avatarUrl: '',
            rightToModify: false
        }
    },
    created() {
        this.userConnected = JSON.parse(localStorage.user);
        this.userId = this.$route.params.id;


        axios.get('http://localhost:3000/api/auth/' + this.userId, {
            headers: {
                'Authorization': `Bearer ${this.userConnected.token}`
            }
        })
            .then(response => {
                console.log(response.data);
                this.user = response.data;
            })
            .then(() => {
                if ((this.userId === this.userConnected.userId)) {
                    this.rightToModify = true;
                }
            })
            .then(() => {
                this.pseudo = this.user.pseudo;
                this.avatarUrl = this.user.avatarUrl;
                this.email = this.user.email;
            })
            .catch(error => console.log(error));
    },
    methods: {
        redirection() {
            this.$router.push('/');

        },
        modifyUser() {

            let formData = new FormData();

            formData.append('pseudo', this.pseudo);
            formData.append('email', this.user.email);
            formData.append('image', this.file);
            if(this.password) {formData.append('password', this.password)};

            console.log(formData);

            axios.put('http://localhost:3000/api/auth/' + this.userId,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${this.userConnected.token}`
                    }
                }
            )
                .then(() => { this.$router.push('/utilisateurice/' + this.userId) })
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