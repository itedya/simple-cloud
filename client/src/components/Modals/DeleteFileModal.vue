<script setup>
import { ref } from "vue";
import EventBus from "../../composables/event-bus";

const show = ref(false);
const file = ref({});

EventBus.on("delete-file-modal:show", (item) => {
  show.value = true;
  file.value = item;
});

const deleteFile = (file) => {
  // api.delete(`/files`, { params: { path } })
  //   .then(res => res.data)
  //   .catch(err => EventBus.emit("global-error-modal:show", null, err));
};

const showDeleteDialog = (item) => {
  show.value = true;
  file.value = item;
};
</script>

<template>
  <vue-final-modal v-model="show" content-class="card card-red">
    <div class="card-header">
      <h3>Are you sure?</h3>
    </div>

    <div class="card-body">
      Are you sure you want to delete the {{ file.type }} "{{ file.name }}"?
    </div>

    <div class="card-footer">
      <button class="btn btn-red" @click="deleteFile">Delete</button>
    </div>
  </vue-final-modal>
</template>
