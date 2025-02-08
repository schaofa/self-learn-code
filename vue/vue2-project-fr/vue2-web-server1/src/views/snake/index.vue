<template>
  <div id="app">
    <canvas
      ref="gameCanvas"
      class="game-canvas"
    ></canvas>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      snake: [{ x: 10, y: 10 }],
      direction: 'RIGHT',
      food: { x: 15, y: 15 },
      gridSize: 20,
      gameInterval: null,
    }
  },
  mounted() {
    this.initGame()
  },
  methods: {
    initGame() {
      const canvas = this.$refs.gameCanvas
      const ctx = canvas.getContext('2d')
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = width
      canvas.height = height

      this.snake = [{ x: 10, y: 10 }]
      this.direction = 'RIGHT'
      this.food = this.generateFood()

      // Start game loop
      this.gameInterval = setInterval(() => {
        this.updateGame(ctx, width, height)
      }, 600)

      window.addEventListener('keydown', this.changeDirection)
    },

    // 生成食物
    generateFood() {
      const x = Math.floor(Math.random() * (window.innerWidth / this.gridSize))
      const y = Math.floor(Math.random() * (window.innerHeight / this.gridSize))
      return { x: x * this.gridSize, y: y * this.gridSize }
    },

    // 更新游戏状态
    updateGame(ctx, width, height) {
      // 移动蛇
      const head = { ...this.snake[0] }
      switch (this.direction) {
        case 'UP': head.y -= this.gridSize; break
        case 'DOWN': head.y += this.gridSize; break
        case 'LEFT': head.x -= this.gridSize; break
        case 'RIGHT': head.x += this.gridSize; break
      }

      // 判断蛇是否撞墙或自己
      if (head.x < 0 || head.y < 0 || head.x >= width || head.y >= height || this.isCollidingWithSelf(head)) {
        this.endGame()
        return
      }

      this.snake.unshift(head)

      // 如果蛇吃到食物
      if (head.x === this.food.x && head.y === this.food.y) {
        this.food = this.generateFood()
      } else {
        this.snake.pop() // 吃不到食物时移除尾巴
      }

      // 清空画布并绘制新状态
      ctx.clearRect(0, 0, width, height)
      this.drawSnake(ctx)
      this.drawFood(ctx)
    },

    // 判断蛇是否撞到自己
    isCollidingWithSelf(head) {
      return this.snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)
    },

    // 画蛇
    drawSnake(ctx) {
      ctx.fillStyle = 'green'
      this.snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, this.gridSize, this.gridSize)
      })
    },

    // 画食物
    drawFood(ctx) {
      ctx.fillStyle = 'red'
      ctx.fillRect(this.food.x, this.food.y, this.gridSize, this.gridSize)
    },

    // 改变蛇的方向
    changeDirection(event) {
      const key = event.keyCode
      if (key === 37 && this.direction !== 'RIGHT') this.direction = 'LEFT'
      if (key === 38 && this.direction !== 'DOWN') this.direction = 'UP'
      if (key === 39 && this.direction !== 'LEFT') this.direction = 'RIGHT'
      if (key === 40 && this.direction !== 'UP') this.direction = 'DOWN'
    },

    // 结束游戏
    endGame() {
      clearInterval(this.gameInterval)
      alert('Game Over!')
      this.initGame()
    },
  },
}
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.game-canvas {
  border: 1px solid black;
}
</style>
