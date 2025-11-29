document.addEventListener('DOMContentLoaded', function () {
  const track = document.getElementById('partners-track');
  if (!track) return;

  fetch('assets/data/partners.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des partenaires');
      }
      return response.json();
    })
    .then(partners => {
      // 1ère série de logos
      partners.forEach(partner => {
        const wrapper = document.createElement('div');
        wrapper.className = 'partner-logo';

        const img = document.createElement('img');
        img.src = partner.logo;
        img.alt = partner.alt || partner.name || 'Partenaire';
        img.loading = 'lazy';
        img.decoding = 'async';

        if (partner.url) {
          const link = document.createElement('a');
          link.href = partner.url;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.appendChild(img);
          wrapper.appendChild(link);
        } else {
          wrapper.appendChild(img);
        }

        track.appendChild(wrapper);
      });

      // Dupliquer les logos pour créer un effet de défilement infini
      const logos = Array.from(track.children);
      logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        // aria-hidden pour les clones (accessibilité)
        const img = clone.querySelector('img');
        if (img) {
          img.setAttribute('aria-hidden', 'true');
          img.removeAttribute('alt');
        }
        track.appendChild(clone);
      });
    })
    .catch(err => {
      console.error(err);
      // En cas d’erreur, on peut afficher un message ou laisser la section vide
    });
});
