<script>
    export default {
        props: {
            id: {
                type: Number
            },
            title: {
                type: String
            },
            image: {
                type: String,
                default: "none" // default value to remove the automatic border which is add by chrome when the src attribute is empty
            }
        },
        data() {
            return {
                edited: true
            }
        },
        methods: {
            toggleEdit() {
                this.edited = !this.edited
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
        <input type="text" class="inline-card__title" :placeholder="title"> 
        <i class="contact__icon material-symbols-outlined" @click="toggleEdit">done</i>
    </div>
</template>