<template>
  <div class="container mx-auto px-4 max-w-2xl mt-4">
    <div class="flex items-center justify-between">
      <router-link
        :to="{ name: 'ReviewList' }"
        class="text-blue-600 hover:text-blue-800"
      >
        &lt; Back to list
      </router-link>

      <button
        class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700"
        @click="deleteItem"
      >
        Delete
      </button>
    </div>

    <h1 class="text-3xl my-4">Edit Review {{ item?.["@id"] }}</h1>

    <div
      v-if="isLoading || deleteLoading"
      class="bg-blue-100 rounded py-4 px-4 text-blue-700 text-sm"
      role="status"
    >
      Loading...
    </div>

    <div
      v-if="error || deleteError"
      class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      role="alert"
    >
      {{ error || deleteError }}
    </div>

    <div
      v-if="created || updated"
      class="bg-green-100 rounded py-4 px-4 my-2 text-green-700 text-sm"
      role="status"
    >
      <template v-if="created">{{ created["@id"] }} created. </template>
      <template v-else-if="updated">{{ updated["@id"] }} updated. </template>
    </div>

    <Form v-if="item" :values="item" :errors="violations" @submit="update" />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useReviewCreateStore } from "@/stores/review/create";
import { useReviewDeleteStore } from "@/stores/review/delete";
import { useReviewUpdateStore } from "@/stores/review/update";
import type { Review } from "@/types/review";
import Form from "@/components/review/ReviewForm.vue";
import { useMercureItem } from "@/composables/mercureItem";

const route = useRoute();
const router = useRouter();

const reviewCreateStore = useReviewCreateStore();
const { created } = storeToRefs(reviewCreateStore);

const reviewDeleteStore = useReviewDeleteStore();
const { error: deleteError, isLoading: deleteLoading } =
  storeToRefs(reviewDeleteStore);

const reviewUpdateStore = useReviewUpdateStore();
const {
  retrieved: item,
  updated,
  error,
  isLoading,
  violations,
} = storeToRefs(reviewUpdateStore);

useMercureItem({
  store: reviewUpdateStore,
  deleteStore: reviewDeleteStore,
  redirectRouteName: "ReviewList",
});

await reviewUpdateStore.retrieve(decodeURIComponent(route.params.id as string));

function update(item: Review) {
  reviewUpdateStore.update(item);
}

async function deleteItem() {
  if (!item?.value) {
    reviewUpdateStore.setError("No review found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this review?")) {
    await reviewDeleteStore.deleteItem(item.value);

    if (reviewDeleteStore.deleted) {
      router.push({ name: "ReviewList" });
    }
  }
}

onBeforeUnmount(() => {
  reviewUpdateStore.$reset();
  reviewCreateStore.$reset();
  reviewDeleteStore.$reset();
});
</script>
