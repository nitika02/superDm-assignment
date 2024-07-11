import React from 'react';
import { AppBar, Toolbar, Typography, Avatar } from '@mui/material';

const ProfileBar = ({ chat }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Avatar src={chat.profilePic} />
        <Typography variant="h6" component="div" sx={{ marginLeft: 2 }}>
          {chat.name}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default ProfileBar;
