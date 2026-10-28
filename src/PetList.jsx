import React, { useState, useEffect } from 'react';
import { getPets, deletePet } from './services/api';
import './Pet.css';

export default function PetList({ token, onAddNew, onEditPet, onViewDetails }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPetsData = async () => {
    try {
      setLoading(true);
      const data = await getPets(token);
      setPets(data);
    } catch (err) {
      setError('Não foi possível carregar a lista de pets.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPetsData();
  }, [token]);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este pet?')) {
      try {
        await deletePet(id, token);
        setPets(pets.filter(pet => pet.id !== id));
      } catch (err) {
        alert('Erro ao excluir o pet.');
      }
    }
  };

  if (loading) return <div className="pet-container"><p>Carregando pets...</p></div>;

  return (
    <div className="pet-container">
      <div className="pet-header">
        <h1>🐾 Meus Pets</h1>
        <button className="btn-primary" onClick={onAddNew}>+ Adicionar novo pet</button>
      </div>

      {error && <div className="auth-feedback error">{error}</div>}

      <div className="pet-grid">
        {pets.length === 0 ? (
          <p>Nenhum pet cadastrado ainda.</p>
        ) : (
          pets.map((pet) => (
            <div key={pet.id} className="pet-card">
              <img src={pet.photo || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=150'} alt={pet.name} className="pet-avatar" />
              <h3>{pet.name}</h3>
              <p>{pet.breed} • {pet.age}</p>
              <div className="pet-actions">
                <button className="btn-outline" onClick={() => onViewDetails(pet)}>Ver</button>
                <button className="btn-outline" onClick={() => onEditPet(pet)}>Editar</button>
                <button className="btn-danger" onClick={() => handleDelete(pet.id)}>Excluir</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}