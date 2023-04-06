<script>
    import store from '../stores/store';
    export default {
        props: {
            id: {
                type: Number
            }
        },
        data() {
            return {
                edited: true,
                title: 'Ma playlist',
                image: 'none',
                store: store
            }
        },
        computed: {
            toObject() {
                return { id: this.id, title: this.title, image: this.image };
            }
        },
        methods: {
            toggleEdit() {
                this.edited = !this.edited
                if (!this.edited) {
                    this.upsertPlaylist()
                }
            },
            updateTitle(ev) {
                this.title = ev.target.value;
                this.upsertPlaylist()
                this.edited = false;         
            },
            upsertPlaylist() {
                let index = this.store.list.playlist.items.findIndex((playlist) => playlist.id === this.id);
                console.log(index)
                if(index === -1) {
                    this.store.list.playlist.items.push(this.toObject);
                } else {
                    this.store.list.playlist.items[index] = this.toObject
                }
            }
        }
    }
</script>
<template>
    <div :data-id=id class="inline-card" v-if="!edited">
        <img :src="image" class="inline-card__img">
        <p class="inline-card__title"> {{ title }}</p>
        <i class="contact__icon material-symbols-outlined" @click="toggleEdit">edit</i>
        <i class="contact__icon material-symbols-outlined">delete</i>
    </div>
    <div :data-id=id class="inline-card" v-else>
        <img :src="image" class="inline-card__img">
        <input type="text" class="inline-card__title" :value="title" @change="updateTitle"> 
        <i class="contact__icon material-symbols-outlined" @click="toggleEdit">done</i>
    </div>
</template>