<script>
    export default {
        data() {
            return {
                playlistSvg: '/assets/playlist-add.svg'
            }
        },
        props: {
            id: {
                type: Number
            },
            title: {
                type: String
            },
            image: {
                type: String,
                default: "none" // default value to remove the automatic border which is add by chrome when the src attribute is empty
            },
            isSongCard: {
                type: Boolean,
                default: false
            },
            detailRoute: {
                type: String
            }
        },
        mounted() {
            console.log(this.detailRoute)
        }
    }
</script>

<template>
    <RouterLink :to="`${detailRoute}/${id}`">
        <div :data-id="id" class="card">
            <img class="card__playlist-add" :src="this.playlistSvg" v-show="isSongCard">
            <img :src="image" alt="card image" class="card__image">
            <h1 class="card__title">{{ title }}</h1>
        </div>
    </RouterLink>
</template>
