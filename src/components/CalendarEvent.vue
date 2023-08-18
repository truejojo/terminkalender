<script>
import Store from "../store";

export default {
  name: "CalendarEvent",
  props: {
    event: {
      type: Object,
    },
    dayId: {
      type: Number,
    },
  },
  data() {
    return {
      newEventTitle: "",
      newEventPriority: this.event.priority,
    };
  },
  computed: {
    priorityDisplayName() {
      switch (this.event.priority) {
        case 1:
          return "Gering";
        case 0:
          return "Mittel";
        case -1:
          return "Hoch";
        default:
          return "Unbekannte Priorität";
      }
    },
    priorityDisplayNameColorClass() {
      switch (this.event.priority) {
        case 1:
          return "text-primary";
        case 0:
          return "text-success";
        case -1:
          return "text-warning";
        default:
          return "text-secondary";
      }
    },
    alertColor() {
      return `alert-${this.event.color}`;
    },
  },
  methods: {
    deleteEvent() {
      Store.mutations.deleteEvent(this.dayId, this.event.title);
    },
    editEvent() {
      Store.mutations.editEvent(this.dayId, this.event.title);
      this.$nextTick(() => this.$refs.inputTitleRef.focus());
    },
    updateEvent() {
      Store.mutations.updateEvent(this.dayId, this.event.title, {
        title: this.newEventTitle,
        priority: this.newEventPriority,
      });
    },
  },
};
</script>

<template>
  <div id="calendar-event">
    <div class="alert text-center" :class="alertColor">
      <transition name="fade" mode="out-in">
        <div v-if="!event.edit">
          <div>
            <span
              >Priorität:
              <slot
                name="eventPriority"
                :priorityDisplayName="priorityDisplayName"
                :priorityDisplayNameColorClass="priorityDisplayNameColorClass"
                >Mittel</slot
              >
            </span>
          </div>
          <slot name="eventTitle" :title="event.title">{{ event.title }}</slot>
          <div>
            <i class="fas fa-edit me-2" role="button" @click="editEvent"></i>
            <i class="far fa-trash-alt" role="button" @click="deleteEvent"></i>
          </div>
        </div>
        <div v-else>
          <input
            class="form-control"
            :placeholder="event.title"
            ref="inputTitleRef"
            v-model="newEventTitle"
          />
          <select class="form-select mt-2" v-model="newEventPriority">
            <option value="-1">Hoch</option>
            <option value="0">Mittel</option>
            <option value="1">Gering</option>
          </select>
          <hr />
          <i class="fas fa-check" role="button" @click="updateEvent"></i>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped></style>
