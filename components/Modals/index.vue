<script setup>
import { useVfm } from 'vue-final-modal'

const vfm = useVfm()

function confirm() {
  vfm.open('confirm')
}
</script>

<template>
  <ModalsAuthorization @confirm="confirm" />
  <ModalsConfirm />
</template>

<style scoped>

</style>