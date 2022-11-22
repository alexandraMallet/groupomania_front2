<template>
    <div class="header-login-signup">
        <nav>
            <router-link to="/">retour</router-link>
        </nav>
        <img alt="Vue logo" src="../assets/icon-left-font-monochrome-white-rogne.png">
    </div>

</template>

<style scoped lang="scss">
@import '@/assets/index.scss';

.header-login-signup {
    display: flex;
    justify-content: space-between;
    background-color: $color-secondary;
    height: 150px;


    nav {
        display: flex;
        padding-top: 60px;
        padding-left: 50px;

        a {
            margin-right: 10px;
            margin-left: 10px;
        }
    }

    img {
        height: 50px;
        margin: 50px;
    }
}
</style>