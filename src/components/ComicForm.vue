<template>
  <Form @submit="submitComic" :validation-schema="comicFormSchema">
    <div class="form-group">
      <label for="title">Tiêu đề</label>
      <Field
        name="title"
        type="text"
        class="form-control"
        v-model="comicLocal.title"
      />
      <ErrorMessage name="title" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="author">Tác giả</label>
      <Field
        name="author"
        type="text"
        class="form-control"
        v-model="comicLocal.author"
      />
      <ErrorMessage name="author" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="description">Mô tả</label>
      <Field
        col="30"
        name="description"
        class="form-control"
        v-model="comicLocal.description"
      />
      <ErrorMessage name="description" class="error-feedback" />
    </div>
    <div class="form-group form-check">
      <input
        name="favorite"
        type="checkbox"
        class="form-check-input"
        v-model="comicLocal.favorite"
      />
      <label for="favorite" class="form-check-label">
        <strong>Liên hệ yêu thích</strong>
      </label>
    </div>
    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button
        v-if="comicLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteComic"
      >
        Xóa
      </button>
    </div>
  </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:comic", "delete:comic"],
  props: {
    comic: { type: Object, required: true },
  },
  data() {
    const comicFormSchema = yup.object().shape({
      title: yup
        .string()
        .required("Tiêu đề phải có giá trị.")
        .min(2, "Tiêu đề phải ít nhất 2 ký tự.")
        .max(50, "Tiêu đề có nhiều nhất 50 ký tự."),
      author: yup
        .string()
        .required("Tên tác giả phải có giá trị.")
        .min(2, "Tên tác giả phải ít nhất 2 ký tự.")
        .max(20, "Tên tác gỉa có nhiều nhất 20 ký tự."),
      description: yup
        .string()
        .required("Mô tả phải có giá trị.")
        .min(2, "Mô tả giả phải ít nhất 2 ký tự.")
        .max(500, "Mô tả có nhiều nhất 500 ký tự."),
    });
    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // contactLocal để liên kết với các input trên form
      comicLocal: this.comic,
      comicFormSchema,
    };
  },
  methods: {
    submitComic() {
      this.$emit("submit:comic", this.comicLocal);
    },
    deleteComic() {
      this.$emit("delete:comic", this.comicLocal.id);
    },
  },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
