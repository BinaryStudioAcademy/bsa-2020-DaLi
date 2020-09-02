import React, { useState } from 'react';
import { Button, Tabs, Tab, IconButton, Typography, Popper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

const ComponentsExample = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [arrowRef, setArrowRef] = React.useState(null);

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const id = open ? 'simple-popper' : undefined;

  return (
    <>
      <Typography variant="h1">h1. Heading</Typography>
      <Typography variant="h2">h2. Heading</Typography>
      <Typography variant="body1">body1. Lorem ipsum dolor sit amet.</Typography>
      <Typography variant="body2">body1. Lorem ipsum dolor sit amet.</Typography>
      <Typography variant="body2" color="primary">
        Primary body1. Lorem ipsum dolor sit amet.
      </Typography>
      <Typography variant="subtitle2">subtitle2. Full Name.</Typography>
      <Typography variant="caption">caption text</Typography>
      <br />
      <Typography variant="caption" color="primary">
        primary caption text
      </Typography>
      <br />
      <br />
      Big contained button:
      <Button size="large" variant="contained" color="primary">
        Sign in
      </Button>
      <br />
      <br />
      Small contained button (for modal):
      <Button variant="contained" color="primary">
        Create
      </Button>
      <br />
      <br />
      Small outlined button (for modal):
      <Button variant="outlined">Cancel</Button>
      <br />
      <br />
      Icon outlined button:
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
      <br />
      <br />
      Icon button:
      <IconButton size="small" aria-label="delete">
        <AddCircleOutlineOutlinedIcon fontSize="large" />
      </IconButton>
      <br />
      <br />
      Tabs:
      <Tabs value={1}>
        <Tab label="Everything" />
        <Tab label="Dashboards" />
        <Tab label="Visualizations" />
      </Tabs>
      <br />
      <br />
      Popper:
      <IconButton aria-describedby={id} aria-label="delete" onClick={handleClick('bottom')}>
        <DeleteIcon />
      </IconButton>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        modifiers={{
          arrow: {
            enabled: true,
            element: arrowRef,
          },
        }}
      >
        <span className="arrow" ref={setArrowRef} />
        <div>The content of the Popper.</div>
      </Popper>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default ComponentsExample;
