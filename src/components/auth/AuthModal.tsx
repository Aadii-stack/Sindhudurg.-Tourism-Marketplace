import React, { useState } from 'react';
import { Mail, Lock, User, Shield, Store, Compass, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Modal } from '../common/Modal';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, signup, switchDemoRole, user } = useAuth();
  
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [requestedRole, setRequestedRole] = useState<UserRole>('customer');
  
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      if (mode === 'signin') {
        const res = await login(email, password);
        if (!res.success) {
          setErrorMessage(res.error || 'Invalid credentials');
        } else {
          setSuccessMessage('Welcome back to Sindhudurg Marketplace!');
          setTimeout(onClose, 600);
        }
      } else {
        const res = await signup(email, password, fullName, requestedRole);
        if (!res.success) {
          setErrorMessage(res.error || 'Signup failed');
        } else {
          setSuccessMessage('Account created! Welcome to our Konkan community.');
          setTimeout(onClose, 600);
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemoSwitch = (role: UserRole) => {
    switchDemoRole(role);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'signin' ? 'Sign In to Sindhudurg' : 'Join Our Local Community'}
      subtitle="Connect with certified Konkan producers and tourism guides"
      maxWidth="md"
    >
      <div className="space-y-5">
        
        {/* Sign In / Sign Up Tab Toggle */}
        <div className="flex p-1 bg-sand-100 rounded-xl">
          <button
            onClick={() => {
              setMode('signin');
              setErrorMessage('');
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              mode === 'signin'
                ? 'bg-white text-ocean-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setMode('signup');
              setErrorMessage('');
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              mode === 'signup'
                ? 'bg-white text-ocean-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Quick Demo Testing Persona Switcher */}
        <div className="p-3.5 bg-sand-50 rounded-2xl border border-sand-200 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800">1-Click Evaluator Personas:</span>
            <span className="text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200 font-semibold">
              Instant Testing
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickDemoSwitch('customer')}
              className="p-2 rounded-xl bg-white hover:bg-sand-100 border border-sand-200 text-center transition-all shadow-xs"
            >
              <Compass className="w-4 h-4 text-teal-600 mx-auto mb-1" />
              <p className="text-[11px] font-bold text-slate-900">Tourist</p>
              <p className="text-[9px] text-slate-500">Rohit D.</p>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoSwitch('seller')}
              className="p-2 rounded-xl bg-white hover:bg-sand-100 border border-sand-200 text-center transition-all shadow-xs"
            >
              <Store className="w-4 h-4 text-mango-600 mx-auto mb-1" />
              <p className="text-[11px] font-bold text-slate-900">Local Seller</p>
              <p className="text-[9px] text-slate-500">Dattaram R.</p>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoSwitch('admin')}
              className="p-2 rounded-xl bg-white hover:bg-sand-100 border border-sand-200 text-center transition-all shadow-xs"
            >
              <Shield className="w-4 h-4 text-ocean-700 mx-auto mb-1" />
              <p className="text-[11px] font-bold text-slate-900">Admin</p>
              <p className="text-[9px] text-slate-500">Council</p>
            </button>
          </div>
        </div>

        {/* Error / Success Feedback */}
        {errorMessage && (
          <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs flex items-center gap-2 border border-red-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Kulkarni"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-sand-50 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-sand-50 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-sand-50 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                I am registering as:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setRequestedRole('customer')}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    requestedRole === 'customer'
                      ? 'bg-ocean-50 border-ocean-600 text-ocean-950 font-bold'
                      : 'bg-sand-50 border-sand-200 text-slate-600'
                  }`}
                >
                  Tourist / Shopper
                </button>
                <button
                  type="button"
                  onClick={() => setRequestedRole('seller')}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    requestedRole === 'seller'
                      ? 'bg-ocean-50 border-ocean-600 text-ocean-950 font-bold'
                      : 'bg-sand-50 border-sand-200 text-slate-600'
                  }`}
                >
                  Local Producer / Guide
                </button>
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-ocean-900 hover:bg-ocean-800 text-white font-semibold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <span>{isSubmitting ? 'Processing...' : mode === 'signin' ? 'Sign In' : 'Create My Account'}</span>
              <ArrowRight className="w-4 h-4 text-mango-400" />
            </button>
          </div>
        </form>

      </div>
    </Modal>
  );
};
