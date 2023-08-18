import { calendarWeekData } from "./seed";
import { reactive, readonly } from "vue";

const state = reactive({
  calendarWeekData,
  activeView: "CalendarWeek",
  activeOrdering: "title",
});

const getters = {
  activeDay: () => state.calendarWeekData.find((day) => day.active),
  activeView: () => state.activeView,
  activeOrdering: () => state.activeOrdering,
  events: (dayId) => {
    const currentDay = state.calendarWeekData.find((day) => day.id === dayId);
    return currentDay.events.sort((eventA, eventB) => {
      if (eventA[state.activeOrdering] > eventB[state.activeOrdering]) {
        return 1;
      } else if (eventA[state.activeOrdering] < eventB[state.activeOrdering]) {
        return -1;
      } else {
        return 0;
      }
    });
  },
};

const mutations = {
  setActiveDay(dayId) {
    state.calendarWeekData.map((day) =>
      day.id === dayId ? (day.active = true) : (day.active = false)
    );
  },
  setNewEvent(event) {
    getters.activeDay().events.push({
      title: event.title,
      edit: false,
      color: event.color,
      priority: parseInt(event.priority),
    });
  },
  setActiveView(view) {
    state.activeView = view;
  },
  setActiveOrdering(ordering) {
    state.activeOrdering = ordering;
  },
  deleteEvent(dayId, eventTitle) {
    const currentDay = state.calendarWeekData.find((day) => day.id === dayId);
    const eventIndex = currentDay.events.findIndex(
      (event) => event.title === eventTitle
    );
    currentDay.events.splice(eventIndex, 1);
    // state.calendarWeekData = state.calendarWeekData
    //   .find((day) => day.id === dayId)
    //   .events.filter((event) => event.title !== eventTitle);
  },
  editEvent(dayId, eventTitle) {
    state.calendarWeekData.map((day) =>
      day.events.map((event) => (event.edit = false))
    );
    state.calendarWeekData
      .find((day) => day.id === dayId)
      .events.find((event) => event.title === eventTitle).edit = true;
  },
  updateEvent(dayId, eventTitle, { title, priority }) {
    const newTitle = title.trim() !== "" ? title.trim() : eventTitle;

    const currentEvent = state.calendarWeekData
      .find((day) => day.id === dayId)
      .events.find((event) => event.title === eventTitle);

    currentEvent.title = newTitle;
    currentEvent.priority = parseInt(priority);
    currentEvent.edit = false;
  },
};

export default { state: readonly(state), getters, mutations };
