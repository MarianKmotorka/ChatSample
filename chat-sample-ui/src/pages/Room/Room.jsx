import React from 'react'
import Chat from '../../components/Chat/Chat'

const testMessages = [
  {
    id: 1,
    text: "Hey was'up ?!",
    senderName: 'Fero Oref',
    isMyMessage: true,
    senderPicture:
      'https://lh4.googleusercontent.com/-PmrpJn6fioQ/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmfiFGyjZLrDvZP8PtyS9vsiewnXg/photo.jpg'
  },
  {
    id: 2,
    text: 'Yeah bruh ?!',
    senderName: 'John Melbourn',
    isMyMessage: false,
    senderPicture:
      'https://lh6.googleusercontent.com/-qGab-DzMugE/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckKYJ1jTQ-UuSXjAJg6g9x14bt6kg/photo.jpg'
  },
  {
    id: 3,
    text: "Hey was'up ?!",
    senderName: 'Fero Oref',
    isMyMessage: true,
    senderPicture:
      'https://lh4.googleusercontent.com/-PmrpJn6fioQ/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmfiFGyjZLrDvZP8PtyS9vsiewnXg/photo.jpg'
  },
  {
    id: 4,
    text: 'Yeah bruh ?!',
    senderName: 'John Melbourn',
    isMyMessage: false,
    senderPicture:
      'https://lh6.googleusercontent.com/-qGab-DzMugE/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckKYJ1jTQ-UuSXjAJg6g9x14bt6kg/photo.jpg'
  },
  {
    id: 5,
    text:
      'Yeah bruh sdcccccccc ccccccccc ccccccc cccccccc ccccccccs dcsdcsdcsdc  s dc s dc  sdc sdc s dc s dc   s dc sdc a d caadcadcadcacacadcacdad dc a dc a dc a dc a cd?!',
    senderName: 'John Melbourn',
    isMyMessage: false,
    senderPicture:
      'https://lh6.googleusercontent.com/-qGab-DzMugE/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckKYJ1jTQ-UuSXjAJg6g9x14bt6kg/photo.jpg'
  }
]

const Room = () => {
  return <Chat messages={testMessages} onMessageSent={x => x} />
}

export default Room
