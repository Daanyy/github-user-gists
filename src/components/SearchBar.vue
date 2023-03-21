<template>
    <div class="search-bar">
        <input name="search-item" :value="modelValue" @input="handleInput">
        <button @click="handleClick">Search</button>
    </div>
</template>

<script setup>
defineProps({
    modelValue: {
        type: String
    }
})

const emit = defineEmits(['update:modelValue', 'click'])

const handleInput = (event) => {
    emit('update:modelValue', event.target.value)
}

const handleClick = () => {
    emit('click')
}
</script>