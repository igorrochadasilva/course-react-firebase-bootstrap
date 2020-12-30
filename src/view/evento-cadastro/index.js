import React, {useEffect, useState} from 'react'
import './evento-cadastro.scss'
//import {Link, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Navbar from '../../components/navbar/'

import firebase from '../../config/firebase'
import 'firebase/auth'

// criar página de cadastro de eventos e cadastralos
const EventoCadastro = (props) => {
    
    // define os useStates do evento
    const [carregando, setCarregando] = useState()
    const [msgTipo, setMsgTipo] = useState()
    const [titulo, setTitulo] = useState()
    const [tipo, setTipo] = useState()
    const [detalhes, setDetalhes] = useState()
    const [data, setData] = useState()
    const [hora, setHora] = useState()
    const [fotoAtual, setFotoAtual] = useState()
    const [fotoNova, setFotoNova] = useState()
    const usuarioEmail = useSelector(state => state.usuarioEmail)

    const storage = firebase.storage()
    const db = firebase.firestore()

    // pegar as informações do evento no firebase e mostrar elas nos inputs.
    useEffect(() => {
        if(props.match.params.id){
            firebase.firestore().collection('eventos').doc(props.match.params.id).get().then(response => {
                setTitulo(response.data().titulo)
                setTipo(response.data().tipo)
                setData(response.data().data)
                setHora(response.data().hora)
                setDetalhes(response.data().detalhes)
                setFotoAtual(response.data().foto)
            })
        }
    },[carregando])

    const atualizar = () => {
        setMsgTipo(null)
        setCarregando(1)

        if(fotoNova)

            storage.ref(`imagens/${fotoNova.name}`).put(fotoNova)

            firebase.firestore().collection('eventos').doc(props.match.params.id).update({
                titulo: titulo,
                tipo: tipo,
                detalhes:detalhes,
                data:data,
                hora:hora,
                foto: fotoNova ? fotoNova.name : fotoAtual
            }).then(() => {
                setMsgTipo("sucesso")
                setCarregando(0)
            }).catch(erro => {
                console.log(erro)
                setMsgTipo('erro')
                setCarregando(0)
            })     
    }
  
    //função de cadastro de eventos no firebase
    const cadastrar = () => {

        setMsgTipo(null)
        setCarregando(1)
        console.log(fotoNova)
        console.log(fotoNova.name)
        storage.ref(`imagens/${fotoNova.name}`).put(fotoNova).then(() =>{
            db.collection('eventos').add({
                titulo: titulo,
                tipo: tipo,
                detalhes:detalhes,
                data:data,
                hora:hora,
                usuario: usuarioEmail,
                visualizacoes: 0,
                foto: fotoNova.name,
                publico: 1,
                criacao: new Date()
            }).then(() => {
                setMsgTipo("sucesso")
                setCarregando(0)
            }).catch(erro => {
                console.log(erro)
                setMsgTipo('erro')
                setCarregando(0)
            })       
        })
    }

    return(
        <>
            <Navbar/>
            <section className="container">
                <div className="col-12">  
                    <div className="row">
                        <h3 className="mx-auto font-weight-bold mt-5">{props.match.params.id ? 'Atualizar evento' : 'Novo Evento'}</h3>
                    </div>

                    <form>
                        <div className="form-group">
                            <label>Titulo</label>
                            <input onChange={(e) => setTitulo(e.target.value)} type="text" className="form-control" value={titulo && titulo}/>                        
                        </div>

                        <div className="form-group">
                            <label>Tipo do Evento</label>
                            <select defaultValue={'DEFAULT'} onChange={(e) => setTipo(e.target.value)} className="form-control" value={tipo && tipo}>
                                <option disabled value="DEFAULT">-- Selecione um tipo --</option>
                                <option>Festa</option>
                                <option>Teatro</option>
                                <option>Show</option>
                                <option>Evento</option>
                            </select>
                        </div>     

                        <div className="form-group">
                            <label>Descrição do Evento</label>
                            <textarea onChange={(e) => setDetalhes(e.target.value)} className="form-control" rows="3" value={detalhes && detalhes}/>
                        </div> 

                        <div className="form-group row">
                            <div className="col-6">
                                <label>Data</label>
                                <input onChange={(e) => setData(e.target.value)} type="date"  className="form-control" value={data && data}/>
                            </div>
                            <div className="col-6">
                                <label>Hora</label>
                                <input onChange={(e) => setHora(e.target.value)} type="time"  className="form-control" value={hora && hora}/>
                            </div>
                        </div>   

                        <div className="form-group">
                            <label>Upload de Foto:{props.match.params.id ? ('caso queira manter mesma foto, não precisa clicar aqui') : null}</label>
                            <input onChange={(e) => setFotoNova(e.target.files[0])} type="file" className="form-control"/>
                        </div>       

                        <div className="row">
                        {   
                            carregando > 0 ?                  
                            <div className="spinner-border text-danger mx-auto" role="status"><span className="sr-only">Carregando...</span></div>
                            : <button onClick={props.match.params.id ? atualizar : cadastrar} type="button" className="btn btn-lg btn-block mt-3 btn-cadastro">{props.match.params.id ? 'Atualizar evento' : 'Publicar Evento'}</button>                    
                        }
                        </div>
                        
                    </form>
                    <div className="msg-login text-center my-2">
                        {msgTipo === 'sucesso' && <span role="img" aria-labelledby="happy"><strong>WoW</strong> Evento publicado! &#128526;</span> }
                        {msgTipo === 'erro' &&   <span role="img" aria-labelledby="bad"><strong>Ops</strong> Não foi possivel publicar o evento! &#128546;</span>}                       
                    </div>
                
                </div>
            </section>
        </>
    )
    
}

export default EventoCadastro