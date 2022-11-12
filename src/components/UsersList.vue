<template>
    <div class="users">
        <p>Ici s'affichera la liste des utilisateurices</p>
        <UserCard></UserCard>
        <UserCard></UserCard>
        <UserCard></UserCard>
        <UserCard></UserCard>
        <UserCard></UserCard>
        <!-- <UserCard v-for="user in users" :key="user.id" :event="user" /> -->
    </div>

</template>

<script>
    import UserCard from '@/components/UserCard.vue';
    export default {
        name: 'UsersList',
        components: {
            UserCard,
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