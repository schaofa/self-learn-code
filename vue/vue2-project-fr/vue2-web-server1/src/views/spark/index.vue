<template>
  <div id="app">
    <canvas
      ref="fireworksCanvas"
      class="fireworks-canvas"
    ></canvas>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.initFireworks()
  },
  methods: {
    initFireworks() {
      const canvas = this.$refs.fireworksCanvas
      const ctx = canvas.getContext('2d')
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = width
      canvas.height = height

      // 烟花粒子数组
      const particles = []

      // 烟花类
      class Firework {
        constructor(x, y, color) {
          this.x = x
          this.y = y
          this.color = color
          this.size = Math.random() * 3 + 1 // 粒子大小
          this.speedX = Math.random() * 6 - 3
          this.speedY = Math.random() * -6 - 3
          this.life = 0
        }
        update() {
          this.x += this.speedX
          this.y += this.speedY
          this.speedY += 0.1 // 重力
          this.life++
        }
        draw() {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fillStyle = this.color
          ctx.fill()
        }
      }

      // 生成烟花
      function createFirework() {
        const x = Math.random() * width
        const y = height - 30 // 从屏幕底部发射
        const color = `hsl(${Math.random() * 360}, 100%, 50%)` // 随机颜色
        for (let i = 0; i < 160; i++) {
          particles.push(new Firework(x, y, color))
        }
      }

      // 动画函数
      function animate() {
        ctx.clearRect(0, 0, width, height)
        if (Math.random() < 0.01) {
          createFirework() // 生成新的烟花
        }

        // 更新和绘制粒子
        particles.forEach((particle, index) => {
          particle.update()
          particle.draw()
          if (particle.life > 100) {
            particles.splice(index, 1) // 清除过期粒子
          }
        })

        requestAnimationFrame(animate)
      }

      animate()
    }
  }
}
</script>

<style scoped>
#app {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.fireworks-canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
