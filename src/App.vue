<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/show">Shows</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

* {
  background-color: #141414;
  color: #e5e5e5;
}

nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 1;
}

nav a {
  text-decoration: none;
  margin-right: 1rem;
}

nav a:hover {
  text-decoration: underline;
}

nav a.router-link-exact-active {
  color: #ba8585;
}
</style>
