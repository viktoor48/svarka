<template>
  <div ref="slider"></div>
</template>

<script setup>
import nouislider from 'nouislider';
import {ref, onMounted } from "vue";

const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const slider = ref(null);

const createSlider = () => {
  nouislider.create(slider.value, props.options);
  slider.value.noUiSlider.on('change', (values) => {
    emit('update:modelValue', values);
  });
  emit('update:modelValue', slider.value.noUiSlider.get());
};

onMounted(() => {
  createSlider();
});
</script>

<style>
@import "nouislider/dist/nouislider.css";

.noUi-handle:before, .noUi-handle:after {
  content: "";
  display: block;
  position: absolute;
  height: 8px;
  width: 1px;
  background: #E8E7E6;
  left: 10px;
  top: 6px;
}

.noUi-handle:after {
  @apply left-[15px]
}

.noUi-horizontal .noUi-handle {
  @apply w-[28px] h-[21px]
}

.noUi-target {
  @apply h-[10px]
}
</style>