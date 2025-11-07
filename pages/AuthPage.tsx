import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, signInWithPassword, signUp } = useAuth();
  const { t } = useLanguage();

  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (currentUser) {
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, from]);

  const validateEmail = (value: string) => {
    if (value && !/\S+@\S+\.\S+/.test(value)) {
      setEmailError(t('auth.errorInvalidEmail'));
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (value: string) => {
    if (!isLogin && value && value.length < 6) {
      setPasswordError(t('auth.errorPasswordLength'));
    } else {
      setPasswordError('');
    }
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setEmail(value);
      validateEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setPassword(value);
      validatePassword(value);
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setEmailError('');
    setPasswordError('');
    setPassword('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    validateEmail(email);
    validatePassword(password);
    if (emailError || passwordError || !email || !password) {
      return;
    }
    if (!isLogin && password.length < 6) {
      setPasswordError(t('auth.errorPasswordLength'));
      return;
    }

    setLoading(true);

    try {
      const { error: authError } = isLogin
        ? await signInWithPassword(email, password)
        : await signUp(email, password);

      if (authError) {
        setError(authError.message);
      } else {
         if (!isLogin) {
            alert("¡Registro exitoso! Por favor, revisa tu email para verificar tu cuenta.");
            // navigate will be handled by onAuthStateChange after verification, or on next login
         } else {
            navigate(from, { replace: true });
         }
      }
    } catch (err) {
      setError(t('auth.errorUnexpected'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isFormInvalid = !!emailError || !!passwordError || !email || !password;

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-corporate-dark py-12 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-md w-full space-y-8 bg-gray-900/50 p-10 rounded-xl shadow-2xl border border-tech-blue/20">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-pure-white font-poppins">
            {isLogin ? t('auth.loginTitle') : t('auth.registerTitle')}
          </h2>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">{t('auth.emailLabel')}</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none relative block w-full px-3 py-3 border bg-gray-800 text-pure-white placeholder-gray-500 focus:outline-none focus:ring-tech-blue focus:border-tech-blue focus:z-10 sm:text-sm rounded-md ${emailError ? 'border-red-500' : 'border-gray-700'}`}
                placeholder={t('auth.emailPlaceholder')}
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && <p className="text-red-500 text-xs mt-1 px-1">{emailError}</p>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">{t('auth.passwordLabel')}</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                className={`appearance-none relative block w-full px-3 py-3 border bg-gray-800 text-pure-white placeholder-gray-500 focus:outline-none focus:ring-tech-blue focus:border-tech-blue focus:z-10 sm:text-sm rounded-md ${passwordError ? 'border-red-500' : 'border-gray-700'}`}
                placeholder={t('auth.passwordPlaceholder')}
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordError && <p className="text-red-500 text-xs mt-1 px-1">{passwordError}</p>}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={loading || isFormInvalid}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-tech-blue hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? t('auth.loading') : (isLogin ? t('auth.loginButton') : t('auth.registerButton'))}
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <button onClick={handleToggleMode} className="font-medium text-tech-blue hover:text-blue-400">
            {isLogin ? t('auth.switchToRegister') : t('auth.switchToLogin')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;