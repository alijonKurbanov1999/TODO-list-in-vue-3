<template>
  <div class="card">
    <div class="header">
      <h1>Список пользователей</h1>
      <button class="btn primary" @click="flag = true">Создать</button>
    </div>
    <RequestTable />
  </div>
  <request-modal v-if="flag"/>

</template>

<script>
import RequestModal from "./RequestModal";
import RequestTable from "./RequestTable";
import {ref} from "vue";
export default {
  components: { RequestModal, RequestTable },
  setup() {
    const flag = ref(false)
    return{
      flag
    }
  }
}
</script>
