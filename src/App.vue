<script>
    import CardList from './components/CardList.vue';
    import Header from './components/Header.vue';

    export default {
        name: "App",
        data() {
            return {
                mostPlayedSongs: Array
            }
        },
        props: {
            cards: {
                type: Array
            }
        },
        components: {
            CardList,
            Header
        },  
        methods: {
            async getData() {
                try {
                    let response = await fetch("https://mmi.unilim.fr/~morap01/L250/public/index.php/api/songs?page=1");
                    this.mostPlayedSongs = await response.json();
                } catch (error) {
                    console.error(error);
                }
            }
        },
        created() {
            this.getData();
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
        <CardList :title="'Titres les plus écoutés'" :cards="mostPlayedSongs"/>
    </main>
</template>