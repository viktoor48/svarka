<script setup>
const props = {
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingText: {
    type: String,
    default: 'Loading...',
  },
  block: {
    type: Boolean,
    default: false,
  },
  to: String,
  theme: {
    type: String,
    default: 'default',
    validator: (value) => ['dark', 'light'].includes(value),
  },
};

const bgColorArr = new Map([
  ['dark', 'disabled:bg-white/10'],
  ['default', 'disabled:bg-gray'],
]);

const getStyleClass = () => {
  const bgColor = bgColorArr.get(props.theme || 'default');
  const block = props.block ? 'w-full' : '';
  return `${bgColor} ${block}`;
};
</script>

<template>
  <component
    :is="component"
    :to="to"
    :disabled="disabled"
    class="disabled:text-gray-dark relative inline-flex h-[53px] items-center justify-center rounded-xl bg-blue px-7 text-[14px] font-semibold uppercase leading-3 text-white transition-colors duration-300 hover:bg-blue-dark disabled:bg-gray"
    :class="getStyleClass()"
  >
    <div v-if="loading" class="inline-flex items-center gap-2.5">
      <span>
        {{ loadingText }}
      </span>
      <span class="size-5 animate-spin rounded-full border-[3px] border-l-gray" />
    </div>
    <div v-else class="inline-flex items-center gap-2.5">
      <span>
        <slot />
      </span>
      <span>
        <Icon class="w-[21px]" name="ArrowRight" />
      </span>
    </div>
  </component>
</template>