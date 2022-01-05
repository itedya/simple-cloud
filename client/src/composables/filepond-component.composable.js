import vueFilePond from 'vue-filepond';
import { AuthStore } from "../store/auth.store";
import 'filepond/dist/filepond.min.css';

const FilePond = vueFilePond();

const generateServerOptions = () => {
  return {
    server: '/api/files',
    chunkUploads: true,
    process: {
      headers: {
        Authorization: `Bearer ${AuthStore.token}`
      }
    },
  }
}

export {
  generateServerOptions,
  FilePond as default
};
