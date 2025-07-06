import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './workerLogin.css';

const WorkerLogin = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    fullName: '',
    phone: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation
    if (!loginData.fullName || !loginData.phone || !loginData.password) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call - replace with actual API call
      const response = await mockLoginAPI(
        loginData.fullName,
        loginData.phone,
        loginData.password
      );
      
      // Store JWT token and user data in localStorage
      localStorage.setItem('workerToken', response.token);
      localStorage.setItem('workerData', JSON.stringify({
        fullName: loginData.fullName,
        phone: loginData.phone
      }));
      
      // Redirect to dashboard
      navigate('/worker-dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock API function - replace with actual API call
  const mockLoginAPI = (fullName, phone, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Basic mock validation
        if (phone.length < 10) {
          reject(new Error('Invalid phone number'));
          return;
        }
        if (password.length < 6) {
          reject(new Error('Password must be at least 6 characters'));
          return;
        }

        resolve({
          token: 'mock-jwt-token-' + Math.random().toString(36).substr(2),
          user: {
            fullName,
            phone
          }
        });
      }, 1500);
    });
  };

  return (
    <div className="worker-login-container">
      <div className="login-card">
        <h2>Worker Login</h2>
        <p>Enter your details to access your account</p>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={loginData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={loginData.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              minLength="6"
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <span onClick={() => navigate('/worker-registration')}>Register</span></p>
          <p>Forgot password? <span onClick={() => navigate('/reset-password')}>Reset</span></p>
        </div>
      </div>
    </div>
  );
};

export default WorkerLogin;