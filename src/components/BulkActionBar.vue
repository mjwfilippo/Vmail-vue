<script setup>
// import statements
import { computed } from "vue";
import useEmailSelection from "@/composables/use-email-selection";

// email selection states declaration
const emailSelection = useEmailSelection();
const numberSelected = computed(() => emailSelection.emails.size);
let numberEmails = computed(() => props.emails.length);
const allEmailSelected = computed(
  () => numberSelected.value === numberEmails.value
);
const someEmailsSelected = computed(
  () => numberSelected.value > 0 && numberSelected.value < numberEmails.value
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
  <div class="bulk-action-bar">
    <span class="checkbox">
      <input
        type="checkbox"
        :checked="allEmailSelected"
        :class="[someEmailsSelected ? 'partial-check' : '']"
        @click="bulkSelect"
      />
    </span>
    <span class="buttons">
      <button
        @click="emailSelection.markRead"
        :disabled="[...emailSelection.emails].every(e => e.read)"
      >
        Mark Read
      </button>
      <button
        @click="emailSelection.markUnread"
        :disabled="[...emailSelection.emails].every(e => !e.read)"
      >
        Mark Unread
      </button>
      <button @click="emailSelection.archive" :disabled="numberSelected === 0">
        Archive
      </button>
    </span>
  </div>
</template>
