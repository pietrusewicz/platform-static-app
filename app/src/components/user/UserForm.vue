<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="user_firstName"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        firstName
      </label>
      <input
        id="user_firstName"
        v-model="item.firstName"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.firstName ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.firstName"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.firstName }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="user_lastName"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        lastName
      </label>
      <input
        id="user_lastName"
        v-model="item.lastName"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.lastName ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.lastName"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.lastName }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="user_name"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        name
      </label>
      <input
        id="user_name"
        v-model="item.name"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.name ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.name"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.name }}
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
import type { User } from "@/types/user";
import type { SubmissionErrors } from "@/types/error";

const props = defineProps<{
  values?: User;
  errors?: SubmissionErrors;
}>();

const emit = defineEmits<{
  (e: "submit", item: User): void;
}>();

const violations = toRef(props, "errors");

let item: Ref<User> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
  };
}

function emitSubmit() {
  emit("submit", item.value);
}
</script>
