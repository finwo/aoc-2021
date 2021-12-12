<template>
  <layout>
    <div id="gamelist">
      <div v-for="g in games">
        <router-link :to="'/game/' + g.uuid">{{ g.name }}</router-link>
      </div>
    </div>
  </layout>
</template>

<style>
#gamelist {
  display: flex;
  flex-wrap: wrap;
  /* margin: -0.5rem; */
  gap: 1rem;
}
#gamelist > * {
  /* flex: 1; */
  background: var(--col-primary);
  color: #fff;
  padding: 1rem;
  /* margin: 0.5rem; */
}
#gamelist a {
  background: var(--col-primary);
  color: #fff;
}
</style>

<script lang="ts">
import { ref, onMounted } from 'vue';
import Layout from '../layout/default.vue';

export default {
  components: {Layout},
  setup() {
    const games = ref([]);

    onMounted(async () => {
      const gameResponse = await (await fetch('http://api.docker/bingo/games', { method: 'GET' })).json();
      if (gameResponse.ok) games.value = gameResponse.data;
    });

    return {
      games,
    };
  }
}
</script>
