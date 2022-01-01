<template>
  <div class="container">
    <delete-file-modal />

    <div class="previous-directory-container" v-if="previousDirectory">
      <button class="go-to-previous-directory" @click="fetchFiles(previousDirectory.value)">
        <SkipBackSvg />
        Go back
      </button>
    </div>

    <div class="path">
      {{ path }}
    </div>

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
      <tr v-for="(file, index) in files" :key="index">
        <td class="icon" @click="clickedOnItem(file)">
          <FolderSvg v-if="file.type === 'directory'" />
          <FileSvg v-else-if="file.type === 'file'" />
        </td>
        <td class="name" @click="clickedOnItem(file)">{{ file.name }}</td>
        <td class="actions" @click="switchActions(index)">
          <MoreVerticalSvg />
          <div class="action-list" style="display: none;" :data-id="index">
            <button class="action">
              Rename
            </button>
            <button class="action">
              Remove
            </button>
          </div>
        </td>
        <td>
          {{ file.size }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import TrashSvg from "./../assets/trash.svg?inline";
import FileSvg from "./../assets/file.svg?inline";
import SkipBackSvg from "./../assets/skip-back.svg?inline";
import FolderSvg from "./../assets/folder.svg?inline";
import MoreVerticalSvg from "./../assets/more-vertical.svg?inline";
import { computed, onMounted } from "vue";
import DeleteFileModal from "./../components/Modals/DeleteFileModal";
import EventBus from "../composables/event-bus";
import { FilesStore } from "../store/files.store";
import formatFileSize from "../composables/format-file-size.composable";

export default {
  components: {
    DeleteFileModal,
    TrashSvg,
    FileSvg,
    FolderSvg,
    SkipBackSvg,
    MoreVerticalSvg
  },

  setup() {
    const path = computed(() => FilesStore.path);
    const previousDirectory = computed(() => FilesStore.previousDirectory);
    const files = computed(() => FilesStore.files.map(ele => ({
      ...ele,
      size: formatFileSize(ele.size)
    })));

    const fetchFiles = FilesStore.fetchFiles;

    const goToPreviousDirectory = async () => {
      await fetchFiles(previousDirectory.value);
    };

    const clickedOnItem = async (file) => {
      if (file.type !== "directory") return;

      await fetchFiles(file.path);
    };

    const switchActions = (id) => {
      const element = document.querySelector(`.action-list[data-id="${id}"]`);

      if (element.style.display === "none") {
        element.style.display = "flex";
      } else {
        element.style.display = "none";
      }
    }

    const showDeleteModal = (item) => EventBus.emit("delete-file-modal:show", null, item);

    onMounted(() => {
      fetchFiles(path.value);
    });

    return { path, switchActions, previousDirectory, files, goToPreviousDirectory, clickedOnItem, showDeleteModal, fetchFiles };
  }
};
</script>

<style lang="scss" scoped>
@use "./../scss/variables";
@import "./../scss/button";

.previous-directory-container {
  width: 100%;
  color: variables.$slate-400;
  padding: 12px;

  .go-to-previous-directory {
    padding: 7px 12px;
    border-radius: 18px;
    border: 0;
    color: variables.$slate-400;
    font-size: variables.$text-base;
    display: flex;
    align-items: center;
    gap: 7px;
    cursor: pointer;

    background: variables.$slate-700;
    transition: .3s;

    &:hover {
      background: variables.$slate-600;
    }
  }
}

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

.table {
  border-collapse: collapse;
  width: 100%;
  color: variables.$slate-200;

  thead tr th {
    text-align: left;
    padding: 12px;
    color: variables.$slate-400;
    font-weight: 400;
  }

  tbody tr {
    td {
      padding: 12px;
      white-space: nowrap;
    }

    td.name {
      width: 100%;
    }

    td.icon,
    td.name,
    td.actions {
      cursor: pointer;
    }

    td.actions {
      transition: .3s;
      position: relative;

      .action-list {
        position: absolute;
        width: 150px;
        right: 0;
        top: 100%;
        flex-direction: column;
        background-color: variables.$slate-400;
        z-index: 10;

        .action {
          @include button(false);
        }
      }

      &:hover {
        background: variables.$slate-700;
      }
    }

    td {
      border-top: 1px solid variables.$slate-700;
    }
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
