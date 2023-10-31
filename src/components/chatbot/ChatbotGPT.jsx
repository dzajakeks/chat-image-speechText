import React, { useState, useEffect } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';

const systemMessage = {
  role: 'system',
  content: 'Explain everything as fast as possible',
};

const ChatbotGPT = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT, ask me something!",
      sentTime: 'just now',
      sender: 'ChatGPT',
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  async function handleSendMsg(message) {
    const newMessage = {
      message: message,
      sender: 'user',
      direction: 'outgoing',
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);
    await sendMsgsToChatGPT(newMessages);
  }

  async function sendMsgsToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = '';
      if (messageObject.sender === 'ChatGPT') {
        role = 'assistant';
      } else {
        role = 'user';
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...apiMessages],
    };

    await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: 'ChatGPT',
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    <section className='bg-[#505E61] px-1'>
      <div className='max-w-2xl mx-auto pb-6'>
        <h1 className='text-white text-2xl sm:text-3xl py-1 mb-3 text-center'>
          Chat with ChatGPT
        </h1>
        <MainContainer className='h-[390px]'>
          <ChatContainer>
            <MessageList
              scrollBehavior='smooth'
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content='ChatGPT is typing...' />
                ) : null
              }
            >
              {messages.map((msg, index) => {
                return <Message key={index} model={msg} className='text-sm' />;
              })}
            </MessageList>
            <MessageInput placeholder='write message' onSend={handleSendMsg} />
          </ChatContainer>
        </MainContainer>
      </div>
    </section>
  );
};
export default ChatbotGPT;
