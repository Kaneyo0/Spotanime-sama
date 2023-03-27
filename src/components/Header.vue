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
        <RouterLink class="header__link" to="/"><img class="header__icon" src='/assets/logo.svg' alt="icon"></RouterLink> 
        <!-- Autocomplete="off" doesn't works, we need to pass a random string to disable it -->
        <input type="search" class="header__search-bar" :placeholder="placeholder" autocomplete="nothing"/>
    </header>
</template>