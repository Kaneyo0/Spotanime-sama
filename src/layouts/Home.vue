<script>
    import CardList from '../components/CardList.vue';
    import store from '../stores/store';

    export default {
        name: "App",
        data() {
            return {
                store: store
            }
        },
        components: {
            CardList
        },
        async created() {
            await this.store.initialize();
        },
        mounted() {
            document.querySelector("[data-name='songs']").addEventListener('click', (ev) => {
                if(ev.target.classList.contains('card__playlist-add')) {
                    const card = ev.target.closest('.card');
                    this.store.add(card.dataset.id)
                }
            })
        }
    }
</script>

<template>
    <main class="container">
        <ul class="container__lists">
            <li class="container__lists__item" v-for="(list, name) in store.list">
                <CardList v-show="list.items.length > 0" :detailRoute="list.detailRoute" :name="name" :isSongList="name === 'songs'" :title="list.title" :cards="list.items"></CardList>
            </li>
        </ul>
    </main>
</template>