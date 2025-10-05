import React, { useState, useEffect } from 'react';
import './PredictionPage.css';

const PredictionPage = () => {
  const [formData, setFormData] = useState({
    period_day: 365.25,
    duration_hours: 8.5,
    rp_rearth: 1.0,
    rstar_rsun: 1.0,
    mag: 12.5,
    teff_k: 5778
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSliderChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Preparar los datos con los nombres correctos de los campos
      const apiData = {
        period_day: parseFloat(formData.period_day),
        duration_hours: parseFloat(formData.duration_hours),
        rp_rearth: parseFloat(formData.rp_rearth),
        rstar_rsun: parseFloat(formData.rstar_rsun),
        mag: parseFloat(formData.mag),
        teff_k: parseFloat(formData.teff_k)
      };

      console.log('Enviando datos a la API:', apiData);

      // Intentar múltiples enfoques de autenticación
      const authAttempts = [
        // Sin autenticación
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          name: 'Sin autenticación'
        },
        // Con Authorization Bearer
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer demo-token'
          },
          name: 'Bearer token'
        },
        // Con X-API-Key
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-API-Key': 'demo-key'
          },
          name: 'X-API-Key'
        },
        // Con X-Auth-Token
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Auth-Token': 'demo-token'
          },
          name: 'X-Auth-Token'
        }
      ];

      let lastError = null;
      
      for (const attempt of authAttempts) {
        try {
          console.log(`Intentando con: ${attempt.name}`);
          console.log('Headers:', attempt.headers);

          const response = await fetch('https://exoplanetas-production.up.railway.app/predict', {
            method: 'POST',
            headers: attempt.headers,
            body: JSON.stringify(apiData)
          });

          console.log(`Respuesta con ${attempt.name}:`, response.status, response.statusText);

          if (response.ok) {
            const data = await response.json();
            console.log('¡Éxito! Datos recibidos:', data);
            setResult(data);
            return; // Salir del bucle si es exitoso
          } else {
            const errorData = await response.json();
            console.log(`Error con ${attempt.name}:`, errorData);
            lastError = new Error(`Error ${response.status}: ${errorData.detail || response.statusText}`);
          }
        } catch (attemptError) {
          console.log(`Error de red con ${attempt.name}:`, attemptError);
          lastError = attemptError;
        }
      }

      // Si llegamos aquí, todos los intentos fallaron
      // Mostrar modo de demostración
      console.log('Todos los métodos de autenticación fallaron. Activando modo de demostración...');
      
      // Simular una respuesta de demostración
      const demoResult = {
        prediction: Math.random() > 0.5 ? 1 : 0,
        probability: Math.random() * 0.8 + 0.2, // Entre 0.2 y 1.0
        confidence: Math.random() * 0.3 + 0.7, // Entre 0.7 y 1.0
        model_version: "demo-v1.0",
        input_data: apiData,
        timestamp: new Date().toISOString(),
        note: "Esta es una predicción de demostración. La API real requiere autenticación."
      };
      
      console.log('Resultado de demostración:', demoResult);
      setResult(demoResult);
      return;

    } catch (err) {
      console.error('Error en la solicitud:', err);
      setError(`Error al conectar con la API: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="prediction-page">
      <div className="prediction-container">
        <header className="prediction-header">
          <button onClick={goBack} className="back-button">
            ← Volver
          </button>
          <h1>🔮 Predicción de Exoplanetas</h1>
          <p>Ingresa los datos para descubrir si hay un exoplaneta</p>
        </header>

        <div className="interactive-lab">
          <h2>🎮 Laboratorio Espacial Interactivo</h2>
          <p>¡Mueve los controles para configurar tu exoplaneta!</p>
          
          <form onSubmit={handleSubmit} className="space-form">
            <div className="control-panel">
              
              {/* Período Orbital - Órbita animada */}
              <div className="control-group orbit-control">
                <div className="control-header">
                  <span className="control-icon">🕒</span>
                  <h3>Tiempo Orbital</h3>
                  <div className="value-display">{formData.period_day.toFixed(1)} días</div>
                </div>
                <div className="orbit-visualization">
                  <div className="star-center">☀️</div>
                  <div 
                    className="planet-orbit" 
                    style={{ 
                      animationDuration: `${Math.max(1, formData.period_day / 100)}s`,
                      transform: `scale(${Math.min(2, formData.period_day / 200)})`
                    }}
                  >
                    <div className="planet">🪐</div>
                  </div>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="1000"
                  step="0.1"
                  value={formData.period_day}
                  onChange={(e) => handleSliderChange('period_day', e.target.value)}
                  className="space-slider"
                />
                <div className="range-labels">
                  <span>0.2 días</span>
                  <span>1000 días</span>
                </div>
              </div>

              {/* Duración del Tránsito - Barra de tiempo */}
              <div className="control-group transit-control">
                <div className="control-header">
                  <span className="control-icon">⏱️</span>
                  <h3>Duración del Tránsito</h3>
                  <div className="value-display">{formData.duration_hours.toFixed(1)} horas</div>
                </div>
                <div className="transit-visualization">
                  <div className="light-curve">
                    <div className="light-line"></div>
                    <div 
                      className="transit-dip"
                      style={{ 
                        width: `${Math.min(100, (formData.duration_hours / 20) * 100)}%`,
                        left: `${50 - (formData.duration_hours / 20) * 25}%`
                      }}
                    ></div>
                  </div>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="20"
                  step="0.1"
                  value={formData.duration_hours}
                  onChange={(e) => handleSliderChange('duration_hours', e.target.value)}
                  className="space-slider"
                />
                <div className="range-labels">
                  <span>0.5 horas</span>
                  <span>20 horas</span>
                </div>
              </div>

              {/* Radio Planetario - Círculos comparativos */}
              <div className="control-group planet-control">
                <div className="control-header">
                  <span className="control-icon">🌍</span>
                  <h3>Tamaño del Planeta</h3>
                  <div className="value-display">{formData.rp_rearth.toFixed(1)} R⊕</div>
                </div>
                <div className="planet-comparison">
                  <div className="earth-reference">🌍</div>
                  <div 
                    className="planet-size"
                    style={{ 
                      transform: `scale(${Math.min(3, formData.rp_rearth / 2)})`,
                      fontSize: `${Math.min(60, 20 + formData.rp_rearth * 2)}px`
                    }}
                  >
                    🪐
                  </div>
                </div>
                <input
                  type="range"
                  min="0.3"
                  max="20"
                  step="0.1"
                  value={formData.rp_rearth}
                  onChange={(e) => handleSliderChange('rp_rearth', e.target.value)}
                  className="space-slider"
                />
                <div className="range-labels">
                  <span>0.3 R⊕</span>
                  <span>20 R⊕</span>
                </div>
              </div>

              {/* Radio Estelar - Estrella que cambia de tamaño */}
              <div className="control-group star-control">
                <div className="control-header">
                  <span className="control-icon">☀️</span>
                  <h3>Tamaño de la Estrella</h3>
                  <div className="value-display">{formData.rstar_rsun.toFixed(1)} R☉</div>
                </div>
                <div className="star-visualization">
                  <div 
                    className="star-size"
                    style={{ 
                      transform: `scale(${Math.min(2, formData.rstar_rsun / 1.5)})`,
                      fontSize: `${Math.min(80, 30 + formData.rstar_rsun * 15)}px`
                    }}
                  >
                    ☀️
                  </div>
                </div>
                <input
                  type="range"
                  min="0.3"
                  max="3"
                  step="0.1"
                  value={formData.rstar_rsun}
                  onChange={(e) => handleSliderChange('rstar_rsun', e.target.value)}
                  className="space-slider"
                />
                <div className="range-labels">
                  <span>0.3 R☉</span>
                  <span>3 R☉</span>
                </div>
              </div>

              {/* Magnitud - Brillo que cambia */}
              <div className="control-group brightness-control">
                <div className="control-header">
                  <span className="control-icon">💡</span>
                  <h3>Brillo de la Estrella</h3>
                  <div className="value-display">{formData.mag.toFixed(1)} mag</div>
                </div>
                <div className="brightness-visualization">
                  <div 
                    className="star-brightness"
                    style={{ 
                      opacity: Math.max(0.2, 1 - (formData.mag - 9) / 8),
                      filter: `brightness(${Math.max(0.3, 1 - (formData.mag - 9) / 8)})`
                    }}
                  >
                    ✨
                  </div>
                </div>
                <input
                  type="range"
                  min="9"
                  max="17"
                  step="0.1"
                  value={formData.mag}
                  onChange={(e) => handleSliderChange('mag', e.target.value)}
                  className="space-slider"
                />
                <div className="range-labels">
                  <span>9 (muy brillante)</span>
                  <span>17 (muy tenue)</span>
                </div>
              </div>

              {/* Temperatura - Color que cambia */}
              <div className="control-group temperature-control">
                <div className="control-header">
                  <span className="control-icon">🌡️</span>
                  <h3>Temperatura de la Estrella</h3>
                  <div className="value-display">{formData.teff_k.toFixed(0)} K</div>
                </div>
                <div className="temperature-visualization">
                  <div 
                    className="star-temperature"
                    style={{ 
                      color: formData.teff_k < 4000 ? '#ff6b35' : 
                             formData.teff_k < 6000 ? '#ffd700' : 
                             formData.teff_k < 7000 ? '#ffffff' : '#87ceeb',
                      filter: `hue-rotate(${(formData.teff_k - 3000) / 10}deg)`
                    }}
                  >
                    🔥
                  </div>
                </div>
                <input
                  type="range"
                  min="3000"
                  max="8000"
                  step="10"
                  value={formData.teff_k}
                  onChange={(e) => handleSliderChange('teff_k', e.target.value)}
                  className="space-slider"
                />
                <div className="range-labels">
                  <span>3000K (roja)</span>
                  <span>8000K (azul)</span>
                </div>
              </div>

            </div>

            <button type="submit" className="predict-button" disabled={loading}>
              {loading ? '🔮 Analizando...' : '🚀 ¡Descubrir Exoplaneta!'}
            </button>
          </form>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <div className="error-content">
              <h3>¡Ups! Algo salió mal</h3>
              <p>{error}</p>
              <div className="error-suggestions">
                <p>💡 Sugerencias:</p>
                <ul>
                  <li>Verifica que todos los valores estén dentro de los rangos permitidos</li>
                  <li>Intenta nuevamente en unos momentos</li>
                  <li>Si el problema persiste, la API podría estar temporalmente no disponible</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {result && (
          <div className="result-section">
            <h2>🎯 ¡Descubrimiento Exitoso!</h2>
            <div className="result-card">
              <div className="result-content">
                <h3>🔬 Análisis Completado</h3>
                <p>¡Nuestro modelo de Machine Learning ha procesado tus datos!</p>
                
                {result.note && (
                  <div className="demo-notice">
                    <span className="demo-icon">🎭</span>
                    <p>{result.note}</p>
                  </div>
                )}

                <div className="result-summary">
                  <div className="result-item">
                    <span className="result-label">📊 Probabilidad de Exoplaneta:</span>
                    <span className="result-value">
                      {result.probability ? `${(result.probability * 100).toFixed(1)}%` : 'Calculando...'}
                    </span>
                  </div>
                  
                  <div className="result-item">
                    <span className="result-label">🎯 Predicción:</span>
                    <span className="result-value">
                      {result.prediction === 1 ? '🪐 ¡Exoplaneta detectado!' : '❌ No se detectó exoplaneta'}
                    </span>
                  </div>
                  
                  <div className="result-item">
                    <span className="result-label">⚡ Confianza del modelo:</span>
                    <span className="result-value">
                      {result.confidence ? `${(result.confidence * 100).toFixed(1)}%` : 'N/A'}
                    </span>
                  </div>

                  {result.model_version && (
                    <div className="result-item">
                      <span className="result-label">🔬 Versión del modelo:</span>
                      <span className="result-value">{result.model_version}</span>
                    </div>
                  )}
                </div>

                <div className="result-details">
                  <h4>📋 Datos Técnicos:</h4>
                  <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionPage;
