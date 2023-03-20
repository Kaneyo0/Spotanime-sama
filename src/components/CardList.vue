<script>
    import Card from './Card.vue';

    export default {
        props: {
            cards: {
                type: Array
            },
            title: {
                type: String
            }
        },
        components: {
            Card
        },
    }
</script>

<template>
    <article class="article">
        <h3 class="card__list__title">{{ title }}</h3>
        <ul class="card__list">
            <li class="card__list__item" v-for="card in cards">
                <Card :title="card.title" :content="card.content"/>
            </li>
        </ul>
    </article>
</template>
