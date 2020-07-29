import React from "react";
import { Divider, Button, List } from "semantic-ui-react";
const dateFormat = require("dateformat");
const TimeSlotList = (props) => {
  console.log("TimeSlotList", props.timeSlots);
  return (
    <List divided relaxed>
      {props.timeSlots
        ? props.timeSlots.map((ts, i) => (
            <List.Item key={i}>
              <List.Icon
                name="calendar times"
                size="large"
                verticalAlign="middle"
              />
              <List.Header>Time Slot Id : {ts._id}</List.Header>
              <List.Content>
                <Divider fitted />
                start time: {dateFormat(ts.start_time, "dd/mm/yyyy hh:MM")}
                <Divider fitted />
                {props.class
                  ? `places left:  ${
                      props.class.max_participants - ts.participants.length
                    }`
                  : []}
                <Divider fitted />
                {props.class
                  ? `waiting customers:  ${ts.waiting_list.length}`
                  : []}
                {props.onJoinClick &&
                props.class.max_participants - ts.participants.length ? (
                  <Button onClick={props.onJoinClick(props.timeSlots[i]._id)}>
                    book the class
                  </Button>
                ) : props.onJoinWaitingListClick ? (
                  <Button
                    onClick={props.onJoinWaitingListClick(
                      props.timeSlots[i]._id
                    )}
                  >
                    enter waiting list
                  </Button>
                ) : (
                  []
                )}
                {props.onCancelClick ? (
                  <Button onClick={props.onCancelClick(props.timeSlots[i]._id)}>
                    CANCEL class
                  </Button>
                ) : (
                  []
                )}
              </List.Content>
            </List.Item>
          ))
        : []}
    </List>
  );
};

export default TimeSlotList;
{
}
