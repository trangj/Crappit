import React, { useEffect, useContext, useState } from "react";
import SkeletonList from "../SkeletonList";
import { List, ListItem, ListItemText, Card } from "@material-ui/core";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";

const AllTopics = () => {
  const { fetchTopics, topics, loading } = useContext(GlobalContext);
  const [componentLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopics();
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  return loading || componentLoading ? (
    <SkeletonList />
  ) : (
    <List>
      {topics.map(topic => (
        <Card style={{ marginBottom: "1rem" }}>
          <ListItem button component={Link} to={`/t/${topic.title}`}>
            <ListItemText
              primary={`t/${topic.title}`}
              secondary={`${topic.description}`}
            />
          </ListItem>
        </Card>
      ))}
    </List>
  );
};

export default AllTopics;