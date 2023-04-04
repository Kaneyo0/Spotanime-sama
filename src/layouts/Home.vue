<script>
    import CardList from '../components/CardList.vue';
    import store from '../stores/store';
    import PlaylistForm from '../components/PlaylistForm.vue';

    export default {
        name: "App",
        data() {
            return {
                store: store,
                showPlaylistForm: false
            }
        },
        components: {
            CardList,
            PlaylistForm
        },
        methods: {
            showForm(selectedSong) {
                if(!this.showPlaylistForm) {
                    this.store.clickedSong = selectedSong;
                    this.showPlaylistForm = true;
                    document.querySelector('.container__lists').classList.add('blur');
                }
            }
        },
        async created() {
            await this.store.initialize();
        }
    }
</script>

<template>
    <main class="container">
        <PlaylistForm v-show="showPlaylistForm"></PlaylistForm>
        <ul class="container__lists">
            <li class="container__lists__item" v-for="(list, name) in store.list">
                <CardList
                    v-show="list.items.length > 0"
                    :detailRoute="list.detailRoute"
                    :name="name"
                    :isSongList="name === 'songs'"
                    :title="list.title"
                    :cards="list.items"
                    @addSongToPlaylist="showForm">
                </CardList>
            </li>
        </ul>
    </main>
</template>