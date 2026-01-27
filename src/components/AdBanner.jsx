import { useEffect } from 'react';

/**
 * AdBanner Component for Google AdSense
 * @param {string} slot - Ad slot ID from Google AdSense
 * @param {string} format - Ad format (auto, rectangle, horizontal, vertical)
 * @param {boolean} responsive - Whether the ad should be responsive
 * @param {string} className - Additional CSS classes
 */
export default function AdBanner({
  slot = 'auto',
  format = 'auto',
  responsive = true,
  className = ''
}) {
  useEffect(() => {
    try {
      // Push ad to AdSense queue
      if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className={`ad-container my-4 ${className}`}>
      <div className="text-xs text-gray-500 text-center mb-1">Publicidad</div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4975214618340172"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
      <div className="text-xs text-gray-400 text-center mt-1">
        Los anuncios nos ayudan a mantener este servicio gratuito
      </div>
    </div>
  );
}
