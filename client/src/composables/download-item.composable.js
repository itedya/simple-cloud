import { FilesStore } from "../store/files.store";

const downloadItem = (file) => {
  return FilesStore.download(file.path)
}

export default downloadItem;
