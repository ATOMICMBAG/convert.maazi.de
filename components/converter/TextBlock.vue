<template>
  <div
    class="space-y-4 mb-6 p-6 bg-white border border-gray-300 rounded-xs shadow-sm"
  >
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2"
        >Text Block</label
      >
      <textarea
        v-model="localText"
        class="w-full p-4 border border-silver rounded-xs bg-light-silver shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500 resize-vertical min-h-[100px] text-lg font-mono"
        placeholder="Type your text here..."
      ></textarea>
    </div>
    <div>
      <div class="flex items-center -space-x-44">
        <label
          class="w-full flex items-start justify-start text-sm font-medium text-gray-700 mb-2"
          >Text Styles</label
        >
        <label
          class="w-full flex items-start justify-start text-sm font-medium text-gray-700 mb-2"
          >Text Converter</label
        >
      </div>
      <div class="space-y-3 max-h-96 overflow-y-auto">
        <StyleRow
          v-for="(styleId, index) in localStyles"
          :key="index"
          :text="debouncedText"
          :styleId="styleId"
          @update:styleId="(newId) => updateStyle(index, newId)"
          @delete="removeStyle(index)"
        />
      </div>
    </div>
    <div class="flex items-center space-x-1">
      <button
        @click="addStyle"
        class="w-full flex items-start justify-start p-2 hover:bg-gray-100 rounded text-gray-600 hover:text-green-500 transition-colors"
      >
        + Add Style Block (compare)
      </button>
      <button
        v-if="localStyles.length > 0"
        @click="$emit('delete')"
        class="w-full flex items-end justify-end p-2 hover:bg-gray-100 rounded text-gray-600 hover:text-red-500 transition-colors"
      >
        - Delete Style Block
      </button>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref, watch } from "vue";
import StyleRow from "./StyleRow.vue";

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  styles: {
    type: Array,
    default: () => ["bold-sans"],
  },
});

const emit = defineEmits(["update:text", "update:styles", "delete"]);

const localText = ref(props.text);
const debouncedText = ref(props.text);
const localStyles = ref([...props.styles]);
let textDebounceTimer;

watch(
  () => props.text,
  (newVal) => {
    localText.value = newVal;
    debouncedText.value = newVal;
  },
);

watch(
  () => props.styles,
  (newVal) => {
    localStyles.value = [...newVal];
  },
);

watch(localText, (newVal) => {
  clearTimeout(textDebounceTimer);
  textDebounceTimer = setTimeout(() => {
    debouncedText.value = newVal;
    emit("update:text", newVal);
  }, 80);
});

const addStyle = () => {
  localStyles.value.push("bold-sans");
  emit("update:styles", [...localStyles.value]);
};

const removeStyle = (index) => {
  localStyles.value.splice(index, 1);
  emit("update:styles", [...localStyles.value]);
};

const updateStyle = (index, newId) => {
  localStyles.value[index] = newId;
  emit("update:styles", [...localStyles.value]);
};

onBeforeUnmount(() => {
  clearTimeout(textDebounceTimer);
});
</script>
