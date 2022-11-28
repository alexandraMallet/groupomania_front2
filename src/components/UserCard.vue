<template>
    <router-link class="user-link" :to="{ name: 'OneUserView', params: { id: user._id } }">

        <div class="user-card">
            <p>{{ user.pseudo }}</p>
            <img :src="user.avatarUrl" />
        </div>

    </router-link>

</template>

<script>
export default {
    name: 'UserCard',
    props: {
        user: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/index.scss';

.user-card {
    display: flex;
    justify-content: space-between;
    height: fit-content;
    width: 95%;
    margin: 5px;
    padding-left: 20px;
    border: 3px solid $color-secondary;
    border-radius: 20px;
    color: $color-tertiary;
    font-size: 12px;


    img {
        height: 50px;
        width: 50px;
    }
}

.user-card:hover {
    transform: scale(1.01);
    box-shadow: 0 3px 12px 0 $color-secondary;
}

router-link {
    color: $color-tertiary;
}



</style>