<template>
  <main>
    <h1>GitHub User Gists</h1>
    <SearchBar v-model="state.username" @click="searchUser"/>
  </main>
</template>

<script setup>
import { reactive } from 'vue';
import SearchBar from '../components/SearchBar.vue';

const state = reactive({
  username: '',
  userDetails: {
    imageProfile: '',
    fullName: '',
    username: '',
    description: '',
    gists: []
  }
})

const searchUser = () => {
  if( state.username === '' ) return

  
}

</script>