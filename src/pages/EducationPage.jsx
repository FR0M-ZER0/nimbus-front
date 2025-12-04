import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const EducationPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col font-sans"
      style={{
        backgroundColor: 'var(--main-dark-color)',
        color: 'var(--main-light-color)',
      }}
    >
      <nav className="p-6 border-b border-white/10 backdrop-blur-md sticky top-0 z-50 bg-opacity-90" style={{ backgroundColor: 'var(--main-dark-color)' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
             <img src="/nimbus_logo.svg" alt="NIMBUS" className="h-8 w-auto" />
             <span className="text-xl font-bold tracking-wider">EDUCAÇÃO</span>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="text-sm font-medium hover:text-blue-400 transition-colors flex items-center gap-2"
          >
            ← Voltar ao Início
          </button>
        </div>
      </nav>

      <header className="py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-500/10 blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold">
            Entendendo o <span style={{ color: '#4A90E2' }}>Clima</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Descubra como medimos o tempo e por que cada parâmetro é vital para prever desastres naturais e cuidar do nosso planeta.
          </p>
        </div>
      </header>

      <main className="flex-grow px-6 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <TopicCard 
            title="Temperatura"
            icon={<TempIcon />}
            color="#FF6B6B"
            description="A medida de quão quente ou frio está o ar ao nosso redor."
            details="A temperatura afeta a evaporação da água e a formação de nuvens. Mudanças bruscas podem indicar frentes frias ou ondas de calor."
            metric="Unidade: Graus Celsius (°C)"
          />

          <TopicCard 
            title="Umidade do Ar"
            icon={<HumidityIcon />}
            color="#4A90E2"
            description="A quantidade de vapor de água presente na atmosfera."
            details="Alta umidade aumenta a sensação térmica e favorece chuvas. Baixa umidade pode causar problemas respiratórios e aumentar risco de queimadas."
            metric="Unidade: Porcentagem (%)"
          />

          <TopicCard 
            title="Índice Pluviométrico"
            icon={<RainIcon />}
            color="#4ECDC4"
            description="A quantidade de chuva que cai em uma determinada região."
            details="Essencial para monitorar riscos de enchentes e deslizamentos. O sensor mede quantos milímetros de água se acumulariam se não escoassem."
            metric="Unidade: Milímetros (mm)"
          />

          <TopicCard 
            title="Pressão Atmosférica"
            icon={<PressureIcon />}
            color="#FFD93D"
            description="O peso que o ar exerce sobre a superfície da Terra."
            details="Queda rápida na pressão geralmente indica tempestades se aproximando. Alta pressão costuma trazer tempo estável e ensolarado."
            metric="Unidade: Hectopascal (hPa)"
          />

          <TopicCard 
            title="Vento"
            icon={<WindIcon />}
            color="#F7F7F7"
            description="O movimento do ar causado por diferenças de pressão."
            details="Monitoramos a velocidade (intensidade) e a direção. Ventos fortes podem derrubar árvores e destelhar casas."
            metric="Unidade: km/h e Pontos Cardeais"
          />

          <div className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-blue-900/50 to-blue-800/30 border border-blue-500/30 p-8 rounded-2xl hover:scale-[1.02] transition-transform">
            <h3 className="text-2xl font-bold mb-4 text-blue-200">Por que monitorar?</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              O monitoramento constante nos permite emitir <strong>alertas antecipados</strong>.
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">✅ Evacuação segura de áreas de risco.</li>
              <li className="flex items-center gap-2">✅ Proteção da agricultura.</li>
              <li className="flex items-center gap-2">✅ Planejamento urbano inteligente.</li>
            </ul>
          </div>

        </div>
      </main>

      <footer className="p-8 text-center text-gray-500 text-sm border-t border-white/5">
        Desenvolvido por <span style={{ color: '#4A90E2' }}>FR0M_ZER0</span> para o Projeto Nimbus
      </footer>
    </div>
  );
};

const TopicCard = ({ title, icon, color, description, details, metric }) => (
  <div 
    className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden hover:bg-white/10 transition-all duration-300"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-0 group-hover:opacity-20"></div>
    
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-6">
        <div className="p-3 rounded-xl bg-white/5" style={{ color: color }}>
          {icon}
        </div>
        <span className="text-xs font-mono py-1 px-2 rounded-md bg-black/20 text-gray-400 border border-white/5">
          {metric}
        </span>
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-200 transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-300 mb-4 text-sm leading-relaxed">
        {description}
      </p>
      
      <div className="pt-4 border-t border-white/10">
        <p className="text-xs text-gray-400 leading-relaxed">
          <strong className="text-gray-300 block mb-1">Curiosidade:</strong>
          {details}
        </p>
      </div>
    </div>
  </div>
);

const TempIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/><path d="M10 7h4"/><path d="M10 11h4"/></svg>;
const HumidityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>;
const RainIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>;
const PressureIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16.2 7.8l-2 6.3-6.4 2.1 2-6.3z"/></svg>;
const WindIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>;

export default EducationPage;