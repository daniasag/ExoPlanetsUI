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
          period_days: parseFloat(formData.period_day),
          duration_hours: parseFloat(formData.duration_hours),
          rp_rearth: parseFloat(formData.rp_rearth),
          rstar_rsun: parseFloat(formData.rstar_rsun),
          mag: parseFloat(formData.mag),
          teff_k: parseFloat(formData.teff_k)
        };

      console.log('Enviando datos a la API:', apiData);

          // Usar la API real con el token proporcionado
          const apiHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-API-Key': '022d85d6b0efbea31c75787ad13e20900238d68376375c84578a7dcbc4d720bd'
          };

      try {
        console.log('Enviando datos a la API real con token...');
        console.log('Headers:', apiHeaders);

        const response = await fetch('https://exoplanetas-production.up.railway.app/predict', {
          method: 'POST',
          headers: apiHeaders,
          body: JSON.stringify(apiData)
        });

        console.log('Respuesta de la API:', response.status, response.statusText);

        if (response.ok) {
          const data = await response.json();
          console.log('¡Éxito! Datos reales recibidos:', data);
          
          // Procesar la respuesta de la API real
          const processedResult = {
            prediction: data.prediction === "exoplanet" ? 1 : 0,
            probability: data.proba ? Math.max(...data.proba) : 0.5,
            confidence: data.proba ? Math.max(...data.proba) : 0.5,
            model_version: "real-api-v1.0",
            input_data: apiData,
            timestamp: new Date().toISOString(),
            raw_response: data
          };
          
          setResult(processedResult);
          return;
        } else {
          const errorData = await response.json();
          console.log('Error de la API:', errorData);
          throw new Error(`Error ${response.status}: ${errorData.detail || response.statusText}`);
        }
      } catch (apiError) {
        console.log('Error de la API real:', apiError);
        throw apiError;
      }

      // Si llegamos aquí, la API real falló
      // Mostrar modo de demostración como respaldo
      console.log('La API real falló. Activando modo de demostración...');
      
      // Simular una respuesta de demostración
      const demoResult = {
        prediction: Math.random() > 0.5 ? 1 : 0,
        probability: Math.random() * 0.8 + 0.2, // Entre 0.2 y 1.0
        confidence: Math.random() * 0.3 + 0.7, // Entre 0.7 y 1.0
        model_version: "demo-v1.0",
        input_data: apiData,
        timestamp: new Date().toISOString(),
        note: ""
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
                      {result.probability > 0.6 ? '🪐 ¡Exoplaneta detectado!' : '❌ No se detectó exoplaneta'}
                    </span>
                  </div>
                  
                  {result.raw_response && (
                    <div className="result-item">
                      <span className="result-label">🔬 Análisis Detallado:</span>
                      <span className="result-value">
                        {result.raw_response.prediction === "exoplanet" ? 
                          "🪐 Exoplaneta Confirmado" : 
                          "❌ Falso Positivo"
                        }
                      </span>
                    </div>
                  )}
                  
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
