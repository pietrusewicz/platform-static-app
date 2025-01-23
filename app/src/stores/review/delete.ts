import { defineStore } from "pinia";
import api from "@/utils/api";
import type { Review } from "@/types/review";
import type { DeleteState } from "@/types/stores";

interface State extends DeleteState<Review> {}

export const useReviewDeleteStore = defineStore("reviewDelete", {
  state: (): State => ({
    deleted: undefined,
    mercureDeleted: undefined,
    isLoading: false,
    error: undefined,
  }),

  actions: {
    async deleteItem(item: Review) {
      this.setError("");
      this.toggleLoading();

      if (!item?.["@id"]) {
        this.setError("No review found. Please reload");
        return;
      }

      try {
        await api(item["@id"], { method: "DELETE" });

        this.toggleLoading();
        this.setDeleted(item);
        this.setMercureDeleted(undefined);
      } catch (error) {
        this.toggleLoading();

        if (error instanceof Error) {
          this.setError(error.message);
        }
      }
    },

    toggleLoading() {
      this.isLoading = !this.isLoading;
    },

    setDeleted(deleted: Review) {
      this.deleted = deleted;
    },

    setMercureDeleted(mercureDeleted: Review | undefined) {
      this.mercureDeleted = mercureDeleted;
    },

    setError(error: string) {
      this.error = error;
    },
  },
});
