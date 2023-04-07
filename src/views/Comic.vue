<template>
  <div class="page row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3 col-md-6">
      <h4>
        Truyện tranh
        <i class="fas fa-address-book"></i>
      </h4>
      <ComicList
        v-if="filteredComicsCount > 0"
        :comics="filteredComics"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có truyện tranh nào.</p>
      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddComic">
          <i class="fas fa-plus"></i> Thêm mới
        </button>
        <button class="btn btn-sm btn-danger" @click="removeAllComics">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activeComic">
        <h4>
          Chi tiết Truyện tranh
          <i class="fas fa-address-card"></i>
        </h4>
        <ComicCard :comic="activeComic" />
        <router-link
          :to="{
            name: 'comic.edit',
            params: { id: activeComic._id },
          }"
        >
          <span class="mt-2 badge badge-warning">
            <i class="fas fa-edit"></i> Hiệu chỉnh</span
          >
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import ComicCard from "@/components/ComicCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ComicList from "@/components/ComicList.vue";
import ComicService from "@/services/comic.service";
export default {
  components: {
    ComicCard,
    InputSearch,
    ComicList,
  },
  data() {
    return {
      comics: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
    comicStrings() {
      return this.comics.map((comic) => {
        const { title, author } = comic;
        return [title, author].join("");
      });
    },
    // Trả về các contact có chứa thông tin cần tìm kiếm.
    filteredComics() {
      if (!this.searchText) return this.comics;
      return this.comics.filter((_comic, index) =>
        this.comicStrings[index].includes(this.searchText)
      );
    },
    activeComic() {
      if (this.activeIndex < 0) return null;
      return this.filteredComics[this.activeIndex];
    },
    filteredComicsCount() {
      return this.filteredComics.length;
    },
  },
  methods: {
    async retrieveComics() {
      try {
        this.comics = await ComicService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveComics();
      this.activeIndex = -1;
    },
    async removeAllComics() {
      if (confirm("Bạn muốn xóa tất cả Truyện tranh?")) {
        try {
          await ComicService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddComic() {
      this.$router.push({ name: "comic.add" });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}
</style>
