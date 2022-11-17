<template>
    <div class="post-card">
        <p>{{ post.text }}</p>
        <img :src="post.imageUrl"/>
        <p>{{ post.createdAt.split("T")[0] }} by {{ post.userPseudo }}</p>
    </div>

</template>

<script>
    export default {
        name: 'PostCard',
        props: {
            post: {
                type: Object,
                required: true
            }
        },
    }
</script>

<style scoped lang="scss">

@import '@/assets/index.scss';
    .post-card {
        height: 200px;
        width: 95%;
        margin: 20px;
        border: 1px solid $color-primary;

        img {
            height: 100px;
            width: 100px;
        }
    }
</style>