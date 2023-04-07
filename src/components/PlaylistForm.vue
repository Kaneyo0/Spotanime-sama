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
                const playlist = this.store.list.playlist.items.find((playlist) => playlist.id === playlistData.id);
                playlist.edited = !playlist.edited
                if (!playlist.edited) {
                    this.upsertPlaylist(playlistData)
                }
            },
            updateTitle(playlistData) {
                // 
                this.upsertPlaylist(playlistData)
                // playlist.edited = false;         
            },
            upsertPlaylist(playlistData) {
                // check if playlist already exists
                let index = this.store.list.playlist.items.findIndex((item) => item.id === playlistData.id);
                if(index === -1) {
                    // if not, we put it in the store to update all list which referer to the new playlist
                    this.store.list.playlist.items.push(playlistData);
                    // we remove playlist from local playlists
                    let localIndex = this.localPlaylists.findIndex((item) => item.id === playlistData.id);
                    this.localPlaylists.splice(localIndex, 1);
                } else {
                    /* let inlineCard = this.localPlaylists.find((playlist) => playlist.id === playlistData.id);
                    inlineCard = playlistData; */
                    this.store.list.playlist.items[index] = playlistData
                }
                console.log(this.store.list.playlist.items)
                localStorage.setItem('playlists', JSON.stringify(this.store.list.playlist.items));
            },
            addSong(ev) {
                if(ev.target.className.includes('inline-card')) {
                    if(!this.songs.some(song => song.id === this.store.clickedSong.id)) {
                        this.songs.push(this.store.clickedSong);
                        this.upsertPlaylist();
                    }
            
                    this.store.hideForm();
                }
            
            }
        },
        components: {
            InlineCard
        },
        mounted() {
            for (const playlist in this.localPlaylists) {
                this.addLocalPlaylist(playlist)
            }
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
                    :songs="playlist.song"
                    :image="playlist.image"
                    @toggleEdit="toggleEdit"
                    @updateTitle="updateTitle"
                ></InlineCard>
            </li>
        </ul>
        <i class="form-playlist__add material-symbols-outlined" @click="$event => addLocalPlaylist()">
            add
        </i>
    </div>
</template>