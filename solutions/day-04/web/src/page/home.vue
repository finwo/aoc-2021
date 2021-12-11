<template>
  <layout>
    This is the home page, please navigate using the left sidebar
  </layout>
</template>

<script lang="ts">
import Layout from '../layout/default.vue';

import { useNotificationStore } from '@dafcoe/vue-notification'
const { setNotification } = useNotificationStore()

export default {
  components: {Layout},
  setup() {
    setNotification({
      message             : 'Notifications will appear here',
      type                : 'success',
      showIcon            : true,
      duration            : 4e3,
      showDurationProgress: true,
      appearance          : 'light',
      dismiss             : {
        manually      : true,
        automatically : true,
      }
    });
    return;
  }

}
</script>
