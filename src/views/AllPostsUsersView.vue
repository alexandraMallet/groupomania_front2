<template>

    <HeaderNav/>

    <div v-if="authorizedUser" class="my-account">
        <UserCard v-if="$data.user" :key="user.id" :user="user"/>
    </div>

    <div class="global-view">
        <div v-if="userConnected.isAdmin" class="users-contener">
            <UsersList />
        </div>
        <div class="posts-contener">
            <PostsList />
        </div>
    </div>

</template>

<script>

import axios from 'axios';
import UsersList from '@/components/UsersList.vue';
import PostsList from '@/components/PostsList.vue';
import UserCard from '@/components/UserCard.vue';
import HeaderNav from '@/components/HeaderNav.vue';

export default {
    name: 'AllPostsUsersView',
    components: {
        PostsList,
        UsersList,
        UserCard,
        HeaderNav,
    },
    data() {
        return {
            authorizedUser:false,
            user: null,
            userConnected: null,
            userId: null,
        }
    },
    created() {
        this.userConnected = JSON.parse(localStorage.user);

        axios.get('http://localhost:3000/api/auth/' + this.userConnected.userId, {
            headers: {
                'Authorization': `Bearer ${this.userConnected.token}`
            }
        })
            .then(response => {
                console.log(response.data);
                this.user = response.data;   
                this.userId = response.data._id;            
            })
            .then(() => {
                if(this.userId === this.userConnected.userId) {
                    this.authorizedUser = true;
                } 
                console.log(this.authorizedUser)})
            .catch(error => console.log(error));
    }
}

</script>

<style scoped lang="scss">
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

.header-app {
    display: flex;
    justify-content: space-between;
}

nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #4E5166;

        &.router-link-exact-active {
            color: #FD2D01;
        }
    }
}
</style>