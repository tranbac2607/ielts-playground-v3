<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
type TimeDisplay = {
  minutes: string;
  minutesAndSeconds: string;
};

const toast = useToast();

const timer = ref(200);
const isHoverTime = ref(false);

let intervalId = 0;

onMounted(() => {
  intervalId = setInterval(() => {
    timer.value--;
  }, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

watch(timer, (value) => {
  if (!value) {
    clearInterval(intervalId);
    toast.error('End time');
  }
});

const timeWarning = computed(() => {
  return timer.value < 600 ? 'time__warning' : '';
});

const formatTime = computed(() => {
  let timeDisplay: TimeDisplay = {
    minutes: '00',
    minutesAndSeconds: '00:00',
  };
  if (timer.value && !isNaN(timer.value)) {
    const minutes = Math.floor(timer.value / 60);
    const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(timer.value % 60);
    const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const minutesDisplay = minutes < 9 ? `0${minutes + 1}` : `${minutes + 1}`;

    timeDisplay = {
      minutes: minutesDisplay,
      minutesAndSeconds: `${formatMinutes}:${formatSeconds}`,
    };

    return timeDisplay;
  }
  return timeDisplay;
});

const handleMouseOver = () => {
  isHoverTime.value = true;
};

const handleMouseLeave = () => {
  isHoverTime.value = false;
};
</script>

<template>
  <header class="exam-header-container">
    <div></div>
    <div class="info-container">
      <div className="icon-size">
        <img src="../../../public/svg/time-exam-icon.svg" alt="time" />
      </div>
      <div
        v-if="isHoverTime"
        class="time__down"
        :class="timeWarning"
        @mouseleave="handleMouseLeave"
      >
        <span className="time">{{ formatTime.minutesAndSeconds }}</span>
        <span className="left-text">left</span>
      </div>
      <div v-else class="time__down" :class="timeWarning" @mouseover="handleMouseOver">
        <span className="time">{{ formatTime.minutes }}</span>
        <span className="left-text">minutes left</span>
      </div>
    </div>
    <div></div>
  </header>
</template>

<style scoped lang="scss">
.icon-size {
  width: 36px;
  height: 36px;
}

.exam-header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  background-color: #fff;
  box-shadow: $box-shadow-primary;
  padding: 0 20px;

  .info-container {
    display: flex;
    justify-content: center;
    align-items: center;

    .info-user {
      font-size: $fs-16;
      padding-left: 16px;
      color: $text-black-color;
      font-weight: 100;
    }

    .time__down {
      display: flex;
      align-items: center;
      width: 140px;
      padding-left: 16px;
      font-size: $fs-16;
      gap: 6px;
      cursor: default;

      .time {
        font-size: 22px !important;
        font-weight: 560;
      }

      .left-text {
        text-wrap: nowrap;
      }
    }

    .time__warning {
      color: $time-warning-color;
    }
  }
}

.right-info {
  display: flex;
  align-items: center;

  .listening-box {
    display: flex;
    align-items: center;
    margin-right: 10px;

    .slide-volume {
      margin-left: 10px;
    }
  }
}
</style>
