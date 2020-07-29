import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { connect } from "react-redux";
import MemberActions from "./actions";
import { withCookies } from "react-cookie";
import Notifications from "./Notifications";
import TimeSlotList from "../views/TimeSlotList";
import { Divider, Button, Segment } from "semantic-ui-react";

class Member extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.props.loadUser(this.props.memberName)}>
          Refresh Member
        </Button>
        <div>
          {this.props.member ? (
            <div>
              <div>{this.props.member.username}</div>
            </div>
          ) : (
            []
          )}
          {this.props.member && this.props.member.notifications ? (
            <div>
              <Divider fitted />
              <Notifications notifications={this.props.member.notifications} />
            </div>
          ) : (
            [""]
          )}

          {this.props.member && this.props.member.bookings ? (
            <Segment>
              <h5>Member Bookings:</h5>
              <TimeSlotList
                timeSlots={this.props.member.bookings}
                onCancelClick={(timeslot) => (e) =>
                  this.props.cancelBooking(timeslot, this.props.member) ||
                  this.props.loadUser(this.props.member)}
              />
            </Segment>
          ) : (
            []
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    loggedIn: state["app"].get("loggedIn"),
    member: state["member"].get("member"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: (memberName) => {
      dispatch(MemberActions.loadUser(memberName));
    },
    cancelBooking: (timeslot, member) => {
      dispatch(MemberActions.cancelBooking(timeslot, member));
    },
  };
};

export default withCookies(
  connect(mapStateToProps, mapDispatchToProps)(Member)
);
