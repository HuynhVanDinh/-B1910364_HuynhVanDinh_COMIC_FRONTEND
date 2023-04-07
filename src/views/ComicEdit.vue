<template>
  <div v-if="comic" class="page">
    <h4>Hiệu chỉnh Truyện tranh</h4>
    <ComicForm
      :comic="comic"
      @submit:comic="updateComic"
      @delete:comic="deleteComic"
    />
    <p>{{ message }}</p>
  </div>
</template>
<script>
import ComicForm from "@/components/ComicForm.vue";
import ComicService from "@/services/comic.service";
export default {
  components: {
    ComicForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      comic: null,
      message: "",
    };
  },
  methods: {
    async getComic(id) {
      try {
        this.comic = await ComicService.get(id);
      } catch (error) {
        console.log(error);
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async updateComic(data) {
      try {
        await ComicService.update(this.comic._id, data);
        this.message = "Truyện tranh được cập nhật thành công.";
      } catch (error) {
        console.log(error);
      }
    },
    async deleteComic() {
      if (confirm("Bạn muốn xóa Truyện tranh này?")) {
        try {
          await ComicService.delete(this.comic._id);
          this.$router.push({ name: "comic" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.getComic(this.id);
    this.message = "";
  },
};
</script>
