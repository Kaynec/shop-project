<script setup lang="ts">
defineEmits(['proceed', 'cancel'])

const showCancelDialog = defineModel()
</script>

<template>
  <Modal v-model="showCancelDialog">
    <template #title>
      Are you sure?
    </template>

    <template #actions>
      <PrimaryButton class="flex-1 text-xs" @click="$emit('proceed')">
        yes
      </PrimaryButton>
      <!--  -->
      <OutlinedButton class="flex-1 text-xs" @click="$emit('cancel')">
        no
      </OutlinedButton>
    </template>
  </Modal>
</template>

<style scoped>

</style>
