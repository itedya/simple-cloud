import { FilesStore } from "../../store/files.store";
import sweetalert from "sweetalert2";

const renameItem = async (file) => {
  const result = await sweetalert.fire({
    title: "Enter new name",
    input: "text",
    inputLabel: `New ${file.type} name`,
    showCancelButton: true,
    inputValidator(inputValue) {
      if (!inputValue) return `You have to enter new ${file.type} name!`;
    }
  })

  if (result.isDismissed) return;

  await FilesStore.rename(file.path, result.value);
}

export default renameItem;
