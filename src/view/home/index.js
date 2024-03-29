import React, { useState, useEffect } from  'react'
import { useSelector } from 'react-redux'

import './home.scss'

import Navbar from '../../components/navbar/'
import EventoCard from '../../components/evento-card'

import firebase from '../../config/firebase'


const Home = ({match}) => {

    const [eventos, setEventos] = useState([])
    const [pesquisa, setPesquisa] = useState("")
    let listaEventos = []

    const usuarioEmail = useSelector(state => state.usuarioEmail)

    useEffect(() => {
        if(match.params.parametro){
            firebase.firestore().collection('eventos').where('usuario','==',usuarioEmail).get().then( async (resultado) => {     
                await resultado.docs.forEach(doc => {
                    if(doc.data().titulo.indexOf(pesquisa) >= 0){
                        listaEventos.push({
                            id:doc.id,
                            ...doc.data()
                        })
                    }            
                })
                setEventos(listaEventos)
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        }else{
            firebase.firestore().collection('eventos').get().then( async (resultado) => {     
                await resultado.docs.forEach(doc => {
                    if(doc.data().titulo.indexOf(pesquisa) >= 0){
                        listaEventos.push({
                            id:doc.id,
                            ...doc.data()
                        })
                    }            
                })
                setEventos(listaEventos)
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        }
    }, [pesquisa]);

    return (
        <>
            <Navbar />
            <section className="container">
                <div className="row p-5">
                    <h2 className="mx-auto mb-2 pb-5">Eventos Publicados</h2>
                    <input onChange={(e) => setPesquisa(e.target.value)} type="text" className="form-control text-center" placeholder="Pesquisar Evento pelo Titulo..."/>
                </div>
                <div className="container">
                    <div className="row p-3">
                        {eventos.map(item => <EventoCard key={item.id} id={item.id} img={item.foto} titulo={item.titulo} detalhes={item.detalhes} visualizacoes={item.visualizacoes} />) }  
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home