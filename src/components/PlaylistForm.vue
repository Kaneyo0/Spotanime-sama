<script>
    import InlineCard from './InlineCard.vue';
    import store from '../stores/store';
    export default {
        data() {
            return {
                store: store,
                localPlaylists: [] // playlists which are in edit and which will be insert after
            }
        },
        computed: {
            existingPlaylists() {
                return this.store.list.playlist.items.concat(this.localPlaylists)
            }
        },
        methods: {
            addLocalPlaylist(data = { id: Date.now(), edited: true }) {
                this.localPlaylists.push(data)
            },
            toggleEdit(playlistData) {
                const playlist = this.existingPlaylists.find((playlist) => playlist.id === playlistData.id);
                playlist.edited = !playlist.edited
                if (!playlist.edited) {
                    this.upsertPlaylist(playlistData)
                }
            },
            async upsertPlaylist(playlistData) {
                // check if playlist already exists on the api (all playlist in the store are on the api)
                let index = this.store.list.playlist.items.findIndex((item) => item.id === playlistData.id);
                if(index === -1) {
                    // remove temporary id for not have an error from the API
                    delete playlistData.id;

                    playlistData.id = await this.store.insertPlaylist(playlistData)
                    // if not, we put it in the store to update all list which referer to the new playlist
                    this.store.list.playlist.items.push({ ...playlistData, title: playlistData.name });
                    // we remove playlist from local playlists
                    let localIndex = this.localPlaylists.findIndex((item) => item.id === playlistData.id);
                    this.localPlaylists.splice(localIndex, 1);
                    localStorage.setItem('playlistsId', JSON.stringify(this.store.list.playlist.items.map(playlist => playlist.id)))    
                } else {
                    this.store.list.playlist.items[index] = { ...playlistData, title: playlistData.name };
                    this.store.patchPlaylist(playlistData);
                    this.existingPlaylists[index].edited = false;
                }
            },
            addSong(playlistData) {
                this.upsertPlaylist(playlistData);
                this.store.hideForm();
            },
            deletePlaylist(playlist) {
                let index = this.store.list.playlist.items.findIndex((item) => item.id === playlist.id)
                if (index !== -1) {
                    this.remove(index, playlist)
                } else {
                    index = this.localPlaylists.findIndex((item) => item.id === playlist.id)
                    this.removeLocally(index);
                }
            },
            remove(index, playlist) {
                this.store.list.playlist.items.splice(index, 1);
                const localStoragePlaylist = JSON.parse(localStorage.getItem('playlistsId'));
                const localStorageIndex = localStoragePlaylist.findIndex((id) => id === playlist.id)
                localStoragePlaylist.splice(localStorageIndex, 1);
                localStorage.setItem('playlistsId', JSON.stringify(localStoragePlaylist))
            },
            removeLocally(index) {
                this.localPlaylists.splice(index, 1)
            }
        },
        components: {
            InlineCard
        }
    }
</script>

<template>
    <div class = "form-playlist">
        <span class="material-symbols-outlined form-playlist__close" @click="store.hideForm()">
            close
        </span>
        <h1 class="form-playlist__title">Enregistrer dans</h1>
        <ul v-if="existingPlaylists.length > 0" class="form-playlist__list">
            <li v-for="playlist in existingPlaylists">
                <InlineCard 
                    :id="playlist.id"
                    :title="playlist.title"
                    :edited="playlist.edited"
                    :songs="playlist.songs?.map(song => `${store.playlistIRI}/${song.id}`)"
                    :image="playlist.image"
                    @toggleEdit="toggleEdit"
                    @updateTitle="upsertPlaylist"
                    @add-song="addSong"
                    @delete-playlist="deletePlaylist"
                ></InlineCard>
            </li>
        </ul>
        <i class="form-playlist__add material-symbols-outlined" @click="$event => addLocalPlaylist()">
            add
        </i>
    </div>
</template>