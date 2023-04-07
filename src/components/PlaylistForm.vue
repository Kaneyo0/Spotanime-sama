<script>
    import InlineCard from './InlineCard.vue';
    import store from '../stores/store';
    export default {
        data() {
            return {
                playlists: [],
                store: store
            }
        },
        methods: {
            addPlaylist() {
                this.playlists.push(Date.now())
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
        <ul v-if="playlists.length > 0" class="form-playlist__list">
            <li v-for="id in playlists">
                <InlineCard :id="id"></InlineCard>
            </li>
        </ul>
        <i class="form-playlist__add material-symbols-outlined" @click="addPlaylist">
            add
        </i>
    </div>
</template>