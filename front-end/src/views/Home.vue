<template>
<div class="home">
  <h1>Rituals of Connection</h1>
  <p>“A ritual is a structured event or routine that you each enjoy and depend on and that both reflects and reinforces your sense of togetherness.”</p>
  <p><em>- John Gottman</em></p>
  <p></p>
  <br />
  <br />
  <p>This website is designed to give ideas of what rituals you could begin in your own relationship. Click on Rituals to see what other couples have done. Click Resources to find more information on rituals.</p>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {

  name: 'Home',
  data() {
    return {
      items: [],
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.home {
  width: 80%;
  margin: auto;
  font-size: 1.5em;
}

.image h2 {
  font-style: italic;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
  border: 2px black solid;
  padding: 5px;
}

.image p {
  font-size: .75em;
}

.image img {
  width: 100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>
