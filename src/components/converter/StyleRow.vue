<template>
  <div
    class="flex items-center space-x-3 p-3 bg-white border border-silver rounded-xs shadow-sm"
  >
    <StyleDropdown v-model:styleId="localStyleId" class="flex-1 min-w-0" />
    <div
      class="flex-1 min-w-0 px-3 py-2 bg-light-silver rounded-xs overflow-hidden"
    >
      <div class="text-sm font-mono truncate">{{ convertedText }}</div>
    </div>
    <div class="flex items-center space-x-1">
      <button
        @click="copyText"
        class="p-2 hover:bg-gray-100 rounded text-gray-600 hover:text-green-500 transition-colors"
        title="Copy"
      >
        📋 Copy
      </button>
      <button
        @click="$emit('delete')"
        class="p-2 hover:bg-red-100 rounded text-gray-600 hover:text-red-500 transition-colors"
        title="Delete"
      >
        🗑 Delete
      </button>
    </div>
    <div
      v-if="copied"
      class="absolute right-2 top-2 text-green-600 hover:text-green-700 px-2 py-1 rounded text-xs animate-pulse"
    >
      Copied!
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { convertText } from "../../utils/convertText.js";
import StyleDropdown from "./StyleDropdown.vue";

const props = defineProps({
  text: String,
  styleId: String,
});

const emit = defineEmits(["delete", "update:styleId"]);

const localStyleId = ref(props.styleId || "bold-sans");

watch(
  () => props.styleId,
  (newVal) => {
    localStyleId.value = newVal;
  },
);

watch(localStyleId, (newVal) => {
  emit("update:styleId", newVal);
});

const convertedText = computed(() =>
  convertText(props.text, localStyleId.value),
);

const copied = ref(false);

const copyText = async () => {
  try {
    await navigator.clipboard.writeText(convertedText.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1000);
  } catch (err) {
    console.error("Copy failed", err);
  }
};
</script>

<style scoped>
/* Relative positioning for feedback */
div:has(button) {
  position: relative;
}
</style>
