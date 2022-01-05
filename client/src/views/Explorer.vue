<template>
  <div class="container">
    <delete-file-modal />

    <PreviousDirectory />

    <div class="path">{{ path }}</div>

    <table class="table">
      <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th></th>
        <th>Size</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="files.length === 0">
        <td colspan="4" class="no-files">
          No files in that folder :(
        </td>
      </tr>
      <tr v-for="(file, index) in files" :key="index">
        <td class="icon" @click="clickedOnItem(file)">
          <FolderSvg v-if="file.type === 'directory'" />
          <FileSvg v-else-if="file.type === 'file'" />
        </td>
        <td class="name" @click="clickedOnItem(file)">{{ file.name }}</td>
        <td class="actions" @click="switchActions(index)">
          <MoreVerticalSvg />
          <div class="action-list" style="display: none;" :data-id="index">
            <button class="action" @click="downloadItem(file)">
              Download
            </button>
            <button class="action" @click="renameItem(file)">
              Rename
            </button>
            <button class="action" @click="removeItem(file)">
              Remove
            </button>
          </div>
        </td>
        <td>{{ file.size }}</td>
      </tr>
      <tr>
        <td colspan="4">
          <file-input />
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { FilesStore } from "../store/files.store";
import DeleteFileModal from "./../components/Modals/DeleteFileModal";
import PreviousDirectory from "./../components/Explorer/PreviousDirectory";
import FileInput from "./../components/Explorer/FileInput";
import formatFileSize from "../composables/format-file-size.composable";
import switchActions from "../composables/explorer/switch-actions.composable";
import showDeleteModal from "../composables/explorer/show-delete-modal.composable";
import clickedOnItem from "../composables/explorer/clicked-on-item.composable";
import removeItem from "../composables/explorer/remove-item.composable";
import renameItem from "../composables/explorer/rename-item.composable";
import downloadItem from '../composables/download-item.composable';
import TrashSvg from "./../assets/trash.svg?inline";
import FileSvg from "./../assets/file.svg?inline";
import FolderSvg from "./../assets/folder.svg?inline";
import MoreVerticalSvg from "./../assets/more-vertical.svg?inline";

export default {
  components: {
    DeleteFileModal,
    PreviousDirectory,
    TrashSvg,
    FileSvg,
    FolderSvg,
    MoreVerticalSvg,
    FileInput
  },

  setup() {
    const path = computed(() => FilesStore.path);
    const files = computed(() => FilesStore.files.map(ele => ({ ...ele, size: formatFileSize(ele.size) })));

    onMounted(() => {
      FilesStore.fetchFiles(path.value);
    });

    return {
      path,
      files,
      switchActions,
      clickedOnItem,
      showDeleteModal,
      removeItem,
      renameItem,
      downloadItem
    };
  }
};
</script>

<style lang="scss" scoped>
@use "./../scss/variables";
@import "./../scss/explorer/previous-directory";
@import "./../scss/explorer/path";
@import "./../scss/explorer/table";

.container {
  padding: 60px 0;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  margin: 0 auto;
}
</style>
