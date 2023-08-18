<script>
import Store from "../store";

export default {
  name: "CalendarEntry",
  data() {
    return {
      eventColors: ["primary", "success", "info", "warning", "danger"],
      event: {
        title: "",
        color: "primary",
        priority: 0,
      },
    };
  },
  computed: {
    activeDayName() {
      return Store.getters.activeDay().fullName;
    },
    isTitle() {
      return this.event.title === "";
    },
  },
  mounted() {
    this.$refs.inputTitleRef.focus();
  },
  methods: {
    eventColorClasses(color) {
      return [
        `alert-${color}`,
        this.event.color === color ? `border border-${color} border-3` : "",
      ];
    },
    setEventColor(color) {
      this.event.color = color;
    },
    setNewEvent() {
      Store.mutations.setNewEvent(this.event);
      this.resetNewEvent();
    },
    resetNewEvent() {
      this.event = {
        title: "",
        color: "primary",
        priority: 0,
      };
    },
    isTitle() {
      return this.event.title === "" ? true : false;
    },
  },
};
</script>

<template>
  <div id="calender-entry">
    <div class="card">
      <div class="card-header text-center">
        <h5>
          Neuer Termin für: <strong>{{ activeDayName }}</strong>
        </h5>
      </div>
      <div class="card-body">
        <input
          type="text"
          class="form-control"
          placeholder="Neuer Eintrag"
          ref="inputTitleRef"
          v-model="event.title"
        />
        <select class="form-select mt-2" v-model="event.priority">
          <option value="-1">Hoch</option>
          <option value="0">Mittel</option>
          <option value="1">Gering</option>
        </select>
        <div class="text-center mt-3">
          <span
            v-for="color in eventColors"
            :key="color"
            class="d-inline-block alert m-0 me-2 square"
            :class="eventColorClasses(color)"
            @click="setEventColor(color)"
            role="button"
          >
          </span>
        </div>
        <hr />
        <div class="d-grid gap-2">
          <button
            class="btn btn-primary"
            :disabled="isTitle"
            @click="setNewEvent"
          >
            Eintragen
          </button>
          <button class="btn btn-danger" @click="resetNewEvent">
            Inhalt löschen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
