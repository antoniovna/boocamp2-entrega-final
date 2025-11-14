import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function Home() {
  const [chars, setChars] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Função de busca
  const fetchCharacters = (query = '') => {
    setLoading(true);
    const url = query 
      ? `${API_BASE}/api/characters?name=${query}`
      : `${API_BASE}/api/characters`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setChars(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  // Carrega inicial
  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCharacters(search);
  };

  return (
    <div className="container">
      <header>
        <h1>🛸 Multiverse Codex</h1>
        
        {/* Formulário de Busca */}
        <form onSubmit={handleSearch} className="search-box">
          <input 
            type="text" 
            placeholder="Pesquisar personagem..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </header>

      {loading && <div className="loading">Carregando...</div>}

      <div className="grid">
        {chars.length > 0 ? (
          chars.map(char => (
            // Link envolve o Card para levar aos detalhes
            <Link to={`/character/${char.id}`} key={char.id} className="card-link">
              <div className="card">
                <img src={char.image} alt={char.name} loading="lazy" />
                <div className="card-info">
                  <h3>{char.name}</h3>
                  <span className={`status ${char.status.toLowerCase()}`}>
                    {char.status}
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          !loading && <p>Nenhum personagem encontrado nesta dimensão.</p>
        )}
      </div>
    </div>
  );
}

export default Home;