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
    <div class="card__bloc">
        <img class="card__playlist-add" :src="this.playlistSvg" v-show="isSongCard">
        <RouterLink :to="`${detailRoute}/${id}`" :data-id="id" class="card">
            <img :src="image" alt="card image" class="card__image">
            <h1 class="card__title">{{ title }}</h1>
        </RouterLink>
    </div>
</template>
