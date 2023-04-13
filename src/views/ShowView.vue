<template>
  <div class="home">
    <ShowDashboard />
  </div>
</template>

<script>
// @ is an alias to /src
import ShowDashboard from "@/components/ShowDashboard.vue";

export default {
  name: "HomeView",
  components: {
    ShowDashboard,
  },
};
</script>
