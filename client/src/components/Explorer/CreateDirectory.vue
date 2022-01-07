<script setup>
import sweetalert from "sweetalert2";
import { FilesStore } from "../../store/files.store";

const showDirectoryNameModal = async () => {
  const res = await sweetalert.fire({
    input: "text",
    title: "Choose name for your directory",
    inputPlaceholder: "Directory name",
    icon: "question"
  });

  if (res.isDenied || res.isDismissed) return;

  await FilesStore.createDirectory(res.value);
  await FilesStore.fetchFiles(FilesStore.path);
}
</script>

<template>
  <button class="create-directory-button" @click="showDirectoryNameModal">Create directory</button>
</template>

<style lang="scss">
@import "./../../scss/button";

.create-directory-button {
  @include button(true, pointer);
}
</style>
