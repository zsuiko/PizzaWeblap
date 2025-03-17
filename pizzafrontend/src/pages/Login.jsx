import { useState } from "react";

function Login () {



  const [currentState, setCurrentState] = useState('Sing Up');

  const onSubmitHandler =  async (event) => {
    event.preventDefault();
  }



  return(
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800" action="">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
      <p className="prata-ragular text-3xl">{currentState}</p>
      <hr className="border-none h-[1.5px] w-8 bg-gray-800"/>
      </div>
      {currentState === 'Login' ? '' :   <input type="text" className="w-full px-3 px-2 border-2 focus:rounded-2xl rounded-sm transition-all border border-gray-800 invalid:border-red-600" placeholder="Név" required/>}
      <input type="email" className="w-full px-3 px-2 border-2 focus:rounded-2xl rounded-sm transition-all border border-gray-800 invalid:border-red-600" placeholder="Email" required/>
      <input type="password" className="w-full px-3 px-2 border-2 focus:rounded-2xl rounded-sm transition-all border border-gray-800 invalid:border-red-600" placeholder="Jelszó" required/>
      <div className="w-full flex justify-between text-sm mt-[8px]">
        <p className="cursor-pointer">Elfelejtett jelszó</p>
        {
          currentState === 'Login' ? <p onClick={() => setCurrentState('Sing Up')} className="cursor-pointer">Regisztráció</p> : <p onClick={() => setCurrentState('Login')} className="cursor-pointer">Bejelentkezés</p>
        }
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer hover:not-focus:bg-indigo-700">{currentState === 'Login' ? 'Sing In' : 'Sing In'}</button>
    </form>


  )


}


export default Login;