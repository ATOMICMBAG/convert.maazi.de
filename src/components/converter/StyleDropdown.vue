<template>
  <select
    v-model="selectedStyle"
    @change="$emit('update:styleId', selectedStyle)"
    class="w-full p-2 border border-gray-300 rounded-xs bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option v-for="style in styles" :key="style.id" :value="style.id">
      {{ style.preview }} {{ style.name }}
    </option>
  </select>
</template>

<script setup>
import unicodeSets from "../../data/unicodeSets.json";

const styles = Object.entries(unicodeSets).map(([id, data]) => ({
  id,
  name: data.name,
  preview: data.preview,
}));

defineProps({
  modelValue: String,
});

defineEmits(["update:modelValue"]);
</script>
