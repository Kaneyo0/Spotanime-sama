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
                default: '/assets/playlist.svg'
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
                    name: this.title,
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
                this.toBodyRequest.name = ev.target.value
                this.$emit('updateTitle', this.toBodyRequest)
            },
            addSong(ev) {
                if(ev.target.className.includes('inline-card')) {
                    this.$emit('add-song', this.toBodyRequest)
                }
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
        <div class="inline-card__content">
            <span class="material-symbols-outlined inline-card__content__img">queue_music</span>
            <p class="inline-card__content__title">{{ title }}</p>
        </div>
        <div class="inline-card__buttons">
            <i class="material-symbols-outlined" @click="$emit('toggleEdit', this.toBodyRequest)">edit</i>
            <i class="material-symbols-outlined">delete</i>
        </div>
    </div>
    <div :data-id=id class="inline-card" v-else>
        <div class="inline-card__content">
            <span class="material-symbols-outlined">queue_music</span>
            <input type="text" class="inline-card__title" :value="title" @change="updateTitle"> 
        </div>
        <div class="inline-card__buttons">
            <i class="material-symbols-outlined" @click="$emit('toggleEdit', this.toBodyRequest)">done</i>
        </div>
    </div>
</template>