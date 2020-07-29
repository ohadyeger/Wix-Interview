import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { connect } from "react-redux";
import AppActions from "./actions";
import LoginPage from "../LoginPage/LoginPage";
import Register from "../Register/Register";
import { withCookies } from "react-cookie";
import ClassList from "../ClassList/ClassList";
import Member from "../Member/Member";
import { Grid, Segment } from "semantic-ui-react";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.loadUserEventHandler(this.props.cookies.cookies.name);
  }

  render() {
    return (
      <Grid columns={3} divided celled>
        <div className="app-root">
          <Grid.Row>
            <Grid.Column className="ui  left vertical menu">
              <h2 className="ui header">Fitness Class Booking</h2>
              <a className="item">
                <LoginPage
                  appUser={this.props.username}
                  appLoggedIn={this.props.loggedIn}
                  // currentLocation={this.props.location}
                />
              </a>
              {!this.props.loggedIn ? (
                <a className="item">
                  <Register loggedInUserId={this.props.loggedInUserId} />
                </a>
              ) : (
                []
              )}
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <ClassList />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              {this.props.loggedIn ? (
                <Segment>
                  <Member memberName={this.props.username} />
                </Segment>
              ) : (
                []
              )}
            </Grid.Column>
          </Grid.Row>
        </div>
      </Grid>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    username: props.cookies.cookies.name,
    loggedIn:
      props.cookies &&
      props.cookies.cookies.name &&
      props.cookies.cookies.name !== ""
        ? true
        : false,
    loggedInUserId:
      props.cookies && props.cookies.cookies.id
        ? JSON.parse(props.cookies.cookies.id)
        : null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUserEventHandler: (name) => {
      dispatch(AppActions.loadUserEventHandler(name));
    },
  };
};

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(App));
