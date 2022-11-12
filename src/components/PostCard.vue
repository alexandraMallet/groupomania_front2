<template>
    <div class="post-card">
        <p>Ici s'affichera une publication.</p>
    </div>

</template>

<script>
    export default {
        name: 'PostCard',
    }
</script>

<style scoped lang="scss">

@import '@/assets/index.scss';
    .post-card {
        height: fit-content;
        width: 95%;
        margin: 20px;
        border: 1px solid $color-secondary;
    }
</style>