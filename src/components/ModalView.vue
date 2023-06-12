<script setup>
// import statements
import useKeydown from "@/composables/use-keydown";

// defines emits
const emit = defineEmits(["closeModal"]);

// defines the usage of the keydown functions
useKeydown([
  {
    key: "Escape",
    fn: () => {
      emit("closeModal");
    }
  }
]);
</script>

<template>
  <div class="modal">
    <div class="overlay" @click="$emit('closeModal')"></div>
    <div class="modal-card">
      <slot />
    </div>
  </div>
</template>
