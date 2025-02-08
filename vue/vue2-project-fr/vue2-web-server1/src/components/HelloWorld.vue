<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-row>
      <el-col
        v-for="(e, index) in imagesList"
        :key="index"
        :span="6"
      >
        <img
          style="display: inline-block"
          width="100%"
          :src="e.accessible_url"
          alt=""
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    imagesList: {
      type: Array,
      default: () => [],
    },
    msg: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      path: process.env.VUE_APP_BASE_API,
      url: window.location.href,
      // pppe-296
    }
  },
  mounted() {
    console.log(this.url, 'url')
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
