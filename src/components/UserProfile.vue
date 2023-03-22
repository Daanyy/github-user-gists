<template>
    <div class="user-card">
        <p v-if="loading" style="text-align: center;" >Loading..</p>
        <div v-else>
            <span v-if="userDetails.avatar" class="user-avatar" :style="`background-image: url(${userDetails.avatar})`"></span>
            <h1>{{ userDetails.name }}</h1>
            <h3>{{ userDetails.username }}</h3>
            <p>{{ userDetails.description }}</p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    userDetails: {
        type: Object
    },
    loading: {
        type: Boolean
    }
})
</script>