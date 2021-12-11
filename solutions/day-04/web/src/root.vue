<template>
  <router-view/>
  <vue-notification-list position="bottom-right"></vue-notification-list>
</template>

<script lang="ts">
import { ref } from 'vue';
import { lock, unlock } from 'nlock';

export default {

};
</script>
