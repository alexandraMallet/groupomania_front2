<template>
    <div class="header-app">
        <nav>
            <router-link to="/publications">Toutes les publications</router-link> |
            <router-link to="/publier">Publier</router-link> |
            <router-link to="/">Se déconnecter</router-link>
        </nav>
        <img alt="Vue logo" src="../assets/logo.png">
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/index.scss';

.header-app {
    display: flex;
    justify-content: space-between;
    height: 150px;
}

</style>