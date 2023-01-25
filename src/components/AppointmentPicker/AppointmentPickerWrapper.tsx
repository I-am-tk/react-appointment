import React from "react";
import {
  AppointmentAttributesType,
  AppointmentPicker,
  AppointmentPickerPropsInterface,
} from "./AppointmentPicker";

interface AppointmentType {}

const dayStrings = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

function dayOfWeekAsString(dayIndex: number) {
  return dayStrings[dayIndex] || "";
}

interface AppointmentPickerWrapperInterface
  extends AppointmentPickerPropsInterface {}
export default function AppointmentPickerWrapper(
  props: AppointmentPickerWrapperInterface
) {
  // NOTE: These are the following assumption
  //  - Getting array of data
  //  - it will have the start and end time
  const appointments = [
    {
      startTime: new Date(2023, 1, 19, 6, 30),
      endTime: new Date(2023, 1, 19, 6, 45),
    },
    {
      startTime: new Date(2023, 1, 20, 7, 0),
      endTime: new Date(2023, 1, 20, 7, 15),
    },
    {
      startTime: new Date(2023, 1, 21, 7, 0),
      endTime: new Date(2023, 1, 21, 7, 15),
    },
    {
      startTime: new Date(2023, 1, 22, 10, 15),
      endTime: new Date(2023, 1, 22, 10, 45),
    },
    {
      startTime: new Date(2023, 1, 23, 9, 0),
      endTime: new Date(2023, 1, 23, 9, 15),
    },
    {
      startTime: new Date(2023, 1, 24, 10, 15),
      endTime: new Date(2023, 1, 24, 10, 45),
    },
    {
      startTime: new Date(2023, 1, 25, 9, 0),
      endTime: new Date(2023, 1, 25, 9, 15),
    },
  ];

  // const available

  const availableSlots = [
    {
      startTime: new Date(2023, 1, 19, 7, 30),
      endTime: new Date(2023, 1, 19, 7, 45),
    },
    {
      startTime: new Date(2023, 1, 20, 8, 0),
      endTime: new Date(2023, 1, 20, 8, 15),
    },
    {
      startTime: new Date(2023, 1, 21, 9, 0),
      endTime: new Date(2023, 1, 21, 9, 15),
    },
    {
      startTime: new Date(2023, 1, 22, 11, 15),
      endTime: new Date(2023, 1, 22, 11, 45),
    },
    {
      startTime: new Date(2023, 1, 23, 10, 0),
      endTime: new Date(2023, 1, 23, 10, 15),
    },
    {
      startTime: new Date(2023, 1, 24, 11, 15),
      endTime: new Date(2023, 1, 24, 11, 45),
    },
    {
      startTime: new Date(2023, 1, 25, 10, 0),
      endTime: new Date(2023, 1, 25, 10, 15),
    },
  ];

  const slotsByDay = new Map<typeof dayStrings[number], any>();

  // Adding all the appointments
  appointments.forEach((appointment) => {
    const dayString = dayOfWeekAsString(appointment.startTime.getDay());
    if (slotsByDay.has(dayString)) {
      slotsByDay.get(dayString).push(appointment);
    } else {
      slotsByDay.set(dayString, [appointment]);
    }
  });

  // Adding all the available slots
  availableSlots.forEach((availableSlot) => {
    const dayString = dayOfWeekAsString(availableSlot.startTime.getDay());
    if (slotsByDay.has(dayString)) {
      slotsByDay.get(dayString).push(availableSlot);
    } else {
      slotsByDay.set(dayString, [availableSlot]);
    }
  });

  const days: AppointmentAttributesType[][] = [];

  for (const [key, value] of slotsByDay.entries()) {
    days.push(value);
  }

  console.log(days);

  return <AppointmentPicker {...props} />;
}
