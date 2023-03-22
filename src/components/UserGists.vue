<template>
    <div class="user-gists">
        <ul>
            <li class="user-gist" v-for="userGist in userGists" :key="userGist.id">
                <div class="gist-info">
                    <span v-if="userGist.owner.avatar_url" class="user-avatar" :style="`background-image: url(${userGist.owner.avatar_url})`"></span>
                    <div>
                        <p>{{ userGist.owner.login }} / {{ Object.keys(userGist.files)[0] }}</p>
                        <p>{{ userGist.created_at }}</p>
                    </div>
                    <p></p>
                </div>
                <div class="gist-forks">
                    {{ getForks( userGist.id ) }}
                </div>
                <div class="gist-code">
                    
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { userService } from '../services/user.service';

defineProps({
    userGists: {
        type: Array
    }
})

const renderForkHtml = (fork) => {
    let markup = ''

    console.log( fork, 'fork' )
}

const getForks = async ( url ) => {
    await userService.getUserForks(url).then( result => renderForkHtml( result ) ).catch( () => {} )
}
</script>