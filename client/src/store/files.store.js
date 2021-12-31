import { ref } from "vue";
import api from "./api.axios";

export class FilesStore {
  static state = ref({
    files: [],
    path: null,
    previousDirectory: null
  });

  static get files() {
    return FilesStore.state.value.files;
  }

  static set files(val) {
    FilesStore.state.value.files = val;
  }

  static get path() {
    return FilesStore.state.value.path;
  }

  static set path(val) {
    FilesStore.state.value.path = val;
  }

  static get previousDirectory() {
    return FilesStore.state.value.previousDirectory;
  }

  static set previousDirectory(val) {
    FilesStore.state.value.previousDirectory = val;
  }

  static fetchFiles(path) {
    const params = path !== undefined ? { params: { path } } : {};

    return api.get(`/files`, params)
      .then(({ data }) => {
        FilesStore.files = data.files;
        FilesStore.path = data.directory;
        FilesStore.previousDirectory = data.previousDirectory;
      });
  }
}
