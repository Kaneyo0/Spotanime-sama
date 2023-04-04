<script>
    import store from '../stores/store';
    import SearchResult from './SearchResult.vue';

    export default {
        data() {
            return {
                placeholder: 'RECHERCHER...',
                store: store,
                searchResults: []
            }
        },
        components: {
            SearchResult
        },
        methods: {
            startSearching(event) {
                let research = event.target.value;
                this.searchResults = [];
                if (research !== "") {
                    this.store.fetchResearch(research).then(results => {
                        results.forEach(element => {
                            this.searchResults.push(element)
                        });
                    })
                }
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
            <SearchResult v-for="result in searchResults" :id="result.id" :value="result.title" :detailRoute="`/songs`"/>
        </ul>
    </header>
</template>