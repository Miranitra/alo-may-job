/* ===== Animation de l'image "Qui sommes-nous" ===== */
  const media = document.querySelector('.about-media');
  if (media) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) media.classList.add('visible');
      });
    });
    observer.observe(media);
  }

  /* ===== Animation des compteurs "Chiffres clés" ===== */
  const counters = document.querySelectorAll('.stat-value');
  if (counters.length) {
    const speed = 120; // plus petit = plus rapide

    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.textContent.replace(/\D/g, '')) || 0;
          let count = 0;

          const update = () => {
            const increment = target / speed;
            count += increment;

            if (count < target) {
              el.textContent = '+' + Math.floor(count);
              requestAnimationFrame(update);
            } else {
              el.textContent = '+' + target.toLocaleString();
            }
          };

          update();
          counterObserver.unobserve(el); // évite de rejouer l’animation
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(c => counterObserver.observe(c));


    document.getElementById("year").textContent = new Date().getFullYear();
  }

  const form = document.getElementById("contactForm");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Anti double clic
    const submitButton = form.querySelector("button[type='submit']");
    submitButton.disabled = true;

    // Préparer les données
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        status.textContent = "✅ Votre message a bien été envoyé. Merci pour votre confiance.";
        status.classList.remove("error");
        status.classList.add("success");
        form.reset();
      } else {
        status.textContent = "⚠️ Une erreur est survenue. Merci de réessayer dans quelques instants.";
        status.classList.remove("success");
        status.classList.add("error");
      }
    } catch (error) {
      status.textContent = "⚠️ Impossible de contacter le serveur. Vérifiez votre connexion et réessayez.";
      status.classList.remove("success");
      status.classList.add("error");
    } finally {
      submitButton.disabled = false;
    }
  });