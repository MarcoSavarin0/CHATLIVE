/* eslint-disable no-unused-vars */
import { Chat } from './Components/Chat'
import io from 'socket.io-client'
import { useState, useEffect } from 'react'
import './App.css'
const socket = io("/")
function App() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  console.log(messages);
  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() !== '') {
      const newMessage = {
        body: message,
        from: 'Me'
      }
      setMessages([...messages, newMessage])
      socket.emit('message', message);
      setMessage('');
    }

  }
  useEffect(() => {
    socket.on('message', receiveMessage)
    return () => {
      socket.off('message', receiveMessage)
    }
  }, [messages])

  const receiveMessage = message => {
    setMessages(prevMessages => [...prevMessages, message]);
  };
  return (
    <>
      <div className='h-screen bg-zinc-800 text-white flex items-center justify-center'>
        <section className='bg-zinc-900 p-10'>
          <Chat handleOnSubmit={handleSubmit} setMensaje={setMessage} />
          <ul>
            {messages.map((message, i) => (
              <li className={`my-2 p-2 table text-sm rounded-md ${message.from === 'Me' ? 'bg-sky-700 ml-auto' : 'bg-black mr-auto'}`} key={i}>
               <span className='text-xs font-bold text-slate-200 block'>{message.from}</span> <span className='text-md'>{message.body}</span> 
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}

export default App
