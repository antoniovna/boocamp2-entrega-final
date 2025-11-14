import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function Details() {
  const { id } = useParams(); // Pega o ID da URL
  const [char, setChar] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/characters/${id}`)
      .then(res => res.json())
      .then(data => setChar(data));
  }, [id]);

  if (!char) return <div className="loading">Carregando detalhes...</div>;

  return (
    <div className="container">
      <Link to="/" className="back-btn">← Voltar para o Multiverso</Link>
      
      <div className="details-card">
        <img src={char.image} alt={char.name} />
        <div className="details-info">
          <h1>{char.name}</h1>
          <span className={`status ${char.status.toLowerCase()}`}>
            {char.status} - {char.species}
          </span>
          
          <div className="meta-data">
            <p><strong>Gênero:</strong> {char.gender}</p>
            <p><strong>Origem:</strong> {char.origin}</p>
            <p><strong>Última localização:</strong> {char.location}</p>
            <p><strong>Aparece em:</strong> {char.episodes} episódios</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;