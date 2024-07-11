import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { Grid, Tabs, Tab, Box, Badge, Typography, Button } from '@mui/material';
import Login from './components/Login';
import Register from './components/Register';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import ProfileBar from './components/ProfileBar';
import chatsData from './data/dummyData';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState(chatsData);
  const [selectedChat, setSelectedChat] = useState(null);
  const [tab, setTab] = useState('all');
  const [lastMessages, setLastMessages] = useState({});

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      setUser(decoded.username);
      console.log('User logged in:', decoded.username);
    } else {
      localStorage.removeItem('token');
      setUser(null);
      console.log('User logged out');
    }
  }, [token]);

  useEffect(() => {
    const initialLastMessages = {};
    chatsData.forEach((chat) => {
      initialLastMessages[chat.id] = chat.messages[chat.messages.length - 1]?.text || '';
    });
    setLastMessages(initialLastMessages);
  }, []);

  const handleChatSelection = (chat) => {
    setSelectedChat(chat);
    markAsRead(chat.id);
  };

  const markAsRead = (id) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === id ? { ...chat, isRead: true } : chat
      )
    );
  };

  const undoMarkAsRead = (id) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === id ? { ...chat, isRead: false } : chat
      )
    );
  };

  const toggleBookmark = (id) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === id ? { ...chat, isBookmarked: !chat.isBookmarked } : chat
      )
    );
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleNewMessage = (chatId, updatedMessages) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId ? { ...chat, messages: updatedMessages } : chat
      )
    );

    setLastMessages((prevLastMessages) => ({
      ...prevLastMessages,
      [chatId]: updatedMessages[updatedMessages.length - 1].text,
    }));

    if (selectedChat && selectedChat.id === chatId) {
      setSelectedChat((prevChat) => ({
        ...prevChat,
        messages: updatedMessages,
      }));
    }
  };

  const filteredChats = chats.filter((chat) => {
    if (tab === 'all') return true;
    if (tab === 'unread') return !chat.isRead;
    if (tab === 'bookmarked') return chat.isBookmarked;
    return false;
  });

  useEffect(() => {
    if (filteredChats.length > 0 && !filteredChats.some((chat) => chat.id === selectedChat?.id)) {
      setSelectedChat(filteredChats[0]);
    } else if (filteredChats.length === 0) {
      setSelectedChat(null);
    }
  }, [filteredChats]);

  const handleLogout = () => {
    console.log('Logout function called');
    setToken(null);
    localStorage.removeItem('token');
    setUser(null);
    console.log('Token removed from local storage');
  };


  return (
    <div>
      {!token ? (
        <div style={{display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '20px'}}>
          <Login setToken={setToken} />
          <Register />
        </div>
      ) : (
        <div>
          <h1>Welcome, {user}</h1>
          <Button onClick={handleLogout} variant="contained" color="primary">
            Logout
          </Button>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Tabs value={tab} onChange={handleTabChange} centered>
                <Tab label={`All (${chats.length})`} value="all" />
                <Tab
                  label={
                    <Badge color="secondary" badgeContent={chats.filter((chat) => !chat.isRead).length}>
                      Unread
                    </Badge>
                  }
                  value="unread"
                />
                <Tab
                  label={
                    <Badge color="secondary" badgeContent={chats.filter((chat) => chat.isBookmarked).length}>
                      Bookmarked
                    </Badge>
                  }
                  value="bookmarked"
                />
              </Tabs>
              <ChatList
                chats={filteredChats}
                lastMessages={lastMessages}
                onChatSelect={handleChatSelection}
                markAsRead={markAsRead}
                undoMarkAsRead={undoMarkAsRead}
                toggleBookmark={toggleBookmark}
              />
            </Grid>
            <Grid item xs={9}>
              {selectedChat ? (
                <>
                  <ProfileBar chat={selectedChat} />
                  <ChatWindow chat={selectedChat} markAsRead={markAsRead} onNewMessage={handleNewMessage} />
                </>
              ) : (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                  <Typography variant="h6" color="textSecondary">
                    No chats present
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default App;
