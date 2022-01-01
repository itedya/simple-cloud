import { FilesStore } from "../../store/files.store";

const fetchFiles = FilesStore.fetchFiles;

const clickedOnItem = async (file) => {
  if (file.type !== "directory") return;

  await fetchFiles(file.path);
};

export default clickedOnItem;
