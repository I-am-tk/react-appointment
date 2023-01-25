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
  extends Omit<AppointmentPickerPropsInterface, "days"> {}
export default function AppointmentPickerWrapper(
  props: AppointmentPickerWrapperInterface
) {
  // NOTE: These are the following assumption
  //  - Getting array of data
  //  - it will have the start and end time
  const appointments = [
    {
      type: "reserved",
      startTime: new Date(2023, 1, 19, 6, 30),
      endTime: new Date(2023, 1, 19, 6, 45),
    },
    {
      type: "reserved",
      startTime: new Date(2023, 1, 20, 7, 0),
      endTime: new Date(2023, 1, 20, 7, 15),
    },
    {
      type: "reserved",
      startTime: new Date(2023, 1, 21, 7, 0),
      endTime: new Date(2023, 1, 21, 7, 15),
    },
    {
      type: "reserved",
      startTime: new Date(2023, 1, 22, 10, 15),
      endTime: new Date(2023, 1, 22, 10, 45),
    },
    {
      type: "reserved",
      startTime: new Date(2023, 1, 23, 9, 0),
      endTime: new Date(2023, 1, 23, 9, 15),
    },
    {
      type: "reserved",
      startTime: new Date(2023, 1, 24, 10, 15),
      endTime: new Date(2023, 1, 24, 10, 45),
    },
    {
      type: "reserved",
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

  const slotsByDate = new Map<string, any>();

  // Adding all the appointments
  appointments.forEach((appointment) => {
    const date = appointment.startTime;
    const dateKey = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDay()
    ).toString();
    if (slotsByDate.has(dateKey)) {
      slotsByDate.get(dateKey).push(appointment);
    } else {
      slotsByDate.set(dateKey, [appointment]);
    }
  });

  // Adding all the available slots
  availableSlots.forEach((availableSlot) => {
    const date = availableSlot.startTime;
    const dateKey = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDay()
    ).toString();
    if (slotsByDate.has(dateKey)) {
      slotsByDate.get(dateKey).push(availableSlot);
    } else {
      slotsByDate.set(dateKey, [availableSlot]);
    }
  });

  // console.log({ slotsByDate });

  const slots: AppointmentAttributesType[][] = [];

  const sortedDates = [...slotsByDate.keys()].sort(
    (date1: string, date2: string) => new Date(date1) - new Date(date2)
  );

  console.log({ sortedDates });

  const startDate = new Date([...sortedDates.keys()][0]);
  let totalSlot = 0;
  let slotPerDayCount = 0;
  sortedDates.forEach((date) => {
    // console.log({ date });
    slotPerDayCount = 0;
    const slotsForDate = slotsByDate.get(date) as any[];
    // console.log({ slotsForDate });
    const formattedSlots: AppointmentAttributesType[] = [];
    slotsForDate.forEach((slot) => {
      totalSlot++;
      slotPerDayCount++;
      const isReserved = slot.type === "reserved" ?? false;
      const formattedSlot = {
        id: totalSlot,
        number: slotPerDayCount,
        isReserved,
      };
      formattedSlots.push(formattedSlot);
    });
    slots.push(formattedSlots);
  });
  console.log({ startDate });

  return <AppointmentPicker {...props} />;
}
