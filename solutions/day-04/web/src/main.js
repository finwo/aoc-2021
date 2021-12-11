import root from './root.vue';
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import VueNotificationList from '@dafcoe/vue-notification'
import '@dafcoe/vue-notification/dist/vue-notification.css'

import PageHome     from './page/home.vue';
import PageGame     from './page/game.vue';
import PageNotFound from './page/not-found.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/'             , component: PageHome    , name: 'Home'     , meta: { nav: true , icon: 'home'            } },
    { path: '/game'         , component: PageGame    , name: 'Game'     , meta: { nav: true , icon: 'videogame_asset' } },
    { path: '/:catchAll(.*)', component: PageNotFound, name: 'Not Found', meta: { nav: false, icon: 'error'           } },
  ]
});

const app = createApp(root);
app.use(router);
app.use(VueNotificationList);
app.mount(document.body);
