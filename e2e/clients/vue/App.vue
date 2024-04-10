<template>
  <dashboard :BigDeal="BigDeal" />
</template>

<script>
import Vue from 'vue'
import BigDeal from '@BigDeal/core'
import { Dashboard } from '@BigDeal/vue'

export default {
  name: 'App',
  components: {
    Dashboard,
  },
  computed: {
    BigDeal: () => new BigDeal(),
  },
}
</script>

<style src="@BigDeal/core/dist/style.css"></style>
<style src="@BigDeal/dashboard/dist/style.css"></style>
