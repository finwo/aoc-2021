<template>
  <layout>
    <p>
      The resource you've requested could not be found.<br/><br/>
      <router-link :to="$router.resolve({ name: 'Home' })">Click here to go to the home page</router-link>
    </p>
  </layout>
</template>

<script lang="ts">
import Layout from '../layout/default.vue';
export default {
  components: {Layout},
}
</script>
