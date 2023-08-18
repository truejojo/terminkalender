<script>
// import { defineAsyncComponent } from "vue";
import CalendarWeek from "./components/CalendarWeek.vue";
import CalendarWeekAsList from "./components/CalendarWeekAsList.vue";
import CalendarEntry from "./components/CalendarEntry.vue";
import CalendarSettings from "./components/CalendarSettings.vue";
import Store from "./store";

export default {
  name: "App",
  components: {
    CalendarWeek,
    CalendarWeekAsList,
    CalendarEntry,
    CalendarSettings,
    // CalendarSettings: defineAsyncComponent(() => {
    //   import("./components/CalendarSettings.vue")
    // }),
  },
  data() {
    return {
      showSettings: false,
    };
  },
  computed: {
    buttonSettingsClasses() {
      return this.showSettings ? ["btn-success"] : ["btn-outline-success"];
    },
    activeView() {
      return Store.state.activeView;
    },
  },
  methods: {
    toggleShowSettings() {
      this.showSettings = !this.showSettings;
    },
  },
};
</script>

<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-12">
        <!-- <CalendarWeekAsList /> -->
        <!-- <CalendarWeek /> -->
        <keep-alive>
          <transition name="fade" mode="out-in" appear>
            <component :is="activeView" />
          </transition>
        </keep-alive>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-4 offset-3">
        <CalendarEntry />
      </div>
      <div class="col-3 offset-2">
        <div class="float-end">
          <button
            class="btn btn-lg mb-2"
            :class="buttonSettingsClasses"
            @click="toggleShowSettings"
          >
            <i class="fas fa-cogs"></i>
          </button>
        </div>
        <!-- <transition
          enter-active-class="animate__animated animate__bounceInRight"
          leave-active-class="animate__animated animate__bounceOutRight"
        >
          <CalendarSettings v-if="showSettings" />
        </transition> -->
        <transition name="fade">
          <CalendarSettings v-if="showSettings" />
        </transition>
      </div>
    </div>
  </div>
</template>

<style>
@import "/node_modules/@fortawesome/fontawesome-free/css/all.min.css";
@import "/node_modules/animate.css/animate.min.css";

.square {
  width: 40px;
  height: 40px;
}

/** Transition: fade */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.35s ease-out;
}
</style>
