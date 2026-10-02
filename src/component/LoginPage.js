import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

function LoginPage(props) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [selectedRole, setSelectedRole] = useState('owner'); // 'owner' | 'pawmate'

  // Common Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // PawMate-Specific Fields
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');

  // Error Feedback
  const [errorMsg, setErrorMsg] = useState('');

  // Known quick demo accounts for seamless testing
  const demoUsers = {
    'shrey@gmail.com': { name: 'Shrey Vora', role: 'owner' },
    'shreyvora@gmail.com': { name: 'Shrey Vora', role: 'owner' },
    'aadi@gmail.com': { name: 'Aadi Sheth', role: 'owner' },
    'rahul@gmail.com': { name: 'Rahul Sharma', role: 'pawmate', location: 'Chembur, Mumbai', bio: 'Certified Dog Walker & Pet Sitter' }
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setErrorMsg('');
  };

  const handleModeChange = (mode) => {
    setAuthMode(mode);
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    if (authMode === 'signup') {
      if (!name.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match. Please verify your password.');
        return;
      }
      if (password.length < 4) {
        setErrorMsg('Password must be at least 4 characters long.');
        return;
      }
      if (selectedRole === 'pawmate' && !location.trim()) {
        setErrorMsg('Please enter your service location.');
        return;
      }
    }

    const cleanEmail = email.trim().toLowerCase();
    let resolvedName = name.trim();

    // If logging in without explicit name, check known demo users or derive from email prefix
    if (!resolvedName) {
      if (demoUsers[cleanEmail]) {
        resolvedName = demoUsers[cleanEmail].name;
      } else {
        const emailPrefix = cleanEmail.split('@')[0] || '';
        resolvedName = emailPrefix
          .replace(/[._-]/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase()) || (selectedRole === 'owner' ? 'Pet Parent' : 'PawMate Pro');
      }
    }

    const userData = {
      name: resolvedName,
      email: email.trim(),
      role: selectedRole,
      location: selectedRole === 'pawmate'
        ? (location.trim() || (demoUsers[cleanEmail]?.location) || 'Chembur, Mumbai')
        : 'Mumbai, Maharashtra',
      bio: selectedRole === 'pawmate'
        ? (bio.trim() || (demoUsers[cleanEmail]?.bio) || 'Certified PawMate Caregiver • Background Verified & First Aid Trained')
        : ''
    };

    if (props.onLogin) {
      props.onLogin(selectedRole, userData);
    }
  };

  return (
    <div className="pawmate-login-page py-5">
      {/* Soft Ambient Background Abstract Blobs */}
      <div className="login-abstract-blob-1"></div>
      <div className="login-abstract-blob-2"></div>
      <div className="login-abstract-blob-3"></div>

      {/* Visible & Elegant Background Pet Decor Elements (Scattered around login card) */}
      {/* Left side decorations */}
      <div className="pet-decor-item pet-decor-large" style={{ top: '6%', left: '5%', transform: 'rotate(-18deg)' }}>🐾</div>
      <div className="pet-decor-item pet-decor-medium" style={{ top: '18%', left: '14%', transform: 'rotate(10deg)' }}>🦴</div>
      <div className="pet-decor-item pet-decor-normal" style={{ top: '30%', left: '4%', transform: 'rotate(-12deg)' }}>🐶</div>
      <div className="pet-decor-item pet-decor-large" style={{ top: '46%', left: '11%', transform: 'rotate(24deg)' }}>🐾</div>
      <div className="pet-decor-item pet-decor-normal" style={{ top: '62%', left: '5%', transform: 'rotate(-15deg)' }}>🐕</div>
      <div className="pet-decor-item pet-decor-medium" style={{ top: '76%', left: '13%', transform: 'rotate(8deg)' }}>🦴</div>
      <div className="pet-decor-item pet-decor-large" style={{ top: '88%', left: '6%', transform: 'rotate(-25deg)' }}>🐾</div>

      {/* Right side decorations */}
      <div className="pet-decor-item pet-decor-large" style={{ top: '8%', right: '7%', transform: 'rotate(20deg)' }}>🐾</div>
      <div className="pet-decor-item pet-decor-normal" style={{ top: '20%', right: '15%', transform: 'rotate(-14deg)' }}>🐱</div>
      <div className="pet-decor-item pet-decor-medium" style={{ top: '34%', right: '5%', transform: 'rotate(15deg)' }}>❤️</div>
      <div className="pet-decor-item pet-decor-large" style={{ top: '48%', right: '12%', transform: 'rotate(-18deg)' }}>🐾</div>
      <div className="pet-decor-item pet-decor-normal" style={{ top: '64%', right: '6%', transform: 'rotate(14deg)' }}>🐈</div>
      <div className="pet-decor-item pet-decor-medium" style={{ top: '78%', right: '14%', transform: 'rotate(-8deg)' }}>✨</div>
      <div className="pet-decor-item pet-decor-large" style={{ top: '90%', right: '7%', transform: 'rotate(22deg)' }}>🐾</div>

      {/* Top and Bottom subtle accents */}
      <div className="pet-decor-item pet-decor-normal" style={{ top: '3%', left: '30%' }}>✦</div>
      <div className="pet-decor-item pet-decor-normal" style={{ top: '4%', right: '28%' }}>✦</div>
      <div className="pet-decor-item pet-decor-normal" style={{ bottom: '3%', left: '26%' }}>🦴</div>
      <div className="pet-decor-item pet-decor-normal" style={{ bottom: '4%', right: '32%' }}>❤️</div>

      <Container style={{ maxWidth: '460px' }}>
        <Card className="pawmate-apple-card border-0">
          <Card.Body className="p-4 p-sm-5">
            {/* Header with PawMate Brand Mark */}
            <div className="text-center mb-4">
              <div className="login-header-mark mb-3">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="#ffffff">
                  <path d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2ZM7 6C5.9 6 5 6.9 5 8C5 9.1 5.9 10 7 10C8.1 10 9 9.1 9 8C9 6.9 8.1 6 7 6ZM17 6C15.9 6 15 6.9 15 8C15 9.1 15.9 10 17 10C18.1 10 19 9.1 19 8C19 6.9 18.1 6 17 6ZM12 8C9.5 8 7.3 9.4 6.1 11.5C5.4 12.8 5 14.3 5 16C5 19.3 7.7 22 11 22H13C16.3 22 19 19.3 19 16C19 14.3 18.6 12.8 17.9 11.5C16.7 9.4 14.5 8 12 8Z" />
                </svg>
              </div>
              <h1 className="login-title-text mb-1">PawMate</h1>
              <p className="text-muted small mb-0">
                {authMode === 'login'
                  ? 'Welcome back. Sign in to your account.'
                  : 'Join the community of verified pet lovers.'}
              </p>
            </div>

            {/* Apple-Style Segmented Switcher (Log In / Sign Up) */}
            <div className="apple-segmented-control mb-4">
              <button
                type="button"
                className={`apple-segment-btn ${authMode === 'login' ? 'active' : ''}`}
                onClick={() => handleModeChange('login')}
              >
                Log In
              </button>
              <button
                type="button"
                className={`apple-segment-btn ${authMode === 'signup' ? 'active' : ''}`}
                onClick={() => handleModeChange('signup')}
              >
                Sign Up
              </button>
            </div>

            {/* Role Selection Tiles */}
            <div className="mb-4">
              <span className="small text-muted d-block mb-2 fw-semibold text-uppercase" style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                Select Account Type
              </span>
              <div className="d-flex gap-2">
                <div
                  className={`apple-role-tile ${selectedRole === 'owner' ? 'active' : ''}`}
                  onClick={() => handleRoleChange('owner')}
                  role="button"
                  tabIndex={0}
                >
                  <div className="role-tile-icon-box">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2ZM7 6C5.9 6 5 6.9 5 8C5 9.1 5.9 10 7 10C8.1 10 9 9.1 9 8C9 6.9 8.1 6 7 6ZM17 6C15.9 6 15 6.9 15 8C15 9.1 15.9 10 17 10C18.1 10 19 9.1 19 8C19 6.9 18.1 6 17 6ZM12 8C9.5 8 7.3 9.4 6.1 11.5C5.4 12.8 5 14.3 5 16C5 19.3 7.7 22 11 22H13C16.3 22 19 19.3 19 16C19 14.3 18.6 12.8 17.9 11.5C16.7 9.4 14.5 8 12 8Z" />
                    </svg>
                  </div>
                  <div>
                    <div className="role-tile-title">Pet Owner</div>
                    <div className="role-tile-sub">Book verified care</div>
                  </div>
                </div>

                <div
                  className={`apple-role-tile ${selectedRole === 'pawmate' ? 'active' : ''}`}
                  onClick={() => handleRoleChange('pawmate')}
                  role="button"
                  tabIndex={0}
                >
                  <div className="role-tile-icon-box">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      <path d="M9 12l2 2 4-4"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="role-tile-title">PawMate Pro</div>
                    <div className="role-tile-sub">Offer pet services</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Alert */}
            {errorMsg && (
              <Alert variant="danger" className="py-2.5 px-3 small mb-3 rounded-3 border-0 shadow-xs" style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}>
                <div className="d-flex align-items-center gap-2">
                  <span>⚠️</span>
                  <span>{errorMsg}</span>
                </div>
              </Alert>
            )}

            {/* Auth Form */}
            <Form onSubmit={handleSubmit}>
              {/* Full Name field (Required on Sign Up) */}
              {authMode === 'signup' && (
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary mb-1">Full Name</Form.Label>
                  <div className="apple-input-wrapper">
                    <span className="apple-input-icon">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </span>
                    <Form.Control
                      type="text"
                      className="apple-form-input w-100"
                      placeholder={selectedRole === 'owner' ? 'e.g. Aadi Sheth or Shrey Vora' : 'e.g. Rahul Sharma'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </Form.Group>
              )}

              {/* Email Address */}
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold text-secondary mb-1">Email Address</Form.Label>
                <div className="apple-input-wrapper">
                  <span className="apple-input-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </span>
                  <Form.Control
                    type="email"
                    className="apple-form-input w-100"
                    placeholder={selectedRole === 'owner' ? 'e.g. aadi@gmail.com' : 'e.g. rahul@gmail.com'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </Form.Group>

              {/* In Login mode, optional Name field for explicit profile naming */}
              {authMode === 'login' && (
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary mb-1">
                    Your Name <span className="text-muted fw-normal">(Optional)</span>
                  </Form.Label>
                  <div className="apple-input-wrapper">
                    <span className="apple-input-icon">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </span>
                    <Form.Control
                      type="text"
                      className="apple-form-input w-100"
                      placeholder="e.g. Shrey Vora or Aadi Sheth"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </Form.Group>
              )}

              {/* Password */}
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold text-secondary mb-1">Password</Form.Label>
                <div className="apple-input-wrapper">
                  <span className="apple-input-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </span>
                  <Form.Control
                    type="password"
                    className="apple-form-input w-100"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </Form.Group>

              {/* Confirm Password on Sign Up */}
              {authMode === 'signup' && (
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary mb-1">Confirm Password</Form.Label>
                  <div className="apple-input-wrapper">
                    <span className="apple-input-icon">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </span>
                    <Form.Control
                      type="password"
                      className="apple-form-input w-100"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </Form.Group>
              )}

              {/* PawMate-Specific Sign Up Fields */}
              {authMode === 'signup' && selectedRole === 'pawmate' && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-semibold text-secondary mb-1">Service Area</Form.Label>
                    <div className="apple-input-wrapper">
                      <span className="apple-input-icon">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </span>
                      <Form.Control
                        type="text"
                        className="apple-form-input w-100"
                        placeholder="e.g. Chembur & Powai, Mumbai"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-semibold text-secondary mb-1">Caregiver Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      className="apple-form-input w-100 ps-3"
                      placeholder="Briefly describe your pet care skills and experience..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </Form.Group>
                </>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="apple-submit-btn w-100 mt-2 d-flex align-items-center justify-content-center gap-2"
              >
                <span>
                  {authMode === 'login'
                    ? `Sign In as ${selectedRole === 'owner' ? 'Pet Owner' : 'PawMate'}`
                    : `Create ${selectedRole === 'owner' ? 'Pet Owner' : 'PawMate'} Account`}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Button>
            </Form>

            {/* Quick Demo Sign-In Section */}
            <div className="mt-4 pt-3 border-top text-center">
              <span className="small text-muted d-block mb-2" style={{ fontSize: '0.78rem' }}>
                Fast 1-Click Demo Sign In:
              </span>
              <div className="d-flex justify-content-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  className="apple-demo-pill"
                  onClick={() => {
                    setName('Shrey Vora');
                    setEmail('shrey@gmail.com');
                    setPassword('123456');
                    setSelectedRole('owner');
                    setAuthMode('login');
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>Shrey Vora</span>
                </button>

                <button
                  type="button"
                  className="apple-demo-pill"
                  onClick={() => {
                    setName('Aadi Sheth');
                    setEmail('aadi@gmail.com');
                    setPassword('123456');
                    setSelectedRole('owner');
                    setAuthMode('login');
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>Aadi Sheth</span>
                </button>

                <button
                  type="button"
                  className="apple-demo-pill"
                  onClick={() => {
                    setName('Rahul Sharma');
                    setEmail('rahul@gmail.com');
                    setPassword('123456');
                    setSelectedRole('pawmate');
                    setAuthMode('login');
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <span>Rahul Sharma</span>
                </button>
              </div>
            </div>

            {/* Discreet Security Footer */}
            <div className="text-center mt-3 pt-1">
              <span className="small text-muted" style={{ fontSize: '0.72rem' }}>
                🔒 256-Bit SSL Encrypted Session • Privacy Protected
              </span>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default LoginPage;
