<script>
    import CardList from './components/CardList.vue';

    export default {
        name: "App",
        props: {
            cards: {
                type: Array
            }
        },
        components: {
            CardList
        },
    }
</script>

<template>
    <CardList :cards="[
                {
                    title: 'FEUR',
                    content: 'feur content'
                },
                {
                    title: 'FEUR',
                    content: 'feur content'
                },
                {
                    title: 'FEUR',
                    content: 'feur content'
                },
                {
                    title: 'FEUR',
                    content: 'feur content'
                }
            ]"/>
</template>