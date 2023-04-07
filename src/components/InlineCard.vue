<script>
    import store from '../stores/store';
    export default {
        props: {
            id: {
                type: Number
            }
        },
        data() {
            return {
                edited: true,
                title: 'Ma playlist',
                image: 'none',
                store: store,
                songs: []
            }
        },
        computed: {
            toObject() {
                return { id: this.id, title: this.title, image: this.image, songs: this.songs };
            }
        },
        methods: {
            toggleEdit() {
                this.edited = !this.edited
                if (!this.edited) {
                    this.upsertPlaylist()
                }
            },
            updateTitle(ev) {
                this.title = ev.target.value;
                this.upsertPlaylist()
                this.edited = false;         
            },
            upsertPlaylist() {
                let index = this.store.list.playlist.items.findIndex((playlist) => playlist.id === this.id);
                if(index === -1) {
                    this.store.list.playlist.items.push(this.toObject);
                } else {
                    this.store.list.playlist.items[index] = this.toObject
                }
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
        }
    }
</script>
<template>
    <div :data-id=id class="inline-card" v-if="!edited" @click="addSong">
        <img :src="image" class="inline-card__img">
        <p class="inline-card__title"> {{ title }}</p>
        <i class="material-symbols-outlined" @click="toggleEdit">edit</i>
        <i class="material-symbols-outlined">delete</i>
    </div>
    <div :data-id=id class="inline-card" v-else>
        <img :src="image" class="inline-card__img">
        <input type="text" class="inline-card__title" :value="title" @change="updateTitle"> 
        <i class="material-symbols-outlined" @click="toggleEdit">done</i>
    </div>
</template>