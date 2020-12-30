import {createStore} from 'redux'
import usuarioReducer from './usuarioReducer.js'
import {persistReducer, persistStore} from 'redux-persist' 

import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'siteeventos',
    storage,
}

//Redux é um padrão e biblioteca para gerenciar e atualizar o estado do aplicativo, usando eventos chamados "ações
// cria um store para armazenar o estado de usuario logado e deslogado

const persistedReducer = persistReducer(persistConfig, usuarioReducer)
const store = createStore(persistedReducer);
const persistor = persistStore(store)

export {store, persistor}