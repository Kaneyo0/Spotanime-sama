<script>
    import store from '../stores/store';
    import InlineCard from './InlineCard.vue';
    export default {
        data() {
            return {
                store: store,
                currentPlaylist: {
                    id: undefined,
                    image: undefined,
                    name: undefined,
                    songs: undefined,
                    edited: true
                }
            }
        },
        methods: {
            addPlaylist() {
                this.currentPlaylist.id = Date.now();
                this.currentPlaylist.title = "test"
                this.store.list.playlist.items.push(this.currentPlaylist)
                console.log(this.store)
            }
        },
        components: {
            InlineCard
        }
    }
</script>

<template>
    <div class = "form-playlist">
        <h1 class="form-playlist__title">Enregistrer dans</h1>
        <ul v-if="this.store.list.playlist.items.length > 0" class="form-playlist__list">
            <li v-for="playlist in store.list.playlist.items">
                <InlineCard :id="playlist.id" :title="playlist.title"></InlineCard>
            </li>
        </ul>
        <i class="form-playlist__add material-symbols-outlined" @click="addPlaylist">
            add
        </i>
    </div>
</template>