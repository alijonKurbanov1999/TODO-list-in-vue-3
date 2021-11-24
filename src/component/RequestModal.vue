<template>
  <div class="modal-backdrop" @click="cancelModal"></div>
  <form class="modal" @submit.prevent="createUser">
    <div class="form-control">
      <label for="lastName">Фамилия</label>
      <input type="text" id="lastName" v-model.trim="lastName">
    </div>

    <div class="form-control">
      <label for="name">Имя</label>
      <input type="text" id="name" v-model.trim="firstName">
    </div>

    <div class="form-control" >
      <label for="Email">E-mail</label>
      <input type="email" id="Email" v-model.trim="email">
    </div>
    <button class="btn primary" type="submit" :disabled="complete">Создать</button>
    <button class="btn danger" @click="cancelModal" >Отменить</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      lastName: '',
      firstName: '',
      email: ''
    }
  },
  computed: {
    complete() {
      return this.lastName && this.firstName && this.email === ''
    }
  },
  methods: {
    createUser() {
      this.$store.dispatch('createUser', {
        last_name: this.lastName,
        first_name: this.firstName,
        email: this.email
      })
      this.lastName = ''
      this.firstName = ''
      this.email = ''
      this.cancelModal()
    },
    cancelModal() {
      this.$store.dispatch('cancelModal', false)
    }
  }
}
</script>

<style scoped>

</style>
