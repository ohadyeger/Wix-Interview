import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { connect } from "react-redux";
import ClassListActions from "./actions";
import { withCookies } from "react-cookie";
import ClassView from "./ClassView.js";
import { Divider, Button } from "semantic-ui-react";
class ClassList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenCourseIdx: -1,
    };
  }
  componentDidMount() {
    this.props.loadClasses();
  }

  render() {
    return (
      <div>
        <h3>Class List</h3>
        <Button onClick={() => this.props.loadClasses()}>
          Refresh Class List
        </Button>
        <Divider />
        {this.props.classes ? (
          <div>
            <ClassView classes={this.props.classes} course={this} />
          </div>
        ) : (
          []
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    classes: state["classList"].get("classes"),
    member: state["member"].get("member"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadClasses: () => {
      dispatch(ClassListActions.loadClasses());
    },
    joinClass: (timeslot, member) => {
      dispatch(ClassListActions.joinClass(timeslot, member));
    },
    joinWaitingList: (timeslot, member) => {
      dispatch(ClassListActions.joinWaitingList(timeslot, member));
    },
  };
};

export default withCookies(
  connect(mapStateToProps, mapDispatchToProps)(ClassList)
);
