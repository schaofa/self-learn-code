<template>
  <div class="canvas-container">
    <div class="menu-list">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        @select="handleSelect"
      >
        <el-menu-item index="home">
          首页
        </el-menu-item>
        <!-- <el-submenu index="2">
          <template slot="title">
            我的工作台
          </template>
          <el-menu-item index="2-1">
            选项1
          </el-menu-item>
          <el-menu-item index="2-2">
            选项2
          </el-menu-item>
          <el-menu-item index="2-3">
            选项3
          </el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">
              选项4
            </template>
            <el-menu-item index="2-4-1">
              选项1
            </el-menu-item>
            <el-menu-item index="2-4-2">
              选项2
            </el-menu-item>
            <el-menu-item index="2-4-3">
              选项3
            </el-menu-item>
          </el-submenu>
        </el-submenu> -->
        <el-menu-item index="falls">
          图片库
        </el-menu-item>
        <!-- <el-menu-item index="spark">
          烟花特效
        </el-menu-item> -->
        <el-menu-item index="clock">
          时钟
        </el-menu-item>
      </el-menu>
    </div>
    <canvas id="myCanvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'HomesApp',
  data() {
    return {
      activeIndex2: 'home'
    }
  },
  mounted() {
    this.writeHacks()
  },
  methods: {
    writeHacks() {
      const width = (document.getElementById('myCanvas').width = screen.availWidth)
      const height = (document.getElementById('myCanvas').height = screen.availHeight)
      const ctx = document.getElementById('myCanvas').getContext('2d')
      const arr = Array(Math.ceil(width / 10)).fill(0)
      const str = 'ABCDE曱㉭㉮5FGHIJKLM7āéǒǘǚNOPQЖБМЛЧ1234龘龘焱RSTUV卐卍曱WXYZ0ЮЯЖБМЛЧ1234龘龘焱卐卍曱㉭㉮5ΥΥζξ67āéǒǘǚㄉㄊ89c☃❤☢✌♨☄☄＠＆?？∰∯㏒‰mol$$$€￠£￥m³m³'.split('')
      function rain() {
        ctx.fillStyle = 'rgba(0,0,0,0.05)'
        ctx.fillRect(0, 0, width, height)
        ctx.fillStyle = '#0f0'
        arr.forEach(function (value, index) {
          ctx.fillText(
            str[Math.floor(Math.random() * str.length)],
            index * 10,
            value + 10
          )
          arr[index] =
            value >= height || value > 8888 * Math.random() ? 0 : value + 10
        })
      }
      setInterval(rain, 30)
    }
  },
}
</script>
<style scoped>
.canvas-container {
  margin: 0;
  padding: 0;
  overflow: hidden !important;
}
.menu-list {
  margin-bottom: 10px;
}
.el-menu.el-menu--horizontal {
  border-bottom: 12px solid #62eaaf !important;
}
</style>
