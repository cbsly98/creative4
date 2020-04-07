<template>
<div class="home">
  <section class="resources">
    <div class="resource" v-for="resource in resources" :key="resource.id">
      <h2>{{resource.title}}</h2>
      <div class="resourceExtras">
        <p>{{resource.description}}</p>
        <p>{{resource.link}}</p>
      </div>
    </div>
  </section>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {

  name: 'Resources',
  data() {
    return {
      resources: [],
    }
  },
  created() {
    this.getResources();
  },
  methods: {
    async getResources() {
      try {
        let response = await axios.get("/api/resources");
        this.resources = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
section.resources {
  text-align: left;
  max-width: 90%;
  margin: auto;
  word-break: break-word;
}

.resourceExtras {
  margin-left: 20px;
}
</style>
