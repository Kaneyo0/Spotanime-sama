<script>
    import Card from '../../../src/components./../SPOTANIME-SAMA/src/components/Card.vue';
    export default {
        props: {
            cards: {
                type: Array
            }
        },
        components: {
            Card
        }
    }
</script>

<template>
    <ul class="card-list">
        <li v-for="card in cards">
            <Card :title="feur"></Card>       
        </li>
    </ul>
</template>
