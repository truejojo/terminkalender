<script>
import CalendarEvent from "./CalendarEvent.vue";
import Store from "../store";

export default {
  name: "CalendarDay",
  components: {
    CalendarEvent,
  },
  props: {
    day: {
      type: Object,
      required: true,
      default: () => ({
        id: -1,
        fullName: "Fehlender Wochentag",
        events: [],
      }),
    },
    validator: function (value) {
      if (Object.keys(value).includes("id")) {
        return true;
      }
    },
  },
  computed: {
    classBorder() {
      return this.day.active && "border-primary";
    },
    classBackground() {
      return this.day.active && "bg-primary text-white";
    },
    events() {
      return Store.getters.events(this.day.id);
    },
  },
  methods: {
    setActiveDay() {
      Store.mutations.setActiveDay(this.day.id);
    },
  },
};
</script>

<template>
  <div class="card border-start" :class="classBorder">
    <div
      class="card-header text-center"
      :class="classBackground"
      role="button"
      @click="setActiveDay"
    >
      <strong>{{ day.fullName }}</strong>
    </div>
    <div class="card-body">
      <transition name="fade" mode="out-in">
        <div v-if="day.events.length">
          <transition-group name="list">
            <CalendarEvent
              v-for="event in events"
              :key="event.title"
              :event="event"
              :dayId="day.id"
            >
              <template
                #eventPriority="{
                  priorityDisplayNameColorClass,
                  priorityDisplayName,
                }"
              >
                <strong :class="priorityDisplayNameColorClass">
                  {{ priorityDisplayName }}
                </strong>
              </template>
              <template #eventTitle="{ title }">
                {{ title }}
              </template>
            </CalendarEvent>
          </transition-group>
        </div>
        <div v-else class="alert alert-light text-center">
          <i>Noch keine Termine...</i>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30);
}
/* .list-enter-to,
.list-leave-from {
  opacity: 1;
  transform: translateY(0);
} */
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-move {
  transition: transform 2s ease;
}
</style>
