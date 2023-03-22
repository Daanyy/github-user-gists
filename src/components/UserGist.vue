<template>
    <div class="gist-wrapper" @click="handleClick(userGist)">
        <div class="gist-info">
            <span v-if="userGist.avatar" class="user-avatar" :style="`background-image: url(${userGist.avatar})`"></span>
            <div class="gist-user-details">
                <p>{{ userGist.username }} / {{ userGist.file }}</p>
                <p>{{ userGist.createdAt }}</p>
            </div>
            <p v-if="userGist.badges.length > 0" class="gist-badge">
                <span v-for="(badge, index) in userGist.badges" :key="index" class="badge">{{ badge }}</span>
            </p>
        </div>
        <div v-if="userGist.forks.length > 0" class="gist-forks">
            <span>Forked by: </span>
            <p v-for="(fork, index) in userGist.forks" :key="index" class="user-fork">
                <span v-if="fork.owner.avatar_url" class="user-avatar" :style="`background-image: url(${fork.owner.avatar_url})`"></span>
                <span v-if="fork.owner.login" class="user-login" >{{ fork.owner.login }}</span>
            </p>
        </div>
        <div v-if="isToggled && gistCode" class="gist-code">
            <pre>{{ gistCode }}</pre>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    userGist: {
        type: Object
    },
    gistCode: {
        type: String
    },
    loading: {
        type: Boolean
    }
})

const isToggled = ref(false)

const emit = defineEmits(['click'])

const handleClick = (item) => {
    isToggled.value = !isToggled.value
    
    emit('click', item)
}

const refreshComponent = ( id ) => {
    if( id !== props.userGist.id ) {
        isToggled.value = false
    }
}
defineExpose({refreshComponent})
</script>