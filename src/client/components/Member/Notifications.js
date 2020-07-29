import React from "react";
import { List } from "semantic-ui-react";
const dateFormat = require("dateformat");
const Notifications = (props) => (
  <List divided relaxed>
    Notifications:
    {props.notifications && props.notifications.length
      ? props.notifications.map((n, i) => (
          <List.Item key={i}>
            <List.Icon name="exclamation" size="large" verticalAlign="middle" />
            <List.Header>
              <div>Notification Id : {n._id}</div>
              <div>Time : {dateFormat(n.timestamp, "dd/mm/yyyy hh:MM")}</div>
            </List.Header>
            <List.Content>
              <div>{n.content}</div>
            </List.Content>
          </List.Item>
        ))
      : "No Notifications"}
  </List>
);
export default Notifications;
