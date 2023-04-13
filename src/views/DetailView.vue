<template>
  <div class="detail">
    <h2>{{ show.name }}</h2>
    <img :src="show.image.medium" :alt="show.name" />
    <div class="info">Rating: {{ show.rating.average }}</div>
    <div class="info">Genres: {{ show.genres.join(", ") }}</div>
    <div class="info">Premiered: {{ show.premiered }} - {{ show.ended }}</div>
    <div class="info">
      Summary:
      <div v-html="show.summary"></div>
    </div>
    <div class="back">
      <router-link to="/show">[Go back]</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ShowDetail",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      show: null,
      loading: true,
    };
  },
  async created() {
    try {
      const response = await axios.get(
        `https://api.tvmaze.com/shows/${this.id}`
      );
      this.show = response.data;
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style>
.detail {
  display: block;
  margin: 60px auto;
  width: 33%;
  flex-direction: column;
  border: solid 1px #ba8585;
  overflow: hidden;
}

@media (max-width: 768px) {
  .detail {
    width: auto;
  }
}

.info {
  padding: 10px;
  text-align: start;
  border: solid 1px #ba8585;
}

.back {
  padding: 5px;
  margin: auto;
}

.back a:hover {
  color: #ba8585;
}
</style>
