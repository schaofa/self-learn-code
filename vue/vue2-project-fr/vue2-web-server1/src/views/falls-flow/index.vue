<template>
  <div>
    <HelloWorld
      msg="图片素材库"
      :images-list="imagesList"
    />
  </div>
</template>
<script>
import HelloWorld from '@/components/HelloWorld.vue'

import { getImageList } from '@/api/imagesApi'
export default {
  name: 'HomeApp',
  components: {
    HelloWorld
  },
  data() {
    return {
      imagesList: []
    }
  },
  mounted() {
    this.getImages()
  },
  methods: {
    async getImages() {
      const res = await getImageList()
      this.imagesList = res.data
      console.log(res, 'res')
    }
  }
}
</script>

<style>

</style>