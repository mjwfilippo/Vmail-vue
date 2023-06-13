<script setup>
// import statements
import { toRefs } from "vue";
import { format } from "date-fns";
import { marked } from "marked";
import { mangle } from "marked-mangle";
import { gfmHeadingId } from "marked-gfm-heading-id";
import useKeydown from "@/composables/use-keydown";

// config so marked doesn't give stupid errors
marked.use(mangle());
marked.use(gfmHeadingId());

// defines emits
const emit = defineEmits(["closeModal", "changeEmail"]);

// defines props
const props = defineProps({
  email: {
    type: Object,
    required: true
  }
});

const { email } = toRefs(props); // defines ref prop for the button functions

// button functions
const toggleArchive = () => {
  emit("changeEmail", { toggleArchive: true, save: true, closeModal: true });
};

const toggleRead = () => {
  emit("changeEmail", { toggleRead: true, save: true });
};

const goNewer = () => {
  emit("changeEmail", { changeIndex: -1 });
};

const goOlder = () => {
  emit("changeEmail", { changeIndex: 1 });
};

const goNewerAndArchive = () => {
  emit("changeEmail", { changeIndex: -1, toggleArchive: true, save: true });
};

const goOlderAndArchive = () => {
  emit("changeEmail", { changeIndex: 1, toggleArchive: true, save: true });
};

// keydown functions
useKeydown([
  { key: "e", fn: toggleArchive },
  { key: "r", fn: toggleRead },
  { key: "k", fn: goNewer },
  { key: "j", fn: goOlder },
  { key: "[", fn: goNewerAndArchive },
  { key: "]", fn: goOlderAndArchive }
]);
</script>

<template>
  <div class="email-display">
    <div>
      <button @click="toggleArchive">
        {{ email.archived ? "Move to Inbox (E)" : "Archive (E)" }}
      </button>
      <button @click="toggleRead">
        {{ email.read ? "Mark Unread (R)" : "Mark Read (R)" }}
      </button>
      <button @click="goNewer">Newer (K)</button>
      <button @click="goOlder">Older (J)</button>
    </div>
    <h2 class="mb-0">
      Subject: <strong>{{ email.subject }}</strong>
    </h2>
    <div>
      <em
        >From {{ email.from }} on
        {{ format(new Date(email.sentAt), "MMM do yyyy") }}</em
      >
    </div>
    <div v-html="marked(email.body)"></div>
  </div>
</template>
