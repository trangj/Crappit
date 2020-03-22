import React, { useContext, useState } from "react";
import Login from "../components/User/Login";
import Register from "../components/User/Register";
import AddTopic from "../components/AddTopic";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Icon,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { GlobalContext } from "../context/GlobalState";

const NavigationBar = () => {
  const [drawer, setDrawer] = useState(false);
  const { loginUser, registerUser, logoutUser, user } = useContext(
    GlobalContext
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            style={{ marginRight: "1rem" }}
            onClick={() => setDrawer(true)}
          >
            <Icon>menu</Icon>
          </IconButton>
          <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
            Crappit
          </Typography>
          {user === undefined ? (
            <>
              <Login loginUser={loginUser} />
              <Register registerUser={registerUser} />
            </>
          ) : (
            <Button onClick={() => logoutUser()} color="inherit">
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawer} onClose={() => setDrawer(false)}>
        <List style={{ width: 250 }}>
          <ListItem
            button
            component={Link}
            to="/"
            onClick={() => setDrawer(false)}
          >
            <ListItemIcon>
              <Icon>home</Icon>
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/t"
            onClick={() => setDrawer(false)}
          >
            <ListItemIcon>
              <Icon>explore</Icon>
            </ListItemIcon>
            <ListItemText>Discover Topics</ListItemText>
          </ListItem>
          {user === undefined ? (
            <ListItem>Sign up to follow topics!</ListItem>
          ) : (
            <>
              <ListItem button>
                <ListItemIcon>
                  <Icon>add</Icon>
                </ListItemIcon>
                <ListItemText>
                  <AddTopic />
                </ListItemText>
              </ListItem>
              <Divider />
              {user.followedTopics.map(topic => (
                <ListItem
                  button
                  component={Link}
                  to={`/t/${topic}`}
                  onClick={() => setDrawer(false)}
                >
                  <ListItemIcon>
                    <Icon>forum</Icon>
                  </ListItemIcon>
                  <ListItemText>t/{topic}</ListItemText>
                </ListItem>
              ))}
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default NavigationBar;
