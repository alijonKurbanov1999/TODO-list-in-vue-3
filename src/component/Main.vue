<template>
  <div class="card">
    <div class="header">
      <h1>Список пользователей</h1>
      <button class="btn primary" @click="openModal">Создать</button>
    </div>
    <RequestTable />
  </div>
  <request-modal v-if="flag"/>

</template>

<script>
import RequestModal from "./RequestModal";
import RequestTable from "./RequestTable";
import { mapGetters } from 'vuex'

export default {
  components: { RequestModal, RequestTable },
  computed: {
    ...mapGetters({
      flag: 'flag'
    })
  },
  methods: {
    openModal() {
      this.$store.dispatch('openModal', true)
    }
  }
}
</script>
