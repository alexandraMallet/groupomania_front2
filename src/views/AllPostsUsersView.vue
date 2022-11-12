<template>
    <div class="header-app">
        <nav>
            <router-link to="/publications">Toutes les publications</router-link> | 
            <router-link to="/publier">Publier</router-link> | 
            <router-link to="/">Se déconnecter</router-link>
        </nav>
        <img alt="Vue logo" src="../assets/logo.png">
    </div>

    <div class="global-view">
        <div class="users-contener">
            <UsersList />
        </div>
        <div class="posts-contener">
            <PostsList />
        </div>
    </div>

</template>

<script>
import UsersList from '@/components/UsersList.vue';
import PostsList from '@/components/PostsList.vue';
export default {
    name: 'AllPostsUsersView',
    components: {
        PostsList,
        UsersList,
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
    border: 1px solid #4E5166;
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