import React, { useState } from 'react';
import './Auth.css';

export default function Login({ onSwitchToRegister, onLoginSuccess }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setFeedback({ type: '', message: '' });

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (formData.email === 'admin@animalcare.com' && formData.password === '123456') {
            resolve(true);
          } else {
            reject(new Error('E-mail ou senha incorretos. (Teste: admin@animalcare.com Senha: 123456)'));
          }
        }, 1000);
      });
      
      setFeedback({ type: 'success', message: 'Login realizado com sucesso!' });
      setTimeout(() => onLoginSuccess('fake-token'), 1000);
    } catch (error) {
      setFeedback({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Logotipo igual ao protótipo */}
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

        <h1 className="auth-title">Entrar</h1>
        <p className="auth-subtitle">Acesse sua conta para continuar</p>

        {feedback.message && (
          <div className={`auth-feedback ${feedback.type}`}>{feedback.message}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
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
                placeholder="Digite sua senha"
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

          <div className="auth-options">
            <a href="#forgot" onClick={(e) => e.preventDefault()}>Esqueci minha senha</a>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="auth-divider">ou</div>

        <button type="button" className="auth-button-outline" onClick={onSwitchToRegister}>
          Criar uma conta
        </button>
      </div>
    </div>
  );
}