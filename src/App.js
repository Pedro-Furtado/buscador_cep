import { FiSearch } from "react-icons/fi";
import { useState} from 'react';
import './style.css';
import api from "./services/api";

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState('')

  async function handle(){
    if(input === ""){
      alert("-- Preencha o campo!")
      return
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")

    }catch{
      alert("Erro")
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input 
        type="text" 
        placeholder="Digite o CEP" 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn" onClick={handle}>
          <FiSearch size={25} color="white"/>
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
            
          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Localidade: {cep.localidade} - {cep.uf}</span>
        </main>
      )} 
      
    </div>
  );
}

export default App;

