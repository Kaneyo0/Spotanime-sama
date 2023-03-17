<script>
    export default {
        props: {
            title: {
                type: String
            },
            content: {
                type: String
            }
        }
    }
</script>

<template>
    <div class="card">
        <img src="" alt="" class="card__image">
        <h1 class="card__title">{{ title }}</h1>
        <p>{{ content }}</p>
    </div>
</template>
