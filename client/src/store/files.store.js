import { ref } from "vue";
import api from "./api.axios";

export class FilesStore {
  static state = ref({
    files: [],
    path: new URLSearchParams(window.location.search).get("path"),
    previousDirectory: null,
    separator: null
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

  static get separator() {
    return FilesStore.state.value.separator;
  }

  static set separator(val) {
    FilesStore.state.value.separator = val;
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
        FilesStore.separator = data.separator;
      });
  }

  static remove(path) {
    return api.delete(`/files`, { params: { path } })
      .then(({ data }) => {
        const indexOf = this.files.findIndex((ele) => ele.path === path);
        this.files.splice(indexOf, 1);
        return data;
      });
  }

  static rename(path, name) {
    return api.put(`/files`, { path, name })
      .then(res => {
        const indexOf = this.files.findIndex((ele) => ele.path === path);
        const element = this.files[indexOf];
        element.name = name;

        Object.assign(this.files[indexOf], element);

        return res.data;
      });
  }

  static async download(path) {
    const hash = await api.post("/files/download", { path })
      .then(res => res.data.hash);

    const uri = new URL(window.location.origin + "/api/files/download");
    uri.searchParams.set("hash", hash);

    const downloadHref = document.querySelector("#download-href");
    downloadHref.setAttribute("href", uri.href);
    downloadHref.setAttribute("download", path.split(FilesStore.separator).pop());
    downloadHref.click();
  }

  static createDirectory(name, path = FilesStore.path) {
    return api.post(`/files/directory`, { name, path })
      .then(res => res.data);
  }
}
