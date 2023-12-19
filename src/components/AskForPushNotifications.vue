<script setup lang="ts">
defineEmits(['proceed', 'cancel'])

const showCancelDialog = defineModel()
</script>

<template>
  <Modal v-model="showCancelDialog">
    <template #title>
      Allow Push Notifications To Get Updated When Your Order Status Is Done
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
