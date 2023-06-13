<script setup>
// import statements
import { computed } from "vue";
import useEmailSelection from "@/composables/use-email-selection";

// email selection states declaration
const emailSelection = useEmailSelection();
const numberSelected = computed(() => emailSelection.emails.size);
let numberEmails = props.emails.length;
const allEmailSelected = computed(() => numberSelected.value === numberEmails);
const someEmailsSelected = computed(
  () => numberSelected.value > 0 && numberSelected.value < numberEmails
);

// function definition
const bulkSelect = () => {
  if (allEmailSelected.value) {
    emailSelection.clear();
  } else {
    emailSelection.addMultiple(props.emails);
  }
};

// defines props
const props = defineProps({
  emails: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div>
    <input
      type="checkbox"
      :checked="allEmailSelected"
      :class="[someEmailsSelected ? 'partial-check' : '']"
      @click="bulkSelect"
    />
  </div>
</template>
