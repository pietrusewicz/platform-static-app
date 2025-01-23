<template>
  <div class="p-4">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl my-4">Review List</h1>

      <router-link
        :to="{ name: 'ReviewCreate' }"
        class="px-6 py-2 bg-green-600 text-white text-xs rounded shadow-md hover:bg-green-700"
      >
        Create
      </router-link>
    </div>

    <div
      v-if="isLoading"
      class="bg-blue-100 rounded py-4 px-4 text-blue-700 text-sm"
      role="status"
    >
      Loading...
    </div>

    <div
      v-if="error"
      class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      role="alert"
    >
      {{ error }}
    </div>

    <div
      v-if="deletedItem || mercureDeletedItem"
      class="bg-green-100 rounded py-4 px-4 my-2 text-green-700 text-sm"
      role="status"
    >
      <template v-if="deletedItem">
        {{ deletedItem["@id"] }} deleted.
      </template>
      <template v-else-if="mercureDeletedItem">
        {{ mercureDeletedItem["@id"] }} deleted by another user.
      </template>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full">
        <thead class="border-b">
          <tr>
            <th
              class="text-sm font-medium px-6 py-4 text-left capitalize"
            >
              id
            </th>
            <th
              class="text-sm font-medium px-6 py-4 text-left capitalize"
            >
            user
            </th>
            <th
              class="text-sm font-medium px-6 py-4 text-left capitalize"
            >
            book
            </th>
            <th
              class="text-sm font-medium px-6 py-4 text-left capitalize"
            >
            publishedAt
            </th>
            <th
              class="text-sm font-medium px-6 py-4 text-left capitalize"
            >
            body
            </th>
            <th
              class="text-sm font-medium px-6 py-4 text-left capitalize"
            >
            rating
            </th>
            <th
              class="text-sm font-medium px-6 py-4 text-left capitalize"
            >
            letter
            </th>
            <th
              colspan="2"
              class="text-sm font-medium px-6 py-4 text-left capitalize"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item['@id']" class="border-b">
            <td class="px-6 py-4 text-sm">
              <router-link
                v-if="item"
                :to="{ name: 'ReviewShow', params: { id: item['@id'] } }"
                class="text-blue-600 hover:text-blue-800"
              >
                {{ item["@id"] }}
              </router-link>
            </td>
            <td class="px-6 py-4 text-sm">
            <router-link
              v-if="router.hasRoute('UserShow')"
              :to="{ name: 'UserShow', params: { id: item.user['@id'] } }"
              class="text-blue-600 hover:text-blue-800"
            >
              {{ item.user["@id"] }}
            </router-link>

            <p v-else>
              {{ item.user["@id"] }}
            </p>
            </td>
            <td class="px-6 py-4 text-sm">
            <router-link
              v-if="router.hasRoute('BookShow')"
              :to="{ name: 'BookShow', params: { id: item.book['@id'] } }"
              class="text-blue-600 hover:text-blue-800"
            >
              {{ item.book["@id"] }}
            </router-link>

            <p v-else>
              {{ item.book["@id"] }}
            </p>
            </td>
            <td class="px-6 py-4 text-sm">
            {{ formatDateTime(item.publishedAt) }}
            </td>
            <td class="px-6 py-4 text-sm">
            {{ item.body }}
                        </td>
            <td class="px-6 py-4 text-sm">
            {{ item.rating }}
                        </td>
            <td class="px-6 py-4 text-sm">
            {{ item.letter }}
                        </td>
            <td class="px-6 py-4 text-sm">
              <router-link
                :to="{ name: 'ReviewShow', params: { id: item['@id'] } }"
                class="px-6 py-2 bg-blue-600 text-white text-xs rounded shadow-md hover:bg-blue-700"
              >
                Show
              </router-link>
            </td>
            <td class="px-6 py-4 text-sm">
              <router-link
                :to="{ name: 'ReviewUpdate', params: { id: item['@id'] } }"
                class="px-6 py-2 bg-green-600 text-white text-xs rounded shadow-md hover:bg-green-700"
              >
                Edit
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="view" class="flex justify-center">
      <nav aria-label="Page navigation">
        <ul class="flex list-style-none">
          <li :class="{ disabled: !view['hydra:previous'] }">
            <router-link
              :to="
                view['hydra:first']
                  ? view['hydra:first']
                  : { name: 'ReviewList' }
              "
              aria-label="First page"
              :class="
                !view['hydra:previous']
                  ? 'text-gray-500 pointer-events-none'
                  : 'text-gray-800 hover:bg-gray-200'
              "
              class="block py-2 px-3 rounded"
            >
              <span aria-hidden="true">&lArr;</span> First
            </router-link>
          </li>

          <li :class="{ disabled: !view['hydra:previous'] }">
            <router-link
              :to="
                !view['hydra:previous'] ||
                view['hydra:previous'] === view['hydra:first']
                  ? { name: 'ReviewList' }
                  : view['hydra:previous']
              "
              :class="
                !view['hydra:previous']
                  ? 'text-gray-500 pointer-events-none'
                  : 'text-gray-800 hover:bg-gray-200'
              "
              class="block py-2 px-3 rounded"
              aria-label="Previous page"
            >
              <span aria-hidden="true">&larr;</span> Previous
            </router-link>
          </li>

          <li :class="{ disabled: !view['hydra:next'] }">
            <router-link
              :to="view['hydra:next'] ? view['hydra:next'] : '#'"
              :class="
                !view['hydra:next']
                  ? 'text-gray-500 pointer-events-none'
                  : 'text-gray-800 hover:bg-gray-200'
              "
              class="block py-2 px-3 rounded"
              aria-label="Next page"
            >
              Next <span aria-hidden="true">&rarr;</span>
            </router-link>
          </li>

          <li :class="{ disabled: !view['hydra:next'] }">
            <router-link
              :to="view['hydra:last'] ? view['hydra:last'] : '#'"
              :class="
                !view['hydra:next']
                  ? 'text-gray-500 pointer-events-none'
                  : 'text-gray-800 hover:bg-gray-200'
              "
              class="block py-2 px-3 rounded"
              aria-label="Last page"
            >
              Last <span aria-hidden="true">&rArr;</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, watch } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useReviewDeleteStore } from "@/stores/review/delete";
import { useReviewListStore } from "@/stores/review/list";
import { formatDateTime } from "@/utils/date";
import { useMercureList } from "@/composables/mercureList";

const route = useRoute();
const router = useRouter();

const reviewDeleteStore = useReviewDeleteStore();
const { deleted: deletedItem, mercureDeleted: mercureDeletedItem } =
  storeToRefs(reviewDeleteStore);

const reviewListStore = useReviewListStore();
const { items, error, view, isLoading } = storeToRefs(reviewListStore);

useMercureList({ store: reviewListStore, deleteStore: reviewDeleteStore });

watch(
  () => route.query.page,
  (newPage) => {
    const page = newPage as string;
    reviewListStore.getItems(page);
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  reviewDeleteStore.$reset();
});
</script>
