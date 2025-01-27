<template>
    <div v-if="authenticatedItem">
        LoggedIn: {{ userItem?.username }}
        <button type="button" v-on:click="logout">Logout</button>
    </div>
    <div v-else>
        Unauthorized
    </div>
</template>


<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth/auth';
import { storeToRefs } from 'pinia';
const authStore = useAuthStore();

const { authenticated: authenticatedItem, user: userItem } =
  storeToRefs(authStore);

const logout = () => authStore.logout();

</script>
