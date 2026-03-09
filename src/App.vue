// Full App layout with fixed bars, scrollable content, multiple TextBlocks
<template>
  <div
    class="h-screen flex flex-col bg-white text-gray-900 font-sans antialiased"
  >
    <!-- Fixed Top Bar -->
    <header
      class="fixed top-0 left-0 right-0 bg-white border-b border-silver shadow-sm z-50 px-6 py-4 flex items-center justify-between text-sm font-medium"
    >
      <span class="text-gray-600">maazi.de</span>
      <h1 class="text-xl font-bold text-gray-900"></h1>
      <span class="text-gray-600">Text Converter</span>
    </header>

    <!-- Scrollable Content -->
    <main class="flex-1 overflow-y-auto pt-20 pb-20 px-6">
      <!-- Header -->
      <div class="max-w-4xl mx-auto mb-12 text-left">
        <h2
          class="items-start justify-start text-3xl font-bold mb-4 text-gray-900"
        >
          Text Converter
        </h2>

        <h4 class="items-start justify-start p-2 text-gray-900 font-semibold">
          Welcome
        </h4>

        <p>
          This tool helps you create styled text for platforms like LinkedIn,
          Instagram, or anywhere you want your words to stand out.
        </p>

        <h4 class="items-start justify-start p-2 text-gray-900 font-semibold">
          How to
        </h4>

        <p>
          - Simply enter your text into the input field, choose a style from the
          dropdown, and copy the converted result.
        </p>

        <p>
          - You can add multiple style rows to compare different looks, remove
          any style you don’t need, or insert additional text blocks to format
          titles, content sections, and highlighted keywords separately.
        </p>

        <h4 class="items-start justify-start p-2 text-gray-900 font-semibold">
          Benefit
        </h4>

        <p>
          This makes it easy to build clean, eye‑catching posts — especially
          when you want a styled headline, a readable body, and a few standout
          words for emphasis.
        </p>
      </div>

      <!-- Text Blocks -->
      <div class="max-w-4xl mx-auto space-y-8">
        <TextBlock
          v-for="(block, index) in textBlocks"
          :key="index"
          :text="block.text"
          :styles="block.styles"
          @update:text="(newText) => updateBlockText(index, newText)"
          @update:styles="(newStyles) => updateBlockStyles(index, newStyles)"
          @delete="removeBlock(index)"
        />
      </div>

      <!-- Add Block Button -->
      <div class="max-w-4xl mx-auto mt-12 text-center">
        <button
          @click="addBlock"
          class="w-full flex items-start justify-start p-1 bg-white hover:bg-gray-200 text-black font-medium rounded-xs transition-all shadow-md hover:shadow-lg"
        >
          + Add Text Block
        </button>
      </div>
    </main>

    <!-- Fixed Footer Bar -->
    <footer
      class="fixed bottom-0 left-0 right-0 bg-white border-t border-silver shadow-lg z-50 px-6 py-4 flex items-center justify-between text-sm"
    >
      <span class="text-gray-600"
        >Type your text and generate fancy styles</span
      >
      <span class="text-gray-600 font-medium">Thank you</span>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TextBlock from "./components/converter/TextBlock.vue";

const textBlocks = ref([
  {
    text: "",
    styles: ["bold-sans"],
  },
]);

const addBlock = () => {
  textBlocks.value.push({
    text: "",
    styles: ["bold-sans"],
  });
};

const removeBlock = (index) => {
  if (textBlocks.value.length > 1) {
    textBlocks.value.splice(index, 1);
  }
};

const updateBlockText = (index, newText) => {
  textBlocks.value[index].text = newText;
};

const updateBlockStyles = (index, newStyles) => {
  textBlocks.value[index].styles = newStyles;
};
</script>

<style scoped>
/* Custom styles if needed */
</style>
