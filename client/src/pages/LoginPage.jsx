import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios'
import { UserContext } from "../UserContext";


import Cookies from "js-cookie";


export default function LoginPage() {
    const [email,setEmail] = useState('');
    const  [password,setPassword] = useState('');
    const [redirect, setRedirect] = useState(false)
    const {setUser} = useContext(UserContext);

    
    async function handleLoginSubmit(ev, credentials) {
      ev.preventDefault();  
      
      try {
        const response = await axios.get('https://booking-sable-nine.vercel.app/api/user', credentials);
    
        if (response.status === 200) {
          const userDataResponse = await axios.get('https://booking-sable-nine.vercel.app/api/user', {
            headers: {
              Authorization: `Bearer ${response.data.token}`
            }
          });
          const userData = userDataResponse.data;
    
          Cookies.set('token', response.data.token);
          Cookies.set('user', JSON.stringify(userData));
    

          setUser(userData);
    
          console.log('Perfil de usuario obtenido:', userData);
          setRedirect(true);
          console.log('Redirección', setRedirect);
        } else {
          alert('Inicio de sesión fallido');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Inicio de sesión fallido');
      }
    }
    
    

    if(redirect) {
        return <Navigate to={'/'} />
    }    
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form 
                    className="max-w-md mx-auto"
                    onSubmit={handleLoginSubmit}>
                    <input 
                        type="email" 
                        placeholder="fre@gmail.com | write this email for start" 
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}/>
                    <input 
                        type="password" 
                        placeholder="password" 
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                        />
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet?  <Link className="underline text-black" to='/register'>Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}