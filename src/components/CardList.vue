<script>
    import Card from './Card.vue';

    export default {
        props: {
            cards: {
                type: Array
            },
            title: {
                type: String
            },
            isSongList: {
                type: Boolean,
                default: false
            },
            name: {
                type: String
            },
            detailRoute: {
                type: String
            }
        },
        methods: {
            addSongToPlaylist(ev) {
                if(ev.target.classList.contains('card__playlist-add')) {
                    const card = ev.target.nextSibling;
                    this.$emit('addSongToPlaylist', card.dataset);
                }
            },
        },
        components: {
            Card
        }
    }
</script>

<template>
    <article class="card__list__container">
        <h3 class="card__list__title">{{ title }}</h3>
        <ul v-if="isSongList" @click="addSongToPlaylist" class="card__list" :data-listName="name">
            <li class="card__list__item" v-for="(card) in cards">
                <Card :detailRoute="detailRoute" :isSongCard="isSongList" :id="card.id" :title="card.title" :image="card.image"/>
            </li>
        </ul>
        <ul v-else class="card__list" :data-listName="name">
            <li class="card__list__item" v-for="(card) in cards">
                <Card :detailRoute="detailRoute" :isSongCard="isSongList" :id="card.id" :title="card.title" :image="card.image"/>
            </li>
        </ul>
    </article>
</template>
