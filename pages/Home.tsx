import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  // -- ESTADOS DE UI --
  const [showDevPopup, setShowDevPopup] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSearchMode, setCurrentSearchMode] = useState('flights');
  
  // Estados de Modales
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTravelersOpen, setIsTravelersOpen] = useState(false);
  const [isBaggageOpen, setIsBaggageOpen] = useState(false);
  
  // Estados de Datos del Buscador
  const [adultsCount, setAdultsCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [baggage10kgCount, setBaggage10kgCount] = useState(0);
  const [baggage23kgCount, setBaggage23kgCount] = useState(0);
  
  const [originValue, setOriginValue] = useState('');
  const [destinationValue, setDestinationValue] = useState('');
  const [dateRangeText, setDateRangeText] = useState('Fechas');
  
  // Hero Slider State
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  // -- REFS PARA CARRUSELES (Scroll Manual) --
  const flightCarouselRef = useRef<HTMLDivElement>(null);
  const accommodationCarouselRef = useRef<HTMLDivElement>(null);
  const popularAccommodationsCarouselRef = useRef<HTMLDivElement>(null);
  const offersCarouselRef = useRef<HTMLDivElement>(null);
  const vacationPackagesCarouselRef = useRef<HTMLDivElement>(null);
  const specialAccommodationsCarouselRef = useRef<HTMLDivElement>(null);
  const hotelDealsCarouselRef = useRef<HTMLDivElement>(null);
  const experiencesCarouselRef = useRef<HTMLDivElement>(null);

  // -- LÓGICA DE INICIO --
  useEffect(() => {
    // Mostrar popup solo si no se ha mostrado antes en la sesión
    if (!sessionStorage.getItem('initialPopupShown')) {
      setShowDevPopup(true);
      sessionStorage.setItem('initialPopupShown', 'true');
    }

    // Auto-play Hero Slider
    const interval = setInterval(() => {
      setCurrentHeroSlide(prev => (prev + 1) % 5); // 5 slides hardcoded
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // -- LÓGICA DE SCROLL --
  const scrollCarousel = (ref: React.RefObject<HTMLDivElement>, direction: number) => {
    if (ref.current) {
      // Estimación de ancho de tarjeta + gap
      const cardWidth = ref.current.firstElementChild?.clientWidth || 300;
      const gap = 16; 
      const scrollAmount = (cardWidth + gap) * direction;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // -- LÓGICA DE CONTADORES --
  const handleCounter = (type: string, action: string) => {
    if (type === 'adults') {
      if (action === 'increment') setAdultsCount(prev => prev + 1);
      if (action === 'decrement' && adultsCount > 1) setAdultsCount(prev => prev - 1);
    }
    if (type === 'children') {
      if (action === 'increment') setChildrenCount(prev => prev + 1);
      if (action === 'decrement' && childrenCount > 0) setChildrenCount(prev => prev - 1);
    }
    if (type === 'baggage-10kg') {
      if (action === 'increment') setBaggage10kgCount(prev => prev + 1);
      if (action === 'decrement' && baggage10kgCount > 0) setBaggage10kgCount(prev => prev - 1);
    }
    if (type === 'baggage-23kg') {
      if (action === 'increment') setBaggage23kgCount(prev => prev + 1);
      if (action === 'decrement' && baggage23kgCount > 0) setBaggage23kgCount(prev => prev - 1);
    }
  };

  // Helper para guardar datos en session antes de navegar (simulando lógica original)
  const savePropertyData = (data: any) => {
    sessionStorage.setItem('selectedPropertyData', JSON.stringify(data));
  };

  // Helper para seleccionar vuelos populares (simulado)
  const selectPopularFlight = (origin: string, dest: string) => {
      setOriginValue(origin);
      setDestinationValue(dest);
      setDateRangeText("05 Dic - 10 Dic");
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-gray-900 font-poppins relative">
        
      {/* --- POP-UP DE DESARROLLO (FIXED & CENTERED) --- */}
      {showDevPopup && (
        <div id="development-popup-overlay" className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
            <div className="modal-container bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center transform scale-100 transition-transform">
                <div className="text-yellow-500 mb-4">
                    <i className="fas fa-exclamation-triangle fa-3x"></i>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Sitio Web en Desarrollo</h2>
                <p className="text-gray-600 mb-6">
                    Los precios mostrados son de prueba y este sitio web está actualmente en desarrollo. Por favor, consulte con un agente antes de realizar cualquier pago o reserva.
                </p>
                <button 
                    id="development-popup-close" 
                    className="bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => setShowDevPopup(false)}
                >
                    Entendido
                </button>
            </div>
        </div>
      )}

      {/* --- NOTIFICACIONES --- */}
      <div id="notification-container"></div>

      {/* --- MODAL CALENDARIO --- */}
      {isCalendarOpen && (
        <div id="calendar-modal" className="modal-overlay visible calendar-modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="modal-container bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                <div className="calendar-modal-header flex justify-between items-center p-4 border-b">
                     <h3 className="font-semibold text-lg">Selecciona fechas</h3>
                     <button onClick={() => setIsCalendarOpen(false)} className="p-2 rounded-full hover:bg-gray-200 text-2xl leading-none">&times;</button>
                </div>
                <div className="calendar-modal-top-info flex justify-around p-2 bg-gray-50 border-b">
                    <div className="info-box text-center flex-1"><span className="label text-xs text-gray-500 block">Check-in</span><span className="value font-bold">--</span></div>
                    <div className="info-box text-center flex-1"><span className="label text-xs text-gray-500 block">Check-out</span><span className="value font-bold">--</span></div>
                </div>
                <div className="calendar-modal-body p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
                        <i className="far fa-calendar-alt"></i>
                        <p>Selecciona fechas para encontrar los mejores precios</p>
                    </div>
                    {/* Placeholder del calendario visual */}
                    <div className="calendar-months grid grid-cols-1 gap-4">
                         <div className="text-center">
                            <h4 className="font-semibold mb-2">Agosto 2025</h4>
                            <div className="grid grid-cols-7 gap-1 text-sm">
                                <div>D</div><div>L</div><div>M</div><div>X</div><div>J</div><div>V</div><div>S</div>
                                {/* Días simulados */}
                                {Array.from({length: 31}, (_, i) => (
                                    <div key={i} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 cursor-pointer" onClick={() => {
                                        setDateRangeText("05 Ago - 10 Ago");
                                        setIsCalendarOpen(false);
                                    }}>
                                        {i + 1}
                                    </div>
                                ))}
                            </div>
                         </div>
                    </div>
                    <div className="quick-select-buttons flex gap-4 mt-4">
                        <button className="flex-1 py-2 border rounded-full hover:bg-gray-100 font-semibold">Esta noche</button>
                        <button className="flex-1 py-2 border rounded-full hover:bg-gray-100 font-semibold">Fin de semana</button>
                    </div>
                </div>
                <div className="calendar-modal-footer p-4 border-t flex justify-end gap-2">
                    <button onClick={() => setDateRangeText('Fechas')} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Limpiar</button>
                    <button onClick={() => setIsCalendarOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Solicitar</button>
                </div>
            </div>
        </div>
      )}

      {/* --- MOBILE MENU OVERLAY --- */}
      {mobileMenuOpen && (
        <div id="mobile-menu-overlay" className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMobileMenuOpen(false)}></div>
      )}

      {/* --- MOBILE MENU --- */}
      <div id="mobile-menu" className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-lg p-6 z-50 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <img alt="Logo UACAMAYAFLY" height="32" src="https://guacamayafly.vercel.app/logo.svg" width="32"/>
                <span className="font-extrabold text-lg select-none text-guacamayafly-orange">UACAMAYAFLY</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-2xl">&times;</button>
          </div>
           <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-2 font-semibold mb-4" type="button">Iniciar sesión</button>
          <nav className="flex flex-col space-y-4">
              <a href="https://wa.me/5804243156057" className="text-gray-700 hover:text-guacamayafly-orange">Descubrir</a>
              <a href="https://wa.me/5804243156057" className="text-gray-700 hover:text-guacamayafly-orange">Viajes</a>
              <a href="https://wa.me/5804243156057" className="text-gray-700 hover:text-guacamayafly-orange">Opinión</a>
              <a href="https://wa.me/5804243156057" className="text-gray-700 hover:text-guacamayafly-orange">Más</a>
              <Link to="/checkout" className="text-gray-700 hover:text-guacamayafly-orange">Pagos</Link> 
          </nav>
      </div>

      {/* --- HEADER --- */}
      <header className="flex items-center justify-between px-6 py-4 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-2 lg:hidden">
            <button onClick={() => setMobileMenuOpen(true)} className="text-gray-700">
                <i className="fas fa-bars fa-lg"></i>
            </button>
        </div>
        <div className="flex items-center space-x-2">
            <img alt="Logo UACAMAYAFLY" height="32" src="https://guacamayafly.vercel.app/logo.svg" width="32"/>
            <span className="font-extrabold text-lg select-none text-guacamayafly-orange">UACAMAYAFLY</span>
        </div>
        <nav className="hidden sm:flex space-x-6 text-sm font-normal text-black">
            <a className="hover:underline" href="https://wa.me/5804243156057">Descubrir</a>
            <a className="hover:underline" href="https://wa.me/5804243156057">Viajes</a>
            <a className="hover:underline" href="https://wa.me/5804243156057">Opinión</a>
            <a className="hover:underline" href="https://wa.me/5804243156057">Más</a>
            <Link className="hover:underline" to="/checkout">Pagos</Link> 
        </nav>
        <div className="flex items-center space-x-4 text-sm">
            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-1 text-sm font-semibold" type="button">Iniciar sesión</button>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main id="main-container" className="max-w-[1200px] mx-auto px-6">
        <div id="main-content">
             <section className="text-center my-12">
                <h1 id="search-title" className="font-extrabold text-2xl sm:text-3xl md:text-4xl mt-6 mb-6">
                    {currentSearchMode === 'hotels' ? 'Encuentra el mejor hotel' : 'Encuentra el mejor vuelo'}
                </h1>
                <nav id="search-nav" className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm font-normal text-gray-700 mb-4">
                     <button onClick={() => setCurrentSearchMode('all')} className={`search-nav-button flex items-center gap-1 border rounded px-2 py-1 font-semibold ${currentSearchMode === 'all' ? 'border-black' : 'border-gray-700'}`}> <i className="fas fa-home"></i> Buscar todo </button>
                     <button onClick={() => setCurrentSearchMode('hotels')} className={`search-nav-button flex items-center gap-1 border rounded px-2 py-1 font-semibold ${currentSearchMode === 'hotels' ? 'border-black' : 'border-transparent'}`}> <i className="fas fa-bed"></i> Hoteles </button>
                     <button onClick={() => setCurrentSearchMode('flights')} className={`search-nav-button flex items-center gap-1 border rounded px-2 py-1 font-semibold ${currentSearchMode === 'flights' ? 'border-black active' : 'border-transparent'}`}> <i className="fas fa-plane"></i> Vuelos </button>
                     <button className="search-nav-button flex items-center gap-1"> <i className="fas fa-camera"></i> Cosas que hacer </button>
                     <button className="search-nav-button flex items-center gap-1"> <i className="fas fa-utensils"></i> Restaurantes </button>
                     <button className="search-nav-button flex items-center gap-1"> <i className="fas fa-key"></i> Alquileres vacacionales </button>
                </nav>
                <form id="search-form" aria-label="Buscar vuelos" className={`search-form-container mb-12 ${currentSearchMode === 'flights' ? 'flights-active' : ''}`} role="search">
                    <div id="origin-container" className="search-input-group">
                        <i id="origin-icon" className={`fas ${currentSearchMode === 'hotels' ? 'fa-map-marker-alt' : 'fa-plane-departure'}`}></i>
                        <input 
                            id="origin-input" 
                            placeholder={currentSearchMode === 'hotels' ? 'Ciudad o destino' : 'Origen'} 
                            type="text" 
                            required 
                            autoComplete="off"
                            value={originValue}
                            onChange={(e) => setOriginValue(e.target.value)}
                        />
                    </div>
                    <div id="destination-container" className={`search-input-group ${currentSearchMode === 'hotels' ? 'hidden' : ''}`}>
                        <i id="destination-icon" className="fas fa-plane-arrival"></i>
                        <input 
                            id="destination-input" 
                            placeholder="Destino" 
                            type="text" 
                            required 
                            autoComplete="off"
                            value={destinationValue}
                            onChange={(e) => setDestinationValue(e.target.value)}
                        />
                    </div>
                    <div id="date-picker-trigger" className="search-input-group cursor-pointer" onClick={() => setIsCalendarOpen(true)}>
                        <i className="fas fa-calendar-alt"></i>
                        <span id="date-range-display" className="text-gray-500">{dateRangeText}</span>
                    </div>
                    <div id="travelers-picker-trigger" className="search-input-group cursor-pointer relative" onClick={() => { setIsTravelersOpen(!isTravelersOpen); setIsBaggageOpen(false); }}>
                        <i className="fas fa-user"></i>
                        <span id="travelers-display">{adultsCount + childrenCount} viajero(s)</span>
                        
                        {/* Travelers Modal Inline */}
                        {isTravelersOpen && (
                            <div id="travelers-modal" className="popover-modal visible absolute top-full left-1/2 transform -translate-x-1/2 bg-white p-4 rounded shadow-xl z-50 w-72" onClick={(e) => e.stopPropagation()}>
                                <div className="popover-row flex justify-between items-center mb-4">
                                    <div><p className="font-semibold">Adultos</p><p className="text-xs text-gray-500">18 años o más</p></div>
                                    <div className="flex items-center gap-4">
                                        <button type="button" className="counter-btn" onClick={() => handleCounter('adults', 'decrement')}>-</button>
                                        <span className="font-semibold text-lg">{adultsCount}</span>
                                        <button type="button" className="counter-btn" onClick={() => handleCounter('adults', 'increment')}>+</button>
                                    </div>
                                </div>
                                <div className="popover-row flex justify-between items-center mb-4">
                                    <div><p className="font-semibold">Niños</p><p className="text-xs text-gray-500">0 a 17 años</p></div>
                                    <div className="flex items-center gap-4">
                                        <button type="button" className="counter-btn" onClick={() => handleCounter('children', 'decrement')}>-</button>
                                        <span className="font-semibold text-lg">{childrenCount}</span>
                                        <button type="button" className="counter-btn" onClick={() => handleCounter('children', 'increment')}>+</button>
                                    </div>
                                </div>
                                <button type="button" className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold mt-2" onClick={(e) => { e.stopPropagation(); setIsTravelersOpen(false); }}>Aceptar</button>
                            </div>
                        )}
                    </div>
                    
                     <div id="baggage-picker-trigger" className={`search-input-group cursor-pointer relative ${currentSearchMode === 'hotels' ? 'hidden' : ''}`} onClick={() => { setIsBaggageOpen(!isBaggageOpen); setIsTravelersOpen(false); }}>
                        <i className="fas fa-suitcase-rolling"></i>
                        <span id="baggage-display">Equipaje</span>

                        {/* Baggage Modal Inline */}
                        {isBaggageOpen && (
                            <div id="baggage-modal" className="popover-modal visible absolute top-full left-1/2 transform -translate-x-1/2 bg-white p-4 rounded shadow-xl z-50 w-80" onClick={(e) => e.stopPropagation()}>
                                <div className="popover-row flex justify-between items-center mb-4">
                                    <div><p className="font-semibold">Equipaje de mano (10kg)</p><p className="text-xs text-gray-500">Costo: 45.00 €</p></div>
                                    <div className="flex items-center gap-4">
                                        <button type="button" className="counter-btn" onClick={() => handleCounter('baggage-10kg', 'decrement')}>-</button>
                                        <span className="font-semibold text-lg">{baggage10kgCount}</span>
                                        <button type="button" className="counter-btn" onClick={() => handleCounter('baggage-10kg', 'increment')}>+</button>
                                    </div>
                                </div>
                                <div className="popover-row flex justify-between items-center mb-4">
                                    <div><p className="font-semibold">Equipaje facturado (23kg)</p><p className="text-xs text-gray-500">Costo: 85.00 €</p></div>
                                    <div className="flex items-center gap-4">
                                        <button type="button" className="counter-btn" onClick={() => handleCounter('baggage-23kg', 'decrement')}>-</button>
                                        <span className="font-semibold text-lg">{baggage23kgCount}</span>
                                        <button type="button" className="counter-btn" onClick={() => handleCounter('baggage-23kg', 'increment')}>+</button>
                                    </div>
                                </div>
                                <button type="button" className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold mt-2" onClick={(e) => { e.stopPropagation(); setIsBaggageOpen(false); }}>Aceptar</button>
                            </div>
                        )}
                    </div>
                    <button className="search-main-button" type="submit" onClick={(e) => { e.preventDefault(); /* Dummy submit */ }}>
                        <i className="fas fa-search"></i>
                    </button>
                </form>
            </section>
            
            {/* HERO SECTION / SLIDER */}
            <section id="hero-section" aria-label="Los mejores hoteles del mundo, elegidos por ti" className="relative rounded-lg overflow-hidden mb-12 max-w-[1200px] mx-auto section-hero-image h-72 sm:h-[400px]">
                <div id="hero-slider-container" className="h-full flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentHeroSlide * 100}%)` }}>
                    {/* Slide 1 */}
                    <div className="hero-slide min-w-full h-full relative">
                         <Link to="/product-details" onClick={() => savePropertyData({id: 'hero-1', name: 'Los mejores hoteles del mundo', price: 250, img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/710877796.jpg?k=daeea0fe466cc637640630ff67edd767f049a394022c0371ba15cdbaaff95ff0&o='})}>
                            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/710877796.jpg?k=daeea0fe466cc637640630ff67edd767f049a394022c0371ba15cdbaaff95ff0&o=" alt="Hero 1" className="w-full h-full object-cover" />
                            <div className="hero-text-overlay bg-black/50 p-6 rounded-lg absolute bottom-6 left-6 max-w-[90%] sm:max-w-[50%] text-white">
                                <div className="max-w-lg drop-shadow-lg">
                                    <h2 className="font-extrabold text-xl sm:text-2xl mb-1">Los mejores hoteles del mundo, elegidos por ti</h2>
                                    <p className="text-xs sm:text-sm max-w-md mb-3 leading-tight">Desde complejos turísticos junto a la playa hasta los alojamientos más únicos.</p>
                                    <button className="bg-white text-black rounded-full px-4 py-1 text-xs font-semibold hover:bg-gray-200 transition-colors" type="button">Ver más</button>
                                </div>
                            </div>
                        </Link>
                    </div>
                    {/* Slide 2 */}
                    <div className="hero-slide min-w-full h-full relative">
                         <Link to="/product-details" onClick={() => savePropertyData({id: 'hero-2', name: 'Escapadas románticas en Venecia', price: 180, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/3b/33/2b/20201018-122621-largejpg.jpg?w=1200&h=-1&s=1'})}>
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/3b/33/2b/20201018-122621-largejpg.jpg?w=1200&h=-1&s=1" alt="Hero 2" className="w-full h-full object-cover" />
                            <div className="hero-text-overlay bg-black/50 p-6 rounded-lg absolute bottom-6 left-6 max-w-[90%] sm:max-w-[50%] text-white">
                                <div className="max-w-lg drop-shadow-lg">
                                    <h2 className="font-extrabold text-xl sm:text-2xl mb-1">Escapadas románticas en Venecia</h2>
                                    <p className="text-xs sm:text-sm max-w-md mb-3 leading-tight">Descubre la magia de los canales, la arquitectura histórica y la gastronomía italiana.</p>
                                    <button className="bg-white text-black rounded-full px-4 py-1 text-xs font-semibold hover:bg-gray-200 transition-colors" type="button">Ver más</button>
                                </div>
                            </div>
                        </Link>
                    </div>
                    {/* Slide 3 */}
                    <div className="hero-slide min-w-full h-full relative">
                         <Link to="/product-details" onClick={() => savePropertyData({id: 'hero-3', name: 'Aventura en los Alpes Suizos', price: 300, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/f9/1c/swiss-alps.jpg?w=1400&h=500&s=1'})}>
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/f9/1c/swiss-alps.jpg?w=1400&h=500&s=1" alt="Hero 3" className="w-full h-full object-cover" />
                            <div className="hero-text-overlay bg-black/50 p-6 rounded-lg absolute bottom-6 left-6 max-w-[90%] sm:max-w-[50%] text-white">
                                <div className="max-w-lg drop-shadow-lg">
                                    <h2 className="font-extrabold text-xl sm:text-2xl mb-1">Aventura en los Alpes Suizos</h2>
                                    <p className="text-xs sm:text-sm max-w-md mb-3 leading-tight">Explora paisajes montañosos impresionantes, lagos cristalinos y pueblos encantadores.</p>
                                    <button className="bg-white text-black rounded-full px-4 py-1 text-xs font-semibold hover:bg-gray-200 transition-colors" type="button">Ver más</button>
                                </div>
                            </div>
                        </Link>
                    </div>
                    {/* Slide 4 */}
                    <div className="hero-slide min-w-full h-full relative">
                         <Link to="/product-details" onClick={() => savePropertyData({id: 'hero-4', name: 'Paraísos tropicales en las Maldivas', price: 500, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/bb/64/6b/alimatha-island.jpg?w=1200&h=-1&s=1'})}>
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/bb/64/6b/alimatha-island.jpg?w=1200&h=-1&s=1" alt="Hero 4" className="w-full h-full object-cover" />
                            <div className="hero-text-overlay bg-black/50 p-6 rounded-lg absolute bottom-6 left-6 max-w-[90%] sm:max-w-[50%] text-white">
                                <div className="max-w-lg drop-shadow-lg">
                                    <h2 className="font-extrabold text-xl sm:text-2xl mb-1">Paraísos tropicales en las Maldivas</h2>
                                    <p className="text-xs sm:text-sm max-w-md mb-3 leading-tight">Relájate en bungalows sobre el agua, disfruta de playas de arena blanca.</p>
                                    <button className="bg-white text-black rounded-full px-4 py-1 text-xs font-semibold hover:bg-gray-200 transition-colors" type="button">Ver más</button>
                                </div>
                            </div>
                        </Link>
                    </div>
                    {/* Slide 5 */}
                    <div className="hero-slide min-w-full h-full relative">
                         <Link to="/product-details" onClick={() => savePropertyData({id: 'hero-5', name: 'Explora la vibrante Bangkok', price: 69, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c2/79/7f/caption.jpg?w=1100&h=-1&s=1'})}>
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c2/79/7f/caption.jpg?w=1100&h=-1&s=1" alt="Hero 5" className="w-full h-full object-cover" />
                            <div className="hero-text-overlay bg-black/50 p-6 rounded-lg absolute bottom-6 left-6 max-w-[90%] sm:max-w-[50%] text-white">
                                <div className="max-w-lg drop-shadow-lg">
                                    <h2 className="font-extrabold text-xl sm:text-2xl mb-1">Explora la vibrante Bangkok</h2>
                                    <p className="text-xs sm:text-sm max-w-md mb-3 leading-tight">Sumérgete en la cultura tailandesa, visita templos majestuosos.</p>
                                    <button className="bg-white text-black rounded-full px-4 py-1 text-xs font-semibold hover:bg-gray-200 transition-colors" type="button">Ver más</button>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div id="hero-slider-dots" className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {[0, 1, 2, 3, 4].map((index) => (
                        <div 
                            key={index} 
                            onClick={() => setCurrentHeroSlide(index)}
                            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-colors duration-300 ${currentHeroSlide === index ? 'bg-white' : 'bg-white/50'}`}
                        ></div>
                    ))}
                </div>
            </section>
            
            <section aria-label="Recent searches" className="mb-12">
                <h2 className="text-lg font-semibold mb-3"> Tus búsquedas recientes </h2>
                <Link to="/product-details" className="flex items-center bg-gray-100 rounded-lg p-3 max-w-xs text-xs text-gray-700 font-semibold cursor-pointer interactive-card">
                    <i className="fas fa-suitcase-rolling mr-3 text-gray-600 text-lg"> </i>
                    <div>
                        <p className="font-bold leading-tight"> Paquetes de Tokio, Japón (HND-Haneda) a Naha </p>
                        <p className="leading-tight font-normal text-[11px] mt-0.5"> Del lun, 18 dic al jue, 21 dic </p>
                        <p className="leading-tight font-normal text-[11px] mt-0.5"> Hotel + vuelo </p>
                    </div>
                </Link>
            </section>

            <section aria-label="Guía para visitar Roma por segunda vez" className="bg-[#f3eaff] rounded-lg p-6 max-w-[1200px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12 interactive-card">
                <img alt="Ruinas romanas con cielo azul y árboles verdes" className="rounded-lg w-full sm:w-[120px] h-auto object-cover flex-shrink-0" height="80" src="https://storage.googleapis.com/a1aa/image/bb820f8e-70a1-43a4-4538-bd88d493f019.jpg" width="120"/>
                <div className="flex flex-col flex-grow">
                    <h3 className="font-semibold text-sm mb-1">Guía para visitar Roma por segunda vez</h3>
                    <p className="text-xs text-gray-700 mb-2 max-w-lg">Descubre otra perspectiva de la historia, el arte y la gastronomía de la ciudad.</p>
                </div>
                <button className="border border-black rounded-full px-4 py-1 text-xs font-semibold whitespace-nowrap hover:bg-gray-100" type="button">Leer ahora</button>
            </section>
    
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <p className="text-sm font-semibold text-gray-900 leading-tight max-w-4xl">Es posible que los residentes en las islas Canarias, Ceuta, Melilla y las islas Baleares, así como los miembros de familias numerosas, puedan obtener un descuento en las tarifas aéreas.</p>
                    <a className="text-sm font-semibold text-blue-900 underline mt-1 inline-block" href="https://wa.me/5804243156057">Información sobre el descuento en tarifas aéreas</a>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1 max-w-4xl">Descubre vuelos a destinos populares</h2>
                <p className="text-xs text-gray-700 mb-4 max-w-4xl">Se muestran vuelos de ida y vuelta para estas fechas: <span className="font-semibold">05 Dic - 10 Dic</span></p>
                <nav className="border-b border-gray-200 max-w-4xl mb-4">
                    <ul className="flex space-x-6 text-sm font-semibold text-blue-700"><li className="border-b-2 border-blue-600 pb-2 cursor-pointer">Naha</li></ul>
                </nav>
                 <div className="carousel-container max-w-4xl mx-auto relative">
                    <div ref={flightCarouselRef} id="flight-carousel" className="flex space-x-4 scrollbar-hide pb-2 carousel-content-wrapper overflow-x-auto">
                        {/* CARD 1 */}
                        <div className="border border-gray-200 rounded-lg p-3 w-56 flex-shrink-0 bg-white interactive-card cursor-pointer" onClick={() => selectPopularFlight('MAD', 'CCS')}>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo Iberia" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/IB.png" /> <span className="text-xs font-semibold text-gray-700">Iberia</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">Sin escalas</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Madrid (MAD)<span className="text-gray-500"> → </span>Caracas (CCS)</p>
                            <p className="text-xs text-gray-600 mb-3">11:50 - 15:35</p>
                            <hr className="border-gray-200 mb-3"/>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo Iberia" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/IB.png" /> <span className="text-xs font-semibold text-gray-700">Iberia</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">Sin escalas</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Caracas (CCS)<span className="text-gray-500"> → </span>Madrid (MAD)</p>
                            <p className="text-xs text-gray-600">17:50 - 08:25</p>
                            <p className="text-sm font-semibold text-gray-900 mt-3">950 €</p>
                            <p className="text-xs text-gray-600">Ida y vuelta por persona</p>
                        </div>
                        {/* CARD 2 */}
                        <div className="border border-gray-200 rounded-lg p-3 w-56 flex-shrink-0 bg-white interactive-card cursor-pointer" onClick={() => selectPopularFlight('MAD', 'CCS')}>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo Air Europa" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/UX.png" /> <span className="text-xs font-semibold text-gray-700">Air Europa</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">Sin escalas</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Madrid (MAD)<span className="text-gray-500"> → </span>Caracas (CCS)</p>
                            <p className="text-xs text-gray-600 mb-3">15:10 - 18:55</p>
                            <hr className="border-gray-200 mb-3"/>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo Air Europa" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/UX.png" /> <span className="text-xs font-semibold text-gray-700">Air Europa</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">Sin escalas</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Caracas (CCS)<span className="text-gray-500"> → </span>Madrid (MAD)</p>
                            <p className="text-xs text-gray-600">20:55 - 11:30</p>
                            <p className="text-sm font-semibold text-gray-900 mt-3">980 €</p>
                            <p className="text-xs text-gray-600">Ida y vuelta por persona</p>
                        </div>
                         {/* CARD 3 */}
                         <div className="border border-gray-200 rounded-lg p-3 w-56 flex-shrink-0 bg-white interactive-card cursor-pointer" onClick={() => selectPopularFlight('SCL', 'CCS')}>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo Copa" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/CM.png" /> <span className="text-xs font-semibold text-gray-700">Copa</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">1 escala</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Santiago (SCL)<span className="text-gray-500"> → </span>Caracas (CCS)</p>
                            <p className="text-xs text-gray-600 mb-3">01:30 - 11:00</p>
                            <hr className="border-gray-200 mb-3"/>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo Copa" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/CM.png" /> <span className="text-xs font-semibold text-gray-700">Copa</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">1 escala</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Caracas (CCS)<span className="text-gray-500"> → </span>Santiago (SCL)</p>
                            <p className="text-xs text-gray-600">15:00 - 00:45</p>
                            <p className="text-sm font-semibold text-gray-900 mt-3">820 €</p>
                            <p className="text-xs text-gray-600">Ida y vuelta por persona</p>
                        </div>
                         {/* CARD 4 */}
                         <div className="border border-gray-200 rounded-lg p-3 w-56 flex-shrink-0 bg-white interactive-card cursor-pointer" onClick={() => selectPopularFlight('BOG', 'CCS')}>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo LATAM" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/LA.png" /> <span className="text-xs font-semibold text-gray-700">LATAM</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">1 escala</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Bogotá (BOG)<span className="text-gray-500"> → </span>Caracas (CCS)</p>
                            <p className="text-xs text-gray-600 mb-3">07:00 - 10:30</p>
                            <hr className="border-gray-200 mb-3"/>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo LATAM" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/LA.png" /> <span className="text-xs font-semibold text-gray-700">LATAM</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">1 escala</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Caracas (CCS)<span className="text-gray-500"> → </span>Bogotá (BOG)</p>
                            <p className="text-xs text-gray-600">18:00 - 21:30</p>
                            <p className="text-sm font-semibold text-gray-900 mt-3">450 €</p>
                            <p className="text-xs text-gray-600">Ida y vuelta por persona</p>
                        </div>
                        {/* CARD 5 - Avianca */}
                        <div className="border border-gray-200 rounded-lg p-3 w-56 flex-shrink-0 bg-white interactive-card cursor-pointer" onClick={() => selectPopularFlight('EZE', 'CCS')}>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo Avianca" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/AV.png" /> <span className="text-xs font-semibold text-gray-700">Avianca</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">1 escala</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Buenos Aires (EZE)<span className="text-gray-500"> → </span>Caracas (CCS)</p>
                            <p className="text-xs text-gray-600 mb-3">06:00 - 15:00</p>
                            <hr className="border-gray-200 mb-3"/>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo Avianca" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/AV.png" /> <span className="text-xs font-semibold text-gray-700">Avianca</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">1 escala</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Caracas (CCS)<span className="text-gray-500"> → </span>Buenos Aires (EZE)</p>
                            <p className="text-xs text-gray-600">17:00 - 02:00</p>
                            <p className="text-sm font-semibold text-gray-900 mt-3">1100 €</p>
                            <p className="text-xs text-gray-600">Ida y vuelta por persona</p>
                        </div>
                        {/* CARD 6 - Turkish */}
                        <div className="border border-gray-200 rounded-lg p-3 w-56 flex-shrink-0 bg-white interactive-card cursor-pointer" onClick={() => selectPopularFlight('IST', 'CCS')}>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo Turkish" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/TK.png" /> <span className="text-xs font-semibold text-gray-700">Turkish Airlines</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">1 escala</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Estambul (IST)<span className="text-gray-500"> → </span>Caracas (CCS)</p>
                            <p className="text-xs text-gray-600 mb-3">02:20 - 14:00</p>
                            <hr className="border-gray-200 mb-3"/>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo Turkish" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/TK.png" /> <span className="text-xs font-semibold text-gray-700">Turkish Airlines</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">1 escala</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Caracas (CCS)<span className="text-gray-500"> → </span>Estambul (IST)</p>
                            <p className="text-xs text-gray-600">10:00 - 07:00</p>
                            <p className="text-sm font-semibold text-gray-900 mt-3">1300 €</p>
                            <p className="text-xs text-gray-600">Ida y vuelta por persona</p>
                        </div>
                        {/* CARD 7 - Plus Ultra */}
                        <div className="border border-gray-200 rounded-lg p-3 w-56 flex-shrink-0 bg-white interactive-card cursor-pointer" onClick={() => selectPopularFlight('MAD', 'CCS')}>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo Plus Ultra" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/PU.png" /> <span className="text-xs font-semibold text-gray-700">Plus Ultra</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">Sin escalas</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Madrid (MAD)<span className="text-gray-500"> → </span>Caracas (CCS)</p>
                            <p className="text-xs text-gray-600 mb-3">13:00 - 16:45</p>
                            <hr className="border-gray-200 mb-3"/>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo Plus Ultra" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/PU.png" /> <span className="text-xs font-semibold text-gray-700">Plus Ultra</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">Sin escalas</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Caracas (CCS)<span className="text-gray-500"> → </span>Madrid (MAD)</p>
                            <p className="text-xs text-gray-600">18:45 - 09:15</p>
                            <p className="text-sm font-semibold text-gray-900 mt-3">890 €</p>
                            <p className="text-xs text-gray-600">Ida y vuelta por persona</p>
                        </div>
                         {/* CARD 8 - Wingo */}
                         <div className="border border-gray-200 rounded-lg p-3 w-56 flex-shrink-0 bg-white interactive-card cursor-pointer" onClick={() => selectPopularFlight('MDE', 'CCS')}>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo Wingo" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/P5.png" /> <span className="text-xs font-semibold text-gray-700">Wingo</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">1 escala</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Medellín (MDE)<span className="text-gray-500"> → </span>Caracas (CCS)</p>
                            <p className="text-xs text-gray-600 mb-3">05:30 - 09:00</p>
                            <hr className="border-gray-200 mb-3"/>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo Wingo" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/P5.png" /> <span className="text-xs font-semibold text-gray-700">Wingo</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">1 escala</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Caracas (CCS)<span className="text-gray-500"> → </span>Medellín (MDE)</p>
                            <p className="text-xs text-gray-600">16:00 - 19:30</p>
                            <p className="text-sm font-semibold text-gray-900 mt-3">380 €</p>
                            <p className="text-xs text-gray-600">Ida y vuelta por persona</p>
                        </div>
                         {/* CARD 9 - Sky High */}
                         <div className="border border-gray-200 rounded-lg p-3 w-56 flex-shrink-0 bg-white interactive-card cursor-pointer" onClick={() => selectPopularFlight('MIA', 'CCS')}>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo Sky High" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/DO.png" /> <span className="text-xs font-semibold text-gray-700">Sky High</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">1 escala</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Miami (MIA)<span className="text-gray-500"> → </span>Caracas (CCS)</p>
                            <p className="text-xs text-gray-600 mb-3">08:00 - 13:00</p>
                            <hr className="border-gray-200 mb-3"/>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo Sky High" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/DO.png" /> <span className="text-xs font-semibold text-gray-700">Sky High</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">1 escala</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Caracas (CCS)<span className="text-gray-500"> → </span>Miami (MIA)</p>
                            <p className="text-xs text-gray-600">15:00 - 20:00</p>
                            <p className="text-sm font-semibold text-gray-900 mt-3">650 €</p>
                            <p className="text-xs text-gray-600">Ida y vuelta por persona</p>
                        </div>
                         {/* CARD 10 - Caribbean */}
                         <div className="border border-gray-200 rounded-lg p-3 w-56 flex-shrink-0 bg-white interactive-card cursor-pointer" onClick={() => selectPopularFlight('POS', 'CCS')}>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo Caribbean" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/BW.png" /> <span className="text-xs font-semibold text-gray-700">Caribbean Airlines</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">1 escala</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Puerto España (POS)<span className="text-gray-500"> → </span>Caracas (CCS)</p>
                            <p className="text-xs text-gray-600 mb-3">09:00 - 10:30</p>
                            <hr className="border-gray-200 mb-3"/>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo Caribbean" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/BW.png" /> <span className="text-xs font-semibold text-gray-700">Caribbean Airlines</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">1 escala</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Caracas (CCS)<span className="text-gray-500"> → </span>Puerto España (POS)</p>
                            <p className="text-xs text-gray-600">17:00 - 18:30</p>
                            <p className="text-sm font-semibold text-gray-900 mt-3">320 €</p>
                            <p className="text-xs text-gray-600">Ida y vuelta por persona</p>
                        </div>
                         {/* CARD 11 - Aerolíneas Argentinas */}
                         <div className="border border-gray-200 rounded-lg p-3 w-56 flex-shrink-0 bg-white interactive-card cursor-pointer" onClick={() => selectPopularFlight('AEP', 'CCS')}>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo Aerolíneas Argentinas" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/AR.png" /> <span className="text-xs font-semibold text-gray-700">Aerolíneas Argentinas</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">1 escala</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Buenos Aires (AEP)<span className="text-gray-500"> → </span>Caracas (CCS)</p>
                            <p className="text-xs text-gray-600 mb-3">09:00 - 17:00</p>
                            <hr className="border-gray-200 mb-3"/>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo Aerolíneas Argentinas" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/AR.png" /> <span className="text-xs font-semibold text-gray-700">Aerolíneas Argentinas</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">1 escala</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Caracas (CCS)<span className="text-gray-500"> → </span>Buenos Aires (AEP)</p>
                            <p className="text-xs text-gray-600">19:00 - 03:00</p>
                            <p className="text-sm font-semibold text-gray-900 mt-3">1150 €</p>
                            <p className="text-xs text-gray-600">Ida y vuelta por persona</p>
                        </div>
                         {/* CARD 12 - Conviasa */}
                         <div className="border border-gray-200 rounded-lg p-3 w-56 flex-shrink-0 bg-white interactive-card cursor-pointer" onClick={() => selectPopularFlight('HAV', 'CCS')}>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo Conviasa" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/V0.png" /> <span className="text-xs font-semibold text-gray-700">Conviasa</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">Sin escalas</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">La Habana (HAV)<span className="text-gray-500"> → </span>Caracas (CCS)</p>
                            <p className="text-xs text-gray-600 mb-3">10:00 - 13:00</p>
                            <hr className="border-gray-200 mb-3"/>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo Conviasa" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/V0.png" /> <span className="text-xs font-semibold text-gray-700">Conviasa</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">Sin escalas</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Caracas (CCS)<span className="text-gray-500"> → </span>La Habana (HAV)</p>
                            <p className="text-xs text-gray-600">15:00 - 18:00</p>
                            <p className="text-sm font-semibold text-gray-900 mt-3">550 €</p>
                            <p className="text-xs text-gray-600">Ida y vuelta por persona</p>
                        </div>
                         {/* CARD 13 - Estelar */}
                         <div className="border border-gray-200 rounded-lg p-3 w-56 flex-shrink-0 bg-white interactive-card cursor-pointer" onClick={() => selectPopularFlight('SDQ', 'CCS')}>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo Estelar" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/E4.png" /> <span className="text-xs font-semibold text-gray-700">Estelar</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">Sin escalas</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Santo Domingo (SDQ)<span className="text-gray-500"> → </span>Caracas (CCS)</p>
                            <p className="text-xs text-gray-600 mb-3">11:00 - 12:30</p>
                            <hr className="border-gray-200 mb-3"/>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo Estelar" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/E4.png" /> <span className="text-xs font-semibold text-gray-700">Estelar</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">Sin escalas</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Caracas (CCS)<span className="text-gray-500"> → </span>Santo Domingo (SDQ)</p>
                            <p className="text-xs text-gray-600">14:00 - 15:30</p>
                            <p className="text-sm font-semibold text-gray-900 mt-3">410 €</p>
                            <p className="text-xs text-gray-600">Ida y vuelta por persona</p>
                        </div>
                         {/* CARD 14 - Air France */}
                         <div className="border border-gray-200 rounded-lg p-3 w-56 flex-shrink-0 bg-white interactive-card cursor-pointer" onClick={() => selectPopularFlight('CDG', 'CCS')}>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo Air France" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/AF.png" /> <span className="text-xs font-semibold text-gray-700">Air France</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">1 escala</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">París (CDG)<span className="text-gray-500"> → </span>Caracas (CCS)</p>
                            <p className="text-xs text-gray-600 mb-3">10:40 - 15:10</p>
                            <hr className="border-gray-200 mb-3"/>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo Air France" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/AF.png" /> <span className="text-xs font-semibold text-gray-700">Air France</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">1 escala</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Caracas (CCS)<span className="text-gray-500"> → </span>París (CDG)</p>
                            <p className="text-xs text-gray-600">21:00 - 14:00</p>
                            <p className="text-sm font-semibold text-gray-900 mt-3">1250 €</p>
                            <p className="text-xs text-gray-600">Ida y vuelta por persona</p>
                        </div>
                         {/* CARD 15 - LATAM Lima */}
                         <div className="border border-gray-200 rounded-lg p-3 w-56 flex-shrink-0 bg-white interactive-card cursor-pointer" onClick={() => selectPopularFlight('LIM', 'CCS')}>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo LATAM" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/LA.png" /> <span className="text-xs font-semibold text-gray-700">LATAM</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">1 escala</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Lima (LIM)<span className="text-gray-500"> → </span>Caracas (CCS)</p>
                            <p className="text-xs text-gray-600 mb-3">08:30 - 13:30</p>
                            <hr className="border-gray-200 mb-3"/>
                            <div className="flex items-center space-x-1 mb-1"> <img alt="Logo LATAM" className="w-4 h-4" src="https://images.kiwi.com/airlines/64/LA.png" /> <span className="text-xs font-semibold text-gray-700">LATAM</span><span className="text-xs text-gray-400">•</span><span className="text-xs text-gray-500">1 escala</span> </div>
                            <p className="text-xs font-semibold text-gray-900 mb-0.5">Caracas (CCS)<span className="text-gray-500"> → </span>Lima (LIM)</p>
                            <p className="text-xs text-gray-600">16:00 - 21:00</p>
                            <p className="text-sm font-semibold text-gray-900 mt-3">600 €</p>
                            <p className="text-xs text-gray-600">Ida y vuelta por persona</p>
                        </div>
                    </div>
                    <button aria-label="Desplazar vuelos a la izquierda" className="carousel-nav-button left" onClick={() => scrollCarousel(flightCarouselRef, -1)}><i className="fas fa-chevron-left"></i></button>
                    <button aria-label="Desplazar vuelos a la derecha" className="carousel-nav-button right" onClick={() => scrollCarousel(flightCarouselRef, 1)}><i className="fas fa-chevron-right"></i></button>
                </div>
            </section>

            <section className="text-center mb-12">
                 <h3 className="text-xl font-semibold text-gray-900 mb-1">Descubre tu nuevo alojamiento favorito</h3>
                <p className="text-sm text-gray-500 mb-3">La media de precios corresponde al mes natural actual.</p>
                <nav className="flex space-x-4 border-b border-gray-200 mb-4 text-sm font-semibold text-blue-700 justify-center">
                    <button className="border-b-2 border-blue-700 pb-1">Playa</button>
                    <button className="pb-1 opacity-70 hover:opacity-100">Cultura</button>
                    <button className="pb-1 opacity-70 hover:opacity-100">Esquí</button>
                    <button className="pb-1 opacity-70 hover:opacity-100">Familia</button>
                    <button className="pb-1 opacity-70 hover:opacity-100">Spa</button>
                </nav>
               
                <div className="carousel-container max-w-[1200px] mx-auto relative">
                    <div ref={accommodationCarouselRef} id="accommodation-carousel" className="flex space-x-4 scrollbar-hide pb-2 carousel-content-wrapper overflow-x-auto">
                        {/* ACCOMMODATION CARDS */}
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Spa', price: 150, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/34/b0/15/masaje-sultan-el-mitico.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-40 sm:w-48 md:w-56 rounded-lg overflow-hidden cursor-pointer interactive-card relative">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/34/b0/15/masaje-sultan-el-mitico.jpg?w=1000&h=-1&s=1" alt="Spa" className="w-full h-40 object-cover rounded-lg" width="160" height="160"/>
                            <p className="text-xs font-semibold text-white bg-gray-900 bg-opacity-80 px-2 py-1 rounded-bl-lg rounded-br-lg absolute bottom-2 left-0 ml-1 w-max">Spa</p>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Igloo', price: 200, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/33/a1/30/photo2jpg.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-40 sm:w-48 md:w-56 rounded-lg overflow-hidden cursor-pointer interactive-card relative">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/33/a1/30/photo2jpg.jpg?w=1000&h=-1&s=1" alt="Igloo" className="w-full h-40 object-cover rounded-lg" width="160" height="160"/>
                            <p className="text-xs font-semibold text-white bg-gray-900 bg-opacity-80 px-2 py-1 rounded-bl-lg rounded-br-lg absolute bottom-2 left-0 ml-1 w-max">Igloo</p>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Bungalow', price: 180, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/11/8c/6f/caption.jpg?w=900&h=-1&s=1'})} className="flex-shrink-0 w-40 sm:w-48 md:w-56 rounded-lg overflow-hidden cursor-pointer interactive-card relative">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/11/8c/6f/caption.jpg?w=900&h=-1&s=1" alt="Bungalow" className="w-full h-40 object-cover rounded-lg" width="160" height="160"/>
                            <p className="text-xs font-semibold text-white bg-gray-900 bg-opacity-80 px-2 py-1 rounded-bl-lg rounded-br-lg absolute bottom-2 left-0 ml-1 w-max">Bungalow</p>
                        </Link>
                         <Link to="/product-details" onClick={() => savePropertyData({name: 'Chalet', price: 300, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/21/10/9c/hotel-chalet-del-brenta.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-40 sm:w-48 md:w-56 rounded-lg overflow-hidden cursor-pointer interactive-card relative">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/21/10/9c/hotel-chalet-del-brenta.jpg?w=1000&h=-1&s=1" alt="Chalet" className="w-full h-40 object-cover rounded-lg" width="160" height="160"/>
                            <p className="text-xs font-semibold text-white bg-gray-900 bg-opacity-80 px-2 py-1 rounded-bl-lg rounded-br-lg absolute bottom-2 left-0 ml-1 w-max">Chalet</p>
                        </Link>
                         <Link to="/product-details" onClick={() => savePropertyData({name: 'Apartotel', price: 100, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/72/bf/4b/frente.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-40 sm:w-48 md:w-56 rounded-lg overflow-hidden cursor-pointer interactive-card relative">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/72/bf/4b/frente.jpg?w=1000&h=-1&s=1" alt="Apartotel" className="w-full h-40 object-cover rounded-lg" width="160" height="160"/>
                            <p className="text-xs font-semibold text-white bg-gray-900 bg-opacity-80 px-2 py-1 rounded-bl-lg rounded-br-lg absolute bottom-2 left-0 ml-1 w-max">Apartotel</p>
                        </Link>
                         <Link to="/product-details" onClick={() => savePropertyData({name: 'Casa barco', price: 250, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/03/4d/09/exterior-at-dusk.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-40 sm:w-48 md:w-56 rounded-lg overflow-hidden cursor-pointer interactive-card relative">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/03/4d/09/exterior-at-dusk.jpg?w=1000&h=-1&s=1" alt="Casa barco" className="w-full h-40 object-cover rounded-lg" width="160" height="160"/>
                            <p className="text-xs font-semibold text-white bg-gray-900 bg-opacity-80 px-2 py-1 rounded-bl-lg rounded-br-lg absolute bottom-2 left-0 ml-1 w-max">Casa barco</p>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Granja', price: 120, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/c9/9c/ce/caption.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-40 sm:w-48 md:w-56 rounded-lg overflow-hidden cursor-pointer interactive-card relative">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/c9/9c/ce/caption.jpg?w=1000&h=-1&s=1" alt="Granja" className="w-full h-40 object-cover rounded-lg" width="160" height="160"/>
                            <p className="text-xs font-semibold text-white bg-gray-900 bg-opacity-80 px-2 py-1 rounded-bl-lg rounded-br-lg absolute bottom-2 left-0 ml-1 w-max">Granja</p>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Cabaña', price: 140, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/04/82/a7/hotel-huinid-bustillo.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-40 sm:w-48 md:w-56 rounded-lg overflow-hidden cursor-pointer interactive-card relative">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/04/82/a7/hotel-huinid-bustillo.jpg?w=1000&h=-1&s=1" alt="Cabaña" className="w-full h-40 object-cover rounded-lg" width="160" height="160"/>
                            <p className="text-xs font-semibold text-white bg-gray-900 bg-opacity-80 px-2 py-1 rounded-bl-lg rounded-br-lg absolute bottom-2 left-0 ml-1 w-max">Cabaña</p>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Castillo', price: 400, img: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/12/74/70/c6.jpg'})} className="flex-shrink-0 w-40 sm:w-48 md:w-56 rounded-lg overflow-hidden cursor-pointer interactive-card relative">
                            <img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/12/74/70/c6.jpg" alt="Castillo" className="w-full h-40 object-cover rounded-lg" width="160" height="160"/>
                            <p className="text-xs font-semibold text-white bg-gray-900 bg-opacity-80 px-2 py-1 rounded-bl-lg rounded-br-lg absolute bottom-2 left-0 ml-1 w-max">Castillo</p>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Villa', price: 350, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/52/5d/8b/villa-lucia-principal.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-40 sm:w-48 md:w-56 rounded-lg overflow-hidden cursor-pointer interactive-card relative">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/52/5d/8b/villa-lucia-principal.jpg?w=1000&h=-1&s=1" alt="Villa" className="w-full h-40 object-cover rounded-lg" width="160" height="160"/>
                            <p className="text-xs font-semibold text-white bg-gray-900 bg-opacity-80 px-2 py-1 rounded-bl-lg rounded-br-lg absolute bottom-2 left-0 ml-1 w-max">Villa</p>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Hostal', price: 50, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/62/39/1c/hostal-providencia.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-40 sm:w-48 md:w-56 rounded-lg overflow-hidden cursor-pointer interactive-card relative">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/62/39/1c/hostal-providencia.jpg?w=1000&h=-1&s=1" alt="Hostal" className="w-full h-40 object-cover rounded-lg" width="160" height="160"/>
                            <p className="text-xs font-semibold text-white bg-gray-900 bg-opacity-80 px-2 py-1 rounded-bl-lg rounded-br-lg absolute bottom-2 left-0 ml-1 w-max">Hostal</p>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Ryokan', price: 220, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/0c/1b/caption.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-40 sm:w-48 md:w-56 rounded-lg overflow-hidden cursor-pointer interactive-card relative">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/0c/1b/caption.jpg?w=1000&h=-1&s=1" alt="Ryokan" className="w-full h-40 object-cover rounded-lg" width="160" height="160"/>
                            <p className="text-xs font-semibold text-white bg-gray-900 bg-opacity-80 px-2 py-1 rounded-bl-lg rounded-br-lg absolute bottom-2 left-0 ml-1 w-max">Ryokan</p>
                        </Link>
                         <Link to="/product-details" onClick={() => savePropertyData({name: 'Lodge', price: 190, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/06/5e/16/romantic-getaway-to-vista.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-40 sm:w-48 md:w-56 rounded-lg overflow-hidden cursor-pointer interactive-card relative">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/06/5e/16/romantic-getaway-to-vista.jpg?w=1000&h=-1&s=1" alt="Lodge" className="w-full h-40 object-cover rounded-lg" width="160" height="160"/>
                            <p className="text-xs font-semibold text-white bg-gray-900 bg-opacity-80 px-2 py-1 rounded-bl-lg rounded-br-lg absolute bottom-2 left-0 ml-1 w-max">Lodge</p>
                        </Link>
                    </div>
                    <button aria-label="Desplazar alojamientos a la izquierda" onClick={() => scrollCarousel(accommodationCarouselRef, -1)} className="carousel-nav-button left"><i className="fas fa-chevron-left"></i></button>
                    <button aria-label="Desplazar alojamientos a la derecha" onClick={() => scrollCarousel(accommodationCarouselRef, 1)} className="carousel-nav-button right"><i className="fas fa-chevron-right"></i></button>
                </div>
            </section>

            <section className="relative mt-8 rounded-2xl overflow-hidden mb-12">
                <img alt="Fondo de oferta con paisaje playero" className="absolute inset-0 w-full h-full object-cover" src="https://storage.googleapis.com/a1aa/image/1ab494ab-7725-4800-b387-862b1cf98652.jpg"/>
                <div className="relative p-6 sm:p-8 lg:p-10 offers-text-overlay">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-lg font-semibold leading-tight max-w-xl">Las principales ofertas para ti a partir de tu búsqueda reciente</h3>
                            <p className="text-xs font-normal mt-1">Se muestran ofertas para estas fechas: <span className="font-semibold">18 dic - 21 dic</span></p>
                        </div>
                        <button className="bg-white text-blue-600 text-xs font-semibold rounded-md px-3 py-1 whitespace-nowrap hover:bg-blue-50 transition" onClick={() => window.location.href='https://wa.me/5804243156057'}>Abrir todas las ofertas</button>
                    </div>
                    <div className="carousel-container relative">
                        <div ref={offersCarouselRef} id="offers-carousel" className="flex space-x-4 scrollbar-hide pb-2 carousel-content-wrapper overflow-x-auto">
                           <Link to="/product-details" onClick={() => savePropertyData({name: 'Cleo Patra Pyramids Tower Inn', location: 'El cairo', rating: '8.8', price: 70, img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/710877796.jpg?k=daeea0fe466cc637640630ff67edd767f049a394022c0371ba15cdbaaff95ff0&o='})} className="flex-shrink-0 w-64 bg-white text-gray-900 rounded-lg p-3 interactive-card flex flex-col cursor-pointer">
                                <div className="relative rounded-lg overflow-hidden mb-2">
                                    <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/710877796.jpg?k=daeea0fe466cc637640630ff67edd767f049a394022c0371ba15cdbaaff95ff0&o=" alt="Hotel" className="w-full h-32 object-cover rounded-lg"/>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-[9px] font-semibold mb-0.5">El cairo</p>
                                    <h4 className="text-xs font-semibold leading-tight mb-1">Cleo Patra Pyramids Tower Inn</h4>
                                    <div className="text-xs font-bold mb-0.5">70 $</div>
                                </div>
                           </Link>
                           <Link to="/product-details" onClick={() => savePropertyData({name: 'Stay KooooK Bern Wankdorf', location: 'Suiza', rating: '9.2', price: 681, img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/420539166.jpg?k=c926514525eee0e8647d2a2faadb73c36e1572acb5f17f988ca0ff41b211a266&o='})} className="flex-shrink-0 w-64 bg-white text-gray-900 rounded-lg p-3 interactive-card flex flex-col cursor-pointer">
                                <div className="relative rounded-lg overflow-hidden mb-2">
                                    <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/420539166.jpg?k=c926514525eee0e8647d2a2faadb73c36e1572acb5f17f988ca0ff41b211a266&o=" alt="Hotel" className="w-full h-32 object-cover rounded-lg"/>
                                    <span className="absolute top-2 left-2 bg-green-700 text-white text-[8px] font-semibold rounded px-1.5 py-0.5 z-10">VIP Access</span>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-[9px] font-semibold mb-0.5">Suiza</p>
                                    <h4 className="text-xs font-semibold leading-tight mb-1">Stay KooooK Bern Wankdorf</h4>
                                    <div className="text-xs font-bold mb-0.5">681 $</div>
                                </div>
                           </Link>
                           <Link to="/product-details" onClick={() => savePropertyData({name: 'Arctic Log Cabins', location: 'Finlandia', rating: '8.8', price: 501, img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/300158709.jpg?k=2333733f450e5bd74ccc2f540b6a210a689899000a58baf2a7f5de9bb61c0327&o='})} className="flex-shrink-0 w-64 bg-white text-gray-900 rounded-lg p-3 interactive-card flex flex-col cursor-pointer">
                                <div className="relative rounded-lg overflow-hidden mb-2">
                                    <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/300158709.jpg?k=2333733f450e5bd74ccc2f540b6a210a689899000a58baf2a7f5de9bb61c0327&o=" alt="Hotel" className="w-full h-32 object-cover rounded-lg"/>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-[9px] font-semibold mb-0.5">Finlandia</p>
                                    <h4 className="text-xs font-semibold leading-tight mb-1">Arctic Log Cabins</h4>
                                    <div className="text-xs font-bold mb-0.5">501 $</div>
                                </div>
                           </Link>
                           <Link to="/product-details" onClick={() => savePropertyData({name: 'Santiago Marriott Hotel', location: 'Santiago de chile', rating: '9.5', price: 638, img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/587054710.jpg?k=e9499a823544ce3f862524780c2a3f229668911423c92fe9354f20a18d18a905&o='})} className="flex-shrink-0 w-64 bg-white text-gray-900 rounded-lg p-3 interactive-card flex flex-col cursor-pointer">
                                <div className="relative rounded-lg overflow-hidden mb-2">
                                    <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/587054710.jpg?k=e9499a823544ce3f862524780c2a3f229668911423c92fe9354f20a18d18a905&o=" alt="Hotel" className="w-full h-32 object-cover rounded-lg"/>
                                    <span className="absolute top-2 left-2 bg-green-700 text-white text-[8px] font-semibold rounded px-1.5 py-0.5 z-10">VIP Access</span>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-[9px] font-semibold mb-0.5">Santiago de chile</p>
                                    <h4 className="text-xs font-semibold leading-tight mb-1">Santiago Marriott Hotel</h4>
                                    <div className="text-xs font-bold mb-0.5">638 $</div>
                                </div>
                           </Link>
                           <Link to="/product-details" onClick={() => savePropertyData({name: 'London Marriott Hotel Kensington', location: 'Londres', rating: '9.0', price: 1181, img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/629852011.jpg?k=c98322fbe600802485cdc0df98b0f74a67f3e8ae589c7774b6d0af8e31c60626&o='})} className="flex-shrink-0 w-64 bg-white text-gray-900 rounded-lg p-3 interactive-card flex flex-col cursor-pointer">
                                <div className="relative rounded-lg overflow-hidden mb-2">
                                    <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/629852011.jpg?k=c98322fbe600802485cdc0df98b0f74a67f3e8ae589c7774b6d0af8e31c60626&o=" alt="Hotel" className="w-full h-32 object-cover rounded-lg"/>
                                    <span className="absolute top-2 left-2 bg-green-700 text-white text-[8px] font-semibold rounded px-1.5 py-0.5 z-10">VIP Access</span>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-[9px] font-semibold mb-0.5">Londres</p>
                                    <h4 className="text-xs font-semibold leading-tight mb-1">London Marriott Hotel Kensington</h4>
                                    <div className="text-xs font-bold mb-0.5">1.181 $</div>
                                </div>
                           </Link>
                           <Link to="/product-details" onClick={() => savePropertyData({name: 'Hotel cerca del Jardin Botanico', location: 'Kazajistan', rating: '8.5', price: 67, img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/587745031.jpg?k=aa03a929efe49a83d4dc4e3d296ad64872b5c47de3f459a62a42a0cc23e1e7b4&o='})} className="flex-shrink-0 w-64 bg-white text-gray-900 rounded-lg p-3 interactive-card flex flex-col cursor-pointer">
                                <div className="relative rounded-lg overflow-hidden mb-2">
                                    <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/587745031.jpg?k=aa03a929efe49a83d4dc4e3d296ad64872b5c47de3f459a62a42a0cc23e1e7b4&o=" alt="Hotel" className="w-full h-32 object-cover rounded-lg"/>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-[9px] font-semibold mb-0.5">Kazajistan</p>
                                    <h4 className="text-xs font-semibold leading-tight mb-1">Hotel cerca del Jardin Botanico</h4>
                                    <div className="text-xs font-bold mb-0.5">67 $</div>
                                </div>
                           </Link>
                           <Link to="/product-details" onClick={() => savePropertyData({name: 'Waldorf Hotel Caracas', location: 'Caracas', rating: '9.8', price: 214, img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/335069941.jpg?k=ac66ce9b60cb39dbcdefcdec41e2158513330e0b0572381648686c52a98e97a7&o='})} className="flex-shrink-0 w-64 bg-white text-gray-900 rounded-lg p-3 interactive-card flex flex-col cursor-pointer">
                                <div className="relative rounded-lg overflow-hidden mb-2">
                                    <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/335069941.jpg?k=ac66ce9b60cb39dbcdefcdec41e2158513330e0b0572381648686c52a98e97a7&o=" alt="Hotel" className="w-full h-32 object-cover rounded-lg"/>
                                    <span className="absolute top-2 left-2 bg-green-700 text-white text-[8px] font-semibold rounded px-1.5 py-0.5 z-10">VIP Access</span>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-[9px] font-semibold mb-0.5">Caracas</p>
                                    <h4 className="text-xs font-semibold leading-tight mb-1">Waldorf Hotel Caracas</h4>
                                    <div className="text-xs font-bold mb-0.5">214 €</div>
                                </div>
                           </Link>
                           <Link to="/product-details" onClick={() => savePropertyData({name: 'Hotel Rústico Los Andes', location: 'Mérida', rating: '8.9', price: 48, img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/529536451.jpg?k=1d32748e732194e3696abcc70ba6738394f940036df0bc347f895c782ada4348&o='})} className="flex-shrink-0 w-64 bg-white text-gray-900 rounded-lg p-3 interactive-card flex flex-col cursor-pointer">
                                <div className="relative rounded-lg overflow-hidden mb-2">
                                    <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/529536451.jpg?k=1d32748e732194e3696abcc70ba6738394f940036df0bc347f895c782ada4348&o=" alt="Hotel" className="w-full h-32 object-cover rounded-lg"/>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-[9px] font-semibold mb-0.5">Mérida</p>
                                    <h4 className="text-xs font-semibold leading-tight mb-1">Hotel Rústico Los Andes</h4>
                                    <div className="text-xs font-bold mb-0.5">48 €</div>
                                </div>
                           </Link>
                           <Link to="/product-details" onClick={() => savePropertyData({name: 'Canaima Jungle Lodge', location: 'Canaima', rating: '9.3', price: 225, img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/655010495.jpg?k=c73f37431f4677edda0b163ef62b464e149390a081c797515374774594cc0068&o='})} className="flex-shrink-0 w-64 bg-white text-gray-900 rounded-lg p-3 interactive-card flex flex-col cursor-pointer">
                                <div className="relative rounded-lg overflow-hidden mb-2">
                                    <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/655010495.jpg?k=c73f37431f4677edda0b163ef62b464e149390a081c797515374774594cc0068&o=" alt="Hotel" className="w-full h-32 object-cover rounded-lg"/>
                                    <span className="absolute top-2 left-2 bg-green-700 text-white text-[8px] font-semibold rounded px-1.5 py-0.5 z-10">VIP Access</span>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-[9px] font-semibold mb-0.5">Canaima</p>
                                    <h4 className="text-xs font-semibold leading-tight mb-1">Canaima Jungle Lodge</h4>
                                    <div className="text-xs font-bold mb-0.5">225 €</div>
                                </div>
                           </Link>
                           <Link to="/product-details" onClick={() => savePropertyData({name: 'Posada El Morro', location: 'Lechería', rating: '8.2', price: 75, img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/646212843.jpg?k=b629bad3bdcd86c5ab780d64f7b27df0259442dd6f27d7744365e42026990690&o='})} className="flex-shrink-0 w-64 bg-white text-gray-900 rounded-lg p-3 interactive-card flex flex-col cursor-pointer">
                                <div className="relative rounded-lg overflow-hidden mb-2">
                                    <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/646212843.jpg?k=b629bad3bdcd86c5ab780d64f7b27df0259442dd6f27d7744365e42026990690&o=" alt="Hotel" className="w-full h-32 object-cover rounded-lg"/>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-[9px] font-semibold mb-0.5">Lechería</p>
                                    <h4 className="text-xs font-semibold leading-tight mb-1">Posada El Morro</h4>
                                    <div className="text-xs font-bold mb-0.5">75 €</div>
                                </div>
                           </Link>
                           <Link to="/product-details" onClick={() => savePropertyData({name: 'Hotel Humboldt', location: 'Caracas', rating: '9.7', price: 350, img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/602026540.jpg?k=e7b6260fe3104875385b15373f0b3e9eb8ac511defafe2efe4fe328f5859d975&o='})} className="flex-shrink-0 w-64 bg-white text-gray-900 rounded-lg p-3 interactive-card flex flex-col cursor-pointer">
                                <div className="relative rounded-lg overflow-hidden mb-2">
                                    <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/602026540.jpg?k=e7b6260fe3104875385b15373f0b3e9eb8ac511defafe2efe4fe328f5859d975&o=" alt="Hotel" className="w-full h-32 object-cover rounded-lg"/>
                                    <span className="absolute top-2 left-2 bg-green-700 text-white text-[8px] font-semibold rounded px-1.5 py-0.5 z-10">VIP Access</span>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-[9px] font-semibold mb-0.5">Caracas</p>
                                    <h4 className="text-xs font-semibold leading-tight mb-1">Hotel Humboldt</h4>
                                    <div className="text-xs font-bold mb-0.5">350 €</div>
                                </div>
                           </Link>
                           <Link to="/product-details" onClick={() => savePropertyData({name: 'Lidotel Caracas', location: 'Caracas', rating: '9.0', price: 170, img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/444872694.jpg?k=fe902fb1dc25ba19128d63732074c67e76957973d0557610bb3403e7941c9aba&o='})} className="flex-shrink-0 w-64 bg-white text-gray-900 rounded-lg p-3 interactive-card flex flex-col cursor-pointer">
                                <div className="relative rounded-lg overflow-hidden mb-2">
                                    <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/444872694.jpg?k=fe902fb1dc25ba19128d63732074c67e76957973d0557610bb3403e7941c9aba&o=" alt="Hotel" className="w-full h-32 object-cover rounded-lg"/>
                                    <span className="absolute top-2 left-2 bg-green-700 text-white text-[8px] font-semibold rounded px-1.5 py-0.5 z-10">VIP Access</span>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-[9px] font-semibold mb-0.5">Caracas</p>
                                    <h4 className="text-xs font-semibold leading-tight mb-1">Lidotel Caracas</h4>
                                    <div className="text-xs font-bold mb-0.5">170 €</div>
                                </div>
                           </Link>
                           <Link to="/product-details" onClick={() => savePropertyData({name: 'Hesperia WTC Valencia', location: 'Valencia', rating: '9.1', price: 160, img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/656975661.jpg?k=d4594331cf38698eca36c082de6a38a94ebabe4f979b26198c1bf3fdbe43f6f5&o='})} className="flex-shrink-0 w-64 bg-white text-gray-900 rounded-lg p-3 interactive-card flex flex-col cursor-pointer">
                                <div className="relative rounded-lg overflow-hidden mb-2">
                                    <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/656975661.jpg?k=d4594331cf38698eca36c082de6a38a94ebabe4f979b26198c1bf3fdbe43f6f5&o=" alt="Hotel" className="w-full h-32 object-cover rounded-lg"/>
                                    <span className="absolute top-2 left-2 bg-green-700 text-white text-[8px] font-semibold rounded px-1.5 py-0.5 z-10">VIP Access</span>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-[9px] font-semibold mb-0.5">Valencia</p>
                                    <h4 className="text-xs font-semibold leading-tight mb-1">Hesperia WTC Valencia</h4>
                                    <div className="text-xs font-bold mb-0.5">160 €</div>
                                </div>
                           </Link>
                           <Link to="/product-details" onClick={() => savePropertyData({name: 'Tibu Hotel Boutique', location: 'Margarita', rating: '8.7', price: 120, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/d2/05/7e/20180420-192822-largejpg.jpg?w=800&h=-1&s=1'})} className="flex-shrink-0 w-64 bg-white text-gray-900 rounded-lg p-3 interactive-card flex flex-col cursor-pointer">
                                <div className="relative rounded-lg overflow-hidden mb-2">
                                    <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/d2/05/7e/20180420-192822-largejpg.jpg?w=800&h=-1&s=1" alt="Hotel" className="w-full h-32 object-cover rounded-lg"/>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-[9px] font-semibold mb-0.5">Margarita</p>
                                    <h4 className="text-xs font-semibold leading-tight mb-1">Tibu Hotel Boutique</h4>
                                    <div className="text-xs font-bold mb-0.5">120 €</div>
                                </div>
                           </Link>
                           <Link to="/product-details" onClick={() => savePropertyData({name: 'Marriott Maracay', location: 'Maracay', rating: '9.4', price: 220, img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/463619762.jpg?k=c1376a0487065ae390385ca04f15336b8d9d2318c7b7961f519d1d8505c25261&o='})} className="flex-shrink-0 w-64 bg-white text-gray-900 rounded-lg p-3 interactive-card flex flex-col cursor-pointer">
                                <div className="relative rounded-lg overflow-hidden mb-2">
                                    <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/463619762.jpg?k=c1376a0487065ae390385ca04f15336b8d9d2318c7b7961f519d1d8505c25261&o=" alt="Hotel" className="w-full h-32 object-cover rounded-lg"/>
                                    <span className="absolute top-2 left-2 bg-green-700 text-white text-[8px] font-semibold rounded px-1.5 py-0.5 z-10">VIP Access</span>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-[9px] font-semibold mb-0.5">Maracay</p>
                                    <h4 className="text-xs font-semibold leading-tight mb-1">Marriott Maracay</h4>
                                    <div className="text-xs font-bold mb-0.5">220 €</div>
                                </div>
                           </Link>
                        </div>
                        <button aria-label="Desplazar ofertas a la izquierda" onClick={() => scrollCarousel(offersCarouselRef, -1)} className="carousel-nav-button left"><i className="fas fa-chevron-left"></i></button>
                        <button aria-label="Desplazar ofertas a la derecha" onClick={() => scrollCarousel(offersCarouselRef, 1)} className="carousel-nav-button right"><i className="fas fa-chevron-right"></i></button>
                    </div>
                </div>
            </section>
            
            <section className="max-w-[1200px] mx-auto my-12">
               <h1 className="text-xl font-semibold leading-tight mb-1">Echa un vistazo a paquetes de vacaciones en destinos populares</h1>
                <p className="text-sm text-gray-600 mb-3 max-w-[700px]">Precios encontrados en las últimas 48 horas para dos adultos. Los precios y la disponibilidad están sujetos a cambios. <span className="font-semibold cursor-pointer hover:underline">Haz clic para actualizar los precios.</span></p>
               <div className="carousel-container relative">
                    <div ref={vacationPackagesCarouselRef} id="vacation-packages-carousel" className="flex space-x-4 scrollbar-hide pb-2 carousel-content-wrapper overflow-x-auto">
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Hostal Madrid Atocha', price: 392, img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/386086064.jpg?k=865a09c08f297473a10052a8471861d18b68aeecaf7624675be2829889e88c45&o='})} className="flex-shrink-0 w-64 border border-gray-200 rounded-lg overflow-hidden shadow-sm interactive-card flex flex-col cursor-pointer">
                            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/386086064.jpg?k=865a09c08f297473a10052a8471861d18b68aeecaf7624675be2829889e88c45&o=" alt="Package" className="w-full h-44 object-cover" />
                            <div className="p-3 text-xs sm:text-sm text-left flex-grow flex flex-col">
                                <h2 className="font-semibold mb-1 leading-tight">Hostal Madrid Atocha</h2>
                                <div className="text-gray-600 text-[9px] sm:text-xs mb-2"><i className="fas fa-plane-departure"></i> Madrid (MAD)</div>
                                <div className="flex items-center space-x-1 font-semibold text-base sm:text-lg"><span>392 €</span></div>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Canal Wow Suites Amsterdam', price: 686, img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/156865451.jpg?k=df167a737d2b9c2483bfa3462e2ec3f07ec26006794a0947205369f7361d5947&o='})} className="flex-shrink-0 w-64 border border-gray-200 rounded-lg overflow-hidden shadow-sm interactive-card flex flex-col cursor-pointer">
                            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/156865451.jpg?k=df167a737d2b9c2483bfa3462e2ec3f07ec26006794a0947205369f7361d5947&o=" alt="Package" className="w-full h-44 object-cover" />
                            <div className="p-3 text-xs sm:text-sm text-left flex-grow flex flex-col">
                                <h2 className="font-semibold mb-1 leading-tight">Canal Wow Suites Amsterdam</h2>
                                <div className="text-gray-600 text-[9px] sm:text-xs mb-2"><i className="fas fa-plane-departure"></i> Amsterdam (AMS)</div>
                                <div className="flex items-center space-x-1 font-semibold text-base sm:text-lg"><span>686 €</span></div>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Hotel Gracery Naha', price: 500, img: 'https://storage.googleapis.com/a1aa/image/ee5c710a-dee9-4dce-b960-ac814d36ff0d.jpg'})} className="flex-shrink-0 w-64 border border-gray-200 rounded-lg overflow-hidden shadow-sm interactive-card flex flex-col cursor-pointer">
                            <img src="https://storage.googleapis.com/a1aa/image/ee5c710a-dee9-4dce-b960-ac814d36ff0d.jpg" alt="Package" className="w-full h-44 object-cover" />
                            <div className="p-3 text-xs sm:text-sm text-left flex-grow flex flex-col">
                                <h2 className="font-semibold mb-1 leading-tight">Hotel Gracery Naha</h2>
                                <div className="text-gray-600 text-[9px] sm:text-xs mb-2"><i className="fas fa-plane-departure"></i> Tokio (HND)</div>
                                <div className="flex items-center space-x-1 font-semibold text-base sm:text-lg"><span>500 €</span></div>
                            </div>
                        </Link>
                         <Link to="/product-details" onClick={() => savePropertyData({name: 'Paquete Roma Imperial', price: 480, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/26/a2/c5/mount-monserrate.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-64 border border-gray-200 rounded-lg overflow-hidden shadow-sm interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/26/a2/c5/mount-monserrate.jpg?w=1000&h=-1&s=1" alt="Package" className="w-full h-44 object-cover" />
                            <div className="p-3 text-xs sm:text-sm text-left flex-grow flex flex-col">
                                <h2 className="font-semibold mb-1 leading-tight">Paquete Roma Imperial</h2>
                                <div className="text-gray-600 text-[9px] sm:text-xs mb-2"><i className="fas fa-plane-departure"></i> Madrid (MAD)</div>
                                <div className="flex items-center space-x-1 font-semibold text-base sm:text-lg"><span>480 €</span></div>
                            </div>
                        </Link>
                         <Link to="/product-details" onClick={() => savePropertyData({name: 'Escapada a Lisboa', price: 250, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/21/8b/a4/photo0jpg.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-64 border border-gray-200 rounded-lg overflow-hidden shadow-sm interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/21/8b/a4/photo0jpg.jpg?w=1000&h=-1&s=1" alt="Package" className="w-full h-44 object-cover" />
                            <div className="p-3 text-xs sm:text-sm text-left flex-grow flex flex-col">
                                <h2 className="font-semibold mb-1 leading-tight">Escapada a Lisboa</h2>
                                <div className="text-gray-600 text-[9px] sm:text-xs mb-2"><i className="fas fa-plane-departure"></i> Barcelona (BCN)</div>
                                <div className="flex items-center space-x-1 font-semibold text-base sm:text-lg"><span>250 €</span></div>
                            </div>
                        </Link>
                         <Link to="/product-details" onClick={() => savePropertyData({name: 'Aventura en Los Roques', price: 800, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/24/e0/5f/90/fachada.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-64 border border-gray-200 rounded-lg overflow-hidden shadow-sm interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/24/e0/5f/90/fachada.jpg?w=1000&h=-1&s=1" alt="Package" className="w-full h-44 object-cover" />
                            <div className="p-3 text-xs sm:text-sm text-left flex-grow flex flex-col">
                                <h2 className="font-semibold mb-1 leading-tight">Aventura en Los Roques</h2>
                                <div className="text-gray-600 text-[9px] sm:text-xs mb-2"><i className="fas fa-plane-departure"></i> Caracas (CCS)</div>
                                <div className="flex items-center space-x-1 font-semibold text-base sm:text-lg"><span>800 €</span></div>
                            </div>
                        </Link>
                         <Link to="/product-details" onClick={() => savePropertyData({name: 'Descubre Canaima', price: 1200, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/a2/be/db/giardino.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-64 border border-gray-200 rounded-lg overflow-hidden shadow-sm interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/a2/be/db/giardino.jpg?w=1000&h=-1&s=1" alt="Package" className="w-full h-44 object-cover" />
                            <div className="p-3 text-xs sm:text-sm text-left flex-grow flex flex-col">
                                <h2 className="font-semibold mb-1 leading-tight">Descubre Canaima</h2>
                                <div className="text-gray-600 text-[9px] sm:text-xs mb-2"><i className="fas fa-plane-departure"></i> Caracas (CCS)</div>
                                <div className="flex items-center space-x-1 font-semibold text-base sm:text-lg"><span>1200 €</span></div>
                            </div>
                        </Link>
                         <Link to="/product-details" onClick={() => savePropertyData({name: 'Magia Andina en Mérida', price: 400, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/21/54/38/standard-parque-de-la.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-64 border border-gray-200 rounded-lg overflow-hidden shadow-sm interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/21/54/38/standard-parque-de-la.jpg?w=1000&h=-1&s=1" alt="Package" className="w-full h-44 object-cover" />
                            <div className="p-3 text-xs sm:text-sm text-left flex-grow flex flex-col">
                                <h2 className="font-semibold mb-1 leading-tight">Magia Andina en Mérida</h2>
                                <div className="text-gray-600 text-[9px] sm:text-xs mb-2"><i className="fas fa-plane-departure"></i> Valencia (VLN)</div>
                                <div className="flex items-center space-x-1 font-semibold text-base sm:text-lg"><span>400 €</span></div>
                            </div>
                        </Link>
                         <Link to="/product-details" onClick={() => savePropertyData({name: 'Sol y Playa en Margarita', price: 550, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/1a/6f/bb/gran-salon.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-64 border border-gray-200 rounded-lg overflow-hidden shadow-sm interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/1a/6f/bb/gran-salon.jpg?w=1000&h=-1&s=1" alt="Package" className="w-full h-44 object-cover" />
                            <div className="p-3 text-xs sm:text-sm text-left flex-grow flex flex-col">
                                <h2 className="font-semibold mb-1 leading-tight">Sol y Playa en Margarita</h2>
                                <div className="text-gray-600 text-[9px] sm:text-xs mb-2"><i className="fas fa-plane-departure"></i> Maracaibo (MAR)</div>
                                <div className="flex items-center space-x-1 font-semibold text-base sm:text-lg"><span>550 €</span></div>
                            </div>
                        </Link>
                         <Link to="/product-details" onClick={() => savePropertyData({name: 'Paquete Tango en Buenos Aires', price: 650, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/f0/77/7c/hotel-estelar-calle-100.jpg?w=900&h=-1&s=1'})} className="flex-shrink-0 w-64 border border-gray-200 rounded-lg overflow-hidden shadow-sm interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/f0/77/7c/hotel-estelar-calle-100.jpg?w=900&h=-1&s=1" alt="Package" className="w-full h-44 object-cover" />
                            <div className="p-3 text-xs sm:text-sm text-left flex-grow flex flex-col">
                                <h2 className="font-semibold mb-1 leading-tight">Paquete Tango en Buenos Aires</h2>
                                <div className="text-gray-600 text-[9px] sm:text-xs mb-2"><i className="fas fa-plane-departure"></i> Santiago (SCL)</div>
                                <div className="flex items-center space-x-1 font-semibold text-base sm:text-lg"><span>650 €</span></div>
                            </div>
                        </Link>
                         <Link to="/product-details" onClick={() => savePropertyData({name: 'Café y Cultura en Bogotá', price: 380, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/e2/da/9e/north-michigan-avenue.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-64 border border-gray-200 rounded-lg overflow-hidden shadow-sm interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/e2/da/9e/north-michigan-avenue.jpg?w=1000&h=-1&s=1" alt="Package" className="w-full h-44 object-cover" />
                            <div className="p-3 text-xs sm:text-sm text-left flex-grow flex flex-col">
                                <h2 className="font-semibold mb-1 leading-tight">Café y Cultura en Bogotá</h2>
                                <div className="text-gray-600 text-[9px] sm:text-xs mb-2"><i className="fas fa-plane-departure"></i> Caracas (CCS)</div>
                                <div className="flex items-center space-x-1 font-semibold text-base sm:text-lg"><span>380 €</span></div>
                            </div>
                        </Link>
                         <Link to="/product-details" onClick={() => savePropertyData({name: 'Historia y Sabor en Lima', price: 520, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/c4/d1/f4/the-palm-house-at-65.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-64 border border-gray-200 rounded-lg overflow-hidden shadow-sm interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/c4/d1/f4/the-palm-house-at-65.jpg?w=1000&h=-1&s=1" alt="Package" className="w-full h-44 object-cover" />
                            <div className="p-3 text-xs sm:text-sm text-left flex-grow flex flex-col">
                                <h2 className="font-semibold mb-1 leading-tight">Historia y Sabor en Lima</h2>
                                <div className="text-gray-600 text-[9px] sm:text-xs mb-2"><i className="fas fa-plane-departure"></i> Bogotá (BOG)</div>
                                <div className="flex items-center space-x-1 font-semibold text-base sm:text-lg"><span>520 €</span></div>
                            </div>
                        </Link>
                         <Link to="/product-details" onClick={() => savePropertyData({name: 'Vibras de Estambul', price: 700, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/c8/77/4e/bars-attractions-art.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-64 border border-gray-200 rounded-lg overflow-hidden shadow-sm interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/c8/77/4e/bars-attractions-art.jpg?w=1000&h=-1&s=1" alt="Package" className="w-full h-44 object-cover" />
                            <div className="p-3 text-xs sm:text-sm text-left flex-grow flex flex-col">
                                <h2 className="font-semibold mb-1 leading-tight">Vibras de Estambul</h2>
                                <div className="text-gray-600 text-[9px] sm:text-xs mb-2"><i className="fas fa-plane-departure"></i> Madrid (MAD)</div>
                                <div className="flex items-center space-x-1 font-semibold text-base sm:text-lg"><span>700 €</span></div>
                            </div>
                        </Link>
                         <Link to="/product-details" onClick={() => savePropertyData({name: 'Descanso en Punta Cana', price: 950, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/41/2e/13/photo0jpg.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-64 border border-gray-200 rounded-lg overflow-hidden shadow-sm interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/41/2e/13/photo0jpg.jpg?w=1000&h=-1&s=1" alt="Package" className="w-full h-44 object-cover" />
                            <div className="p-3 text-xs sm:text-sm text-left flex-grow flex flex-col">
                                <h2 className="font-semibold mb-1 leading-tight">Descanso en Punta Cana</h2>
                                <div className="text-gray-600 text-[9px] sm:text-xs mb-2"><i className="fas fa-plane-departure"></i> Caracas (CCS)</div>
                                <div className="flex items-center space-x-1 font-semibold text-base sm:text-lg"><span>950 €</span></div>
                            </div>
                        </Link>
                        {/* More packages could be added here */}
                    </div>
                    <button aria-label="Siguiente" onClick={() => scrollCarousel(vacationPackagesCarouselRef, 1)} className="carousel-nav-button right"><i className="fas fa-chevron-right fa-lg"></i></button>
                    <button aria-label="Anterior" onClick={() => scrollCarousel(vacationPackagesCarouselRef, -1)} className="carousel-nav-button left"><i className="fas fa-chevron-left fa-lg"></i></button>
                </div>
               <button className="mt-6 bg-blue-700 text-white text-sm font-semibold px-4 py-1.5 rounded shadow hover:bg-blue-800 transition" type="button" onClick={() => window.location.href='https://wa.me/5804243156057'}>Ver paquetes</button>
            </section>

            <section className="text-center mb-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Echa un vistazo a alojamientos en destinos populares</h3>
                <p className="text-sm text-gray-500 mb-3">La media de precios corresponde al mes natural actual.</p>
                <div className="carousel-container max-w-[1200px] mx-auto relative">
                    <div ref={popularAccommodationsCarouselRef} id="popular-accommodations-carousel" className="flex space-x-4 scrollbar-hide pb-2 carousel-content-wrapper overflow-x-auto">
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Honolulu', price: 335, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/0e/0a/6c/caption.jpg?w=1400&h=500&s=1'})} className="flex-shrink-0 w-56 bg-white rounded-lg shadow-sm cursor-pointer border interactive-card">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/0e/0a/6c/caption.jpg?w=1400&h=500&s=1" alt="Destino" className="w-full h-32 object-cover rounded-t-lg" />
                            <div className="p-2 text-left">
                                <h4 className="text-xs font-semibold text-gray-900 mb-0.5">Honolulu</h4>
                                <p className="text-[9px] text-gray-600 font-semibold">335 €</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Venecia', price: 180, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/3b/33/2b/20201018-122621-largejpg.jpg?w=700&h=400&s=1'})} className="flex-shrink-0 w-56 bg-white rounded-lg shadow-sm cursor-pointer border interactive-card">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/3b/33/2b/20201018-122621-largejpg.jpg?w=700&h=400&s=1" alt="Destino" className="w-full h-32 object-cover rounded-t-lg" />
                            <div className="p-2 text-left">
                                <h4 className="text-xs font-semibold text-gray-900 mb-0.5">Venecia</h4>
                                <p className="text-[9px] text-gray-600 font-semibold">180 €</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Alpes Suizos', price: 300, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/f9/1c/swiss-alps.jpg?w=1400&h=500&s=1'})} className="flex-shrink-0 w-56 bg-white rounded-lg shadow-sm cursor-pointer border interactive-card">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/f9/1c/swiss-alps.jpg?w=1400&h=500&s=1" alt="Destino" className="w-full h-32 object-cover rounded-t-lg" />
                            <div className="p-2 text-left">
                                <h4 className="text-xs font-semibold text-gray-900 mb-0.5">Alpes Suizos</h4>
                                <p className="text-[9px] text-gray-600 font-semibold">300 €</p>
                            </div>
                        </Link>
                         <Link to="/product-details" onClick={() => savePropertyData({name: 'Bangkok', price: 69, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c2/79/7f/caption.jpg?w=1100&h=-1&s=1'})} className="flex-shrink-0 w-56 bg-white rounded-lg shadow-sm cursor-pointer border interactive-card">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c2/79/7f/caption.jpg?w=1100&h=-1&s=1" alt="Destino" className="w-full h-32 object-cover rounded-t-lg" />
                            <div className="p-2 text-left">
                                <h4 className="text-xs font-semibold text-gray-900 mb-0.5">Bangkok</h4>
                                <p className="text-[9px] text-gray-600 font-semibold">69 €</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Maldivas', price: 500, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/bb/64/6b/alimatha-island.jpg?w=700&h=400&s=1'})} className="flex-shrink-0 w-56 bg-white rounded-lg shadow-sm cursor-pointer border interactive-card">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/bb/64/6b/alimatha-island.jpg?w=700&h=400&s=1" alt="Destino" className="w-full h-32 object-cover rounded-t-lg" />
                            <div className="p-2 text-left">
                                <h4 className="text-xs font-semibold text-gray-900 mb-0.5">Maldivas</h4>
                                <p className="text-[9px] text-gray-600 font-semibold">500 €</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'París', price: 220, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/15/6d/d6/paris.jpg?w=1400&h=500&s=1'})} className="flex-shrink-0 w-56 bg-white rounded-lg shadow-sm cursor-pointer border interactive-card">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/15/6d/d6/paris.jpg?w=1400&h=500&s=1" alt="Destino" className="w-full h-32 object-cover rounded-t-lg" />
                            <div className="p-2 text-left">
                                <h4 className="text-xs font-semibold text-gray-900 mb-0.5">París</h4>
                                <p className="text-[9px] text-gray-600 font-semibold">220 €</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Kioto', price: 150, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/18/28/2e/if-you-make-a-wish-when.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-56 bg-white rounded-lg shadow-sm cursor-pointer border interactive-card">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/18/28/2e/if-you-make-a-wish-when.jpg?w=1000&h=-1&s=1" alt="Destino" className="w-full h-32 object-cover rounded-t-lg" />
                            <div className="p-2 text-left">
                                <h4 className="text-xs font-semibold text-gray-900 mb-0.5">Kioto</h4>
                                <p className="text-[9px] text-gray-600 font-semibold">150 €</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Roma', price: 190, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c9/6c/08/caption.jpg?w=1400&h=500&s=1'})} className="flex-shrink-0 w-56 bg-white rounded-lg shadow-sm cursor-pointer border interactive-card">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c9/6c/08/caption.jpg?w=1400&h=500&s=1" alt="Destino" className="w-full h-32 object-cover rounded-t-lg" />
                            <div className="p-2 text-left">
                                <h4 className="text-xs font-semibold text-gray-900 mb-0.5">Roma</h4>
                                <p className="text-[9px] text-gray-600 font-semibold">190 €</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Praga', price: 120, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/cc/d0/42/caption.jpg?w=1400&h=500&s=1'})} className="flex-shrink-0 w-56 bg-white rounded-lg shadow-sm cursor-pointer border interactive-card">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/cc/d0/42/caption.jpg?w=1400&h=500&s=1" alt="Destino" className="w-full h-32 object-cover rounded-t-lg" />
                            <div className="p-2 text-left">
                                <h4 className="text-xs font-semibold text-gray-900 mb-0.5">Praga</h4>
                                <p className="text-[9px] text-gray-600 font-semibold">120 €</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Dubái', price: 280, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/4b/5f/39/caption.jpg?w=1400&h=500&s=1&cx=1348&cy=2741&chk=v1_2b5e36e781689a157686'})} className="flex-shrink-0 w-56 bg-white rounded-lg shadow-sm cursor-pointer border interactive-card">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/4b/5f/39/caption.jpg?w=1400&h=500&s=1&cx=1348&cy=2741&chk=v1_2b5e36e781689a157686" alt="Destino" className="w-full h-32 object-cover rounded-t-lg" />
                            <div className="p-2 text-left">
                                <h4 className="text-xs font-semibold text-gray-900 mb-0.5">Dubái</h4>
                                <p className="text-[9px] text-gray-600 font-semibold">280 €</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Nueva York', price: 350, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c5/7c/68/caption.jpg?w=1400&h=500&s=1&cx=950&cy=1766&chk=v1_9ee2771da71f55a7ac6a'})} className="flex-shrink-0 w-56 bg-white rounded-lg shadow-sm cursor-pointer border interactive-card">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c5/7c/68/caption.jpg?w=1400&h=500&s=1&cx=950&cy=1766&chk=v1_9ee2771da71f55a7ac6a" alt="Destino" className="w-full h-32 object-cover rounded-t-lg" />
                            <div className="p-2 text-left">
                                <h4 className="text-xs font-semibold text-gray-900 mb-0.5">Nueva York</h4>
                                <p className="text-[9px] text-gray-600 font-semibold">350 €</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Londres', price: 210, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/4c/08/1b/sun-peeks-through-behind.jpg?w=1400&h=500&s=1'})} className="flex-shrink-0 w-56 bg-white rounded-lg shadow-sm cursor-pointer border interactive-card">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/4c/08/1b/sun-peeks-through-behind.jpg?w=1400&h=500&s=1" alt="Destino" className="w-full h-32 object-cover rounded-t-lg" />
                            <div className="p-2 text-left">
                                <h4 className="text-xs font-semibold text-gray-900 mb-0.5">Londres</h4>
                                <p className="text-[9px] text-gray-600 font-semibold">210 €</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Sídney', price: 260, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/84/4c/88/caption.jpg?w=1400&h=500&s=1&cx=984&cy=523&chk=v1_00dace674f6f45c8ec71'})} className="flex-shrink-0 w-56 bg-white rounded-lg shadow-sm cursor-pointer border interactive-card">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/84/4c/88/caption.jpg?w=1400&h=500&s=1&cx=984&cy=523&chk=v1_00dace674f6f45c8ec71" alt="Destino" className="w-full h-32 object-cover rounded-t-lg" />
                            <div className="p-2 text-left">
                                <h4 className="text-xs font-semibold text-gray-900 mb-0.5">Sídney</h4>
                                <p className="text-[9px] text-gray-600 font-semibold">260 €</p>
                            </div>
                        </Link>
                    </div>
                    <button aria-label="Desplazar destinos a la izquierda" onClick={() => scrollCarousel(popularAccommodationsCarouselRef, -1)} className="carousel-nav-button left"><i className="fas fa-chevron-left"></i></button>
                    <button aria-label="Desplazar destinos a la derecha" onClick={() => scrollCarousel(popularAccommodationsCarouselRef, 1)} className="carousel-nav-button right"><i className="fas fa-chevron-right"></i></button>
                </div>
            </section>

            <section className="my-12 text-center">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold leading-tight mb-1">
                    Echa un vistazo a estos alojamientos muy especiales
                </h2>
                <div className="carousel-container relative">
                    <div ref={specialAccommodationsCarouselRef} id="special-accommodations-carousel" className="flex space-x-3 scrollbar-hide pb-2 carousel-content-wrapper overflow-x-auto">
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Kutsurogian', price: 811, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/1b/65/30/power-up-band-key-challenge.jpg?w=1000&h=-1&s=1'})} className="w-[180px] sm:w-[200px] md:w-[220px] flex-shrink-0 text-left relative interactive-card cursor-pointer block">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/1b/65/30/power-up-band-key-challenge.jpg?w=1000&h=-1&s=1" alt="Special" className="rounded-lg w-full h-32 object-cover mb-1"/>
                            <p className="text-[9px] sm:text-xs font-semibold text-gray-700 mb-0.5">Kutsurogian</p>
                            <p className="text-sm sm:text-base font-semibold mb-0.5">811 €</p>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'HOSHINOYA Tokyo', price: 1829, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/6c/92/dc/dotonbori.jpg?w=1000&h=-1&s=1'})} className="w-[180px] sm:w-[200px] md:w-[220px] flex-shrink-0 text-left relative interactive-card cursor-pointer block">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/6c/92/dc/dotonbori.jpg?w=1000&h=-1&s=1" alt="Special" className="rounded-lg w-full h-32 object-cover mb-1"/>
                            <p className="text-[9px] sm:text-xs font-semibold text-gray-700 mb-0.5">HOSHINOYA Tokyo</p>
                            <p className="text-sm sm:text-base font-semibold mb-0.5">1829 €</p>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Fukiya Ryokan', price: 2023, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/f9/cf/75/caption.jpg?w=1000&h=-1&s=1'})} className="w-[180px] sm:w-[200px] md:w-[220px] flex-shrink-0 text-left relative interactive-card cursor-pointer block">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/f9/cf/75/caption.jpg?w=1000&h=-1&s=1" alt="Special" className="rounded-lg w-full h-32 object-cover mb-1"/>
                            <p className="text-[9px] sm:text-xs font-semibold text-gray-700 mb-0.5">Fukiya Ryokan</p>
                            <p className="text-sm sm:text-base font-semibold mb-0.5">2023 €</p>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Ryokan Tori', price: 538, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/0c/1b/caption.jpg?w=1000&h=-1&s=1'})} className="w-[180px] sm:w-[200px] md:w-[220px] flex-shrink-0 text-left relative interactive-card cursor-pointer block">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/0c/1b/caption.jpg?w=1000&h=-1&s=1" alt="Special" className="rounded-lg w-full h-32 object-cover mb-1"/>
                            <p className="text-[9px] sm:text-xs font-semibold text-gray-700 mb-0.5">Ryokan Tori</p>
                            <p className="text-sm sm:text-base font-semibold mb-0.5">538 €</p>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Treehotel', price: 1200, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/28/64/9c/viceroy-chicago-guestroom.jpg?w=1000&h=-1&s=1'})} className="w-[180px] sm:w-[200px] md:w-[220px] flex-shrink-0 text-left relative interactive-card cursor-pointer block">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/28/64/9c/viceroy-chicago-guestroom.jpg?w=1000&h=-1&s=1" alt="Special" className="rounded-lg w-full h-32 object-cover mb-1"/>
                            <p className="text-[9px] sm:text-xs font-semibold text-gray-700 mb-0.5">Treehotel</p>
                            <p className="text-sm sm:text-base font-semibold mb-0.5">1200 €</p>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Giraffe Manor', price: 2500, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/99/05/b5/thompson-chicago.jpg?w=700&h=-1&s=1'})} className="w-[180px] sm:w-[200px] md:w-[220px] flex-shrink-0 text-left relative interactive-card cursor-pointer block">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/99/05/b5/thompson-chicago.jpg?w=700&h=-1&s=1" alt="Special" className="rounded-lg w-full h-32 object-cover mb-1"/>
                            <p className="text-[9px] sm:text-xs font-semibold text-gray-700 mb-0.5">Giraffe Manor</p>
                            <p className="text-sm sm:text-base font-semibold mb-0.5">2500 €</p>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Kakslauttanen Arctic Resort', price: 1500, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/f9/1c/swiss-alps.jpg?w=1400&h=500&s=1'})} className="w-[180px] sm:w-[200px] md:w-[220px] flex-shrink-0 text-left relative interactive-card cursor-pointer block">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/f9/1c/swiss-alps.jpg?w=1400&h=500&s=1" alt="Special" className="rounded-lg w-full h-32 object-cover mb-1"/>
                            <p className="text-[9px] sm:text-xs font-semibold text-gray-700 mb-0.5">Kakslauttanen Arctic Resort</p>
                            <p className="text-sm sm:text-base font-semibold mb-0.5">1500 €</p>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Amangiri', price: 3000, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/5a/7e/db/caption.jpg?w=1000&h=-1&s=1'})} className="w-[180px] sm:w-[200px] md:w-[220px] flex-shrink-0 text-left relative interactive-card cursor-pointer block">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/5a/7e/db/caption.jpg?w=1000&h=-1&s=1" alt="Special" className="rounded-lg w-full h-32 object-cover mb-1"/>
                            <p className="text-[9px] sm:text-xs font-semibold text-gray-700 mb-0.5">Amangiri</p>
                            <p className="text-sm sm:text-base font-semibold mb-0.5">3000 €</p>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Icehotel', price: 900, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/33/a1/30/photo2jpg.jpg?w=1000&h=-1&s=1'})} className="w-[180px] sm:w-[200px] md:w-[220px] flex-shrink-0 text-left relative interactive-card cursor-pointer block">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/33/a1/30/photo2jpg.jpg?w=1000&h=-1&s=1" alt="Special" className="rounded-lg w-full h-32 object-cover mb-1"/>
                            <p className="text-[9px] sm:text-xs font-semibold text-gray-700 mb-0.5">Icehotel</p>
                            <p className="text-sm sm:text-base font-semibold mb-0.5">900 €</p>
                        </Link>
                         <Link to="/product-details" onClick={() => savePropertyData({name: 'Conrad Maldives Rangali Island', price: 4000, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/91/a8/cc/hurawalhi-58-undersea.jpg?w=900&h=500&s=1'})} className="w-[180px] sm:w-[200px] md:w-[220px] flex-shrink-0 text-left relative interactive-card cursor-pointer block">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/91/a8/cc/hurawalhi-58-undersea.jpg?w=900&h=500&s=1" alt="Special" className="rounded-lg w-full h-32 object-cover mb-1"/>
                            <p className="text-[9px] sm:text-xs font-semibold text-gray-700 mb-0.5">Conrad Maldives Rangali Island</p>
                            <p className="text-sm sm:text-base font-semibold mb-0.5">4000 €</p>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Montaña Mágica Lodge', price: 350, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/8d/fe/71/the-guesthouse-hotel.jpg?w=1000&h=-1&s=1'})} className="w-[180px] sm:w-[200px] md:w-[220px] flex-shrink-0 text-left relative interactive-card cursor-pointer block">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/8d/fe/71/the-guesthouse-hotel.jpg?w=1000&h=-1&s=1" alt="Special" className="rounded-lg w-full h-32 object-cover mb-1"/>
                            <p className="text-[9px] sm:text-xs font-semibold text-gray-700 mb-0.5">Montaña Mágica Lodge</p>
                            <p className="text-sm sm:text-base font-semibold mb-0.5">350 €</p>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'The Caves Hotel', price: 800, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/af/1a/14/girl-the-goat.jpg?w=1000&h=-1&s=1'})} className="w-[180px] sm:w-[200px] md:w-[220px] flex-shrink-0 text-left relative interactive-card cursor-pointer block">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/af/1a/14/girl-the-goat.jpg?w=1000&h=-1&s=1" alt="Special" className="rounded-lg w-full h-32 object-cover mb-1"/>
                            <p className="text-[9px] sm:text-xs font-semibold text-gray-700 mb-0.5">The Caves Hotel</p>
                            <p className="text-sm sm:text-base font-semibold mb-0.5">800 €</p>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Singita Lebombo Lodge', price: 2800, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/c4/d4/07/18.jpg?w=1000&h=-1&s=1'})} className="w-[180px] sm:w-[200px] md:w-[220px] flex-shrink-0 text-left relative interactive-card cursor-pointer block">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/c4/d4/07/18.jpg?w=1000&h=-1&s=1" alt="Special" className="rounded-lg w-full h-32 object-cover mb-1"/>
                            <p className="text-[9px] sm:text-xs font-semibold text-gray-700 mb-0.5">Singita Lebombo Lodge</p>
                            <p className="text-sm sm:text-base font-semibold mb-0.5">2800 €</p>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Skylodge Adventure Suites', price: 1300, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/b7/bc/20/dinning-area.jpg?w=900&h=-1&s=1'})} className="w-[180px] sm:w-[200px] md:w-[220px] flex-shrink-0 text-left relative interactive-card cursor-pointer block">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/b7/bc/20/dinning-area.jpg?w=900&h=-1&s=1" alt="Special" className="rounded-lg w-full h-32 object-cover mb-1"/>
                            <p className="text-[9px] sm:text-xs font-semibold text-gray-700 mb-0.5">Skylodge Adventure Suites</p>
                            <p className="text-sm sm:text-base font-semibold mb-0.5">1300 €</p>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Fogo Island Inn', price: 2200, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/21/10/9c/hotel-chalet-del-brenta.jpg?w=1000&h=-1&s=1'})} className="w-[180px] sm:w-[200px] md:w-[220px] flex-shrink-0 text-left relative interactive-card cursor-pointer block">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/21/10/9c/hotel-chalet-del-brenta.jpg?w=1000&h=-1&s=1" alt="Special" className="rounded-lg w-full h-32 object-cover mb-1"/>
                            <p className="text-[9px] sm:text-xs font-semibold text-gray-700 mb-0.5">Fogo Island Inn</p>
                            <p className="text-sm sm:text-base font-semibold mb-0.5">2200 €</p>
                        </Link>
                    </div>
                    <button aria-label="Desplazar alojamientos especiales a la izquierda" onClick={() => scrollCarousel(specialAccommodationsCarouselRef, -1)} className="carousel-nav-button left"><i className="fas fa-chevron-left"></i></button>
                    <button aria-label="Desplazar alojamientos especiales a la derecha" onClick={() => scrollCarousel(specialAccommodationsCarouselRef, 1)} className="carousel-nav-button right"><i className="fas fa-chevron-right"></i></button>
                </div>
            </section>

             <section aria-label="Members discount banner" className="flex items-center space-x-4 bg-guacamayafly-orange text-white rounded-lg px-4 py-3 my-12 max-w-full">
                <i className="fas fa-gift fa-2x flex-shrink-0"></i>
                <p className="text-sm font-semibold flex-1 leading-tight">Los miembros ahorran al menos un 10 % en más de 100 000 hoteles de todo el mundo tras iniciar sesión.</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-xs font-semibold rounded-full px-4 py-1 whitespace-nowrap" type="button" onClick={() => window.location.href='https://wa.me/5804243156057'}>Iniciar sesión</button>
            </section>

            <section className="my-12 text-center">
                <h3 className="text-sm font-semibold text-gray-900 mb-0.5">Ofertas de hoteles</h3>
                 <p className="text-xs text-gray-500 mb-3">Precios por noche, impuestos y tasas incluidos.</p>
                <div className="carousel-container max-w-[1200px] mx-auto relative">
                    <div ref={hotelDealsCarouselRef} id="hotel-deals-carousel" className="flex space-x-4 scrollbar-hide pb-2 carousel-content-wrapper overflow-x-auto">
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'The Naha Terrace', price: 587, img: 'https://storage.googleapis.com/a1aa/image/63edd834-0d6e-44b4-f7e4-090dad321cc9.jpg'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://storage.googleapis.com/a1aa/image/63edd834-0d6e-44b4-f7e4-090dad321cc9.jpg" alt="Hotel Deal" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <h4 className="text-xs font-semibold leading-tight mb-1">The Naha Terrace</h4>
                                <p className="text-xs font-bold mb-0.5">587 €</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Hotel Moderno', price: 153, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/e3/45/cf/hotel-exterior.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/e3/45/cf/hotel-exterior.jpg?w=1000&h=-1&s=1" alt="Hotel Deal" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <h4 className="text-xs font-semibold leading-tight mb-1">Hotel Moderno</h4>
                                <p className="text-xs font-bold mb-0.5">153 €</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Santiago Marriott Hotel', price: 320, img: 'https://storage.googleapis.com/a1aa/image/29e6ba83-28a5-4826-88e9-07aba0f18e8b.jpg'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://storage.googleapis.com/a1aa/image/29e6ba83-28a5-4826-88e9-07aba0f18e8b.jpg" alt="Hotel Deal" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <h4 className="text-xs font-semibold leading-tight mb-1">Santiago Marriott Hotel</h4>
                                <p className="text-xs font-bold mb-0.5">320 €</p>
                            </div>
                        </Link>
                         <Link to="/product-details" onClick={() => savePropertyData({name: 'Hostal Céntrico', price: 72, img: 'https://storage.googleapis.com/a1aa/image/7be15fdb-6ab0-4bd0-6612-8e0b7f8750f4.jpg'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://storage.googleapis.com/a1aa/image/7be15fdb-6ab0-4bd0-6612-8e0b7f8750f4.jpg" alt="Hotel Deal" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <h4 className="text-xs font-semibold leading-tight mb-1">Hostal Céntrico</h4>
                                <p className="text-xs font-bold mb-0.5">72 €</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Hotel Histórico', price: 187, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/21/73/30/the-langham-chicago.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/21/73/30/the-langham-chicago.jpg?w=1000&h=-1&s=1" alt="Hotel Deal" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <h4 className="text-xs font-semibold leading-tight mb-1">Hotel Histórico</h4>
                                <p className="text-xs font-bold mb-0.5">187 €</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Pensión Económica', price: 54, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/72/bf/4b/frente.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/72/bf/4b/frente.jpg?w=1000&h=-1&s=1" alt="Hotel Deal" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <h4 className="text-xs font-semibold leading-tight mb-1">Pensión Económica</h4>
                                <p className="text-xs font-bold mb-0.5">54 €</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Hotel Eurobuilding Caracas', price: 212, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/20/70/cf/outside-view.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/20/70/cf/outside-view.jpg?w=1000&h=-1&s=1" alt="Hotel Deal" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <h4 className="text-xs font-semibold leading-tight mb-1">Hotel Eurobuilding Caracas</h4>
                                <p className="text-xs font-bold mb-0.5">212 €</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Cayena Caracas', price: 315, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/21/10/9c/hotel-chalet-del-brenta.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/21/10/9c/hotel-chalet-del-brenta.jpg?w=1000&h=-1&s=1" alt="Hotel Deal" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <h4 className="text-xs font-semibold leading-tight mb-1">Cayena Caracas</h4>
                                <p className="text-xs font-bold mb-0.5">315 €</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Renaissance La Castellana', price: 198, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/62/39/1c/hostal-providencia.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/62/39/1c/hostal-providencia.jpg?w=1000&h=-1&s=1" alt="Hotel Deal" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <h4 className="text-xs font-semibold leading-tight mb-1">Renaissance La Castellana</h4>
                                <p className="text-xs font-bold mb-0.5">198 €</p>
                            </div>
                        </Link>
                         <Link to="/product-details" onClick={() => savePropertyData({name: 'JW Marriott Caracas', price: 238, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/52/5d/8b/villa-lucia-principal.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/52/5d/8b/villa-lucia-principal.jpg?w=1000&h=-1&s=1" alt="Hotel Deal" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <h4 className="text-xs font-semibold leading-tight mb-1">JW Marriott Caracas</h4>
                                <p className="text-xs font-bold mb-0.5">238 €</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Hotel Intercontinental', price: 161, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/34/b0/15/masaje-sultan-el-mitico.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/34/b0/15/masaje-sultan-el-mitico.jpg?w=1000&h=-1&s=1" alt="Hotel Deal" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <h4 className="text-xs font-semibold leading-tight mb-1">Hotel Intercontinental</h4>
                                <p className="text-xs font-bold mb-0.5">161 €</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Kristoff Hotel', price: 110, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/33/a1/30/photo2jpg.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/33/a1/30/photo2jpg.jpg?w=1000&h=-1&s=1" alt="Hotel Deal" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <h4 className="text-xs font-semibold leading-tight mb-1">Kristoff Hotel</h4>
                                <p className="text-xs font-bold mb-0.5">110 €</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Hesperia Isla Margarita', price: 255, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/11/8c/6f/caption.jpg?w=900&h=-1&s=1'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/11/8c/6f/caption.jpg?w=900&h=-1&s=1" alt="Hotel Deal" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <h4 className="text-xs font-semibold leading-tight mb-1">Hesperia Isla Margarita</h4>
                                <p className="text-xs font-bold mb-0.5">255 €</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Sunsol Ecoland', price: 204, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/c9/9c/ce/caption.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/c9/9c/ce/caption.jpg?w=1000&h=-1&s=1" alt="Hotel Deal" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <h4 className="text-xs font-semibold leading-tight mb-1">Sunsol Ecoland</h4>
                                <p className="text-xs font-bold mb-0.5">204 €</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Campamento Tapuy Lodge', price: 202, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/04/82/a7/hotel-huinid-bustillo.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/04/82/a7/hotel-huinid-bustillo.jpg?w=1000&h=-1&s=1" alt="Hotel Deal" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <h4 className="text-xs font-semibold leading-tight mb-1">Campamento Tapuy Lodge</h4>
                                <p className="text-xs font-bold mb-0.5">202 €</p>
                            </div>
                        </Link>
                    </div>
                     <button aria-label="Siguiente" onClick={() => scrollCarousel(hotelDealsCarouselRef, 1)} className="carousel-nav-button right"><i className="fas fa-chevron-right fa-lg"></i></button>
                    <button aria-label="Anterior" onClick={() => scrollCarousel(hotelDealsCarouselRef, -1)} className="carousel-nav-button left"><i className="fas fa-chevron-left fa-lg"></i></button>
                </div>
            </section>
            
            <section className="my-12 text-center">
                <h3 className="text-sm font-semibold text-gray-900 mb-0.5">Las mejores experiencias en Guacamayafly</h3>
                <p className="text-xs text-gray-500 mb-4">Los mejores tours, actividades y entradas</p>
                <div className="carousel-container max-w-[1200px] mx-auto relative">
                    <div ref={experiencesCarouselRef} id="experiences-carousel" className="flex space-x-4 scrollbar-hide pb-2 carousel-content-wrapper overflow-x-auto">
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Visita guiada a la Torre Eiffel', price: 35, img: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/1b/d2/8d.jpg'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/1b/d2/8d.jpg" alt="Experience" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <p className="font-semibold text-gray-900 truncate">Visita guiada a la Torre Eiffel</p>
                                <p className="text-gray-400 text-[9px] mt-0.5">a partir de 35 € por adulto</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Entrada al museo Leonardo da Vinci', price: 10, img: 'https://storage.googleapis.com/a1aa/image/b62daa48-69b3-47ef-2330-e180fe9709a4.jpg'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://storage.googleapis.com/a1aa/image/b62daa48-69b3-47ef-2330-e180fe9709a4.jpg" alt="Experience" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <p className="font-semibold text-gray-900 truncate">Entrada al museo Leonardo da Vinci</p>
                                <p className="text-gray-400 text-[9px] mt-0.5">a partir de 10 € por adulto</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Crucero en barco por Amsterdam', price: 22, img: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/15/70/fa/81.jpg'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/15/70/fa/81.jpg" alt="Experience" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <p className="font-semibold text-gray-900 truncate">Crucero en barco por Amsterdam</p>
                                <p className="text-gray-400 text-[9px] mt-0.5">a partir de 22 € por adulto</p>
                            </div>
                        </Link>
                         <Link to="/product-details" onClick={() => savePropertyData({name: 'Avistamiento de delfines y cuevas', price: 28, img: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/a6/b0/d9.jpg'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/a6/b0/d9.jpg" alt="Experience" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <p className="font-semibold text-gray-900 truncate">Avistamiento de delfines y cuevas</p>
                                <p className="text-gray-400 text-[9px] mt-0.5">a partir de 28 € por adulto</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Tour gastronómico en Roma', price: 85, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/c9/1d/49/caption.jpg?w=300&h=300&s=1'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/c9/1d/49/caption.jpg?w=300&h=300&s=1" alt="Experience" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <p className="font-semibold text-gray-900 truncate">Tour gastronómico en Roma</p>
                                <p className="text-gray-400 text-[9px] mt-0.5">a partir de 85 € por adulto</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Clase de cocina de paella', price: 70, img: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0b/9c/6e/4f.jpg'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0b/9c/6e/4f.jpg" alt="Experience" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <p className="font-semibold text-gray-900 truncate">Clase de cocina de paella</p>
                                <p className="text-gray-400 text-[9px] mt-0.5">a partir de 70 € por adulto</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Paseo en góndola por Venecia', price: 80, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/fb/77/19/porto-di-ouchy.jpg?w=300&h=300&s=1'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/fb/77/19/porto-di-ouchy.jpg?w=300&h=300&s=1" alt="Experience" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <p className="font-semibold text-gray-900 truncate">Paseo en góndola por Venecia</p>
                                <p className="text-gray-400 text-[9px] mt-0.5">a partir de 80 € por adulto</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Tour por el Coliseo y Foro Romano', price: 55, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/70/2f/22/caption.jpg?w=300&h=300&s=1'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/70/2f/22/caption.jpg?w=300&h=300&s=1" alt="Experience" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <p className="font-semibold text-gray-900 truncate">Tour por el Coliseo y Foro Romano</p>
                                <p className="text-gray-400 text-[9px] mt-0.5">a partir de 55 € por adulto</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Excursión al Salto Ángel', price: 450, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/d9/74/1b/the-tribunal-federal.jpg?w=300&h=300&s=1'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/d9/74/1b/the-tribunal-federal.jpg?w=300&h=300&s=1" alt="Experience" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <p className="font-semibold text-gray-900 truncate">Excursión al Salto Ángel</p>
                                <p className="text-gray-400 text-[9px] mt-0.5">a partir de 450 € por adulto</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Buceo en el Archipiélago Los Roques', price: 120, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/04/1f/4d/caption.jpg?w=300&h=300&s=1'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/04/1f/4d/caption.jpg?w=300&h=300&s=1" alt="Experience" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <p className="font-semibold text-gray-900 truncate">Buceo en el Archipiélago Los Roques</p>
                                <p className="text-gray-400 text-[9px] mt-0.5">a partir de 120 € por adulto</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Senderismo en el Monte Roraima', price: 600, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/f9/1c/swiss-alps.jpg?w=1400&h=500&s=1'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/f9/1c/swiss-alps.jpg?w=1400&h=500&s=1" alt="Experience" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <p className="font-semibold text-gray-900 truncate">Senderismo en el Monte Roraima</p>
                                <p className="text-gray-400 text-[9px] mt-0.5">a partir de 600 € por adulto</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Tour del Café en Colombia', price: 40, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/c0/1d/b8/photo0jpg.jpg?w=300&h=300&s=1'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/c0/1d/b8/photo0jpg.jpg?w=300&h=300&s=1" alt="Experience" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <p className="font-semibold text-gray-900 truncate">Tour del Café en Colombia</p>
                                <p className="text-gray-400 text-[9px] mt-0.5">a partir de 40 € por adulto</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Vuelo en globo en Capadocia', price: 150, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/33/a1/30/photo2jpg.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/33/a1/30/photo2jpg.jpg?w=1000&h=-1&s=1" alt="Experience" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <p className="font-semibold text-gray-900 truncate">Vuelo en globo en Capadocia</p>
                                <p className="text-gray-400 text-[9px] mt-0.5">a partir de 150 € por adulto</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Clase de Tango en Buenos Aires', price: 30, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/91/a8/cc/hurawalhi-58-undersea.jpg?w=900&h=500&s=1'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/91/a8/cc/hurawalhi-58-undersea.jpg?w=900&h=500&s=1" alt="Experience" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <p className="font-semibold text-gray-900 truncate">Clase de Tango en Buenos Aires</p>
                                <p className="text-gray-400 text-[9px] mt-0.5">a partir de 30 € por adulto</p>
                            </div>
                        </Link>
                        <Link to="/product-details" onClick={() => savePropertyData({name: 'Safari en el Parque Nacional Kruger', price: 200, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/06/5e/16/romantic-getaway-to-vista.jpg?w=1000&h=-1&s=1'})} className="flex-shrink-0 w-52 rounded-lg overflow-hidden border border-gray-200 text-left interactive-card flex flex-col cursor-pointer">
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/06/5e/16/romantic-getaway-to-vista.jpg?w=1000&h=-1&s=1" alt="Experience" className="w-full h-36 object-cover" />
                            <div className="p-2 text-xs leading-tight flex-grow flex flex-col">
                                <p className="font-semibold text-gray-900 truncate">Safari en el Parque Nacional Kruger</p>
                                <p className="text-gray-400 text-[9px] mt-0.5">a partir de 200 € por adulto</p>
                            </div>
                        </Link>
                         {/* More experiences... */}
                    </div>
                    <button aria-label="Siguiente" onClick={() => scrollCarousel(experiencesCarouselRef, 1)} className="carousel-nav-button right"><i className="fas fa-chevron-right fa-lg"></i></button>
                    <button aria-label="Anterior" onClick={() => scrollCarousel(experiencesCarouselRef, -1)} className="carousel-nav-button left"><i className="fas fa-chevron-left fa-lg"></i></button>
                </div>
            </section>
            
            <section className="max-w-5xl mx-auto my-12 border border-gray-300 rounded-md flex flex-col sm:flex-row overflow-hidden interactive-card">
                <img alt="Mujer usando la app de Guacamayafly en su teléfono" className="w-full sm:w-80 object-cover" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/e0/e7/df/caption.jpg?w=900&h=500&s=1" width="320"/>
                <div className="p-4 flex flex-col justify-center flex-1">
                    <div>
                        <h3 className="text-base font-bold text-gray-900 mb-1">Con la app de Guacamayafly llegarás aún más lejos</h3>
                        <p className="text-xs text-gray-700 mb-2 leading-tight">Ahorra en una selección de hoteles y llévate el doble de puntos por reservar en la app. Con las ofertas de la app, podrás ahorrar y viajar más mientras gestionas todo tu itinerario estés donde estés.</p>
                        <p className="text-xs font-bold text-gray-900">Escanea el código QR con la cámara de tu dispositivo y descarga nuestra app.</p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex justify-end">
                        <img alt="Código QR para descargar la app" className="w-20 h-20" src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" width="80"/>
                    </div>
                </div>
            </section>
        </div>
      </main>

      <footer className="bg-gray-100 mt-12 py-10 text-xs text-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-y-6 gap-x-8">
                <div>
                    <div className="mb-3 font-semibold">Empresa</div>
                    <ul className="space-y-1">
                        <li><a className="hover:underline" href="https://wa.me/5804243156057">Quiénes somos</a></li>
                        <li><a className="hover:underline" href="https://wa.me/5804243156057">Empleo</a></li>
                        <li><a className="hover:underline" href="https://wa.me/5804243156057">Anuncia tu alojamiento</a></li>
                        <li><a className="hover:underline" href="https://wa.me/5804243156057">Publicidad</a></li>
                        <li><a className="hover:underline" href="https://wa.me/5804243156057">Prensa</a></li>
                    </ul>
                </div>
                <div>
                    <div className="mb-3 font-semibold">Búsquedas</div>
                    <ul className="space-y-1">
                        <li><a className="hover:underline" href="https://wa.me/5804243156057">Viajes a España</a></li>
                        <li><a className="hover:underline" href="https://wa.me/5804243156057">Hoteles en España</a></li>
                        <li><a className="hover:underline" href="https://wa.me/5804243156057">Alquileres vacacionales España</a></li>
                        <li><a className="hover:underline" href="https://wa.me/5804243156057">Paquetes de vacaciones baratos</a></li>
                        <li><a className="hover:underline" href="https://wa.me/5804243156057">Vuelos baratos en España</a></li>
                        <li><a className="hover:underline" href="https://wa.me/5804243156057">Alquiler de coches en España</a></li>
                        <li><a className="hover:underline" href="https://wa.me/5804243156057">Todos los alojamientos</a></li>
                        <li><a className="hover:underline" href="https://wa.me/5804243156057">Guacamayafly Explore</a></li>
                    </ul>
                </div>
                <div>
                    <div className="mb-3 font-semibold">Políticas</div>
                    <ul className="space-y-1">
                        <li><a className="hover:underline" href="https://wa.me/5804243156057">Términos y condiciones generales (excepto para reservas de Vrbo)</a></li>
                        <li><a className="hover:underline" href="https://wa.me/5804243156057">Términos y condiciones de Vrbo</a></li>
                        <li><a className="hover:underline" href="https://wa.me/5804243156057">Privacidad</a></li>
                        <li><a className="hover:underline" href="https://wa.me/5804243156057">Cookies</a></li>
                        <li><a className="hover:underline" href="https://wa.me/5804243156057">Condiciones de uso</a></li>
                        <li><a className="hover:underline" href="https://wa.me/5804243156057">Información legal/contacto</a></li>
                        <li><a className="hover:underline" href="https://wa.me/5804243156057">Pautas sobre el contenido y cómo denunciar contenido</a></li>
                    </ul>
                </div>
                <div>
                    <div className="mb-3 font-semibold">Ayuda</div>
                    <ul className="space-y-1">
                        <li><a className="hover:underline" href="https://wa.me/5804243156057">Ayuda</a></li>
                        <li><a className="hover:underline" href="https://wa.me/5804243156057">Cancelar un vuelo</a></li>
                        <li><a className="hover:underline" href="https://wa.me/5804243156057">Cancelar una reserva de hotel o de un alquiler vacacional</a></li>
                        <li><a className="hover:underline" href="https://wa.me/5804243156057">Plazos de reembolso</a></li>
                        <li><a className="hover:underline" href="https://wa.me/5804243156057">Utilizar un cupón de Guacamayafly</a></li>
                        <li><a className="hover:underline" href="https://wa.me/5804243156057">Documentos para viajes internacionales</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 text-center text-[9px] text-gray-600">
                El sitio web de Guacamayafly.es permite pagar con American Express, Diner's Club International, MasterCard, Visa, Visa Electron, CartSsi, Carte Bleue y PayPal.
            </div>
        </div>
    </footer>
    
    <button aria-label="Ayuda" className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-full px-3 py-1 text-xs text-gray-700 shadow-md hover:bg-gray-50 flex items-center space-x-1" onClick={() => window.location.href='https://wa.me/5804243156057'}>
        <span>Ayuda</span>
        <i className="fas fa-question-circle"></i>
    </button>

    </div>
  );
};

export default Home;
