<template>
  <div class="container mx-auto px-4 max-w-2xl mt-4">
    <div class="flex items-center justify-between">
      <router-link
        :to="{ name: 'ParchmentList' }"
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

    <h1 class="text-3xl my-4">Edit Parchment {{ item?.["@id"] }}</h1>

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
import { useParchmentCreateStore } from "@/stores/parchment/create";
import { useParchmentDeleteStore } from "@/stores/parchment/delete";
import { useParchmentUpdateStore } from "@/stores/parchment/update";
import type { Parchment } from "@/types/parchment";
import Form from "@/components/parchment/ParchmentForm.vue";
import { useMercureItem } from "@/composables/mercureItem";

const route = useRoute();
const router = useRouter();

const parchmentCreateStore = useParchmentCreateStore();
const { created } = storeToRefs(parchmentCreateStore);

const parchmentDeleteStore = useParchmentDeleteStore();
const { error: deleteError, isLoading: deleteLoading } =
  storeToRefs(parchmentDeleteStore);

const parchmentUpdateStore = useParchmentUpdateStore();
const {
  retrieved: item,
  updated,
  error,
  isLoading,
  violations,
} = storeToRefs(parchmentUpdateStore);

useMercureItem({
  store: parchmentUpdateStore,
  deleteStore: parchmentDeleteStore,
  redirectRouteName: "ParchmentList",
});

await parchmentUpdateStore.retrieve(decodeURIComponent(route.params.id as string));

function update(item: Parchment) {
  parchmentUpdateStore.update(item);
}

async function deleteItem() {
  if (!item?.value) {
    parchmentUpdateStore.setError("No parchment found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this parchment?")) {
    await parchmentDeleteStore.deleteItem(item.value);

    if (parchmentDeleteStore.deleted) {
      router.push({ name: "ParchmentList" });
    }
  }
}

onBeforeUnmount(() => {
  parchmentUpdateStore.$reset();
  parchmentCreateStore.$reset();
  parchmentDeleteStore.$reset();
});
</script>
