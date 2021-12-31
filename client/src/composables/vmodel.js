import { computed, ref } from "vue";

const vmodel = (startValue, emitAs, emit) => {
  const original = ref(startValue);

  return computed({
    get: () => {
      return original.value;
    },
    set: (val) => {
      original.value = val;
      emit(`update:${emitAs}`, original.value)
    }
  });
}

export default vmodel;
