<template>

    <Header />

    <div v-if="userLogged.isAdmin" class="users-contener">
        
       <UserCard v-for="user in users" :key="user.id" :user="user" />
        </div>

    <div v-else>
        <p>Contenu accessible seulement par le compte administrateur</p>
        <Button :buttonText="buttonTextUnauthorized" @click="redirection" />

    </div>

</template>
  
<script>

import axios from 'axios';
import UserCard from '@/components/UserCard.vue';
import PostsList from '@/components/PostsList.vue';
import Header from '@/components/Header.vue';
import Button from '@/components/Button.vue';

export default {
    name: 'HomeView',
    components: {
        PostsList,
        UserCard,
        Header,
        Button
    },
    data() {
        return {
            user: {},
            users: [],
            userLogged: {},
            userId: '',
            buttonTextUnauthorized: "revenir à l'accueil"
        }
    },
    created() {

        this.userLogged = JSON.parse(localStorage.userLogged);

        axios
            .get("http://localhost:3000/api/auth", {
                headers: {
                    'Authorization': `Bearer ${this.userLogged.token}`
                }
            })
            .then(response => {
                console.log(response.data);
                this.users = response.data;
                console.log(this.users);
            })
            .catch(error => {
                console.log(error);
            });
    },
    methods: {
        redirection() {
            return this.$router.push('/')
        }
    }
}


</script>
  
<style scoped lang="scss">
@import '@/assets/index.scss';


.users-contener {
    margin: 30px;
    display: flex;
    flex-wrap: wrap;
}
</style>