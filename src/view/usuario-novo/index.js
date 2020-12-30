import React, {useState} from 'react'
import firebase from '../../config/firebase'
import 'firebase/auth'

import './usuario-novo.scss'
import Navbar from '../../components/navbar/'

const NovoUsuario = () => {

    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()
    const [msgTipo, setMsgTipo] = useState()
    const [msg, setMsg] = useState()
    const [carregando, setCarregando] = useState()

    const cadastrar = () => {

        setCarregando(1)

        setMsgTipo(null)

        if(!email || !senha){
            setMsgTipo('erro')
            setMsg('Você precisa informar o e-mail e senha para fazer o cadastro.')
            return
        } 

        firebase.auth().createUserWithEmailAndPassword(email, senha).then(resultado => {
            setCarregando(0)
            setMsgTipo('sucesso') 

        }).catch(erro => {
            setCarregando(0)
            setMsgTipo('erro')

            switch(erro.message)
            {
                case 'The email address is already in use by another account.':
                    setMsg('O endereço de e-mail já está sendo usado por outra conta.');
                    break;
                
                case 'The email address is badly formatted.':
                    setMsg('O endereço de e-mail está formatado incorretamente.');
                    break;

                case 'Password should be at least 6 characters':
                    setMsg('A senha deve ter pelo menos 6 caracteres');
                    break;

                default:
                    setMsg('Não foi possivel cadastrar. Tente novamente mais tarde!');
                    break;
            }
        })
    }

    return (
        <>
            <Navbar/>
            <div className="form-cadastro">
                <form className="text-center form-login mx-auto mt-5">
                    <h1 className="h3 mb-3 text-black font-weight-bold">Cadastro</h1>

                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="Email"/>
                    <input onChange={(e) => setSenha(e.target.value)} type="password" className="form-control my-2" placeholder="Senha"/>

                    {
                        carregando ? <div className="spinner-border text-danger" role="status"><span className="sr-only">Carregando...</span></div> 
                        : <button onClick={cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">Cadastrar</button>
                    }
                
                    <div className="msg-login text-black text-center my-5">                    
                        {msgTipo === 'sucesso' && <span role="img" aria-labelledby="happy"><strong>WoW</strong> Parábens você foi cadastrado com sucesso! &#128526;</span> }
                        {msgTipo === 'erro' &&   <span role="img" aria-labelledby="bad"><strong>Ops </strong>{msg}&#128546;</span>}                                                                           
                    </div>
                </form>
            </div>
        </>
    )
}

export default NovoUsuario;