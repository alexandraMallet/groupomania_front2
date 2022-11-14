<template>
    <div class="user-card">
        <!-- <p>{{ user.pseudo }}</p> -->
    </div>

</template>

<script>
    export default {
        name:'UserCard',
        // props: {
        //     user: {
        //         type: Object,
        //         required: true
        //     }
        // }
    }
</script>

<style scoped lang="scss">

@import '@/assets/index.scss';
    .user-card {
        height: fit-content;
        width: 95%;
        margin: 20px;
        border: 1px solid $color-secondary;
    }
</style>