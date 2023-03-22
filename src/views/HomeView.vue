<template>
  <main>
    <SearchBar v-model="state.username" @click="searchUser"/>
    <div class="user-details">
        <UserProfile :user-details="state.userDetails" :loading="state.gettingUserDetails"/>
        <UserGists v-if="state.userGists.length > 0" v-model="state.userGists" />
    </div>
  </main>
</template>

<script setup>
import { reactive } from 'vue';
import SearchBar from '../components/SearchBar.vue';
import UserGists from '../components/UserGists.vue';
import UserProfile from '../components/UserProfile.vue';
import { userService } from '../services/user.service';

const state = reactive({
  username: '',
  userDetails: {},
  userGists: [],
  gettingUserDetails: false,
  gettingUserGigst: false
})

const mapUserDetails = (userDetails) => {
  state.userDetails.avatar = userDetails.avatar_url ?? ''
  state.userDetails.name = userDetails.name
  state.userDetails.username = userDetails.login
  state.userDetails.description = userDetails.bio
}

const parseUserGists = ( gists ) => {
  gists.map( async gist => {
    const gistObj = {}

    gistObj.id = gist.id
    gistObj.avatar = gist.owner.avatar_url ?? ''
    gistObj.username = gist.owner.login
    gistObj.files = gist.files
    gistObj.createdAt = gist.created_at

    state.userGists.push( gistObj )
  })
}

const searchUser = async () => {
  if( state.username === '' ) return

  state.userGists = []
  state.gettingUserDetails = state.gettingUserGigst = true

  await userService.getUserDetails(state.username).then( result => mapUserDetails( result.data ) ).catch( err => alert( err.response.data.message ) ).finally( () => state.gettingUserDetails = false )
  
  await userService.getUserGists(state.username).then( 
    result => parseUserGists(result.data) 
  )
  .catch( err => alert( err.response.data.message ) 
  )
  .finally( ()=> state.gettingUserGigst = false )

  state.username = ''
}
</script>