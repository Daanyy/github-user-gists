<template>
    <div class="user-gists">
        <p v-if="state.loading" style="text-align: center;">Loading..</p>
        <ul v-else>
            <li class="user-gist" v-for="(userGist, index) in state.userGists" :key="userGist.id" >
                <UserGist :user-gist="userGist" :gist-code="state.code" @click="handleClick" :ref="(el) => (userGistsRef[index] = el)" />
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { userService } from '../services/user.service';
import UserGist from './UserGist.vue';

const props = defineProps({
    modelValue: {
        type: Array
    }
})

const userGistsRef = ref([])

const state = reactive({
    userGists: [],
    code: null,
    loading: false
})

const generateBadges = (files) => {
    let data = []
    
    for (var key in files) 
        files[key].language ? data.push( files[key].language ) : ''

    return [...new Set(data)]
}

const generateRowUrl = (files) => {
    let rowUrl = ''

    for (var key in files) {
        if( files[key].raw_url ) {
            rowUrl = files[key].raw_url
            break;
        }
    }
        
    return rowUrl
}

onMounted( async () => {
    state.loading = true
    for( let i=0; i < props.modelValue.length; i++ ) {
        const gistObj = {}

        gistObj.id = props.modelValue[i].id
        gistObj.avatar = props.modelValue[i].avatar ?? ''
        gistObj.username = props.modelValue[i].username
        gistObj.file = Object.keys(props.modelValue[i].files)[0]
        gistObj.createdAt = props.modelValue[i].createdAt
        gistObj.badges = generateBadges(props.modelValue[i].files)
        gistObj.rowUrl = generateRowUrl(props.modelValue[i].files)
        
        await userService.getUserForks(props.modelValue[i].id).then( result => {
            gistObj.forks = result.data 
            state.userGists.push( gistObj )
        } )
    }
    state.loading = false
})

const handleClick = async ( item ) => {
    state.code = ''

    userGistsRef.value.map( elem => elem.refreshComponent( item.id ) )

    if( item.rowUrl && item.rowUrl != '' )
        await userService.getPageContent(item.rowUrl).then( result => state.code = result.data )
}
</script>