<script setup>
// import statements
import { format } from "date-fns";
import { marked } from "marked";
import { mangle } from "marked-mangle";
import { gfmHeadingId } from "marked-gfm-heading-id";

// config so marked doesn't give stupid errors
marked.use(mangle());
marked.use(gfmHeadingId());

// define props
defineProps({
  email: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="email-display">
    <h2 class="mb-0">
      Subject: <strong>{{ email.subject }}</strong>
    </h2>
    <div>
      <em
        >From {{ email.from }} on
        {{ format(new Date(email.sentAt), "MMM do yyyy") }}</em
      >
    </div>
    <div v-html="marked(email.body)" />
  </div>
</template>

<style scoped></style>
