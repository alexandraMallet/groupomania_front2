<template>
    <div class="user-card">
        <p>Ici s'affichera l'avatar et le nom d'un.e utilisateurice.</p>
    </div>

</template>

<script>
    export default {
        name:'UserCard',
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