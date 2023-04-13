<template>
  <div class="hello">
    <h1>Welkome</h1>
    <p>Bij deze de technische opdracht voor de rol Front-end developer.</p>
  </div>
  <div class="foto">
    <h2>Met vriendelijke groet, <br />Sam Boesjes</h2>
    <img
      src="https://www.dropbox.com/s/q89oj5egzvn3efa/DR_03.jpg?raw=1"
      alt="Sam picture"
    />
  </div>
</template>

<script>
export default {
  name: "HomeWeb",
  props: {},
};
</script>

<style>
.foto {
  object-fit: contain;
  margin: auto;
}
img {
  width: 25%;
}
</style>
