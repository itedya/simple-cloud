<template>
  <div class="container">
    <delete-file-modal />

    <div class="path">
      {{ path }}
    </div>

    <div class="file" v-if="previousDirectory">
      <div class="file-icon" @click="goToPreviousDirectory">
        <SkipBackSvg />
      </div>

      <div class="file-details" @click="goToPreviousDirectory">
        .. (go back)
      </div>
    </div>

    <div class="file" v-for="(file, index) in files" :key="index">
      <div class="file-icon" @click="clickedOnItem(file)">
        <FileSvg v-if="file.type === 'file' || file.type === 'other'" />
        <FolderSvg v-else />
      </div>

      <div class="file-details" @click="clickedOnItem(file)">
        <p>{{ file.name }}</p>
      </div>

      <div class="file-actions">
        <button class="trash-button" @click="showDeleteModal(file)">
          <TrashSvg />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TrashSvg from "./../assets/trash.svg?inline";
import FileSvg from "./../assets/file.svg?inline";
import SkipBackSvg from "./../assets/skip-back.svg?inline";
import FolderSvg from "./../assets/folder.svg?inline";
import { computed, onMounted } from "vue";
import DeleteFileModal from "./../components/Modals/DeleteFileModal";
import EventBus from "../composables/event-bus";
import { FilesStore } from "../store/files.store";

export default {
  components: {
    DeleteFileModal,
    TrashSvg,
    FileSvg,
    FolderSvg,
    SkipBackSvg
  },

  setup() {
    const path = computed(() => FilesStore.path);
    const previousDirectory = computed(() => FilesStore.previousDirectory);
    const files = computed(() => FilesStore.files);

    const fetchFiles = FilesStore.fetchFiles;

    const goToPreviousDirectory = async () => {
      await fetchFiles(previousDirectory.value);
    };

    const clickedOnItem = async (file) => {
      if (file.type !== "directory") return;

      await fetchFiles(file.path);
    }

    const showDeleteModal = (item) => EventBus.emit("delete-file-modal:show", null, item);

    onMounted(() => {
      fetchFiles();
    });

    return { path, previousDirectory, files, goToPreviousDirectory, clickedOnItem, showDeleteModal, fetchFiles };
  }
};
</script>

<style lang="scss" scoped>
@use "./../scss/variables";

.path {
  width: 100%;
  text-align: left;
  color: variables.$slate-200;

  padding: 12px;
}

.container {
  padding: 60px 0;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  margin: 0 auto;
}

.file {
  width: 100%;

  display: flex;
  justify-content: space-around;
  align-items: center;

  .file-icon {
    padding: 12px;
    color: variables.$slate-400;
  }

  .file-details {
    padding: 12px;
    flex-grow: 1;
    color: variables.$slate-200;
  }

  &:not(:last-child) {
    border-bottom: 1px solid variables.$slate-500;
  }
}

.trash-button {
  border: 0;
  padding: 12px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: .2s;

  background: transparent;

  color: variables.$slate-400;
}
</style>
