<template>
<div>
    <button @click="onClickLowCost">Самый дешёвый</button>
    <button @click="onClickFastFlight">Самый быстрый</button>
</div>
</template>

<script>
export default {
    methods: {
        onClickLowCost() {
            this.$emit('click-tickets-low-cost');
        },
        
        onClickFastFlight() {
            this.$emit('click-tickets-fast-flight')
        },
    }
}
</script>