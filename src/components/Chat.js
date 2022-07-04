import {
  BellIcon,
  ChatIcon,
  HashtagIcon,
  InboxIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
  UserIcon,
  EmojiHappyIcon,
  GiftIcon,
  PlusCircleIcon,
} from '@heroicons/react/solid';
import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from '../features/channelSlice';
import React, { useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/compat/app';
import Message from './Message';
const Chat = () => {
  const channelName = useSelector(selectChannelName);
  const channelId = useSelector(selectChannelId);
  const [user] = useAuthState(auth);
  const [messages] = useCollection(
    channelId &&
      db
        .collection('channels')
        .doc(channelId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
  );
  console.log(messages);
  const chatRef = useRef(null);
  const inputRef = useRef('');
  const scrollToBottom = () => {
    chatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
  const sendMessage = (e) => {
    e.preventDefault();
    if (inputRef.current.value.length !== 0) {
      db.collection('channels')
        .doc(channelId)
        .collection('messages')
        .add({
          timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
          message: inputRef.current.value,
          name: user?.displayName,
          photoURL: user?.photoURL,
          email: user?.email,
        });
      inputRef.current.value = '';
      scrollToBottom();
    }
  };
  return (
    <div className='flex flex-col h-screen'>
      <header className='flex items-center justify-between space-x-5 border-b border-gray-800 p-4 -mt-1'>
        <div className='flex items-center space-x-1'>
          <HashtagIcon className='h-6 text-[#72767d]' />
          <h4 className='text-white font-semibold'>{channelName}</h4>
        </div>
        <div className='flex space-x-3'>
          <BellIcon className='icon' />
          <ChatIcon className='icon' />
          <UserIcon className='icon' />

          <div className='flex bg-[#202225] text-xs p-1 rounded-md'>
            <input
              type='text'
              placeholder='Search'
              className='bg-transparent focus:outline-none text-white pl-1 placeholder-[#72767d]'
            />
            <SearchIcon className='h-4 text-[#72767d] mr-1 ' />
          </div>
          <InboxIcon className='icon' />
          <QuestionMarkCircleIcon className='icon' />
        </div>
      </header>
      <main className='flex-grow overflow-y-scroll scrollbar-hide'>
        {messages?.docs.map((doc) => {
            console.log(doc);
          const { message, timestamp, name, photoURL, email } = doc.data();
          return (
            <Message
              key={doc.id}
              id={doc.id}
              message={message}
              timestamp={timestamp}
              name={name}
              photoURL={photoURL}
              email={email}
            />
          );
        })}
        <div ref={chatRef} className='pb-14' />
      </main>
      <div className='flex items-center p-2.5 bg-[#40444b] mx-5 mb-7 rounded-lg'>
        <PlusCircleIcon className='icon mr-4' />
        <form className='flex-grow'>
          <input
            type='text'
            disabled={!channelId}
            placeholder={
              channelId ? `Message #${channelName}` : 'Select a channel'
            }
            className='bg-transparent focus:outline-none text-[#dcddde] w-full placeholder-[#72767d] text-sm'
            ref={inputRef}
          />
          <button hidden type='submit' onClick={sendMessage}>
            Send
          </button>
        </form>
        <GiftIcon className='icon mr-2' />
        <EmojiHappyIcon className='icon' />
      </div>
    </div>
  );
};

export default Chat;
