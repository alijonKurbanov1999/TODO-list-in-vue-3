<template>
  <div class="form-control">
    <br>
    <label for="search"></label>
    <input type="text" placeholder="Поиск по имени" id="search" v-model.trim="search">
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
      <tr v-for="(person, idx) in peopleList" :key="person.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ person.last_name }}</td>
        <td>{{ person.first_name }}</td>
        <td>{{ person.email }}</td>
        <td>
          <router-link :to="`/table/${person.id}`">
            <button
                class="btn"
            >
              Посмотреть
            </button>
          </router-link>

          <button class="btn danger" @click="removeUser(person.id)">Удалить</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      peopleList: 'peopleList',
      search: 'search',
    }),
  },
  mounted () {
    this.$store.dispatch('initData')
  },
  methods: {
    removeUser (id) {
      const personIdx = this.peopleList.findIndex(p => p.id === id)
      this.$store.dispatch('removeUser', personIdx)

      // axios.delete(`http://localhost:3000/people/${id}`)
    }
  }
}
</script>

<style scoped>

</style>
