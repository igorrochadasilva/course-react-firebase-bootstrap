import React, {useState} from 'react'
import './usuario-recuperar-senha.scss'
import Navbar from '../../components/navbar/'

import firebase from '../../config/firebase'
import 'firebase/auth'

const UsuarioRecuperarSenha = () => {

    const [email, setEmail] = useState()
    const [msg, setMsg] = useState()

    const recuperarSenha = () => {
        firebase.auth().sendPasswordResetEmail(email).then(resultado => {
            setMsg('Enviamos um link no seu email, para você redefinir sua senha!')
        }).catch(erro => {         
            setMsg('Verifique se seu e-mail está correto.')
        }) 
    }

    return(
        <>
                <Navbar />
                <form className="text-center form-login mx-auto mt-5">
                    <h1 className="mb-3 font-weght-bold">Recuperar Senha</h1>            
                    <input onChange={(e) => setEmail(e.target.value) } type="email" className="form-control my-2" placeholder="Email"/>
                    <div className="msg my-4">
                        <span>{msg}</span>
                    </div>
                    <button onClick={recuperarSenha} type="button" className="btn btn-lg btn-block btn-enviar">Recuperar Senha</button>
                </form>
        </>
    )
}

export default UsuarioRecuperarSenha