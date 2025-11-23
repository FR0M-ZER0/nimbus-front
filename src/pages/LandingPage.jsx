import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Cor azul mais suave
  const softBlueColor = '#1272e0ff'; 
  const softBlueShadow = 'rgba(74, 144, 226, 0.5)'; 

  return (
    <div 
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundColor: 'var(--main-dark-color)',
        color: 'var(--main-light-color)',
        fontFamily: '"Roboto", sans-serif'
      }}
    >
      
      <div 
        className="absolute inset-0 flex items-center justify-end pointer-events-none"
        style={{ zIndex: 0 }}
      >
         <img 
            src="/brazil_dotted_map.svg" 
            alt="Mapa do Brasil" 
            className="h-full object-cover opacity-20"
            style={{ 
                maskImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))',
                WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))'
            }}
         />
      </div>

      <nav className="flex justify-between items-center p-8 max-w-7xl mx-auto w-full relative z-10">
        <img src="/nimbus_logo.svg" alt="NIMBUS" className="h-16 w-auto transition-transform hover:scale-105" />
      </nav>

      <main className="flex-grow flex items-center px-8 relative z-10">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
          <div className="space-y-8">
            <h1 
                className="text-5xl md:text-7xl font-bold leading-tight tracking-tight"
                style={{ color: 'var(--main-light-color)' }}
            >
              Monitoramento <br />
              <span style={{ color: softBlueColor }}>Ambiental</span> <br />
              Inteligente.
            </h1>
            
            <p className="text-lg max-w-lg leading-relaxed" style={{ color: 'var(--alt-light-color)' }}>
              Tecnologia de baixo custo para prevenir desastres e educar o futuro. 
              Dados precisos de estações meteorológicas em tempo real.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <button 
                onClick={() => navigate('/auth')}
                className="px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all transform hover:-translate-y-1 shadow-lg"
                style={{ 
                    backgroundColor: softBlueColor, 
                    color: 'var(--main-light-color)',
                    boxShadow: `0 10px 20px -10px ${softBlueShadow}` 
                }}
              >
                Acessar Plataforma
              </button>
              
              <button 
                onClick={() => navigate('/educativo')}
                className="px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider border transition-all hover:bg-opacity-10"
                style={{ 
                    borderColor: 'var(--alt-light-color)', 
                    color: 'var(--main-light-color)',
                    backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                Área Educativa
              </button>
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-8 relative">
              <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-20" style={{ backgroundColor: softBlueColor }}></div>

              <InfoCard 
                title="Coleta de Dados" 
                description="Sensores precisos para vento, chuva e temperatura."
                color={softBlueColor} 
              />
              <InfoCard 
                title="Prevenção" 
                description="Alertas antecipados para segurança das comunidades."
                color="var(--green-color)"
                className="lg:translate-x-12"
              />
              <InfoCard 
                title="Educação" 
                description="Conceitos matemáticos aplicados à meteorologia."
                color="var(--yellow-color)"
              />
          </div>

        </div>
      </main>

      <footer className="w-full p-6 text-center text-xs font-medium uppercase tracking-widest opacity-50 z-10">
        Desenvolvido por <span style={{ color: softBlueColor }}>FR0M_ZER0</span>
      </footer>
    </div>
  );
};

const InfoCard = ({ title, description, color, className = "" }) => (
    <div 
        className={`p-8 rounded-xl border backdrop-blur-sm transition-transform hover:scale-105 ${className}`}
        style={{ 
            backgroundColor: 'var(--alt-dark-color-2)', 
            borderColor: 'var(--alt-dark-color)',
            borderLeft: `6px solid ${color}` 
        }}
    >
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--main-light-color)' }}>{title}</h3>
        <p className="text-base" style={{ color: 'var(--alt-light-color)' }}>{description}</p>
    </div>
);

export default LandingPage;