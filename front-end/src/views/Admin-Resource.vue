<template>
<div class="admin">
  <router-link to="/admin-ritual">Go to Admin-Ritual</router-link>
  <h1>Admin - Resource</h1>
  <h2>Add a Resource</h2>
  <div class="add">
    <div class="form">
      <input v-model="title" placeholder="Title">
      <p></p>
      <textarea v-model="description" placeholder="Description"></textarea>
      <p></p>
      <input v-model="link" placeholder="Link">
      <p></p>
      <button @click="upload">Upload</button>
    </div>
    <div class="upload" v-if="addResource">
      <h2>{{addResource.title}}</h2>
      <img :src="addResource.path" />
    </div>
  </div>
  <h2>Edit/Delete a Resource</h2>
  <div class="edit">
    <div class="form">
      <input v-model="findTitle" placeholder="Search">
      <div class="suggestions" v-if="suggestions.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectResource(s)">{{s.title}}
        </div>
      </div>
    </div>
    <div class="upload" v-if="findResource">
      <input v-model="findResource.title">
      <p></p>
      <textarea v-model="findResource.description" placeholder="add a description here..."></textarea>
      <p></p>
      <input v-model="findResource.link" placeholder="add a link here...">
    </div>
    <div class="actions" v-if="findResource">
      <button @click="deleteResource(findResource)">Delete</button>
      <button @click="editResource(findResource)">Edit</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AdminResource',
  data() {
    return {
      title: "",
      description: "",
      link: "",
      addResource: null,
      resources: [],
      findTitle: "",
      findResource: null,
      findLink: ""
    }
  },
  created() {
    this.getResources();
  },
  computed: {
    suggestions() {
      let resources = this.resources.filter(resource => resource.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return resources.sort((a, b) => a.title > b.title);
    }
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        let r2 = await axios.post('/api/resources', {
          title: this.title,
          description: this.description,
          link: this.link
        });
        this.addResource = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getResources() {
      try {
        let response = await axios.get("/api/resources");
        this.resources = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectResource(resource) {
      this.findTitle = "";
      this.findDescription = "";
      this.findLink = "";
      this.findResource = resource;
    },
    async deleteResource(resource) {
      try {
        await axios.delete("/api/resources/" + resource._id);
        this.findResource = null;
        this.getResources();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editResource(resource) {
      try {
        await axios.put("/api/resources/" + resource._id, {
          title: this.findResource.title,
          description: this.findResource.description,
          link: this.findResource.link,
        });
        this.findResource = null;
        this.getResources();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.add,
.edit {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin: auto;
  margin-bottom: 10px;
}

/* Uploaded images */
.upload h2 {
  margin: auto;
}

.upload img {
  margin: auto;
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

.admin {
  margin: auto;
  width: 300px;
  justify-content: center;
}
</style>
