<script>
    export default {
        props: {
            id: {
                type: Number
            },
            title: {
                type: String
            },
            image: {
                type: String
            },
            isSongCard: {
                type: Boolean,
                default: false
            },
            detailRoute: {
                type: String
            },
            canBeRemove: {
                type: Boolean
            }
        }
    }
</script>

<template>
    <div class="card__bloc">
        <i v-if="canBeRemove" class="material-symbols-outlined card__playlist-rm" v-show="isSongCard">delete</i>
        <span v-else class="material-symbols-outlined card__playlist-add" v-show="isSongCard">playlist_add</span>
        <RouterLink :to="`${detailRoute}/${id}`" :data-id="id" :data-title="title" :data-image="image" class="card">
            <img v-if="image?.includes(`/`)" :src="image" alt="card image" class="card__image" v-show="image != ''">
            <span v-else class="material-symbols-outlined card__icon">{{ image }}</span>
            <h1 class="card__title">{{ title }}</h1>
        </RouterLink>
    </div>
</template>
