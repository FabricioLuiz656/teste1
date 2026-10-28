//Responsável por enviar os dados para a API tanto na criação quanto na edição

import React, { useState, useEffect } from 'react';
import { createPet, updatePet } from './services/api';
import './Pet.css';

export default function PetForm({ petToEdit, token, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    species: 'Cachorro',
    breed: '',
    age: '',
    photo: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (petToEdit) {
      setFormData(petToEdit);
    }
  }, [petToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.breed) {
      setError('Preencha os campos obrigatórios.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (petToEdit) {
        await updatePet(petToEdit.id, formData, token);
      } else {
        await createPet(formData, token);
      }
      onSave();
    } catch (err) {
      setError('Erro ao salvar os dados do pet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pet-container">
      <div className="pet-form-card">
        <h2>{petToEdit ? 'Editar Pet' : 'Adicionar novo pet'}</h2>
        {error && <div className="auth-feedback error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome *</label>
            <input type="text" name="name" placeholder="Ex: Rex" value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Espécie</label>
            <select name="species" value={formData.species} onChange={handleChange}>
              <option value="Cachorro">Cachorro</option>
              <option value="Gato">Gato</option>
            </select>
          </div>
          <div className="form-group">
            <label>Raça *</label>
            <input type="text" name="breed" placeholder="Ex: Labrador" value={formData.breed} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Idade</label>
            <input type="text" name="age" placeholder="Ex: 3 anos" value={formData.age} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>URL da Foto</label>
            <input type="text" name="photo" placeholder="https://..." value={formData.photo} onChange={handleChange} />
          </div>
          <div className="form-buttons">
            <button type="button" className="btn-secondary" onClick={onCancel} disabled={loading}>Cancelar</button>
            <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}