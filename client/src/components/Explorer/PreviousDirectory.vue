<template>
  <div class="previous-directory-container" v-if="previousDirectory">
    <button class="go-to-previous-directory" @click="goToPreviousDirectory">
      <SkipBackSvg />
      Go back
    </button>
  </div>
</template>

<script>
import SkipBackSvg from "./../../assets/skip-back.svg?inline";
import { computed } from "vue";
import { FilesStore } from "../../store/files.store";

export default {
  components: {
    SkipBackSvg
  },

  setup() {
    const previousDirectory = computed(() => FilesStore.previousDirectory);


    const goToPreviousDirectory = () => {
      FilesStore.fetchFiles(previousDirectory.value);
    }

    return {
      previousDirectory,
      goToPreviousDirectory
    }
  }
};
</script>

<style lang="scss">
@import "./../../scss/explorer/previous-directory";
</style>
