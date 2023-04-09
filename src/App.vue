<script>
    import { RouterLink, RouterView } from 'vue-router'
    import Header from './components/Header.vue'
    import PlaylistForm from './components/PlaylistForm.vue';
    import store from './stores/store';

    export default {
        data() {
            return {
                store: store
            }
        },
        components: {
            Header,
            PlaylistForm
        }
    }
</script>

<template>
    <Header></Header>
    <PlaylistForm v-show="store.showPlaylistForm"></PlaylistForm>
    <RouterView :key="$route.fullPath"></RouterView>
</template>