<template>
  <div class="breadcrumbs">
    <router-link to="/main" class="text-white">Вернуться к списку</router-link>
  </div>
  <div class="card">
    <div v-if="person">
      <p><strong>Фамилия:</strong> {{ person.last_name }}</p>
      <p><strong>Имя:</strong> {{ person.first_name }}</p>
      <p><strong>"Электронная почта:</strong> {{ person.email }}</p>
    </div>
    <div>
      <img src="#" title="dsa">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const id = route.params.id

    return {
      id
    }
  },
  data () {
    return {
      person: null
    }
  },
  mounted () {
    axios.get(`http://localhost:3000/people/${this.id}`)
        .then(({ data }) => {
          data && (this.person = data)
        })
  },

  name: "view"
}
</script>

<style scoped>

</style>