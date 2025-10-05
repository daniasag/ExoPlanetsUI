import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SolarOrbitPlayground from './PlanetAnimation';
import Galaxy from './Galaxy';
import './Galaxy.css';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animación de entrada
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const goToPrediction = () => {
    navigate('/predict');
  };

  return (
    <>
      {/* fondo */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <Galaxy />
      </div>

      {/* 🌍 Contenido principal encima del fondo */}
      <div className="App" style={{ position: 'relative', zIndex: 1 }}>
        <header 
          className={`App-header ${isVisible ? 'visible' : ''}`}
        >
          <div className="hero-content">
            <div className="hero-title">
              <h1 className="main-title">
                <span className="title-line">ExploraKids</span>
                <span className="planet-emoji">🪐</span>
              </h1>
            </div>
            
            <div className="hero-subtitle">
              <p className="subtitle-line">Misión Exoplaneta</p>
              <p className="subtitle-line italic">
                <span className="scroll-hint">Desliza para iniciar tu camino como científico</span>
                <span className="scroll-arrow">↓</span>
              </p>
            </div>

            <div className="floating-elements">
              <div className="floating-planet planet-1">🪐</div>
              <div className="floating-planet planet-2">🌍</div>
              <div className="floating-planet planet-3">🌙</div>
              <div className="floating-star star-1">✨</div>
              <div className="floating-star star-2">⭐</div>
              <div className="floating-star star-3">🌟</div>
            </div>
          </div>
        </header>

        <div>
          <SolarOrbitPlayground />
        </div>

        <div className="info-section">
          <div className="info-card discovery-card">
            <div className="card-header">
              <h2>🔭 Descubrimientos Espaciales</h2>
              <div className="telescope-icons">
                <span className="telescope-icon">🛰️</span>
                <span className="telescope-icon">🛰️</span>
                <span className="telescope-icon">🛰️</span>
              </div>
            </div>
            <p className="discovery-text">
              Con telescopios como <strong className="highlight">Kepler</strong>, <strong className="highlight">K2</strong> y <strong className="highlight">TESS</strong>,
              se han descubierto miles de exoplanetas.            
            </p> 
          </div>

          {/* Imagen del telescopio Kepler con efectos */}
          <div className="image-container enhanced">
            <div className="image-wrapper">
              <img
                src={`${process.env.PUBLIC_URL}/img/kepler.png`}
                alt="Telescopio espacial Kepler"
                className="telescope-img enhanced"
              />
              <div className="image-overlay">
                <div className="scan-line"></div>
                <div className="data-points">
                  <div className="data-point" style={{ top: '20%', left: '30%' }}></div>
                  <div className="data-point" style={{ top: '60%', left: '70%' }}></div>
                  <div className="data-point" style={{ top: '40%', left: '50%' }}></div>
                </div>
              </div>
            </div>
            <p className="image-caption enhanced">🛰️ Telescopio espacial Kepler observando estrellas lejanas</p>
          </div>

          <div className="info-card explanation-card">
            <h3>🌌 ¿Qué son los Exoplanetas?</h3>
            <p className="explanation-text">
              Los exoplanetas son planetas que están muy, muy lejos de la Tierra, girando alrededor de otras estrellas.
              Pero como están tan lejos, ¡no podemos verlos directamente con telescopios normales!
              Entonces, los científicos usan trucos muy inteligentes para encontrarlos.
              Uno de los más usados se llama <strong className="highlight">método del tránsito</strong> 🌞➡️🌑.
            </p>
          </div>

          <div className="info-card transit-card">
            <h3>🔍 El Método del Tránsito</h3>
            
            <div className="transit-visualization">
              <div className="transit-scene">
                <div className="star-container">
                  <div className="star-icon">☀️</div>
                  <div className="star-label">Estrella</div>
                </div>
                
                <div className="transit-arrow">→</div>
                
                <div className="planet-container">
                  <div className="planet-icon">🪐</div>
                  <div className="planet-label">Planeta</div>
                </div>
              </div>
            </div>
            
            <p className="transit-explanation">
              Imagina que una estrella es como una gran linterna y el planeta es una pequeña bolita que pasa por delante.
              Cuando eso sucede, la luz de la estrella se oscurece un poquitito por unos momentos.
              Los telescopios, como el Kepler o el TESS de la NASA, observan esa luz y, si ven que baja cada cierto tiempo,
              ¡eso significa que un planeta está pasando frente a su estrella! 🌍✨
            </p>
          </div>

          <div className="info-card features-card">
            <h3>📊 ¿Qué podemos descubrir?</h3>
            <div className="features-grid">
              <div className="feature-item">
                <span className="feature-icon">🪐</span>
                <span className="feature-text">Qué tan grande es el planeta</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">⏳</span>
                <span className="feature-text">Cuánto tarda en dar la vuelta a su estrella</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💧👽</span>
                <span className="feature-text">Y hasta si podría tener agua o vida</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-section enhanced">
          <div className="ml-showcase">
            <div className="ml-header">
              <h2>🤖 Machine Learning en Acción</h2>
              <div className="neural-network">
                <div className="neuron">🧠</div>
                <div className="connection"></div>
                <div className="neuron">🔍</div>
                <div className="connection"></div>
                <div className="neuron">🪐</div>
              </div>
            </div>
            <div className="ml-text">
              <div className="ml-explanation">
                <h4>🧠 ¿Qué es Machine Learning?</h4>
                <p className="ml-kids-explanation">
                  ¡Es como enseñar a una computadora a ser muy inteligente! 
                  Imagina que tienes un robot amigo que aprende a reconocer gatos 
                  viendo miles de fotos de gatos. ¡Pues así funciona con los planetas! 
                  Le mostramos miles de datos de estrellas y le enseñamos a encontrar 
                  planetas escondidos. ¡Es como tener un detective súper inteligente! 🕵️‍♀️✨
                </p>
              </div>
              <p className="ml-description">
                Con los datos de estos telescopios, podemos entrenar modelos de Machine Learning
              </p>
              <p className="ml-result">
                ¡para detectar exoplanetas que aún no han sido descubiertos!
              </p>
            </div>
          </div>
        </div>
        
        {/* Botón mejorado para buscar exoplanetas */}
        <div className="cta-section enhanced">
          <div className="cta-content">
            <div className="cta-text">
              <h3>¿Listo para ser un científico espacial?</h3>
              <p>Usa nuestro laboratorio interactivo para descubrir exoplanetas</p>
            </div>
            <button 
              className="glow-button enhanced" 
              onClick={goToPrediction}
            >
              <span className="button-icon">🚀</span>
              <span className="button-text">Buscar un ExoPlaneta</span>
              <span className="button-arrow">→</span>
            </button>
          </div>
          
          <div className="particle-effects">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
