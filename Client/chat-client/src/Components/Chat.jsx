import React from 'react'

export const Chat = ({handleOnSubmit,setMensaje}) => {
  return (
  
        <form onSubmit={handleOnSubmit}>
            <input type="text" placeholder='ingrese su mensaje' autoComplete='off' onChange={(e) => setMensaje(e.target.value)} 
            className='border-2 border-zinc-500 p-2 w-full text-black'
            />
            <button type='submit'>Enviar</button>
        </form>
   
  )
}
