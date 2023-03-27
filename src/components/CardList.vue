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
        components: {
            Card
        }
    }
</script>

<template>
    <article class="card__list__container">
        <h3 class="card__list__title">{{ title }}</h3>
        <ul class="card__list" :data-name="name">
            <li class="card__list__item" v-for="(card) in cards">
                <Card :detailRoute="detailRoute" :isSongCard="isSongList" :id="card.id" :title="card.title" :image="card.image"/>
            </li>
        </ul>
    </article>
</template>
