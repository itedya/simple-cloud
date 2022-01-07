<script setup>
import FilePond, { generateServerOptions } from "../../composables/filepond-component.composable";
import { onMounted, ref } from "vue";
import { FilesStore } from "../../store/files.store";

const serverOptions = generateServerOptions();
const fileInput = ref();

onMounted(() => {
  document.addEventListener("FilePond:processfile", (e) => {
    if (!e.detail.error) {
      fileInput.value.removeFile(e.detail.file.id);
      FilesStore.fetchFiles(FilesStore.path);
    }
  });
});
</script>

<template>
  <file-pond
    ref="fileInput"
    :server="serverOptions"
    :chunkUploads="true"
    :chunkForce="true"
  />
</template>
