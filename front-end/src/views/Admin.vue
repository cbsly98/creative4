<template>
<div class="admin">
  <router-link to="/admin-resource">Go to Admin-Resource</router-link>
  <h1>Admin - Ritual</h1>
  <h2>Add a Ritual</h2>
  <div class="add">
    <div class="form">
      <input v-model="title" placeholder="Title">
      <p></p>
      <textarea v-model="description" placeholder="Description"></textarea>
      <p></p>
      <textarea v-model="blessings" placeholder="Blessings"></textarea>
      <p></p>
      <input v-model="frequency" placeholder="Frequency">
      <p></p>
      <input type="file" name="photo" @change="fileChanged">
      <button @click="upload">Upload</button>
    </div>
    <div class="upload" v-if="addRitual">
      <h2>{{addRitual.title}}</h2>
      <img :src="addRitual.path" />
    </div>
  </div>
  <h2>Edit/Delete a Ritual</h2>
  <div class="edit">
    <div class="form">
      <input v-model="findTitle" placeholder="Search">
      <div class="suggestions" v-if="suggestions.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectRitual(s)">{{s.title}}
        </div>
      </div>
    </div>
    <div class="upload" v-if="findRitual">
      <input v-model="findRitual.title">
      <p></p>
      <textarea v-model="findRitual.description" placeholder="add a description here..."></textarea>
      <p></p>
      <textarea v-model="findRitual.blessings" placeholder="add blessings here..."></textarea>
      <p></p>
      <input v-model="findRitual.frequency" placeholder="add a frequency here...">
      <p></p>
      <img :src="findRitual.path" />
    </div>
    <div class="actions" v-if="findRitual">
      <button @click="deleteRitual(findRitual)">Delete</button>
      <button @click="editRitual(findRitual)">Edit</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Admin',
  data() {
    return {
      title: "",
      description: "",
      blessings: "",
      frequency: "",
      file: null,
      addRitual: null,
      rituals: [],
      findTitle: "",
      findRitual: null,
      findDescription: "",
      findBlessings: "",
      findFrequency: ""
    }
  },
  created() {
    this.getRituals();
  },
  computed: {
    suggestions() {
      let rituals = this.rituals.filter(ritual => ritual.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return rituals.sort((a, b) => a.title > b.title);
    }
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/rituals', {
          title: this.title,
          description: this.description,
          blessings: this.blessings,
          frequency: this.frequency,
          path: r1.data.path
        });
        this.addRitual = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getRituals() {
      try {
        let response = await axios.get("/api/rituals");
        this.rituals = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectRitual(ritual) {
      this.findTitle = "";
      this.findDescription = "";
      this.findBlessings = "";
      this.findFrequency = "";
      this.findRitual = ritual;
    },
    async deleteRitual(ritual) {
      try {
        await axios.delete("/api/rituals/" + ritual._id);
        this.findRitual = null;
        this.getRituals();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editRitual(ritual) {
      try {
        await axios.put("/api/rituals/" + ritual._id, {
          title: this.findRitual.title,
          description: this.findRitual.description,
          blessings: this.findRitual.blessings,
          frequency: this.findRitual.frequency,
        });
        this.findRitual = null;
        this.getRituals();
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
