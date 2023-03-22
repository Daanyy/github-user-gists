<template>
    <div class="search-bar">
        <input name="search-item" :value="modelValue" @input="handleInput" @keyup.enter="handleClick" autocomplete="off" placeholder="Search GitHub User">
        <span class="search-button" @click="handleClick">
            <img src="./../assets/images/loupe.png">
        </span> 
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