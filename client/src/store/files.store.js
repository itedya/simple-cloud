import { ref } from "vue";
import api from "./api.axios";

export class FilesStore {
  static state = ref({
    files: [],
    path: new URLSearchParams(window.location.search).get("path"),
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
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("path", val);

    window.history.replaceState("", "", window.location.origin +
      window.location.pathname + "?" + searchParams.toString());

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
