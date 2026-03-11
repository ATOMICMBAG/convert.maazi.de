<template>
  <select
    v-model="selectedStyle"
    class="w-full p-2 border border-gray-300 rounded-xs bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option v-for="style in styles" :key="style.id" :value="style.id">
      {{ style.preview }} {{ style.name }}
    </option>
  </select>
</template>

<script setup>
import { computed } from "vue";
import unicodeSets from "../../data/unicodeSets.js";

const styles = Object.entries(unicodeSets).map(([id, data]) => ({
  id,
  name: data.name,
  preview: data.preview,
}));

const props = defineProps({
  styleId: {
    type: String,
    default: "bold-sans",
  },
});

const emit = defineEmits(["update:styleId"]);

const selectedStyle = computed({
  get: () => props.styleId,
  set: (value) => emit("update:styleId", value),
});
</script>
