<template>

    <Header />

    <div v-if="authorizedUser" class="my-account">
        <UserCard v-if="$data.user" :key="user.id" :user="user" aria-label="aller à mon compte" />
    </div>


    <div v-if="userLogged.isAdmin" class="users-contener">
        <router-link class="post-link" :to="{ name: 'UsersView'}">
            <p>Voir tout.e.s les utilisateurices</p>
        </router-link>
    </div>

    <div class="posts-contener">
        <PostsList />
    </div>


</template>

<script>

import axios from 'axios';
import UsersList from '@/components/UsersList.vue';
import PostsList from '@/components/PostsList.vue';
import UserCard from '@/components/UserCard.vue';
import Header from '@/components/Header.vue';

export default {
    name: 'HomeView',
    components: {
        PostsList,
        UsersList,
        UserCard,
        Header,
    },
    data() {
        return {
            authorizedUser: false,
            user: {},
            userLogged: {},
            userId: '',
        }
    },
    created() {

        this.userLogged = JSON.parse(localStorage.userLogged);

        axios.get('http://localhost:3000/api/auth/' + this.userLogged.userId, {
            headers: {
                'Authorization': `Bearer ${this.userLogged.token}`
            }
        })
            .then(response => {
                this.user = response.data;
                this.userId = response.data._id;
            })
            .then(() => {
                if (this.userId === this.userLogged.userId) {
                    this.authorizedUser = true;
                }
            })
            .catch(() => { this.$router.push('/connexion') });
    }
}


</script>

<style scoped lang="scss">
@import '@/assets/index.scss';

.global-view {
    display: flex;
}

.users-contener {
    width: 25%;
    margin-right: 30px;
    border: 1px solid #4E5166;
}

.posts-contener {
    width: 65%;
    margin-right: 30px;
}

.my-account {
    display: flex;
    justify-content: right;
    width: fit-content;
    margin: 20px;

    :nth-child(2) {
        margin-right: 20px;
        margin-left: 10px;
    }
}
</style>