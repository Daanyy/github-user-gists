<template>
    <div class="user-gists">
        <ul>
            <li class="user-gist" v-for="userGist in state.userGists" :key="userGist.id">
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
                <div class="gist-code"></div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { userService } from '../services/user.service';

const props = defineProps({
    modelValue: {
        type: Array
    }
})

const state = reactive({
    userGists: []
})

const generateBadges = (files) => {
    let data = []
    
    for (var key in files) {
        files[key].language ? data.push( files[key].language ) : ''
    }


    return [...new Set(data)]
}

onMounted( async () => {
    for( let i=0; i < props.modelValue.length; i++ ) {
        const gistObj = {}

        gistObj.avatar = props.modelValue[i].avatar ?? ''
        gistObj.username = props.modelValue[i].username
        gistObj.file = Object.keys(props.modelValue[i].files)[0]
        gistObj.createdAt = props.modelValue[i].createdAt
        gistObj.badges = generateBadges( props.modelValue[i].files )
        
        await userService.getUserForks(props.modelValue[i].id).then( result => {
            gistObj.forks = result.data 

            state.userGists.push( gistObj )
        } )
    }
})
</script>