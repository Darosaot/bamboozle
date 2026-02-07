import React, { useState } from 'react';
import { Mail, Check, Bell } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(() => {
    return localStorage.getItem('newsletter_subscribed') === 'true';
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || submitting) return;

    setSubmitting(true);

    // Store subscription locally (in production, send to a newsletter service)
    const subscribers = JSON.parse(localStorage.getItem('newsletter_emails') || '[]');
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      localStorage.setItem('newsletter_emails', JSON.stringify(subscribers));
    }
    localStorage.setItem('newsletter_subscribed', 'true');

    trackEvent('newsletter_signup', {
      location: 'results_screen'
    });

    setSubscribed(true);
    setSubmitting(false);
  };

  if (subscribed) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-4 border border-green-200">
        <div className="flex items-center gap-2 text-green-700">
          <Check size={20} />
          <p className="font-bold text-sm">Suscrito al boletin de Bamboozle Baby</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-5 mb-4 border-2 border-indigo-200">
      <div className="flex items-center gap-2 mb-2">
        <Bell size={20} className="text-indigo-600" />
        <h3 className="font-black text-indigo-800 text-base">Consejos Semanales para Padres</h3>
      </div>

      <p className="text-gray-700 text-sm mb-3">
        Recibe tips de crianza, nuevas preguntas y contenido exclusivo directamente en tu correo.
      </p>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          className="flex-1 px-3 py-2 border-2 border-indigo-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-lg transition-all transform hover:scale-105 flex items-center gap-1 text-sm disabled:opacity-50"
        >
          <Mail size={16} />
          Suscribir
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-2">
        Sin spam. Puedes cancelar en cualquier momento.
      </p>
    </div>
  );
};

export default NewsletterSignup;
