const switchActions = (id) => {
  const element = document.querySelector(`.action-list[data-id="${id}"]`);

  if (element.style.display === "none") {
    element.style.display = "flex";
  } else {
    element.style.display = "none";
  }
}

export default switchActions;
