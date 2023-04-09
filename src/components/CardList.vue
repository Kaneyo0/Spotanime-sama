<script>
    import Card from './Card.vue';
    import store from '../stores/store';
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
        data() {
            return {
                store: store
            }
        },
        computed: {
            canRemovingCard() {
                return this.$route.name === 'playlist details'
            }
        },
        methods: {
            cardClickHandler(ev) {
                const cardBloc = ev.target.closest('.card__bloc');
                if (!cardBloc) return;
                const domCard = cardBloc.querySelector('.card')
                const card = this.cards.find((card) => card.id === parseInt(domCard.dataset.id));
                this.store.clickedSong = `${this.store.playlistIRI}/${card.id}`;
                if(ev.target.classList.contains('card__playlist-add')) {
                    this.store.showForm()
                } else if(ev.target.classList.contains('card__playlist-rm')) {
                    this.removeSongFromPlaylist(card)
                }
            },

            removeSongFromPlaylist(card) {
                const playlistIndex = this.store.list.playlist.items
                        .findIndex(playlist => playlist.id === parseInt(this.$route.params.id));
                    let currentPlaylist = this.store.list.playlist.items[playlistIndex];
                    const songIndex = currentPlaylist.songs
                        .findIndex(song => song.id === card.id);
                    currentPlaylist.songs.splice(songIndex, 1);
                    this.store.list.playlist.items[playlistIndex] = currentPlaylist;
                    this.store.patchPlaylist({
                        ...currentPlaylist,
                        songs: currentPlaylist.songs.map(card => `${this.store.playlistIRI}/${card.id}`)
                    });
                    this.$emit('reload');
            }
        },
        components: {
            Card
        }
    }
</script>

<template>
    <article class="card__list__container">
        <h3 class="card__list__title">{{ title }}</h3>
        <ul v-if="isSongList" @click="cardClickHandler" class="card__list" :data-listName="name">
            <li class="card__list__item" v-for="(card) in cards">
                <Card :detailRoute="detailRoute" :isSongCard="isSongList" :canBeRemove="canRemovingCard" :id="card.id" :title="card.title" :image="card.image"/>
            </li>
        </ul>
        <ul v-else class="card__list" :data-listName="name">
            <li class="card__list__item" v-for="(card) in cards">
                <Card :detailRoute="detailRoute" :isSongCard="isSongList" :canBeRemove="canRemovingCard" :id="card.id" :title="card.title" :image="card.image"/>
            </li>
        </ul>
    </article>
</template>
