<template>
  <div class="edit_wrap wrapper">
    <div class="backBtn">
      <el-button @click="goBack">返回</el-button>
    </div>
    <div class="edit_title">标题</div>
    <el-input v-model="title" placeholder="请输入标题"></el-input>
    <div class="edit_title">文章内容 (Markdown编辑器)</div>
    <div class="markdown">
      <mavon-editor v-model="content" />
    </div>
    <div class="save_btn">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
import articleApi from "@/api/article";
export default {
  data() {
    return {
      title: "",
      content: ""
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    save() {
      if (this.$route.params.id) {
        articleApi
          .articleUpdate({
            title: this.title,
            content: this.content,
            article_id: this.$route.params.id
          })
          .then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: "更新成功",
                type: "success"
              });
              this.$router.push("/article");
            }
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        articleApi
          .articleAdd({ title: this.title, content: this.content })
          .then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: "新增成功",
                type: "success"
              });
              this.$router.push("/article");
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    getDetail() {
      articleApi
        .articleDetail({
          article_id: this.$route.params.id
        })
        .then(res => {
          if (res.data.code == 200) {
            const detail = res.data.data;
            this.title = detail.title;
            this.content = detail.content;
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  created() {
    if (this.$route.params.id) {
      this.getDetail();
    }
  }
};
</script>

<style lang="scss" scoped>
.edit_wrap {
  margin: 30px auto;
  background: #fff;
  padding: 0 40px;
  font-size: 16px;
  .backBtn {
    text-align: right;
    margin-bottom: 40px;
  }
  .edit_title {
    margin: 20px 0;
    font-weight: 700;
  }
  .save_btn {
    margin: 40px 0;
  }
}
</style>