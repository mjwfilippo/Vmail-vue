// import statements
import { reactive } from "vue";
import axios from "axios";

// necessary variables
let emails = reactive(new Set());

// export const useEmailSelection
export const useEmailSelection = () => {
  // toggle function
  let toggle = email => {
    if (emails.has(email)) {
      emails.delete(email);
    } else {
      emails.add(email);
    }
  };

  // clear function
  let clear = () => {
    emails.clear();
  };

  // addMultiple function
  let addMultiple = newEmails => {
    newEmails.forEach(email => {
      emails.add(email);
    });
  };

  // forSelected function
  let forSelected = fn => {
    emails.forEach(email => {
      fn(email);
      axios.put(`http://localhost:3000/emails/${email.id}`, email);
    });
  };

  // markRead function
  let markRead = () => forSelected(e => (e.read = true));

  // markUnread function
  let markUnread = () => forSelected(e => (e.read = false));

  // archive function
  let archive = () => {
    forSelected(e => (e.archived = true));
    clear();
  };

  return {
    emails,
    toggle,
    clear,
    addMultiple,
    markRead,
    markUnread,
    archive
  };
};

// default export statement
export default useEmailSelection;
