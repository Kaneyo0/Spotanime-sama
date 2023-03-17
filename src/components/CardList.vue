<script>
    // import Card from '../../../src/components./../SPOTANIME-SAMA/src/components/Card.vue';
    import Card from './Card.vue';

    export default {
        props: {
            cards: {
                type: Array
            }
        },
        components: {
            Card
        },
    }
</script>

<template>
    <div class="card__list" v-for="card in cards">
        <Card :title="card.title" :content="card.content"/>
    </div>
</template>
