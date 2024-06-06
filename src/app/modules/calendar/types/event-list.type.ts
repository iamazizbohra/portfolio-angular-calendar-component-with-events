import { CalendarEvent } from "./calendar-event.type";

export type EventListType = {
    prevDayEvents: CalendarEvent[],
    currDayEvents: CalendarEvent[],
    nextDayEvents: CalendarEvent[]
}