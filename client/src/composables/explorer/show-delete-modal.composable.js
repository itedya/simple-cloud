import EventBus from "../event-bus";

const showDeleteModal = (item) => {
  EventBus.emit("delete-file-modal:show", null, item);
}

export default showDeleteModal;
