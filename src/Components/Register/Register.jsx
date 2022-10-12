import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authConfig } from "../../Functions/auth";

function Register(){

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [passConf, setPassConf] = useState('');
    const [saveUser, setSaveUser] = useState(null);

    const registerUser = () => {
        if(pass === passConf){
            setSaveUser({
                name,
                pass,
            })
        }
        setName('');
        setPass('');
        setPassConf('');
    }

    useEffect(()=>{
        if(null === saveUser){
            return;
        }
        axios.post('http://localhost:3007/register',saveUser, authConfig()).then(res => {
            navigate('/login', {replace: true});
        });
    }, [saveUser, navigate])

    return(
        <div className="register login-container">
            <h2>Register</h2>
            <div className="login-row"><label>Name: </label><input type="text" className="login-input-text" value={name} onChange={e => setName(e.target.value)}></input></div>
            <div className="login-row"><label>Password: </label><input type="password" className="login-input-text" value={pass} onChange={e => setPass(e.target.value)}></input></div>
            <div className="login-row"><label>Password confirm: </label><input type="password" className="login-input-text" value={passConf} onChange={e => setPassConf(e.target.value)}></input></div>
            <button className='btn btn-login' onClick={registerUser}>Register</button>
        </div>
    );
}

export default Register;