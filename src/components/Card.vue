<script>
    export default {
        data() {
            return {
                test: {
                    title: 'feur'
                }, value: 'feur'
            }
        }
    }
</script>

<template>
    <div class="card">
        <img src="" alt="" class="card__image">
        <h1 class="card__title">{{ title }}</h1>
        <h2>{{ value }}</h2>
    </div>
</template>
