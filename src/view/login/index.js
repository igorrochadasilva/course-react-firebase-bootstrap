import React, {useState} from 'react'
import './login.scss'
import {Link, Redirect} from 'react-router-dom'
 
import firebase from '../../config/firebase'
import 'firebase/auth'

import {useSelector, useDispatch} from 'react-redux'

const Login = () => {

    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()
    const [msgTipo, setMsgTipo] = useState()

    const dispatch = useDispatch();

    const logar = () => {

        firebase.auth().signInWithEmailAndPassword(email,senha).then(resultado => {
            setMsgTipo("sucesso")

            setTimeout(() => {
                dispatch({type: 'LOG_IN', usuarioEmail: email})
            },2000)
            
            console.log(resultado)

        }).catch(erro => {
            setMsgTipo("erro")
            console.log(erro)
        })
      
    }    

    return( 
        <div className="login-content d-flex align-items-center">

            {useSelector(state => state.usuarioLogado) > 0 ? <Redirect to='/'/> : null}

            <form className="form-signin mx-auto">
                <div className="text-center mb-4">
                     <i className='far fa-smile-wink text-white fa-5x'></i>
                     <h1 className="h3 mb-3 font-weight-normal text-white font-weight-bold">Login</h1>                   
                </div>

                <input onChange={(e) => setEmail(e.target.value)} type="email" id="inputEmail" className="form-control my-2" placeholder="email"/>                  
                <input onChange={(e) => setSenha(e.target.value)} type="password" id="inputPassword" className="form-control my-2" placeholder="senha"/>

                <button onClick={logar} className="btn btn-lg btn-block btn-login" type="button">Logar</button>

                <div className="msg-login text-white text-center my-5">
                    
                    {msgTipo === 'sucesso' && <span role="img" aria-labelledby="happy"><strong>WoW</strong> Você está conectado! &#128526;</span> }
                    {msgTipo === 'erro' &&   <span role="img" aria-labelledby="bad"><strong>Ops</strong> Verifique se a senha ou usuario estão corretos! &#128546;</span>}
                                                                           
                </div>

                <div className="opcoes-login mt-5">
                    <Link to='recuperar-senha' className="mx-2">Recuperar Senha</Link>
                    <span className="text-white">&#9733;</span>
                    <Link to='cadastrar' className="mx-2">Quero cadastrar</Link>
                </div>
            </form>
        </div>
    )
}

export default Login