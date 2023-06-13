<script setup>
// import statements
import { computed, ref } from "vue";
import { format } from "date-fns";
import axios from "axios";
import MailView from "./MailView.vue";
import ModalView from "./ModalView.vue";
import BulkActionBar from "./BulkActionBar.vue";
import useEmailSelection from "@/composables/use-email-selection";

// API calls
let { data: emails } = await axios.get("http://localhost:3000/emails"); // retrieves data from fake db and sets it as emails variable
emails = ref(emails); // sets returned data as a ref

// defined properties
const openedEmail = ref(null); // defines a ref that will be used to set active opened email

// email selection object
const emailSelection = useEmailSelection();

// computed properties
const sortedEmails = computed(() => {
  return [...emails.value].sort((e1, e2) => {
    return e1.sentAt < e2.sentAt ? 1 : -1;
  });
});

const unarchivedEmails = computed(() => {
  return sortedEmails.value.filter(e => !e.archived);
});

// API functions
function openEmail(email) {
  openedEmail.value = email;

  if (email) {
    email.read = true;
    updateEmail(email);
  }
}

function archiveEmail(email) {
  email.archived = true;
  updateEmail(email);
}

function updateEmail(email) {
  axios.put(`http://localhost:3000/emails/${email.id}`, email); // makes the function to update the db re-usable
}

// email changing functions
function changeEmail({
  toggleArchive,
  toggleRead,
  save,
  closeModal,
  changeIndex
}) {
  let email = openedEmail.value;
  if (toggleArchive) {
    email.archived = !email.archived;
  }
  if (toggleRead) {
    email.read = !email.read;
  }
  if (save) {
    updateEmail(email);
  }
  if (closeModal) {
    openedEmail.value = null;
  }
  if (changeIndex) {
    let emails = unarchivedEmails.value;
    let currentIndex = emails.indexOf(openedEmail.value);
    let newEmail = emails[currentIndex + changeIndex];
    openEmail(newEmail);
  }
}
</script>

<template>
  <BulkActionBar :emails="unarchivedEmails"></BulkActionBar>
  <table class="mail-table">
    <tbody>
      <tr
        v-for="email in unarchivedEmails"
        :key="email.id"
        :class="['clickable', email.read ? 'read' : '']"
      >
        <td>
          <input
            type="checkbox"
            @click="emailSelection.toggle(email)"
            :checked="emailSelection.emails.has(email)"
          />
        </td>
        <td @click="openEmail(email)">{{ email.from }}</td>
        <td @click="openEmail(email)">
          <p>
            <strong>{{ email.subject }}</strong> - {{ email.body }}
          </p>
        </td>
        <td class="date" @click="openEmail(email)">
          {{ format(new Date(email.sentAt), "MMM do yyyy") }}
        </td>
        <td><button @click="archiveEmail(email)">Archive</button></td>
      </tr>
    </tbody>
  </table>
  <ModalView v-if="openedEmail" @closeModal="openedEmail = null">
    <MailView
      v-if="openedEmail"
      :email="openedEmail"
      @changeEmail="changeEmail"
    />
  </ModalView>
</template>
