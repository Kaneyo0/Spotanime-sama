<script>
    import store from '../stores/store';

    export default {
        data() {
            return {
                placeholder: 'RECHERCHER...',
                store: store
            }
        },
        methods: {
            startSearching(event) {
                let research = event.target.value;
                // console.log(research);
                console.log(this.store.fetchResearch(research));
            }
        }
    }
</script>

<template>
    <header class="header">
        <RouterLink class="header__link" to="/"><img class="header__icon" src='/assets/logo.svg' alt="icon"></RouterLink> 
        <!-- Autocomplete="off" doesn't works, we need to pass a random string to disable it -->
        <input type="search" class="header__search-bar" @keydown="(event) => startSearching(event)" :placeholder="placeholder" autocomplete="nothing"/>
        <ul class="header__results-list">
            <li class="header__search-result">TEST</li>
        </ul>
    </header>
</template>