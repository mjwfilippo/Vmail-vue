// import statements
import { onBeforeUnmount } from "vue";

// useKeydown function template
let useKeydown = keyCombos => {
  let onKeydown = event => {
    let kc = keyCombos.find(kc => kc.key == event.key);
    if (kc) {
      kc.fn();
    }
  };

  // adds EventListener to make the onKeydown function working
  window.addEventListener("keydown", onKeydown);

  // removes EventListener so it doesn't duplicate
  onBeforeUnmount(() => {
    window.removeEventListener("keydown", onKeydown);
  });
};

export default useKeydown;
