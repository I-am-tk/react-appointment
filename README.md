# AppointmentPicker

An example to use the component can be found in `App.tsx`

### Props

- `days`: Should be 2d array. Array will have arrays of slots for all days;
- `addAppointmentCallback`: It accepts a callback function which gets called when
  any slot is clicked. The callback function will get two args. Find the example below.

  ```js
  const addAppointmentCallback = ({
    addedAppointment: { day, number, time, id },
    addCb,
  }: SimpleAddCaseInterface): void => {
    addCb(day, number, time, id);
  };
  ```

- `removeAppointmentCallback`: Removes the appointment ;
- `maxReservableAppointments`: Maximum number of appointments that can be reserved by a person;
- `initialDay`: Starting date of the week;
- `unitTime`: Change the slot interval;
- `className`: To override default styles.

## Files need to be copied

- components/AppointmentPicker/Appointment.tsx
- components/AppointmentPicker/AppointmentPicker.tsx
- components/AppointmentPicker/Blank.tsx
- components/AppointmentPicker/Day.tsx
- components/AppointmentPicker/DayNumber.tsx
- components/AppointmentPicker/index.scss

## Todo

- AppointmentPickerWrapper (work in progress 🟠)
