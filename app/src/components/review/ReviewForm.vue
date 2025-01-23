<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="review_user"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        user
      </label>
      <input
        id="review_user"
        v-model="item.user"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.user ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.user"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.user }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="review_book"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        book
      </label>
      <input
        id="review_book"
        v-model="item.book"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.book ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        required
        placeholder=""
      />
      <div
        v-if="violations?.book"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.book }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="review_publishedAt"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        publishedAt
      </label>
      <input
        id="review_publishedAt"
        v-model="item.publishedAt"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.publishedAt ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.publishedAt"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.publishedAt }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="review_body"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        body
      </label>
      <input
        id="review_body"
        v-model="item.body"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.body ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        required
        placeholder=""
      />
      <div
        v-if="violations?.body"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.body }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="review_rating"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        rating
      </label>
      <input
        id="review_rating"
        v-model="item.rating"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.rating ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        required
        placeholder=""
      />
      <div
        v-if="violations?.rating"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.rating }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="review_letter"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        letter
      </label>
      <input
        id="review_letter"
        v-model="item.letter"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.letter ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.letter"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.letter }}
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
import { formatDateInput } from "@/utils/date";
import type { Review } from "@/types/review";
import type { SubmissionErrors } from "@/types/error";

const props = defineProps<{
  values?: Review;
  errors?: SubmissionErrors;
}>();

const emit = defineEmits<{
  (e: "submit", item: Review): void;
}>();

const violations = toRef(props, "errors");

let item: Ref<Review> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
    user: props.values.user?.["@id"],
        book: props.values.book?.["@id"],
        publicationDate: formatDateInput(props.values.publicationDate),
  };
}

function emitSubmit() {
  emit("submit", item.value);
}
</script>
