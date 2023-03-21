<script>
    export default {
        data() {
            return {
                albumContent: String
            }
        },
        props: {
            title: {
                type: String
            },
            album: {
                type: String
            }
        },  
        methods: {
            async getData() {
                try {
                    let response = await fetch(`https://mmi.unilim.fr${this.album}`);
                    this.albumContent = await response.json();
                    console.log(this.albumContent);
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
    <div class="card">
        <img :src="albumContent.image" alt="" class="card__image">
        <h1 class="card__title">{{ title }}</h1>
    </div>
</template>
