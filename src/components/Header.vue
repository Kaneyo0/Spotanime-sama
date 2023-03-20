<script>
    export default {
        data() {
            return {
                placeholder: 'RECHERCHER...'
            }
        }
    }
</script>

<template>
    <header class="header">
        <img class="header__icon" src='../../public/assets/logo.svg' alt="icon">
        <!-- Autocomplete="off" doesn't works, we need to pass a random string to disable it -->
        <input type="search" class="header__search-bar" :placeholder="placeholder" autocomplete="nothing"/>
    </header>
</template>