<template>
    <div class="header-app">
        <nav>
            <router-link to="/">Home</router-link> |
            <router-link to="/posts">Voir toutes les publications</router-link> | 
            <router-link to="/">Home</router-link> |

        </nav>
        <img alt="Vue logo" src="@/assets/logo.png">
    </div>

    <!-- <router-view /> -->
</template>
  
<script>
 export default {
    name:'NavBar'
 }
</script>

<style lang="scss">

@import '@/assets/index.scss';

.header-app {
    display: flex;
    justify-content: space-between;
}
nav {
    padding: 30px;
    a {
        font-weight: bold;
        color: $color-tertiary;
        &.router-link-exact-active {
            color: $color-primary;
        }
    }
}
img {
    width: max-content;
    height: 200px;
}
</style>