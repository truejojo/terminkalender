<script>
import CalendarDay from "./CalendarDay.vue";
import Store from "../store.js";

export default {
  name: "CalendarWeekAsList",
  components: {
    CalendarDay,
  },
  data() {
    return {
      calendarWeekData: Store.state.calendarWeekData,
    };
  },
  computed: {
    activeDay() {
      return Store.getters.activeDay();
    },
  },
  methods: {
    setActiveDay(dayId) {
      Store.mutations.setActiveDay(dayId);
    },
    isActive(dayId) {
      if (dayId === this.activeDay.id) {
        return ["active"];
      }
    },
  },
};
</script>

<template>
  <div class="row">
    <div class="col-2 offset-3">
      <ul class="list-group">
        <li
          v-for="day in calendarWeekData"
          :key="day.id"
          class="list-group-item"
          :class="isActive(day.id)"
          @click="setActiveDay(day.id)"
        >
          {{ day.fullName }}
        </li>
      </ul>
    </div>
    <div class="col-4">
      <CalendarDay :day="activeDay" />
    </div>
  </div>
</template>

<style scoped>
</style>