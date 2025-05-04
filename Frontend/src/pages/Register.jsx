import react, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [form, setForm] = useState({username:'', email:'', password:''});
    const Navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:3000/api/auth/signup', form);
            alert("Registered Successfully!")
            Navigate('/login')
        } catch(err){
            alert(err.response.data.msg || "Register Failed!!")
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-2xl w-85">
            <h2 className='text-xl font-semibold mb-4 text-center'>Register</h2>
            <input className='w-full p-2 mb-3 border rounded'
            type="text"
            placeholder='Enter Username'
            value={form.username}
            onChange={(e) => setForm({ ...form, username:e.target.value})} 
            />

            <input className='w-full p-2 mb-3 border rounded'
            type="email" 
            placeholder='Enter Email'
            value={form.email}
            onChange={(e) => setForm({...form, email:e.target.value})}
            />

            <input className='w-full p-2 mb-3 border rounded'
            type="password"
            placeholder='Enter Password'
            value={form.password}
            onChange={(e) => setForm({...form, password:e.target.value})} 
            />
            <button className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600' type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;