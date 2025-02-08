<template>
  <div
    id="app"
    :class="{ 'shake': isShaking }"
  >
    <div class="clock">
      <div
        class="hour-hand"
        :style="{ transform: `rotate(${hourRotation}deg)` }"
      ></div>
      <div
        class="minute-hand"
        :style="{ transform: `rotate(${minuteRotation}deg)` }"
      ></div>
      <div
        class="second-hand"
        :style="{ transform: `rotate(${secondRotation}deg)` }"
      ></div>
    </div>
    <div class="particles">
      <div
        v-for="(particle, index) in particles"
        :key="index"
        class="particle"
        :style="particle.style"
      ></div>
    </div>
    <div class="time-display">
      {{ currentTime }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClockApp',
  data() {
    return {
      hourRotation: 0,
      minuteRotation: 0,
      secondRotation: 0,
      currentTime: '',
      isShaking: false,
      particles: []
    }
  },
  mounted() {
    this.updateTime()
    setInterval(this.updateTime, 1000)
  },
  methods: {
    updateTime() {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const seconds = now.getSeconds()

      this.hourRotation = (hours % 12) * 30 + minutes * 0.5
      this.minuteRotation = minutes * 6
      this.secondRotation = seconds * 6

      this.currentTime = `${hours}:${minutes}:${seconds}`

      // 分针动一下抖动页面
      if (minutes !== this.lastMinutes) {
        this.shakePage()
      }

      // 秒针动一下掉落粒子
      if (seconds !== this.lastSeconds) {
        this.createParticle()
      }

      this.lastMinutes = minutes
      this.lastSeconds = seconds
    },
    shakePage() {
      this.isShaking = true
      setTimeout(() => {
        this.isShaking = false
      }, 500)
    },
    createParticle() {
      const particle = {
        style: {
          left: `${Math.random() * 100}%`,
          backgroundColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
          animationDuration: `${Math.random() * 2 + 1}s`
        }
      }
      this.particles.push(particle)
      setTimeout(() => {
        this.particles.shift()
      }, 2000)
    }
  }
}
</script>

<style>
body {
  margin: 0;
  overflow: hidden;
  font-family: Arial, sans-serif;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #282c34;
  color: white;
}

.clock {
  position: relative;
  width: 200px;
  height: 200px;
  border: 10px solid #61dafb;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(97, 218, 251, 0.5);
}

.hour-hand, .minute-hand, .second-hand {
  position: absolute;
  background-color: white;
  transform-origin: bottom center;
}

.hour-hand {
  width: 6px;
  height: 60px;
  top: 40px;
  left: 97px;
}

.minute-hand {
  width: 4px;
  height: 80px;
  top: 20px;
  left: 98px;
}

.second-hand {
  width: 2px;
  height: 90px;
  top: 10px;
  left: 99px;
  background-color: #ff4d4d;
}

.time-display {
  margin-top: 20px;
  font-size: 24px;
  color: #61dafb;
}

.shake {
  animation: shake 0.5s;
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}

.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  animation: fall linear infinite;
}

@keyframes fall {
  to {
    transform: translateY(100vh);
  }
}
</style>