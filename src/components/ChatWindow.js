import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, TextField, Button, Divider } from '@mui/material';
import { format } from 'date-fns';

const ChatWindow = ({ chat, markAsRead, onNewMessage }) => {
  const [messages, setMessages] = useState(chat.messages);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    setMessages(chat.messages);
  }, [chat]);

  const sendMessage = () => {
    const message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'You',
      timestamp: new Date().toISOString(),
      read: true,
    };
    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    onNewMessage(chat.id, updatedMessages);
    setNewMessage('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && newMessage.trim() !== '') {
      sendMessage();
    }
  };

  const handleChatOpen = () => {
    markAsRead(chat.id);
  };

  useEffect(() => {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, [messages]);

  const renderMessages = () => {
    return messages.map((message) => (
      <ListItem
        key={message.id}
        style={{ justifyContent: message.sender === 'You' ? 'flex-end' : 'flex-start' }}
      >
        <ListItemText
          primary={message.text}
          secondary={format(new Date(message.timestamp), 'h:mm a')}
          style={{ textAlign: message.sender === 'You' ? 'right' : 'left' }}
        />
      </ListItem>
    ));
  };

  return (
    <div onClick={handleChatOpen}>
      <List id="chat-window" style={{ height: '70vh', overflowY: 'auto', padding: '10px' }}>
        {renderMessages()}
      </List>
      <Divider />
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <TextField
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          fullWidth
          placeholder="Type a message"
          variant="outlined"
          style={{ flexGrow: 1 }}
        />
        <Button onClick={sendMessage} variant="contained" color="primary" style={{ marginLeft: '10px' }}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatWindow;
