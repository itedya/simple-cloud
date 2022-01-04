import sweetalert from "sweetalert2";

const launchFasterRemoveHint = () => {
  sweetalert.fire({
    title: "Hint",
    text: "You can remove things faster by using shift key while clicking \"remove\" button!",
    icon: "info"
  })
    .then(() => localStorage.setItem("faster-remove-hint", true));
}

export default launchFasterRemoveHint;
