import React, {useEffect, useState} from 'react'
import './evento-detalhes.scss'
import {Link, Redirect} from 'react-router-dom'
import firebase from '../../config/firebase'
import {useSelector} from 'react-redux'
import Navbar from '../../components/navbar'



const EventoDetalhes = (props) => {

    const [evento, setEvento] = useState({})
    const [urlImg, setUrlImg] = useState({})
    const usuarioLogado = useSelector(state => state.usuarioEmail)
    const [carregando, setCarregando] = useState(1)
    const [excluido, setExcluido] = useState(0)

    const removerEvento = () => {
        firebase.firestore().collection('eventos').doc(props.match.params.id).delete().then(() =>{
            setExcluido(1)
        })
    }

    useEffect(() => {
        //carregando ta ativo?
        if(carregando){
            firebase.firestore().collection('eventos').doc(props.match.params.id).get().then(response => {
                //armazena objeto de retorno informações do evento
                setEvento(response.data())      
                
                //atualiza o numero de visualizações
                firebase.firestore().collection('eventos').doc(props.match.params.id).update('visualizacoes', response.data().visualizacoes + 1)           

                //pega url da imagem
                firebase.storage().ref(`imagens/${response.data().foto}`).getDownloadURL().then(url => {                
                    setUrlImg(url)
                    setCarregando(0)
                })
           
            })
        }else{
            //pega url da imagem
            firebase.storage().ref(`imagens/${evento.foto}`).getDownloadURL().then(url => {setUrlImg(url)})
        }
    
    },[])

    return(
        <>
          
            <Navbar />

            {excluido === 1 ? <Redirect to='/'/> : null}

            <section className="container-fluid evento-detalhes">

                {   
                    //quando imagem for carregada, mostra conteudo
                    carregando ? 
                    <div className="row mt-5">
                        <div className="spinner-border text-danger mx-auto" role="status">
                            <span className="sr-only">                                
                            </span>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="row">     
                            <img src={urlImg} className="img-banner" alt="banner" />       
                            <div className="col-12 text-right mt-1 visualizacoes">
                                <i className="fas fa-eye"></i><span>{evento.visualizacoes + 1}</span>
                            </div>   
                            <h3 className="mx-auto mt-5 titulo"><strong>{evento.titulo}</strong></h3>     
                        </div>
                        <div className="row mt-5 d-flex justify-content-around">
                            <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                                <i className="fas fa-ticket-alt fa-2x"></i>
                                <h5><strong>Tipo</strong></h5>
                                <span className="mt-3">{evento.tipo}</span>
                            </div>
                            <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                                <i className="fas fa-calendar-alt fa-2x"></i>
                                <h5><strong>Data</strong></h5>
                                <span className="mt-3">{evento.data}</span>
                            </div>
                            <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                                <i className="fas fa-clock fa-2x"></i>
                                <h5><strong>Hora</strong></h5>
                                <span className="mt-3">{evento.hora}</span>
                            </div>
                        </div>

                        <div className="row box-detalhes m-5">
                            <div className="col-12">
                                <h5 className="text-center"><strong>Detalhes do evento</strong></h5>
                            </div>
                            <div className="col-12">
                                <p className="text-center">
                                    {evento.detalhes}
                                </p>
                            </div>        
                        </div>
                    {
                        usuarioLogado == evento.usuario ?
                        <Link to={`/editarevento/${props.match.params.id}`} className="btn-editar"><i className="fas fa-pen-square fa-3x"></i></Link>
                        : ''
                    }

                    {
                    usuarioLogado == evento.usuario ?
                    <button type="button" onClick={removerEvento} className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">Remover evento</button>
                    : null
                    }

                    
                    </div>                    
                }
            </section>
        </>
    )

}

export default EventoDetalhes