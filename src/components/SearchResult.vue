<script>
    export default {
        props: {
            id: {
                type: Number
            },
            value: {
                type: String
            },
            detailRoute: {
                type: String
            }
        }
    }
</script>

<template>
    <li>
        <RouterLink :to="`${detailRoute}/${id}`" :data-id="id" :data-title="value" class="header__search-result"> {{ value }} </RouterLink> 
    </li>
</template>