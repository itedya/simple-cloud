import { FilesStore } from "../../store/files.store";
import sweetalert from "sweetalert2";
import launchFasterRemoveHint from "./launch-faster-remove-hint.composable";

const removeItem = async (file) => {
  if (!window.shiftIsPressed) {
    const confirmed = await sweetalert.fire({
      icon: "question",
      title: "Are you sure?",
      text: `Are you sure you want delete the ${file.type} "${file.name}"?`,
      showDenyButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "green",
      focusConfirm: false,
      focusDeny: true
    })
      .then(res => res.value);

    if (!confirmed) return;
  }

  await FilesStore.remove(file.path);

  if (!localStorage.getItem("faster-remove-hint")) {
    launchFasterRemoveHint();
  }

};

export default removeItem;
