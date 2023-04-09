<script>
    import store from '../stores/store';
    import SearchResult from './SearchResult.vue';

    export default {
        data() {
            return {
                placeholder: 'RECHERCHER...',
                store: store,
                searchResults: {
                    songs: [],
                    albums: [],
                    artists: [],
                    playlists: []
                }
            }
        },
        components: {
            SearchResult
        },
        methods: {
            startSearching(event) {
                const research = event.target.value;
                this.searchResults = {
                    songs: [],
                    albums: [],
                    artists: [],
                    playlists: []
                }

                if (research !== "") {
                    this.store.fetchResearch(research).then(async results => {
                        await Promise.all([
                            results.songs.forEach(song => {
                                if (this.searchResults.songs.length < 3) this.searchResults.songs.push(song)
                            }),
                            results.albums.forEach(album => {
                                if (this.searchResults.albums.length < 3) this.searchResults.albums.push(album)
                            }),
                            results.artists.forEach(artist => {
                                if (this.searchResults.artists.length < 3) this.searchResults.artists.push(artist)
                            }),
                            results.playlists.forEach(playlist => {
                                if (this.searchResults.playlists.length < 3) this.searchResults.playlists.push(playlist)
                            })
                        ]);
                    });
                }
            }
        }
    }
</script>

<template>
    <header class="header">
        <RouterLink class="header__link" to="/"><img class="header__icon" src='/assets/logo.svg' alt="icon"></RouterLink> 
        <!-- Autocomplete="off" doesn't works, we need to pass a random string to disable it -->
        <input type="search" class="header__search-bar" @keyup="(event) => startSearching(event)" :placeholder="placeholder" autocomplete="nothing"/>
        <ul class="header__results-list">
            <p class="header__result-title" v-show="searchResults.songs.length > 0">songs</p>
            <SearchResult v-for="result in searchResults.songs" :id="result.id" :value="result.title" :detailRoute="`/songs`"/>
            <p class="header__result-title" v-show="searchResults.albums.length > 0">albums</p>
            <SearchResult v-for="result in searchResults.albums" :id="result.id" :value="result.title" :detailRoute="`/albums`"/>
            <p class="header__result-title" v-show="searchResults.artists.length > 0">artists</p>
            <SearchResult v-for="result in searchResults.artists" :id="result.id" :value="result.name" :detailRoute="`/artists`"/>
            <p class="header__result-title" v-show="searchResults.playlists.length > 0">playlists</p>
            <SearchResult v-for="result in searchResults.playlists" :id="result.id" :value="result.title" :detailRoute="`/playlists`"/>
        </ul>
    </header>
</template>