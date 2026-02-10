import React, { useState, useEffect } from 'react';
import { Gift, Copy, Check, Users, TrendingUp } from 'lucide-react';

const ReferralCard = ({ playerName }) => {
  const [referralCode, setReferralCode] = useState(null);
  const [stats, setStats] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchOrCreateReferral = async () => {
      try {
        // First try to get existing referral
        const statsRes = await fetch(`/api/get-referral-stats?playerName=${encodeURIComponent(playerName)}`, { signal });
        if (!statsRes.ok) throw new Error('Failed to fetch referral stats');
        const statsData = await statsRes.json();

        if (statsData.success && statsData.data) {
          setReferralCode(statsData.data.referral_code);
          setStats(statsData.data);
        } else {
          // Create new referral
          const createRes = await fetch('/api/create-referral', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ playerName }),
            signal
          });
          if (!createRes.ok) throw new Error('Failed to create referral');
          const createData = await createRes.json();

          if (createData.success) {
            setReferralCode(createData.referralCode);
            // Fetch stats for new referral
            const newStatsRes = await fetch(`/api/get-referral-stats?referralCode=${createData.referralCode}`, { signal });
            if (!newStatsRes.ok) throw new Error('Failed to fetch new referral stats');
            const newStatsData = await newStatsRes.json();
            if (newStatsData.success) {
              setStats(newStatsData.data);
            }
          }
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error with referral:', error);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchOrCreateReferral();

    return () => {
      abortController.abort();
    };
  }, [playerName]);

  const copyToClipboard = async () => {
    const referralUrl = `${window.location.origin}/?ref=${referralCode}`;
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for browsers that don't support clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = referralUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-4">
        <p className="text-center text-gray-600">Generando tu código de referido...</p>
      </div>
    );
  }

  if (!referralCode) return null;

  const referralUrl = `${window.location.origin}/?ref=${referralCode}`;

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-4 border-2 border-green-200">
      <div className="flex items-center gap-2 mb-4">
        <Gift size={24} className="text-green-600" />
        <h3 className="font-black text-green-800 text-lg">¡Invita y Gana!</h3>
      </div>

      <p className="text-gray-700 text-sm mb-4">
        Comparte tu código y gana <strong>50 puntos</strong> por cada amigo que juegue.
        ¡Ellos también reciben un bono de bienvenida!
      </p>

      {/* Referral Code Display */}
      <div className="bg-white rounded-lg p-4 mb-4">
        <p className="text-xs text-gray-600 mb-2">Tu código de referido:</p>
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <p className="text-2xl font-black text-green-600 tracking-wider">
              {referralCode}
            </p>
            <p className="text-xs text-gray-500 mt-1 break-all">
              {referralUrl}
            </p>
          </div>
          <button
            onClick={copyToClipboard}
            className="flex-shrink-0 bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-all transform hover:scale-105"
            aria-label="Copiar enlace"
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
          </button>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-lg p-3 text-center">
            <Users size={20} className="mx-auto text-green-600 mb-1" />
            <p className="text-2xl font-black text-green-600">{stats.total_uses || 0}</p>
            <p className="text-xs text-gray-600">Amigos invitados</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center">
            <TrendingUp size={20} className="mx-auto text-green-600 mb-1" />
            <p className="text-2xl font-black text-green-600">{stats.total_points_earned || 0}</p>
            <p className="text-xs text-gray-600">Puntos ganados</p>
          </div>
        </div>
      )}

      {copied && (
        <div className="mt-3 bg-green-100 border border-green-300 rounded-lg p-2 text-center">
          <p className="text-sm text-green-700 font-semibold">✅ ¡Enlace copiado!</p>
        </div>
      )}
    </div>
  );
};

export default ReferralCard;
