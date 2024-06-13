<template>
  <div>
    <Header />
    <Content />
  </div>
</template>

<script>

import Header from './views/Header.vue';
import Content from './views/Content.vue';

export default {
  components: {
    Header,
    Content,
  }
};
</script>
