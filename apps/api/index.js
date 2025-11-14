import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = 3000;
const EXTERNAL_API = 'https://rickandmortyapi.com/api/character';

// 1. Rota de Listagem com Busca
app.get('/api/characters', async (req, res) => {
  try {
    const { name } = req.query;
    
    // Monta a URL com filtro se houver nome
    let url = EXTERNAL_API;
    if (name) {
      url += `/?name=${encodeURIComponent(name)}`;
    }

    console.log(`🔎 Buscando: ${url}`);
    const response = await fetch(url);
    
    if (response.status === 404) {
      return res.json([]); // Retorna array vazio se não achar ninguém
    }
    
    if (!response.ok) throw new Error('Erro na API Externa');
    
    const data = await response.json();
    
    // Mapeia apenas o essencial para a lista
    const characters = data.results.map(char => ({
      id: char.id,
      name: char.name,
      status: char.status,
      species: char.species,
      image: char.image
    }));

    res.json(characters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
});

// 2. Nova Rota: Detalhes do Personagem
app.get('/api/characters/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetch(`${EXTERNAL_API}/${id}`);

    if (!response.ok) throw new Error('Personagem não encontrado');

    const data = await response.json();

    // Retorna mais detalhes aqui
    const character = {
      id: data.id,
      name: data.name,
      status: data.status,
      species: data.species,
      gender: data.gender,
      image: data.image,
      origin: data.origin.name,
      location: data.location.name,
      episodes: data.episode.length // Apenas contagem de eps
    };

    res.json(character);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar detalhes' });
  }
});

app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));