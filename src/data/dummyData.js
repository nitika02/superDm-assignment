const chats = [
    {
      id: 1,
      name: 'John Doe',
      profilePic: 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
      lastMessage: 'Hello!',
      isRead: false,
      professionalDetails: 'Software Engineer at ABC Corp',
      messages: [
        { id: 1, text: 'Hello!', sender: 'John Doe', timestamp: '2024-07-01T10:00:00Z' },
        { id: 2, text: 'Hi there!', sender: 'You', timestamp: '2024-07-01T10:01:00Z' },
      ],
    },
    {
      id: 2,
      name: 'Jane Smith',
      profilePic: 'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.2113030492.1719705600&semt=ais_user',
      lastMessage: 'How are you?',
      isRead: true,
      professionalDetails: 'Graphic Designer at XYZ Designs',
      messages: [
        { id: 1, text: 'Hey!', sender: 'Jane Smith', timestamp: '2024-07-01T11:00:00Z' },
        { id: 2, text: 'I\'m good, thanks!', sender: 'You', timestamp: '2024-07-01T11:01:00Z' },
      ],
    },
    {
      id: 3,
      name: 'Alice Johnson',
      profilePic: 'https://cdn3d.iconscout.com/3d/premium/thumb/man-avatar-6299539-5187871.png?f=webp',
      lastMessage: 'Did you get the email?',
      isRead: false,
      professionalDetails: 'Marketing Manager at ABC Corp',
      messages: [
        { id: 1, text: 'Hi!', sender: 'Alice Johnson', timestamp: '2024-07-02T09:00:00Z' },
        { id: 2, text: 'Yes, I did. I\'ll reply soon.', sender: 'You', timestamp: '2024-07-02T09:01:00Z' },
      ],
    },
    {
      id: 4,
      name: 'Michael Brown',
      profilePic: 'https://www.temankreasi.com/asset/images/gambar/avatar-3d-gratis-9-1.jpg',
      lastMessage: 'Looking forward to the meeting!',
      isRead: true,
      professionalDetails: 'Sales Manager at XYZ Sales',
      messages: [
        { id: 1, text: 'Hi there!', sender: 'Michael Brown', timestamp: '2024-07-03T10:00:00Z' },
        { id: 2, text: 'Me too! It\'s going to be important.', sender: 'You', timestamp: '2024-07-03T10:01:00Z' },
      ],
    },
    {
      id: 5,
      name: 'Emily Davis',
      profilePic: 'https://img.freepik.com/premium-vector/happy-smiling-young-man-avatar-3d-portrait-man-cartoon-character-people-vector-illustration_653240-187.jpg',
      lastMessage: 'When are you free for lunch?',
      isRead: false,
      professionalDetails: 'HR Manager at ABC Corp',
      messages: [
        { id: 1, text: 'Hey!', sender: 'Emily Davis', timestamp: '2024-07-04T11:00:00Z' },
        { id: 2, text: 'I\'m free tomorrow afternoon.', sender: 'You', timestamp: '2024-07-04T11:01:00Z' },
      ],
    },
    // Add more dummy chat data entries here
  ];
  
  export default chats;
  