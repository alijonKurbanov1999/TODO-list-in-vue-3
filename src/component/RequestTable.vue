<template>
  <div class="form-control">
    <br>
    <label for="search"></label>
    <input type="text" placeholder="Поиск по имени" id="search" v-model.trim="filter">
    <hr/>
    <table class="table">
      <thead>
      <tr>
        <th>№</th>
        <th>Фамилия</th>
        <th>Имя</th>
        <th>E-mail</th>
        <th>Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(person, idx) in Filters" :key="person.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ person.last_name }}</td>
        <td>{{ person.first_name }}</td>
        <td>{{ person.email }}</td>
        <td>
          <button
              @click="goToViewTable(person.id)"
              class="btn"
          >
            Посмотреть
          </button>
          <button class="btn danger" @click="remove(person.id)">Удалить</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const filter = ref('')
    const router = useRouter()

    const goToViewTable = (id) => {
      router.push(`/table/${id}`)
    }

    return {
      filter,
      goToViewTable
    }
  },
  data() {
    return {
      peopleList: []
    }
  },
  computed: {
    Filters () {
      console.clear()
      console.log('filter', this.filter)
      return this.peopleList
          .filter(p => {
        return this.filter ? p.first_name.toLowerCase().includes(this.filter.toLowerCase()) : true
      })
    }
  },
  mounted () {
    axios.get('http://localhost:3000/people').then(({ data }) => {
      this.peopleList = data
    })

  },
  methods: {
    remove (id) {
      const personIdx = this.peopleList.findIndex(p => p.id === id)
      this.peopleList.splice(personIdx, 1)

      // axios.delete(`http://localhost:3000/people/${id}`)
    }
  }
}
</script>

<style scoped>

</style>