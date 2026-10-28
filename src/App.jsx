//Conecte todas as telas controlando o estado de autenticação e navegação

import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import PetList from './PetList';
import PetForm from './PetForm';
import PetDetails from './PetDetails';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login'); 
  const [token, setToken] = useState('');
  const [petToEdit, setPetToEdit] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);

  const handleLoginSuccess = (authToken) => {
    setToken(authToken);
    setCurrentScreen('dashboard');
  };

  if (currentScreen === 'dashboard') {
    return (
      <PetList 
        token={token}
        onAddNew={() => { setPetToEdit(null); setCurrentScreen('pet-form'); }}
        onEditPet={(pet) => { setPetToEdit(pet); setCurrentScreen('pet-form'); }}
        onViewDetails={(pet) => { setSelectedPet(pet); setCurrentScreen('pet-details'); }}
      />
    );
  }

  if (currentScreen === 'pet-form') {
    return (
      <PetForm 
        petToEdit={petToEdit}
        token={token}
        onSave={() => setCurrentScreen('dashboard')}
        onCancel={() => setCurrentScreen('dashboard')}
      />
    );
  }

  if (currentScreen === 'pet-details') {
    return <PetDetails pet={selectedPet} onBack={() => setCurrentScreen('dashboard')} />;
  }

  return (
    <>
      {currentScreen === 'login' ? (
        <Login 
          onSwitchToRegister={() => setCurrentScreen('register')} 
          onLoginSuccess={handleLoginSuccess} 
        />
      ) : (
        <Register 
          onSwitchToLogin={() => setCurrentScreen('login')} 
        />
      )}
    </>
  );
}