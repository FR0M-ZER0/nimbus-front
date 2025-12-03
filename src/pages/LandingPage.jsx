import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflowX = 'auto';
    };
  }, []);

  const primaryBlue = '#3B82F6'; 
  const darkBg = '#1a1a1a'; 
  const cardBg = '#262626'; 
  const textColor = '#f3f4f6'; 
  const subTextColor = '#9ca3af'; 

  return (
    <div 
      className="min-h-screen flex flex-col relative font-sans"
      style={{
        backgroundColor: 'var(--main-dark-color)', 
        color: 'var(--main-light-color)',
        overflowX: 'hidden'
      }}
    >
      
      <div 
        className="absolute top-0 right-0 w-full h-full pointer-events-none z-0 flex justify-end items-center opacity-10"
      >
         <img 
            src="/brazil_dotted_map.svg" 
            alt="Mapa do Brasil" 
            className="h-[80%] object-contain translate-x-1/4" 
         />
      </div>

      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full relative z-10">
        <div className="flex items-center">
           <img src="/nimbus_logo.svg" alt="NIMBUS Logo" className="h-12 md:h-14 w-auto hover:scale-105 transition-transform duration-300" />
        </div>
      </nav>

      <main className="flex-grow flex items-center px-8 py-12 relative z-10">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              Monitoramento <br />
              <span style={{ color: primaryBlue }}>Ambiental</span> <br />
              Inteligente.
            </h1>
            
            <p className="text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed text-gray-300">
              Tecnologia de baixo custo para prevenir desastres e educar o futuro. 
              Dados precisos de estações meteorológicas em tempo real para um mundo mais seguro.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 pt-6 justify-center lg:justify-start">
              <button 
                onClick={() => navigate('/auth')}
                className="px-8 py-4 rounded-lg font-bold text-base uppercase tracking-wider transition-all transform hover:-translate-y-1 hover:shadow-lg"
                style={{ 
                    backgroundColor: primaryBlue, 
                    color: '#fff',
                    boxShadow: `0 4px 14px 0 rgba(59, 130, 246, 0.39)`
                }}
              >
                Acessar Plataforma
              </button>
              
              <button 
                onClick={() => navigate('/educativo')}
                className="px-8 py-4 rounded-lg font-bold text-base uppercase tracking-wider border transition-all hover:bg-white/5"
                style={{ 
                    borderColor: 'var(--alt-light-color)', 
                    color: 'var(--main-light-color)',
                }}
              >
                Área Educativa
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6 relative w-full max-w-md mx-auto lg:max-w-full">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 blur-3xl rounded-full pointer-events-none"></div>

              <InfoCard 
                title="Coleta de Dados" 
                description="Sensores de precisão monitoram vento, chuva, temperatura e pressão."
                color="#3B82F6" 
              />
              <InfoCard 
                title="Prevenção" 
                description="Alertas antecipados cruciais para a segurança das comunidades."
                color="#10B981" 
                className="lg:translate-x-8" 
              />
              <InfoCard 
                title="Educação" 
                description="Descubra como medimos o tempo e a importância de cada parâmetro meteorológico."
                color="#F59E0B" 
              />
          </div>

        </div>
      </main>

      <footer className="w-full p-8 text-center text-sm font-medium tracking-wide opacity-70 z-10 border-t border-white/5">
        <p>Desenvolvido por <span className="font-bold" style={{ color: primaryBlue }}>FR0M_ZER0</span></p>
        <p className="text-xs mt-2 text-gray-500">&copy; 2025 Tecsus - Tecnologia Sustentável</p>
      </footer>
    </div>
  );
};

const InfoCard = ({ title, description, color, className = "" }) => (
    <div 
        className={`p-8 rounded-2xl border backdrop-blur-md transition-transform hover:scale-[1.02] duration-300 ${className}`}
        style={{ 
            backgroundColor: 'var(--alt-dark-color-2)', 
            borderColor: 'rgba(255,255,255,0.05)',
            borderLeft: `6px solid ${color}`, 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
    >
        <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">
            {title}
        </h3>
        <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--alt-light-color)' }}>
            {description}
        </p>
    </div>
);

export default LandingPage;