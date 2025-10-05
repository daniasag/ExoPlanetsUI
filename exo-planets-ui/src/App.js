import './App.css';
import React from 'react';
import SolarOrbitPlayground from './components/PlanetAnimation';
import Galaxy from './components/Galaxy';
import './components/Galaxy.css';


function App() {
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
    pointerEvents: 'auto',
    
  }}
>
  <Galaxy />
</div>

      {/* 🌍 Contenido principal encima del fondo */}
      <div className="App" style={{ position: 'relative', zIndex: 1 }}>
        <header className="App-header">
          <h1>Buscando ExoPlanetas con ML 🪐 </h1>
          <p>Estás listo para explorar</p>
          <p>¿y <strong>descubrir</strong> un <strong>nuevo planeta</strong>?</p>
          <p><i>Desliza para inciar tu camino como científico </i></p>
        </header>

        <div>
          <SolarOrbitPlayground />
        </div>

        <div className="info-section">
          <p>
            Con telescopios como <strong>Kepler</strong>, <strong>K2</strong> y <strong>TESS</strong>,
            se han descubierto miles de exoplanetas.            
          </p> 

          {/* Imagen del telescopio Kepler */}
          <div className="image-container">
            <img
              src="/img/kepler.png"
              alt="Telescopio espacial Kepler"
              className="telescope-img"
            />
            <p className="image-caption">🛰️ Telescopio espacial Kepler observando estrellas lejanas</p>
          </div>

          <p>
            Los exoplanetas son planetas que están muy, muy lejos de la Tierra, girando alrededor de otras estrellas.
            Pero como están tan lejos, ¡no podemos verlos directamente con telescopios normales!
            Entonces, los científicos usan trucos muy inteligentes para encontrarlos.
            Uno de los más usados se llama <strong>método del tránsito</strong> 🌞➡️🌑.
          </p>

          <p>
            Imagina que una estrella es como una gran linterna y el planeta es una pequeña bolita que pasa por delante.
            Cuando eso sucede, la luz de la estrella se oscurece un poquitito por unos momentos.
            Los telescopios, como el Kepler o el TESS de la NASA, observan esa luz y, si ven que baja cada cierto tiempo,
            ¡eso significa que un planeta está pasando frente a su estrella! 🌍✨
          </p>

          <p>
            <li>🪐 Qué tan grande es el planeta</li>
            <li>⏳ Cuánto tarda en dar la vuelta a su estrella</li>
            <li>💧👽 Y hasta si podría tener agua o vida</li>
          </p>
        </div>

        <div className="footer-section">
          <h1>Con los datos de estos telescopios, podemos entrenar modelos de Machine Learning</h1>
          <h1>¡para detectar exoplanetas que aún no han sido descubiertos!</h1>
        </div>
        {/* Botón para buscar exoplanetas */}
<div className="cta-section">
  <button className="glow-button">
    🚀 Buscar un ExoPlaneta
  </button>
</div>
      </div>
    </>
  );
}

export default App;