<template>
  <layout>
    <div>
      <h3>Drawn numbers</h3>
      <div id="numberlist">
        <div v-for="n in game.drawn">{{ n }}</div>
      </div>
    </div>
    <div>
      <h3>Boards</h3>
      <div id="boardlist">
        <div v-for="board in boards">

        </div>
      </div>
    </div>
    Single game life
  </layout>
</template>

<style>

#numberlist {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
#numberlist > * {
  background: var(--col-primary);
  color: #fff;
  padding: 1rem;
  height: 3.5rem; /* 1.5 line height + 2 edges of padding */
  width: 3.5rem; /* making the block square */
  text-align: center;
}

#boardlist {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
#boardlist > * {
  background: var(--col-primary);
  color: #fff;
  padding: 1rem;
  font-size: 1rem;
  height: 3.5rem;
  width: 3.5rem;
  text-align: center;
}

</style>

<script lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue';
import Layout from '../layout/default.vue';

export default {
  components: {Layout},
  setup() {
    const instance = getCurrentInstance();
    const route    = instance.proxy.$root.$route;
    const { uuid } = route.params;

    console.log({uuid});

    const selected = ref([]);
    const game     = ref({});
    const boards   = ref([]);

    onMounted(async () => {
      const gameResponse  = await (await fetch(`http://api.docker/bingo/games/${uuid}`       , { method: 'GET' })).json();
      const boardResponse = await (await fetch(`http://api.docker/bingo/games/${uuid}/boards`, { method: 'GET' })).json();
      if (gameResponse.ok ) game.value   = gameResponse.data;
      if (boardResponse.ok) boards.value = boardResponse.data;
    });

    return {
      game,
      boards
    };
  }
}
</script>
