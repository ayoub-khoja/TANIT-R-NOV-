import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [counters, setCounters] = useState({
    experience: 0,
    projects: 0,
    clients: 0
  });

  // Données pour la galerie avant/après
  const beforeAfterImages = [
    {
      id: 1,
      title: "Rénovation Appartement - Rouen",
      before: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop",
      after: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      category: "Rénovation"
    },
    {
      id: 2, 
      title: "Nettoyage Après Sinistre - Elbeuf",
      before: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      after: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      category: "Nettoyage"
    },
    {
      id: 3,
      title: "Cuisine Rénovée - Rouen",
      before: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      after: "https://images.unsplash.com/photo-1556909222-f6e7ad7d3136?w=600&h=400&fit=crop", 
      category: "Rénovation"
    }
  ];

  // Témoignages clients
  const testimonials = [
    {
      id: 1,
      name: "Marie Dubois",
      city: "Rouen",
      rating: 5,
      text: "Service impeccable ! L'équipe TANIT RÉNOVÉ a transformé mon appartement après un dégât des eaux. Travail soigné et dans les délais.",
      avatar: "👩‍💼"
    },
    {
      id: 2,
      name: "Pierre Martin", 
      city: "Elbeuf",
      rating: 5,
      text: "Intervention rapide pour un nettoyage après travaux. Résultat parfait, je recommande vivement cette entreprise sérieuse.",
      avatar: "👨‍💻"
    },
    {
      id: 3,
      name: "Sophie Leroy",
      city: "Rouen",
      rating: 5,
      text: "Rénovation complète de ma cuisine. Équipe professionnelle, tarifs transparents et qualité au rendez-vous. Merci !",
      avatar: "👩‍🏫"
    }
  ];

  // Gestion du scroll pour bouton retour en haut et animations
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
      
      // Animation des compteurs quand la section stats est visible
      const statsSection = document.getElementById('stats');
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          animateCounters();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation des compteurs
  const animateCounters = () => {
    const targets = { experience: 10, projects: 500, clients: 300 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    Object.keys(targets).forEach(key => {
      let current = 0;
      const increment = targets[key] / steps;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= targets[key]) {
          current = targets[key];
          clearInterval(timer);
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, stepDuration);
    });
  };

  // Navigation galerie
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % beforeAfterImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + beforeAfterImages.length) % beforeAfterImages.length);
  };

  // Retour en haut
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo-container">
            <img src="/logo.png" alt="TANIT RÉNOVÉ" className="logo-img" />
            <h1 className="logo">TANIT RÉNOVÉ</h1>
          </div>
          <nav className="nav">
            <a href="#services">Services</a>
            <a href="#gallery">Réalisations</a>
            <a href="#testimonials">Avis</a>
            <a href="#quote">Devis</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Bienvenue chez TANIT RÉNOVÉ</h1>
            <p className="hero-subtitle">
              Entreprise de rénovation et de nettoyage professionnelle, au service des particuliers et des entreprises sur Rouen, Elbeuf et leurs alentours.
            </p>
            <div className="hero-services">
              <div className="service-item">✔ Nettoyage après travaux ou sinistre</div>
              <div className="service-item">✔ Petits travaux de rénovation</div>
              <div className="service-item">✔ Désinfection, débarras, remise en état</div>
              <div className="service-item">✔ Tous corps d'état sur demande</div>
            </div>
            <div className="hero-buttons">
              <a href="#quote" className="btn btn-primary">Devis Gratuit</a>
              <a href="tel:0752773153" className="btn btn-secondary">Appeler maintenant</a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{counters.experience}+</div>
              <div className="stat-label">Années d'expérience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{counters.projects}+</div>
              <div className="stat-label">Projets réalisés</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{counters.clients}+</div>
              <div className="stat-label">Clients satisfaits</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <div className="container">
          <h2>Pourquoi nous choisir ?</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🎯</div>
              <h3>Sérieux – Réactivité – Tarifs transparents</h3>
            </div>
            <div className="feature">
              <div className="feature-icon">⚡</div>
              <h3>Intervention rapide</h3>
            </div>
            <div className="feature">
              <div className="feature-icon">💰</div>
              <h3>Devis gratuit</h3>
            </div>
            <div className="feature">
              <div className="feature-icon">✅</div>
              <h3>Prestations garanties</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="services">
        <div className="container">
          <h2>🛠 Nos Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>Nettoyage professionnel</h3>
              <p>Ménage complet, après chantier, après sinistre, remise en état, désinfection, nettoyage fin de bail…</p>
            </div>
            <div className="service-card">
              <h3>Rénovation intérieure</h3>
              <p>Petits travaux, peinture, enduit, pose de revêtements, réparations diverses, rafraîchissement de logements…</p>
            </div>
            <div className="service-card">
              <h3>Débarras & dératisation</h3>
              <p>Évacuation encombrants, tri, nettoyage de caves, garages, logements insalubres ou encombrés…</p>
            </div>
            <div className="service-card">
              <h3>Tous corps d'état</h3>
              <p>Plomberie, électricité, petite maçonnerie, revêtement de sols et murs (en sous-traitance ou coordination).</p>
            </div>
          </div>
        </div>
      </section>

      {/* Galerie Avant/Après */}
      <section id="gallery" className="gallery-section">
        <div className="container">
          <h2>📸 Nos Réalisations</h2>
          <p className="gallery-subtitle">Découvrez la transformation de nos projets</p>
          
          <div className="gallery-slider">
            <div className="slide-container">
              <div className="before-after-container">
                <div className="image-comparison">
                  <div className="before-image">
                    <img src={beforeAfterImages[currentSlide].before} alt="Avant" />
                    <div className="image-label">AVANT</div>
                  </div>
                  <div className="after-image">
                    <img src={beforeAfterImages[currentSlide].after} alt="Après" />
                    <div className="image-label">APRÈS</div>
                  </div>
                </div>
                <div className="slide-info">
                  <h3>{beforeAfterImages[currentSlide].title}</h3>
                  <span className="category">{beforeAfterImages[currentSlide].category}</span>
                </div>
              </div>
            </div>
            
            <div className="gallery-controls">
              <button onClick={prevSlide} className="gallery-btn prev">‹</button>
              <div className="gallery-dots">
                {beforeAfterImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`dot ${index === currentSlide ? 'active' : ''}`}
                  />
                ))}
              </div>
              <button onClick={nextSlide} className="gallery-btn next">›</button>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <h2>⭐ Témoignages Clients</h2>
          <p className="testimonials-subtitle">Ce que disent nos clients satisfaits</p>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">{testimonial.avatar}</div>
                  <div className="testimonial-info">
                    <h4>{testimonial.name}</h4>
                    <span className="testimonial-city">{testimonial.city}</span>
                  </div>
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="star">⭐</span>
                    ))}
                  </div>
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire de Devis */}
      <section id="quote" className="quote-section">
        <div className="container">
          <h2>📝 Demande de Devis Gratuit</h2>
          <p className="quote-subtitle">Obtenez votre devis personnalisé en quelques clics</p>
          
          <div className="quote-form-container">
            <form className="quote-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Nom complet *</label>
                  <input type="text" required placeholder="Votre nom" />
                </div>
                <div className="form-group">
                  <label>Téléphone *</label>
                  <input type="tel" required placeholder="Votre numéro" />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" required placeholder="votre@email.com" />
                </div>
                <div className="form-group">
                  <label>Ville *</label>
                  <input type="text" required placeholder="Rouen, Elbeuf..." />
                </div>
              </div>
              
              <div className="form-group">
                <label>Type de prestation *</label>
                <select required>
                  <option value="">Sélectionnez un service</option>
                  <option value="nettoyage">Nettoyage professionnel</option>
                  <option value="renovation">Rénovation intérieure</option>
                  <option value="debarras">Débarras & dératisation</option>
                  <option value="tous-corps">Tous corps d'état</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Description du projet *</label>
                <textarea required placeholder="Décrivez votre projet en détail..." rows="4"></textarea>
              </div>
              
              <div className="form-group">
                <label>Budget approximatif</label>
                <select>
                  <option value="">Sélectionnez une tranche</option>
                  <option value="0-500">0 - 500€</option>
                  <option value="500-1000">500 - 1000€</option>
                  <option value="1000-2500">1000 - 2500€</option>
                  <option value="2500+">2500€ et plus</option>
                </select>
              </div>
              
              <button type="submit" className="btn btn-primary form-submit">
                Envoyer ma demande
              </button>
            </form>
            
            <div className="quote-benefits">
              <h3>Pourquoi demander un devis ?</h3>
              <ul>
                <li>✅ Réponse sous 24h</li>
                <li>✅ Devis détaillé et transparent</li>
                <li>✅ Conseils personnalisés</li>
                <li>✅ Aucun engagement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Zone d'intervention */}
      <section id="zone" className="zone-intervention">
        <div className="container">
          <h2>📍 Zone d'intervention</h2>
          <p>Nous intervenons à Rouen (76000), Elbeuf (76500) et dans toute la région alentour.</p>
          <div className="addresses">
            <div className="address">
              <h4>Elbeuf</h4>
              <p>14 rue Cousin Corblin, Elbeuf 76500</p>
            </div>
            <div className="address">
              <h4>Rouen</h4>
              <p>Rue Dinanderie, Rouen 76000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <footer id="contact" className="contact">
        <div className="container">
          <h2>📞 Contact</h2>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <a href="mailto:contact.tanitconstruction@gmail.com">contact.tanitconstruction@gmail.com</a>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📱</span>
              <a href="tel:0752773153">07 52 77 31 53</a>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📷</span>
              <a href="https://instagram.com/tanit_renove_276" target="_blank" rel="noopener noreferrer">@tanit_renove_276</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 TANIT RÉNOVÉ - Tous droits réservés</p>
          </div>
        </div>
      </footer>

      {/* Bouton WhatsApp flottant */}
      <a
        href="https://wa.me/33752773153?text=Bonjour, je souhaite obtenir un devis pour mes travaux"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
        aria-label="Contacter sur WhatsApp"
      >
        <span className="whatsapp-icon">📱</span>
        <span className="whatsapp-text">WhatsApp</span>
      </a>

      {/* Bouton retour en haut */}
      {showBackToTop && (
        <button onClick={scrollToTop} className="back-to-top" aria-label="Retour en haut">
          ↑
        </button>
      )}
    </div>
  );
}

export default App;
