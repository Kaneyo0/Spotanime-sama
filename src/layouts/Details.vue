<script>
    import store from '../stores/store';
    import CardList from '../components/CardList.vue';

    export default {
        name: "Details",
        data() {
            return {
                store: store,
                playlist: {},
                song: {},
                artist: {},
                album: {}
            }
        },
        components: {
            CardList
        },
        async created() {
            switch(this.$route.name) {
                case 'song details':
                    this.song = await this.store.fetchSong(this.$route.params.id);
                    break;
                case 'artist details':
                    this.artist = await this.store.fetchArtist(this.$route.params.id);
                    break;
                case 'album details':
                    this.album = await this.store.fetchAlbum(this.$route.params.id);
                    break;
                case 'playlist details':
                    this.playlist = await this.store.fetchPlaylist(this.$route.params.id);
                    break;
                default:
                    console.error('Unknown element');
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
        <div v-else-if="this.$route.name == 'artist details'" class="artist__detail">
            <CardList :detailRoute="store.list.albums.detailRoute" :name="'albums'" :isSongList="false" :title="this.artist.name" :cards="this.artist.albums"></CardList>
        </div>
        <div v-else-if="this.$route.name == 'album details'" class="album__detail">
            <CardList :detailRoute="store.list.songs.detailRoute" :name="'songs'" :isSongList="true" :title="this.album.title" :cards="this.album.songs"></CardList>
        </div>
        <div v-else-if="this.$route.name == 'playlist details'" class="playlist__detail">
            <CardList :detailRoute="store.list.songs.detailRoute" :name="'songs'" :isSongList="true" :title="this.playlist.title" :cards="this.playlist.songs"></CardList>
        </div>
        <div v-else class="default">
            <h1> Il n'y a rien ici </h1>
        </div>
    </main>
</template>