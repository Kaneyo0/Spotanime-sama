<script>
    import CardList from '../components/CardList.vue';
    import store from '../stores/store';
    import PlaylistForm from '../components/PlaylistForm.vue';

    export default {
        name: "App",
        data() {
            return {
                store: store
            }
        },
        components: {
            CardList,
            PlaylistForm
        },
        async created() {
            await this.store.initialize();
        }
    }
</script>

<template>
    <main class="container">
        <ul class="container__lists">
            <li class="container__lists__item" v-for="(list, name) in store.list">
                <CardList
                    v-show="list.items.length > 0"
                    :detailRoute="list.detailRoute"
                    :name="name"
                    :isSongList="name === 'songs'"
                    :title="list.title"
                    :cards="list.items">
                </CardList>
            </li>
        </ul>
    </main>
</template>