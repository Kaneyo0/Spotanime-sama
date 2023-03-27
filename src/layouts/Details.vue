<script>
    import store from '../stores/store';
    import CardList from '../components/CardList.vue';

    export default {
        name: "Details",
        data() {
            return {
                store: store,
                song: {},
                album: {}
            }
        },
        components: {
            CardList
        },
        async created() {
            if (this.$route.name == 'song details') {
               this.song = await this.store.fetchSong(this.$route.params.id);
            }
            if (this.$route.name == 'album details') {
                this.album = await this.store.fetchAlbum(this.$route.params.id);
            }
        }
    }
</script>
<template>
    <main class="container">
        <div v-if="this.$route.name == 'song details'" class="song__detail">
            <iframe width="560" height="315" :src="this.song.youtube+'?fs=0&color=white&showinfo=0&rel=0&controls=0'" title="YouTube video player" frameborder="0"></iframe>
            <p>{{ this.song.title }}</p>
        </div>
        <div v-else class="album__detail">
            <CardList :detailRoute="store.list.songs.detailRoute" :name="'songs'" :isSongList="true" :title="this.album.title" :cards="this.album.songs"></CardList>
        </div>
    </main>
</template>