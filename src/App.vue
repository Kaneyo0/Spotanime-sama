<script>
    import CardList from './components/CardList.vue';
    import Header from './components/Header.vue';

    export default {
        name: "App",
        props: {
            cards: {
                type: Array
            }
        },
        components: {
            CardList,
            Header
        },
    }
</script>

<template>
    <Header></Header>
    <main class="container">
        <CardList :title="'Mes playlist'" :cards="[
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
        <CardList :title="'Album en tendance'" :cards="[
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
        <CardList :title="'Titres les plus écoutés'" :cards="[
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
    </main>
</template>