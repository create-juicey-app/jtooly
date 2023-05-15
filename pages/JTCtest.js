import React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import PanToolRoundedIcon from "@mui/icons-material/PanToolRounded";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

function App() {
  const [checked, setChecked] = React.useState(-1);
  const [left, setLeft] = React.useState([0, 1, 2]);
  const [right, setRight] = React.useState([]);

  const leftChecked = checked !== -1 && left.includes(checked);
  const rightChecked = checked !== -1 && right.includes(checked);

  const handleToggle = (value) => () => {
    console.log("value:", value);
    const newChecked = value;
    console.log("newChecked:", newChecked);

    console.log("setChecked:", newChecked);
    console.log("-------------");
    setChecked(newChecked);
  };

  const handleCheckedRight = () => {
    if (!rightChecked) return; // return early if item is not selected in right list
    const selectedItem = right.find((item) => item === checked);
    setLeft([...left, selectedItem]);
    setRight(right.filter((item) => item !== checked));
    setChecked(-1);
  };

  const handleCheckedLeft = () => {
    if (!leftChecked) return; // return early if item is not selected in left list
    const selectedItem = left.find((item) => item === checked);
    setRight([...right, selectedItem]);
    setLeft(left.filter((item) => item !== checked));
    setChecked(-1);
  };

  const customList = (title, items) => {
    const getAvatarIcon = () => {
      if (title === "Hands") {
        return <PanToolRoundedIcon />;
      } else {
        return <BusinessCenterRoundedIcon />;
      }
    };
    return (
      <Card>
        <CardHeader
          sx={{ px: 2, py: 1 }}
          avatar={getAvatarIcon()}
          title={title}
        />
        <Divider />
        <List
          sx={{
            width: 200,
            height: 230,
            bgcolor: "background.paper",
            overflow: "auto",
          }}
          dense
          component="div"
          role="list"
        >
          {items.map((value) => {
            const labelId = `transfer-list-all-item-${value}-label`;

            return (
              <ListItem
                key={value}
                role="listitem"
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Radio
                    checked={checked === value}
                    tabIndex={-1}
                    color="success"
                    disableRipple
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`Item ${value + 1}`} />
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Card>
    );
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>{customList("Inventory", left)}</Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                sx={{ my: 0.5 }}
                variant="contained"
                size="medium"
                color="success"
                onClick={handleCheckedLeft}
                disabled={
                  checked === -1 || left.length === 0 || right.length === 2
                }
                aria-label="move selected left"
              >
                <ChevronRightRounded />
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="contained"
                size="medium"
                color="success"
                onClick={handleCheckedRight}
                disabled={checked === -1 || right.length === 0 || leftChecked}
                aria-label="move selected right"
              >
                <ChevronLeftRounded />
              </Button>
            </Grid>
          </Grid>
          <Grid item>{customList("Hands", right)}</Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
