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
      <tr v-if="Filters.length === 0"><td colspan="5">СПИСОК ПУСТЬ!</td></tr>
      <tr v-else v-for="(person, idx) in Filters" :key="person.id">
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
  data() {
    return {
      search: ''
    }
  },
  computed: {
    ...mapGetters({
      peopleList: 'peopleList',
    }),
    Filters () {
      console.clear()
      return this.peopleList
          .filter(p => {
            return this.search ? p.first_name.toLowerCase().includes(this.search.toLowerCase()) : true
          })
    }
  },
  mounted () {
    this.$store.dispatch('initData')
  },
  methods: {
    removeUser (id) {
      this.$store.dispatch('removeUser', id)
    }
  }
}
</script>

<style scoped>

</style>
