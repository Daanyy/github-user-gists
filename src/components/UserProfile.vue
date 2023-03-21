<template>
    <div class="user-card">
        <span v-if="userDetails.avatar" class="user-avatar" :style="`background-image: url(${userDetails.avatar})`"></span>
        <h1>{{ userDetails.name }}</h1>
        <h3>{{ userDetails.username }}</h3>
        <p>{{ userDetails.description }}</p>
    </div>
</template>

<script setup>
defineProps({
    userDetails: {
        type: Object
    }
})
</script>