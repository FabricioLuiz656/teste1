//Exibe as informações detalhadas de um pet selecionado.

import React from 'react';
import './Pet.css';

export default function PetDetails({ pet, onBack }) {
  return (
    <div className="pet-container">
      <div className="pet-form-card" style={{ textAlign: 'left' }}>
        <button className="btn-secondary" onClick={onBack} style={{ marginBottom: '16px', width: 'auto', padding: '6px 12px' }}>← Voltar</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <img src={pet.photo || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=150'} alt={pet.name} className="pet-avatar" style={{ margin: 0 }} />
          <div>
            <h2 style={{ margin: 0, color: '#243836' }}>{pet.name}</h2>
            <p style={{ margin: '4px 0 0 0', color: '#666' }}>{pet.species} • {pet.breed} • {pet.age}</p>
          </div>
        </div>
        <hr style={{ border: '0', borderTop: '1px solid #EAECF0', margin: '20px 0' }} />
        <h3 style={{ color: '#243836', fontSize: '16px' }}>Dados do pet</h3>
        <p><strong>Espécie:</strong> {pet.species}</p>
        <p><strong>Raça:</strong> {pet.breed}</p>
        <p><strong>Idade:</strong> {pet.age}</p>
      </div>
    </div>
  );
}