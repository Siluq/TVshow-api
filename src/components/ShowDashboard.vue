<template>
  <div class="container">
    <div class="filter-container">
      <div class="filter-genre">
        <label for="genre-filter">Genres:</label>
        <select v-model="selectedGenre" id="genre-filter">
          <option value="">All</option>
          <option v-for="genre in uniqueGenres" :key="genre" :value="genre">
            {{ genre }}
          </option>
        </select>
      </div>

      <div class="filter-rating">
        <label for="rating-filter">Rating:</label>
        <select v-model="selectedRating" id="rating-filter">
          <option value="">All</option>
          <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.text }}
          </option>
        </select>
      </div>

      <div class="filter-sort">
        <label for="sort-filter">Sort by:</label>
        <select v-model="selectedSort" id="sort-filter">
          <option value="">None</option>
          <option value="alphabetical A-Z">A-Z</option>
          <option value="alphabetical Z-A">Z-A</option>
          <option value="rating 1-10">Low to High Rating</option>
          <option value="rating 10-1">High to Low Rating</option>
        </select>
      </div>

      <div class="filter-search">
        <label for="search-bar">Search:</label>
        <input
          type="text"
          id="search-bar"
          v-model="searchQuery"
          placeholder="Search shows by name"
        />
      </div>
    </div>

    <div class="show-list">
      <div v-for="show in filteredShows" :key="show.id" class="show-card">
        <router-link :to="{ name: 'ShowDetails', params: { id: show.id } }">
          <img :src="show.image.medium" :alt="show.name" />
          <div class="show-card-content">
            <h3 class="show-card-title">{{ show.name }}</h3>
            <div class="show-card-rating">
              Rating: {{ show.rating.average }}
            </div>
            <div class="show-card-genres">
              Genres: {{ show.genres.join(", ") }}
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ShowDashboard",
  data() {
    return {
      shows: [],
      searchQuery: "",
      selectedGenre: "",
      selectedRating: "",
      selectedSort: "",
      options: [
        { text: "1+", value: 1 },
        { text: "2+", value: 2 },
        { text: "3+", value: 3 },
        { text: "4+", value: 4 },
        { text: "5+", value: 5 },
        { text: "6+", value: 6 },
        { text: "7+", value: 7 },
        { text: "8+", value: 8 },
        { text: "9+", value: 9 },
        { text: "10", value: 10 },
      ],
    };
  },
  computed: {
    filteredShows() {
      let filteredShows = this.shows.filter((show) => {
        return (
          (!this.selectedGenre || show.genres.includes(this.selectedGenre)) &&
          (!this.selectedRating ||
            show.rating.average >= this.selectedRating) &&
          (!this.searchQuery ||
            show.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
        );
      });

      if (this.selectedSort === "alphabetical A-Z") {
        filteredShows.sort((a, b) => a.name.localeCompare(b.name));
      } else if (this.selectedSort === "alphabetical Z-A") {
        filteredShows.sort((a, b) => b.name.localeCompare(a.name));
      } else if (this.selectedSort === "rating 1-10") {
        filteredShows.sort((a, b) => a.rating.average - b.rating.average);
      } else if (this.selectedSort === "rating 10-1") {
        filteredShows.sort((a, b) => b.rating.average - a.rating.average);
      }

      return filteredShows;
    },
    uniqueGenres() {
      const genres = new Set();
      this.shows.forEach((show) => {
        show.genres.forEach((genre) => {
          genres.add(genre);
        });
      });
      return Array.from(genres).sort();
    },
    uniqueRatings() {
      const ratings = new Set();
      this.shows.forEach((show) => {
        if (show.rating.average) {
          ratings.add(Math.ceil(show.rating.average));
        }
      });
      return Array.from(ratings).sort();
    },
  },
  methods: {
    getShows() {
      axios
        .get("http://api.tvmaze.com/shows")
        .then((response) => {
          this.shows = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    filterShows() {
      this.filteredShows = this.shows.filter((show) => {
        return (
          (!this.selectedGenre || show.genres.includes(this.selectedGenre)) &&
          (!this.selectedRating || show.rating.average >= this.selectedRating)
        );
      });
    },
  },
  created() {
    this.getShows();
  },
};
</script>

<style>
@import url("../assets/css/styleDashboard.css");
</style>
