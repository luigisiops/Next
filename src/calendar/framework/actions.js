import { createAction } from "@reduxjs/toolkit"

export const onGetEvents = createAction("calendar.get.events")
export const onAddEvent = createAction("calendar.add.event")
export const onDeleteEvent = createAction("calendar.delete.event")
export const onUpdateEvent = createAction("calendar.update.event")