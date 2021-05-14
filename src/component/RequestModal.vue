<template>
  <div class="modal-backdrop" @click="$emit('cancel')"></div>
    <div class="modal" @submit.prevent="CreateList">
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
      <button class="btn primary" @click="CreateList" :disabled="complete">Создать</button>
    </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  emits:['Create-list', 'cancel'],
  props:['lastName', 'firstName', 'email'],
  setup(props, {emit}) {
    const lastName = ref('')
    const firstName = ref('')
    const email = ref('')
    const CreateList = () => {
      emit('Create-list', {
        last_name: lastName.value,
        first_name: firstName.value,
        email: email.value
      })
      lastName.value = ''
      firstName.value = ''
      email.value = ''

    }
    return{
      lastName, firstName, email,
      CreateList,
      complete: computed(()=> lastName.value && firstName.value === '')
    }
  }
}
</script>

<style scoped>

</style>
