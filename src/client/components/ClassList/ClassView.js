import React from "react";
import {
  Divider,
  Segment,
  List,
  Header,
  Button,
  Label,
} from "semantic-ui-react";
import TimeSlotList from "../views/TimeSlotList";
const ClassView = (props) => (
  <List divided relaxed>
    {props.classes
      ? props.classes.map((c, i) => (
          <List.Item key={i}>
            <Label
              as="a"
              onClick={() => props.course.setState({ chosenCourseIdx: i })}
            >
              <List.Icon
                name="address card"
                size="large"
                verticalAlign="middle"
              />
              {i} see open time slots
            </Label>
            <List.Header>
              <div>name: {c.name}</div>
              <Divider fitted />
            </List.Header>
            <List.Content>
              <div>duration: {c.duration_minutes} minutes</div>
              <Divider fitted />
              <div>description: {c.description}</div>
              <Divider fitted />
              <div>instructor: {c.instructor_name} </div>
              <Divider fitted />
              <div>price: {c.price} </div>
              <Divider fitted />
              <div>Maximum Participants: {c.max_participants} </div>
            </List.Content>
            {props.course.state.chosenCourseIdx == i ? (
              <Segment placeholder>
                <Button
                  secondary
                  onClick={() => props.course.setState({ chosenCourseIdx: -1 })}
                >
                  close
                </Button>
                <Header as="h5">Class Time Slots:</Header>
                <TimeSlotList
                  timeSlots={props.course.props.classes[i].time_slots}
                  class={props.course.props.classes[i]}
                  onJoinClick={(timeslot) => (e) =>
                    props.course.props.member
                      ? props.course.props.joinClass(
                          timeslot,
                          props.course.props.member
                        ) || props.course.props.loadClasses()
                      : false}
                  onJoinWaitingListClick={(timeslot) => (e) =>
                    props.course.props.member
                      ? props.course.props.joinWaitingList(
                          timeslot,
                          props.course.props.member
                        )
                      : false}
                />
              </Segment>
            ) : (
              []
            )}
          </List.Item>
        ))
      : []}
  </List>
);

export default ClassView;
