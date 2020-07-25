<template>
  <div class="list">
    <div class="card" v-for="item in blogList" :key="item.id">
      <router-link :to="'/detail/'+item.id">
        <p class="title">{{item.title}}</p>
      </router-link>
      <p class="date">{{item.create_time}}</p>
    </div>
  </div>
</template>

<script>
import articleApi from "@/api/article";
export default {
  data() {
    return {
      blogList: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      articleApi
        .allList()
        .then(res => {
          if (res.data.code == 200) {
            this.blogList = res.data.data;
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  padding-bottom: 20px;
  margin-top: 15px;
  border-bottom: 1px solid #eee;
  .title {
    color: #0085a1;
    font-size: 26px;
    font-weight: 600;
  }
  .date {
    font-style: italic;
    font-family: Lora, "Times New Roman", serif;
    color: #808080;
    margin-top: 20px;
  }
}
</style>