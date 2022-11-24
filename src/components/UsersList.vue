<template>
    <div class="users">
      
        <UserCard v-for="user in users" :key="user.id" :user="user" />
    </div>

</template>

<script>

import axios from 'axios'
import UserCard from '@/components/UserCard.vue';

export default {
    name: 'UsersList',
    components: {
        UserCard,
    },
    data() {
        return {
            users: [],
            userLogged: {}
        }
    },
    created() {
        this.userLogged = JSON.parse(localStorage.user);
        
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
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/index.scss';

.users {
    width: 95%;
    height: fit-content;
    margin: 10px;
    border: 1px solid $color-primary;
}
</style>