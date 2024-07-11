import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Typography, Box } from '@mui/material';
import { format } from 'date-fns';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DoneIcon from '@mui/icons-material/Done';
import UndoIcon from '@mui/icons-material/Undo';

const ChatList = ({ chats, lastMessages, onChatSelect, markAsRead, undoMarkAsRead, toggleBookmark }) => {
  return (
    <List>
      {chats.length > 0 ? (
        chats.map((chat) => (
          <ListItem key={chat.id} button onClick={() => onChatSelect(chat)}>
            <ListItemAvatar>
              <Avatar src={chat.profilePic} />
            </ListItemAvatar>
            <ListItemText
              primary={chat.name}
              secondary={
                <>
                  <span style={{ fontWeight: chat.isRead ? 'normal' : 'bold' }}>
                    {lastMessages[chat.id]} - {format(new Date(chat.messages[chat.messages.length - 1]?.timestamp), 'h:mm a')}
                  </span>
                  {/* <br /> */}
                  {/* {chat.professionalDetails} */}
                </>
              }
            />
            <IconButton onClick={(e) => { e.stopPropagation(); toggleBookmark(chat.id); }}>
              {chat.isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
            {chat.isRead ? (
              <IconButton onClick={(e) => { e.stopPropagation(); undoMarkAsRead(chat.id); }}>
                <UndoIcon />
              </IconButton>
            ) : (
              <IconButton onClick={(e) => { e.stopPropagation(); markAsRead(chat.id); }}>
                <DoneIcon />
              </IconButton>
            )}
          </ListItem>
        ))
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Typography variant="h6" color="textSecondary">
            No chats present
          </Typography>
        </Box>
      )}
    </List>
  );
};

export default ChatList;
