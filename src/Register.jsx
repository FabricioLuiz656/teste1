import React, { useState } from 'react';
import './Auth.css';

export default function Register({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'O nome completo é obrigatório.';
    if (!formData.email) {
      newErrors.email = 'O e-mail é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido.';
    }
    if (!formData.password) {
      newErrors.password = 'A senha é obrigatória.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setFeedback({ type: '', message: '' });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFeedback({ type: 'success', message: 'Conta criada com sucesso! Faça login.' });
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    } catch {
      setFeedback({ type: 'error', message: 'Erro ao cadastrar.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Logotipo idêntico ao da tela de login */}
        <div className="auth-logo-container">
          <svg className="auth-logo-svg" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <circle cx="130" cy="140" r="45" />
            <circle cx="230" cy="95" r="50" />
            <circle cx="340" cy="115" r="50" />
            <circle cx="410" cy="205" r="42" />
            <path d="M256 180c-75 0-140 45-140 120 0 55 45 105 105 130 18 8 35 12 35 12s17-4 35-12c60-25 105-75 105-130 0-75-65-120-140-120z" />
            <path fill="#ffffff" d="M256 245c-22-25-60-20-72 5-10 22 2 47 28 68 22 18 36 28 44 34 8-6 22-16 44-34 26-21 38-46 28-68-12-25-50-30-72-5z" />
          </svg>
          <h2 className="auth-logo-text">Animal Care</h2>
        </div>

        <h1 className="auth-title">Criar conta</h1>
        <p className="auth-subtitle">Preencha seus dados para começar</p>

        {feedback.message && (
          <div className={`auth-feedback ${feedback.type}`}>{feedback.message}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label>Nome completo</label>
            <input 
              type="text" 
              name="name" 
              placeholder="Seu nome"
              value={formData.name} 
              onChange={handleChange} 
              className={errors.name ? 'error' : ''} 
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="input-group">
            <label>E-mail</label>
            <input 
              type="email" 
              name="email" 
              placeholder="seu@email.com"
              value={formData.email} 
              onChange={handleChange} 
              className={errors.email ? 'error' : ''} 
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label>Senha</label>
            <div className="password-wrapper">
              <input 
                type={showPassword ? 'text' : 'password'} 
                name="password" 
                placeholder="Crie uma senha"
                value={formData.password} 
                onChange={handleChange} 
                className={errors.password ? 'error' : ''} 
              />
              <button 
                type="button" 
                className="eye-btn" 
                onClick={() => setShowPassword(!showPassword)}
                title="Mostrar/Esconder Senha"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="input-group">
            <label>Confirmar senha</label>
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="Repita sua senha"
              value={formData.confirmPassword} 
              onChange={handleChange} 
              className={errors.confirmPassword ? 'error' : ''} 
            />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <div className="auth-divider">ou</div>

        <button type="button" className="auth-button-outline" onClick={onSwitchToLogin}>
          Já tem uma conta? Entrar
        </button>
      </div>
    </div>
  );
}