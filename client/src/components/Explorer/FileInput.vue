<script setup>
import FilePond, { generateServerOptions } from "../../composables/filepond-component.composable";

const serverOptions = generateServerOptions();
</script>

<template>
  <file-pond :server="serverOptions" />
</template>
