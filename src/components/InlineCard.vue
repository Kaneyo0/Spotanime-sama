<script>
    import store from '../stores/store';
    export default {
        props: {
            id: {
                type: Number
            },
            edited: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: 'Ma playlist'
            },
            image: {
                type: String,
                default: 'none'
            },
            songs: {
                type: Array,
                default: []
            }
        },
        computed: {
            toBodyRequest() {
                return { 
                    id: this.id,
                    edited: this.edited,
                    title: this.title,
                    image: this.image,
                    songs: this.songs,
                    toJSON() {
                        delete this.edited
                        return this;
                    }
                }
            }
        },
        methods: {
            updateTitle(ev) {
                this.toBodyRequest.title = ev.target.value
                this.$emit('updateTitle', this.toBodyRequest)
            }
        },
        data() {
            return {
                store: store
            }
        }
    }
</script>
<template>
    <div :data-id=id class="inline-card" v-if="!edited" @click="addSong">
        <img :src="image" class="inline-card__img">
        <p class="inline-card__title"> {{ title }}</p>
        <i class="material-symbols-outlined" @click="$emit('toggleEdit', this.toBodyRequest)">edit</i>
        <i class="material-symbols-outlined">delete</i>
    </div>
    <div :data-id=id class="inline-card" v-else>
        <img :src="image" class="inline-card__img">
        <input type="text" class="inline-card__title" :value="title" @change="updateTitle"> 
        <i class="material-symbols-outlined" @click="$emit('toggleEdit', this.toBodyRequest)">done</i>
    </div>
</template>