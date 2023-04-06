<script>
    import InlineCard from './InlineCard.vue';
    export default {
        data() {
            return {
                playlists: []
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