/**
 * ATLAS PATHWAY JOURNEYS - SHARED COMPONENTS
 * Google Maps section + Footer with real links
 */

/**
 * Inject Google Maps section before any element with class .footer
 * Call this on every page that needs the map
 */
function injectMapSection() {
  const footer = document.querySelector('.footer');
  if (!footer) return;

  const mapSection = document.createElement('section');
  mapSection.className = 'map-section';
  mapSection.setAttribute('aria-label', 'Find us on the map');
  mapSection.innerHTML = `
    <div style="background: #1a1a1a; padding: 60px 0 0;">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 40px; align-items: center; padding-bottom: 60px;">
          <div>
            <div class="section-label" style="margin-bottom: 14px;">Find Us</div>
            <h2 style="color: white; font-size: 1.8rem; margin-bottom: 16px;">Visit Us in Marrakech</h2>
            <p style="color: rgba(255,255,255,0.65); margin-bottom: 24px; line-height: 1.7;">
              Atlas Pathway Journeys is based in Marrakech, Morocco. We offer free hotel pickup for all our tours — no need to find us! But if you'd like to meet in person, we're always happy to arrange a meeting.
            </p>
            <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 28px;">
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <div style="width: 36px; height: 36px; background: rgba(255,107,0,0.15); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF6B00"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </div>
                <div>
                  <p style="color: white; font-weight: 600; font-size: 0.9rem; margin-bottom: 2px;">Location</p>
                  <p style="color: rgba(255,255,255,0.6); font-size: 0.85rem;">Marrakech, Morocco (Tamatert area)</p>
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <div style="width: 36px; height: 36px; background: rgba(37,211,102,0.15); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
                </div>
                <div>
                  <p style="color: white; font-weight: 600; font-size: 0.9rem; margin-bottom: 2px;">WhatsApp / Phone</p>
                  <a href="https://wa.me/212671910887" target="_blank" style="color: rgba(255,255,255,0.6); font-size: 0.85rem; text-decoration: none;">+212 671-910887</a>
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <div style="width: 36px; height: 36px; background: rgba(255,107,0,0.15); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF6B00"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </div>
                <div>
                  <p style="color: white; font-weight: 600; font-size: 0.9rem; margin-bottom: 2px;">Email</p>
                  <a href="mailto:contact@visitatlas.tours" style="color: rgba(255,255,255,0.6); font-size: 0.85rem; text-decoration: none;">contact@visitatlas.tours</a>
                </div>
              </div>
            </div>
            <a href="https://maps.app.goo.gl/6NKtNazekdhBYkNN8" target="_blank" rel="noopener"
               style="display: inline-flex; align-items: center; gap: 8px; background: #FF6B00; color: white; padding: 12px 24px; border-radius: 50px; font-weight: 700; font-size: 0.9rem; text-decoration: none; transition: all 0.25s;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              Open in Google Maps
            </a>
          </div>
          <div style="border-radius: 16px; overflow: hidden; height: 380px; box-shadow: 0 8px 32px rgba(0,0,0,0.4);">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d408.94756!2d-7.9038195!3d31.1423632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb00f0049887bd7%3A0x9734c61999b65be!2sAtlas%20Pathway%20Journeys!5e0!3m2!1sen!2sma!4v1700000000000"
              width="100%"
              height="100%"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Atlas Pathway Journeys location on Google Maps">
            </iframe>
          </div>
        </div>
      </div>
    </div>
  `;

  // Add responsive style for map section
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      .map-section .container > div {
        grid-template-columns: 1fr !important;
      }
      .map-section iframe {
        height: 280px !important;
      }
    }
  `;
  document.head.appendChild(style);

  footer.parentNode.insertBefore(mapSection, footer);
}

// Auto-inject on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  injectMapSection();
});
