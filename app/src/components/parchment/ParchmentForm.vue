<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="parchment_title"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        title
      </label>
      <input
        id="parchment_title"
        v-model="item.title"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.title ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        required
        placeholder=""
      />
      <div
        v-if="violations?.title"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.title }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="parchment_description"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        description
      </label>
      <input
        id="parchment_description"
        v-model="item.description"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.description ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        required
        placeholder=""
      />
      <div
        v-if="violations?.description"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.description }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="parchment_id"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        id
      </label>
      <input
        id="parchment_id"
        v-model="item.id"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.id ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.id"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.id }}
      </div>
    </div>

    <button
      type="submit"
      class="px-6 py-2 bg-green-500 text-white font-medium rounded shadow-md hover:bg-green-600"
    >
      Submit
    </button>
  </form>
</template>

<script lang="ts" setup>
import { toRef, ref, type Ref } from "vue";
import type { Parchment } from "@/types/parchment";
import type { SubmissionErrors } from "@/types/error";

const props = defineProps<{
  values?: Parchment;
  errors?: SubmissionErrors;
}>();

const emit = defineEmits<{
  (e: "submit", item: Parchment): void;
}>();

const violations = toRef(props, "errors");

let item: Ref<Parchment> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
  };
}

function emitSubmit() {
  emit("submit", item.value);
}
</script>
