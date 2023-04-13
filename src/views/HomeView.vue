<template>
  <div class="container">
    <HomeWeb />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeWeb from "@/components/HomeWeb.vue";

export default {
  name: "HomeView",
  components: {
    HomeWeb,
  },
};
</script>

<style>
.container {
  margin-top: 60px;
}
</style>
