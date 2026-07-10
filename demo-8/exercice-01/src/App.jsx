import { useState } from 'react'
import './App.css'

import { LignesList } from "./LignesList.jsx";

function App() {
    return (
        <main className='app'>
            <h1>Bus en vue</h1>
            <LignesList></LignesList>
        </main>
    )
}

export default App
