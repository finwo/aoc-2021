<template>
  <nav :class="isOpen ? 'open' : ''" >
    <div class="brand">
      <center>
        <img src="/assets/logo.png">
        <h3>Product</h3>
      </center>
    </div>
    <ul>
      <template v-for="route in $router.getRoutes()">
        <li v-if="route.meta.nav">
          <router-link :to="route.path"><icon>{{ route.meta.icon }}</icon><span>{{ route.name }}</span></router-link>
        </li>
      </template>
    </ul>
  </nav>
  <div class="topbar">
    <div>
      <a href="#!" @click.prevent="toggleMenu" v-if="isOpen"><icon>navigate_before</icon></a>
      <a href="#!" @click.prevent="toggleMenu" v-if="!isOpen"><icon>menu</icon></a>
    </div>
    <div class="grow"><h4>{{ $route.name }}</h4></div>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
ul, li {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
svg.feather,
.material-icons,
.material-icons-round {
  margin-right: 0.5rem;
}
ul {
  margin: 1rem;
}
li a {
  border-radius: 0.25rem;
  padding: 0.5em;
  display: block;
}
li a > * {
  vertical-align: middle;
}
li a.router-link-active {
  background: #FFF3;
}
li a:hover {
  background: #FFF6;
}
nav {
  background: var(--col-primary);
  color: var(--col-text-icons);
  position: fixed;
  overflow: auto;
  left: -15rem;
  top: 0;
  height: 100vh;
  transition: left 200ms ease;
  width: 15rem;
}
nav.open {
  left: 0;
}

.brand img {
  width: 50%;
  /* border-radius: 50%; */
  margin-top: 3rem;
}

.topbar {
  background: #FFF;
  display: flex;
  padding: 0.5em;
  border-bottom: 1px solid #DDD;
}
.topbar .grow {
  flex-grow: 1;
}
.topbar .grow * {
  margin: 0;
}
</style>

<style>
body {
  position: relative;
  transition: margin-left 200ms ease;
  margin-left: 0;
}
body.menu-opened {
  margin-left: 15rem;
}
</style>

<script lang="ts">

import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue';
import Icon from './icon.vue';

export default {
  components: {Icon},
  setup() {
    // 1920 / 2 = 960
    // Leaving room for window borders, so chose 920
    // Allows 2 windows side-by-side in open mode
    const initialState = window.innerWidth >= 920;

    // Nicely setup & remove class
    // This component IS NOT CLEAN
    onMounted(() => {
      const bdyClassList = document.body.className.split(' ').filter(n => n && n !== 'menu-opened');
      if (initialState) bdyClassList.push('menu-opened');
      document.body.className = bdyClassList.join(' ');
    });
    onUnmounted(() => {
      const bdyClassList = document.body.className.split(' ').filter(n => n && n !== 'menu-opened');
      document.body.className = bdyClassList.join(' ');
    });

    return {
      isOpen: ref(initialState),

      toggleMenu() {
        this.isOpen = !this.isOpen;
        const bdyClassList = document.body.className.split(' ').filter(n => n && n !== 'menu-opened');
        if (this.isOpen) bdyClassList.push('menu-opened');
        document.body.className = bdyClassList.join(' ');
      },

    };
  },

};
</script>
