<template>
<div class="home">
  <section class="gallery">
    <div class="image" v-for="ritual in rituals" :key="ritual.id">
      <h2>{{ritual.title}}</h2>
      <img :src="ritual.path" />
      <p><strong>Description:</strong><br />{{ritual.description}}</p>
      <p><strong>Blessings:</strong><br />{{ritual.blessings}}</p>
      <p><strong>Frequency:</strong> {{ritual.frequency}}</p>
    </div>
  </section>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {

  name: 'Rituals',
  data() {
    return {
      rituals: [],
    }
  },
  created() {
    this.getRituals();
  },
  methods: {
    async getRituals() {
      try {
        let response = await axios.get("/api/rituals");
        this.rituals = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.gallery {
  display: flex;
  margin: auto;
  justify-content: center;
  flex-wrap: wrap;
}

.image h2 {
  font-style: italic;
  margin-bottom: 0px;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  padding: 5px;
}

.image p {
  font-size: .75em;
}

.image img {
  height: 250px;
  width: 200px;
  -o-object-fit: cover;
  object-fit: cover;
}
</style>
