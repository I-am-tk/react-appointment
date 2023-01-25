import React, { Component, useState } from "react";

import { AppointmentPicker } from "./components/AppointmentPicker/AppointmentPicker";
import AppointmentPickerWrapper from "./components/AppointmentPicker/AppointmentPickerWrapper";

type IdentifierType = string | number;

// Number of row should be same for each day
const days: AppointmentAttributesType[][] = [
  [
    { id: 1, number: 1, periods: 2 },
    { id: 2, number: 2 },
    null,
    { id: 3, number: "3", isReserved: true },
    { id: 4, number: "4" },
    null,
    { id: 5, number: 5 },
    { id: 6, number: 6 },
  ],
  [
    { id: 7, number: 1, isReserved: true, periods: 3 },
    { id: 8, number: 2, isReserved: true },
    null,
    { id: 9, number: "3", isReserved: true },
    { id: 10, number: "4" },
    null,
    { id: 11, number: 5 },
    { id: 12, number: 6 },
  ],
  [
    { id: 13, number: 1 },
    { id: 14, number: 2 },
    null,
    { id: 15, number: 3, isReserved: true },
    { id: 16, number: "4" },
    null,
    { id: 17, number: 5 },
    { id: 18, number: 6 },
  ],
  [
    { id: 19, number: 1 },
    { id: 20, number: 2 },
    null,
    { id: 21, number: 3 },
    { id: 22, number: "4" },
    null,
    { id: 23, number: 5 },
    { id: 24, number: 6 },
  ],
  [
    { id: 25, number: 1, isReserved: true },
    { id: 26, number: 2 },
    null,
    { id: 27, number: "3", isReserved: true },
    { id: 28, number: "4" },
    null,
    { id: 29, number: 5 },
    { id: 30, number: 6, isReserved: true },
  ],
];

interface AddedAppointmentInterface {
  day: string;
  number: IdentifierType;
  time: string;
  id?: IdentifierType;
}

type AddCallbackType = (
  day: string,
  number: IdentifierType,
  time: string,
  id?: IdentifierType
) => void;

type RemoveCallbackType = (day: string, number: IdentifierType) => void;

type AppointmentAttributesType = {
  id?: IdentifierType;
  number: IdentifierType;
  isReserved?: boolean;
  isSelected?: boolean;
  periods?: number;
} | null;

interface SimpleAddCaseInterface {
  addedAppointment: AddedAppointmentInterface;
  addCb: AddCallbackType;
}

interface ContinuousAddCaseInterface extends SimpleAddCaseInterface {
  removedAppointment?: AddedAppointmentInterface;
  removeCb?: RemoveCallbackType;
}

export default function App() {
  const [loading, setLoading] = useState(false);

  const addAppointmentCallback = ({
    addedAppointment: { day, number, time, id },
    addCb,
  }: SimpleAddCaseInterface): void => {
    addCb(day, number, time, id);
  };

  const removeAppointmentCallback = (
    { day, number, time, id }: AddedAppointmentInterface,
    removeCb: RemoveCallbackType
  ) => {
    removeCb(day, number);
  };

  return (
    <div
      style={{
        width: "1024px",
      }}
    >
      <AppointmentPickerWrapper
        addAppointmentCallback={addAppointmentCallback}
        removeAppointmentCallback={removeAppointmentCallback}
        initialDay={new Date("2018-05-05")}
        days={days}
        maxReservableAppointments={3}
      />
    </div>
  );
}
