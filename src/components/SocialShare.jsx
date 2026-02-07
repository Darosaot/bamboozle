import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { trackSocialShare } from '../utils/analytics';

const SocialShare = ({ score, gameMode, difficulty }) => {
  const [nativeShared, setNativeShared] = useState(false);
  const difficultyLabels = { easy: 'Facil', normal: 'Normal', hard: 'Dificil' };
  const diffLabel = difficultyLabels[difficulty] || difficulty;
  const shareText = `Consegui ${score} puntos en Bamboozle Baby Deluxe (${diffLabel})! Pon a prueba tus conocimientos sobre bebes y embarazo:`;
  const shareUrl = 'https://babybamboozle.netlify.app/';

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Bamboozle Baby Deluxe',
          text: shareText,
          url: shareUrl
        });
        trackSocialShare('native', score);
        setNativeShared(true);
        setTimeout(() => setNativeShared(false), 3000);
      } catch (err) {
        // User cancelled share - not an error
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    }
  };

  const handleShare = (platform) => {
    trackSocialShare(platform, score);

    let url;
    switch(platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        return;
    }

    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Share2 size={20} className="text-purple-600" />
        <h3 className="font-bold text-purple-700">Comparte tu puntuacion!</h3>
      </div>

      {/* Native Share API button (mobile-first) */}
      {typeof navigator !== 'undefined' && navigator.share && (
        <button
          onClick={handleNativeShare}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 mb-3"
        >
          {nativeShared ? (
            <>
              <Check size={20} />
              Compartido!
            </>
          ) : (
            <>
              <Share2 size={20} />
              Compartir resultado
            </>
          )}
        </button>
      )}

      <div className="flex gap-3 justify-center">
        {/* WhatsApp */}
        <button
          onClick={() => handleShare('whatsapp')}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
          aria-label="Compartir en WhatsApp"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          WhatsApp
        </button>

        {/* Facebook */}
        <button
          onClick={() => handleShare('facebook')}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
          aria-label="Compartir en Facebook"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </button>

        {/* Twitter/X */}
        <button
          onClick={() => handleShare('twitter')}
          className="flex-1 bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
          aria-label="Compartir en Twitter/X"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Twitter
        </button>
      </div>

      <p className="text-xs text-gray-600 text-center mt-3">
        Ayudanos a crecer compartiendo con otros padres
      </p>
    </div>
  );
};

export default SocialShare;
