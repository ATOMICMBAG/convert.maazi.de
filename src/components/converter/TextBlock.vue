<template>
  <div
    class="space-y-4 mb-6 p-6 bg-white border border-silver rounded-xs shadow-sm"
  >
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2"
        >Text Block Input</label
      >
      <textarea
        v-model="localText"
        @input="handleTextUpdate"
        class="w-full p-4 border border-silver rounded-xs bg-light-silver shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500 resize-vertical min-h-[100px] text-lg font-mono"
        placeholder="Type your text here..."
      ></textarea>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Styles</label>
      <div class="space-y-3 max-h-96 overflow-y-auto">
        <StyleRow
          v-for="(styleId, index) in localStyles"
          :key="index"
          :text="localText"
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
        + Add Style
      </button>
      <button
        v-if="localStyles.length > 0"
        @click="$emit('delete')"
        class="w-full flex items-end justify-end p-2 hover:bg-gray-100 rounded text-gray-600 hover:text-red-500 transition-colors"
      >
        - Delete Block
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
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
const localStyles = ref([...props.styles]);

watch(
  () => props.text,
  (newVal) => {
    localText.value = newVal;
  },
);

watch(
  () => props.styles,
  (newVal) => {
    localStyles.value = [...newVal];
  },
  { deep: true },
);

watch(localText, (newVal) => {
  emit("update:text", newVal);
});

watch(
  localStyles,
  (newVal) => {
    emit("update:styles", newVal);
  },
  { deep: true },
);

const addStyle = () => {
  localStyles.value.push("bold-sans");
  emit("update:styles", localStyles.value);
};

const removeStyle = (index) => {
  localStyles.value.splice(index, 1);
  emit("update:styles", localStyles.value);
};

const updateStyle = (index, newId) => {
  localStyles.value[index] = newId;
  emit("update:styles", localStyles.value);
};

const handleTextUpdate = () => {
  emit("update:text", localText.value);
};
</script>
