import { FilesStore } from "../../store/files.store";

const removeItem = (path) => {
  FilesStore.remove(path);
}

export default removeItem;
