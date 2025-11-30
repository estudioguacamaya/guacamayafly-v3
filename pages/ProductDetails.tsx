import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductDetails: React.FC = () => {
    const navigate = useNavigate();
    const [isOffersOpen, setIsOffersOpen] = useState(false);
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const [isReviewsOpen, setIsReviewsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const handleBookNow = () => {
        // Redirigir al checkout con datos de prueba
        sessionStorage.setItem('hotelBookingDetails', JSON.stringify({
            hotelId: 11,
            hotelName: 'Hotel Victoria 4 Puerta del Sol',
            hotelImage: 'https://storage.googleapis.com/a1aa/image/7be15fdb-6ab0-4bd0-6612-8e0b7f8750f4.jpg',
            hotelLocation: 'Madrid, España',
            price: 150,
            checkin: new Date().toISOString().split('T')[0],
            checkout: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
            adults: 2,
            children: 0
        }));
        navigate('/checkout');
    };

    return (
        <div className="bg-gray-50 pb-24 md:pb-0 font-poppins text-[#1a203c]">
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div id="mobile-menu-overlay" className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)}></div>
            )}

            {/* Mobile Menu */}
            <div id="mobile-menu" className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-lg p-6 z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-2">
                        <img alt="Logo Guacamayafly" height="32" src="https://guacamayafly.vercel.app/logo.svg" width="32" />
                        <span className="font-extrabold text-lg select-none text-guacamayafly-orange">UACAMAYAFLY</span>
                    </div>
                    <button id="close-mobile-menu" className="text-2xl" onClick={() => setIsMobileMenuOpen(false)}>&times;</button>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-2 font-semibold mb-4" type="button">Iniciar sesión</button>
                <nav className="flex flex-col space-y-4">
                    <a href="#" className="text-gray-700 hover:text-guacamayafly-orange">Escribe una opinión</a>
                    <a href="#" className="text-gray-700 hover:text-guacamayafly-orange">Viajes</a>
                    <hr />
                    <h3 className="font-semibold text-gray-500 uppercase text-sm pt-2">Categorías</h3>
                    <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-guacamayafly-orange"><i className="fas fa-building w-5"></i> Hoteles</a>
                    <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-guacamayafly-orange"><i className="fas fa-star w-5"></i> Cosas que hacer</a>
                    <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-guacamayafly-orange"><i className="fas fa-utensils w-5"></i> Restaurantes</a>
                    <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-guacamayafly-orange"><i className="fas fa-plane w-5"></i> Vuelos</a>
                    <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-guacamayafly-orange"><i className="fas fa-house-user w-5"></i> Alquileres vacacionales</a>
                    <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-guacamayafly-orange"><i className="fas fa-ship w-5"></i> Cruceros</a>
                    <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-guacamayafly-orange"><i className="fas fa-car w-5"></i> Coches de alquiler</a>
                    <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-guacamayafly-orange"><i className="far fa-comments w-5"></i> Foros</a>
                </nav>
            </div>

            <header className="bg-white shadow-sm sticky top-0 z-40">
                {/* Top bar */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between h-16 md:hidden">
                        <div className="flex items-center gap-2">
                            <button id="hamburger-btn" className="text-gray-800" onClick={() => setIsMobileMenuOpen(true)}><i className="fas fa-bars fa-lg"></i></button>
                            <div onClick={() => navigate('/')} className="cursor-pointer">
                                <img src="https://guacamayafly.vercel.app/logo.svg" alt="Guacamayafly Logo" className="h-8 w-auto" />
                            </div>
                        </div>
                        <div className="flex-1 mx-4">
                            <div className="relative">
                                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input type="search" placeholder="Buscar" className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-full bg-gray-100 text-sm focus:bg-white" />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button className="bg-blue-600 rounded-full h-8 w-8 flex items-center justify-center">
                                <i className="fas fa-user text-white"></i>
                            </button>
                        </div>
                    </div>
                    {/* Desktop Header */}
                    <div className="hidden md:flex items-center justify-between h-16">
                        <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer">
                            <img src="https://guacamayafly.vercel.app/logo.svg" alt="Guacamayafly Logo" className="h-8 w-auto" />
                            <span className="font-extrabold text-xl select-none text-guacamayafly-orange">
                                UACAMAYAFLY</span>
                        </div>
                        <div className="flex-1 max-w-lg mx-8">
                            <div className="relative">
                                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input type="search" placeholder="Buscar" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-white focus:ring-2 focus:ring-guacamayafly-orange focus:border-transparent transition" />
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm font-semibold">
                            <a href="#" className="text-gray-700 hover:text-black">Descubrir</a>
                            <a href="#" className="text-gray-700 hover:text-black">Viajes</a>
                            <a href="#" className="text-gray-700 hover:text-black">Opinión</a>
                            <a href="#" className="text-gray-700 hover:text-black flex items-center gap-1"><i className="fas fa-globe"></i> EUR</a>
                            <button className="bg-gray-800 hover:bg-black text-white rounded-full px-4 py-2 text-sm font-semibold" type="button">Iniciar sesión</button>
                        </div>
                    </div>
                </div>
                {/* Bottom bar (Categories) */}
                <nav className="bg-white border-t hidden md:block">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-6">
                        <a href="#" className="flex items-center gap-2 py-3 text-sm font-semibold text-gray-600 hover:text-black border-b-2 border-transparent hover:border-black"><i className="fas fa-map-marker-alt"></i> Madrid</a>
                        <a href="#" className="flex items-center gap-2 py-3 text-sm font-semibold text-black border-b-2 border-black"><i className="fas fa-building"></i> Hoteles</a>
                        <a href="#" className="flex items-center gap-2 py-3 text-sm font-semibold text-gray-600 hover:text-black border-b-2 border-transparent hover:border-black"><i className="fas fa-star"></i> Cosas que hacer</a>
                        <a href="#" className="flex items-center gap-2 py-3 text-sm font-semibold text-gray-600 hover:text-black border-b-2 border-transparent hover:border-black"><i className="fas fa-utensils"></i> Restaurantes</a>
                        <a href="#" className="flex items-center gap-2 py-3 text-sm font-semibold text-gray-600 hover:text-black border-b-2 border-transparent hover:border-black"><i className="fas fa-plane"></i> Vuelos</a>
                        <a href="#" className="flex items-center gap-2 py-3 text-sm font-semibold text-gray-600 hover:text-black border-b-2 border-transparent hover:border-black"><i className="fas fa-house-user"></i> Alquileres vacacionales</a>
                        <a href="#" className="flex items-center gap-2 py-3 text-sm font-semibold text-gray-600 hover:text-black border-b-2 border-transparent hover:border-black"><i className="fas fa-ship"></i> Cruceros</a>
                        <a href="#" className="flex items-center gap-2 py-3 text-sm font-semibold text-gray-600 hover:text-black border-b-2 border-transparent hover:border-black"><i className="fas fa-car"></i> Coches de alquiler</a>
                        <a href="#" className="flex items-center gap-2 py-3 text-sm font-semibold text-gray-600 hover:text-black border-b-2 border-transparent hover:border-black"><i className="far fa-comments"></i> Foros</a>
                    </div>
                </nav>
            </header>

            {/* Sticky Section Nav */}
            <nav id="section-nav" className="sticky-nav sticky top-[64px] z-30 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-4 overflow-x-auto">
                    <a href="#photo-gallery-section" className="active py-3 px-4 font-medium text-gray-600 hover:text-black border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap">Fotos</a>
                    <a href="#booking-section" className="py-3 px-4 font-medium text-gray-600 hover:text-black border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap">Reservar</a>
                    <a href="#information" className="py-3 px-4 font-medium text-gray-600 hover:text-black border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap">Información</a>
                    <a href="#location" className="py-3 px-4 font-medium text-gray-600 hover:text-black border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap">Ubicación</a>
                    <a href="#reviews" className="py-3 px-4 font-medium text-gray-600 hover:text-black border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap">Opiniones</a>
                    <a href="#faq" className="py-3 px-4 font-medium text-gray-600 hover:text-black border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap">Preguntas</a>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                {/* Back to list + Share/Fav */}
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => navigate('/')} className="back-button text-sm flex items-center gap-2 font-medium text-gray-600 hover:text-black">
                        <i className="fas fa-chevron-left text-sm"></i>
                        <span id="back-button-text">Ver todos los hoteles en Madrid</span>
                    </button>
                    <div className="flex items-center space-x-2">
                        <button className="action-icon bg-white border border-gray-200 rounded-full w-9 h-9 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-transform hover:scale-105" aria-label="Compartir"><i className="fa-solid fa-arrow-up-from-bracket"></i></button>
                        <button className="action-icon bg-white border border-gray-200 rounded-full w-9 h-9 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-transform hover:scale-105" aria-label="Añadir a favoritos"><i className="far fa-heart"></i></button>
                    </div>
                </div>

                <div className="md:hidden">
                    <h1 id="mobile-hotel-name" className="text-2xl font-bold text-gray-900 mb-1">Hotel Victoria 4 Puerta del Sol</h1>
                    <a href="#reviews" id="mobile-reviews-link" className="text-sm text-gray-600 hover:underline">(1034 opiniones)</a>
                    <div className="relative w-full h-64 rounded-lg overflow-hidden my-4 cursor-pointer">
                        <img id="mobile-main-image" src="https://storage.googleapis.com/a1aa/image/7be15fdb-6ab0-4bd0-6612-8e0b7f8750f4.jpg" alt="Fachada del hotel" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="hidden md:block">
                    <h1 id="desktop-hotel-name" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Hotel Victoria 4 Puerta del Sol</h1>
                    <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-3 gap-y-1 mb-4">
                        <a href="#reviews" id="desktop-reviews-link" className="text-guacamayafly-orange hover:underline">(1034 opiniones)</a>
                        <span>·</span>
                        <span id="desktop-hotel-location">Madrid, España</span>
                    </div>
                </div>

                <section id="photo-gallery-section" className="mb-8 hidden md:grid grid-cols-3 gap-2 h-96">
                    <div className="col-span-2 row-span-2 rounded-lg overflow-hidden cursor-pointer">
                        <img id="desktop-main-image" src="https://storage.googleapis.com/a1aa/image/7be15fdb-6ab0-4bd0-6612-8e0b7f8750f4.jpg" alt="Habitación de hotel con vistas a la ciudad" className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-lg overflow-hidden cursor-pointer"><img id="desktop-sub-image1" src="https://storage.googleapis.com/a1aa/image/49e5886d-2903-48c5-3649-78607fede91a.jpg" alt="Viajero en el hotel" className="w-full h-full object-cover" /></div>
                    <div className="rounded-lg overflow-hidden cursor-pointer"><img id="desktop-sub-image2" src="https://storage.googleapis.com/a1aa/image/ee5c710a-dee9-4dce-b960-ac814d36ff0d.jpg" alt="Suite del hotel" className="w-full h-full object-cover" /></div>
                </section>

                <section id="booking-section" className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-8">
                    <h2 className="font-bold text-lg md:text-xl mb-3 md:mb-4">Consulte los precios para las fechas de su viaje</h2>
                    <div className="flex flex-col sm:flex-row border border-gray-200 rounded-lg mb-4">
                        <div id="checkin-checkout-trigger" className="w-full sm:w-1/2 flex justify-between items-center p-3 text-left hover:bg-gray-50 cursor-pointer">
                            <div className="flex-1">
                                <span className="text-xs font-semibold text-gray-500">Llegada</span>
                                <p id="main-checkin-display" className="font-semibold text-gray-900">Añadir fecha</p>
                            </div>
                            <div className="flex-1 text-right">
                                <span className="text-xs font-semibold text-gray-500">Salida</span>
                                <p id="main-checkout-display" className="font-semibold text-gray-900">Añadir fecha</p>
                            </div>
                        </div>
                        <div id="guests-trigger" className="w-full sm:w-1/2 flex items-center justify-between p-3 text-left hover:bg-gray-50 relative border-t sm:border-t-0 sm:border-l border-gray-200 cursor-pointer">
                            <div>
                                <span className="text-xs font-semibold text-gray-500">Habitaciones/Huéspedes</span>
                                <p id="main-guests-display" className="font-semibold text-gray-900">1 habitación, 2 adultos</p>
                            </div>
                            <i className="fas fa-chevron-down text-gray-500 text-sm"></i>
                        </div>
                    </div>
                    <div className="border-t my-4"></div>
                    <div>
                        <h3 className="font-semibold text-md mb-3">Reservo directamente con el hotel</h3>
                        <div className="flex flex-col sm:flex-row justify-between items-center border border-gray-200 p-3 rounded-lg gap-3">
                            <div className="flex items-center gap-3">
                                <i className="fas fa-globe text-gray-500"></i>
                                <div>
                                    <p className="font-semibold text-sm">Sitio web oficial</p>
                                    <p className="text-xs text-gray-500"><i className="fas fa-check text-brand-green mr-1"></i>Sin pago por adelantado</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p id="direct-booking-price" className="font-bold text-lg">150 €</p>
                            </div>
                            <button id="book-direct-btn" onClick={handleBookNow} className="bg-guacamayafly-orange text-white font-bold py-2 px-4 rounded-lg hover:bg-guacamayafly-dark-orange w-full sm:w-auto animate-pulse">Reservar</button>
                        </div>
                    </div>
                    <div className="space-y-3 mt-6">
                        <h3 className="font-semibold text-md">Ofertas destacadas</h3>
                        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center border border-gray-200 p-3 rounded-lg gap-2">
                            <div className="w-full sm:w-auto text-center sm:text-left"><img src="https://www.expedia.es/_dms/header/logo.svg?locale=es_ES&siteid=9&2&6f9ec7db" alt="Booking.com" className="h-4 mx-auto sm:mx-0" /></div>
                            <div className="w-full sm:w-auto text-center sm:text-right"><p className="font-bold text-lg">168 €</p></div>
                            <a href="#" className="bg-brand-green text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 w-full sm:w-auto text-center">Ver oferta</a>
                        </div>
                        <div id="hidden-offers" className={`accordion-content space-y-3 pt-3 ${isOffersOpen ? 'open' : ''}`} style={{ maxHeight: isOffersOpen ? '1000px' : '0', overflow: 'hidden', transition: 'max-height 0.5s ease-out' }}>
                            <div className="flex flex-wrap sm:flex-nowrap justify-between items-center border border-gray-200 p-3 rounded-lg gap-2">
                                <div className="w-full sm:w-auto text-center sm:text-left"><img src="https://www.expedia.es/_dms/header/logo.svg?locale=es_ES&siteid=9&2&6f9ec7db" alt="Expedia" className="h-5 mx-auto sm:mx-0" /></div>
                                <div className="w-full sm:w-auto text-center sm:text-right"><p className="font-bold text-lg">190 €</p></div>
                                <a href="#" className="bg-brand-green text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 w-full sm:w-auto text-center">Ver oferta</a>
                            </div>
                        </div>
                        <button id="toggle-offers-btn" onClick={() => setIsOffersOpen(!isOffersOpen)} className="text-sm font-semibold w-full text-left hover:text-black">
                            {isOffersOpen ? 'Ocultar ofertas' : 'Ver todas las ofertas'} <i className={`accordion-arrow fas fa-chevron-${isOffersOpen ? 'up' : 'down'} ml-1 text-xs`}></i>
                        </button>
                    </div>
                </section>

                <section id="information" className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Información</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <div className="flex items-start mb-6">
                                <div className="text-center mr-6">
                                    <p id="info-rating-value" className="text-5xl font-bold text-brand-green">3.9</p>
                                    <p className="font-semibold">Bueno</p>
                                    <div id="info-rating-dots" className="rating-dots mt-1">
                                        <span className="filled"></span><span className="filled"></span><span className="filled"></span><span className="filled"></span><span></span>
                                    </div>
                                    <p id="info-reviews-count" className="text-sm text-gray-500 mt-1">(1034 opiniones)</p>
                                </div>
                                <div className="w-full flex-1 grid grid-cols-1 gap-y-2">
                                    <div><p className="font-semibold text-sm">Ubicación</p><div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-brand-green h-1.5 rounded-full" style={{ width: '98%' }}></div></div></div>
                                    <div><p className="font-semibold text-sm">Limpieza</p><div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-brand-green h-1.5 rounded-full" style={{ width: '94%' }}></div></div></div>
                                    <div><p className="font-semibold text-sm">Servicio</p><div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-brand-green h-1.5 rounded-full" style={{ width: '80%' }}></div></div></div>
                                    <div><p className="font-semibold text-sm">Calidad/precio</p><div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-brand-green h-1.5 rounded-full" style={{ width: '88%' }}></div></div></div>
                                </div>
                            </div>
                            <p id="hotel-description" className="text-gray-700 leading-relaxed text-sm">
                                {isDescriptionOpen ? "DESPIÉRTATE EN LA PUERTA DEL SOL. Dormir junto a la Puerta del Sol, una de las plazas más populares del mundo, es uno de los muchos lujos que te ofrece el Hotel Victoria 4. Disfruta de la mejor ubicación para explorar Madrid, con habitaciones cómodas y un servicio excelente que hará de tu estancia algo inolvidable." : "DESPIÉRTATE EN LA PUERTA DEL SOL. Dormir junto a la Puerta del Sol, una de las plazas más populares del mundo, es uno de los muchos lujos que te ofrece el Hotel Victoria 4..."}
                            </p>
                            <button id="toggle-description" onClick={() => setIsDescriptionOpen(!isDescriptionOpen)} className="text-sm font-semibold mt-4 hover:underline">
                                {isDescriptionOpen ? 'Leer menos' : 'Leer más'} <i className={`fas fa-chevron-${isDescriptionOpen ? 'up' : 'down'} ml-1 text-xs`}></i>
                            </button>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-4">Servicios de la propiedad</h3>
                            <div className="flex flex-wrap gap-3 text-sm">
                                <div className="attribute-pill flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-lg"><i className="fas fa-parking text-gray-600"></i><span>Aparcamiento</span></div>
                                <div className="attribute-pill flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-lg"><i className="fas fa-wifi text-gray-600"></i><span>Wifi gratis</span></div>
                                <div className="attribute-pill flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-lg"><i className="fas fa-dumbbell text-gray-600"></i><span>Gimnasio</span></div>
                                <div className="attribute-pill flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-lg"><i className="fas fa-utensils text-gray-600"></i><span>Restaurante</span></div>
                                <div className="attribute-pill flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-lg"><i className="fas fa-child text-gray-600"></i><span>Ideal para niños</span></div>
                                <div className="attribute-pill flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-lg"><i className="fas fa-paw text-gray-600"></i><span>Admite mascotas</span></div>
                            </div>
                            <button className="text-sm font-semibold mt-4 hover:underline">Mostrar más <i className="fas fa-chevron-down ml-1 text-xs"></i></button>

                            <h3 className="font-semibold text-gray-800 mb-4 mt-6">Servicios de habitación</h3>
                            <div className="flex flex-wrap gap-3 text-sm">
                                <div className="attribute-pill flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-lg"><i className="fas fa-moon text-gray-600"></i><span>Cortinas opacas</span></div>
                                <div className="attribute-pill flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-lg"><i className="fas fa-desktop text-gray-600"></i><span>Mesa de escritorio</span></div>
                                <div className="attribute-pill flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-lg"><i className="fas fa-snowflake text-gray-600"></i><span>Aire acondicionado</span></div>
                                <div className="attribute-pill flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-lg"><i className="fas fa-concierge-bell text-gray-600"></i><span>Servicio de habitaciones</span></div>
                                <div className="attribute-pill flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-lg"><i className="fas fa-tv text-gray-600"></i><span>Televisor de pantalla plana</span></div>
                                <div className="attribute-pill flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-lg"><i className="fas fa-bath text-gray-600"></i><span>Bañera/ducha</span></div>
                            </div>
                            <button className="text-sm font-semibold mt-4 hover:underline">Mostrar más <i className="fas fa-chevron-down ml-1 text-xs"></i></button>

                            <h3 className="font-semibold text-gray-800 mb-4 mt-6">Tipos de habitación</h3>
                            <div className="flex flex-wrap gap-3 text-sm">
                                <div className="attribute-pill flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-lg"><i className="fas fa-city text-gray-600"></i><span>Vistas a la ciudad</span></div>
                                <div className="attribute-pill flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-lg"><i className="fas fa-bed text-gray-600"></i><span>Suites</span></div>
                                <div className="attribute-pill flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-lg"><i className="fas fa-ban text-gray-600"></i><span>Habitaciones de no fumadores</span></div>
                                <div className="attribute-pill flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-lg"><i className="fas fa-users text-gray-600"></i><span>Habitaciones para familias</span></div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="location" className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Ubicación</h2>
                    <p id="location-address" className="text-sm text-gray-600 mb-4 flex items-center gap-2"><i className="fas fa-map-marker-alt"></i><span>Calle de Victoria 4, 28012 Madrid España</span></p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1 h-96 rounded-lg overflow-hidden relative">
                            <img id="location-map-image" src="https://motor.elpais.com/wp-content/uploads/2022/01/google-maps-22.jpg" alt="Mapa de ubicación" className="w-full h-full object-cover object-center" />
                            <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow-md">
                                <h4 id="map-hotel-name" className="font-bold text-sm">Hotel Victoria 4 Puerta del Sol</h4>
                                <div id="map-hotel-rating" className="flex items-center text-xs">
                                    <div className="rating-dots mr-2">
                                        <span className="filled"></span><span className="filled"></span><span className="filled"></span><span className="filled"></span><span></span>
                                    </div> 
                                    <span>(1034)</span>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold mb-3">Cómo llegar</h3>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 rounded-full border-4 border-brand-green flex items-center justify-center text-2xl font-bold text-brand-green">100</div>
                                    <p className="text-sm font-semibold">Fantástico para moverse a pie</p>
                                </div>
                                <div className="text-sm space-y-3">
                                    <p><i className="fas fa-plane w-5 text-center mr-2 text-gray-500"></i>Aeropuerto de Madrid-Barajas (14.3 km)</p>
                                    <p><i className="fas fa-train w-5 text-center mr-2 text-gray-500"></i>Vodafone Sol (3 min)</p>
                                    <p><i className="fas fa-train w-5 text-center mr-2 text-gray-500"></i>Sevilla (4 min)</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-3">Qué hay cerca</h3>
                                <div id="nearby-places" className="text-sm space-y-3">
                                    <div className="flex items-center gap-2"><img width="20" height="20" src="https://static.tacdn.com/img2/hsx/icons/Restaurants.svg" /> <span id="nearby-restaurants">893 restaurantes en 0,5 km</span></div>
                                    <div className="flex items-center gap-2"><img width="20" height="20" src="https://static.tacdn.com/img2/hsx/icons/Attractions.svg" /> <span id="nearby-attractions">328 atracciones en 0,5 km</span></div>
                                </div>
                                <button className="text-sm font-semibold mt-4 hover:underline">Ver todos los restaurantes cercanos <i className="fas fa-chevron-right ml-1 text-xs"></i></button>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="reviews" className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Opiniones</h2>
                    <div id="reviews-container" className="space-y-6">
                        <div className="border-b pb-4">
                            <div className="review-item-header py-2 flex justify-between items-center cursor-pointer">
                                <div className="flex items-center">
                                    <div className="rating-dots mr-2">
                                        <span className="filled"></span><span className="filled"></span><span className="filled"></span><span className="filled"></span><span className="filled"></span>
                                    </div>
                                    <span className="font-semibold text-sm">Ubicación inmejorable</span>
                                </div>
                                <i className="fas fa-chevron-down review-arrow text-gray-500"></i>
                            </div>
                            <div className="review-item-body">
                                <p className="text-gray-700 text-sm mb-2">Excelente hotel justo en el corazón de Madrid. Todo está a poca distancia a pie. Las habitaciones son cómodas y limpias.</p>
                                <p className="text-xs text-gray-500">Por Sofía P. - 05 de Julio, 2025</p>
                            </div>
                        </div>
                        <div className="border-b pb-4">
                            <div className="review-item-header py-2 flex justify-between items-center cursor-pointer">
                                <div className="flex items-center">
                                    <div className="rating-dots mr-2">
                                        <span className="filled"></span><span className="filled"></span><span className="filled"></span><span className="filled"></span><span></span>
                                    </div>
                                    <span className="font-semibold text-sm">Buen valor</span>
                                </div>
                                <i className="fas fa-chevron-down review-arrow text-gray-500"></i>
                            </div>
                            <div className="review-item-body">
                                <p className="text-gray-700 text-sm mb-2">Para el precio y la ubicación, es una opción fantástica. El personal es muy amable y servicial. Volvería a hospedarme aquí.</p>
                                <p className="text-xs text-gray-500">Por Martín L. - 20 de Junio, 2025</p>
                            </div>
                        </div>
                        {isReviewsOpen && (
                            <>
                                <div className="border-b pb-4">
                                    <div className="review-item-header py-2 flex justify-between items-center cursor-pointer">
                                        <div className="flex items-center">
                                            <div className="rating-dots mr-2">
                                                <span className="filled"></span><span className="filled"></span><span className="filled"></span><span></span><span></span>
                                            </div>
                                            <span className="font-semibold text-sm">Un poco ruidoso</span>
                                        </div>
                                        <i className="fas fa-chevron-down review-arrow text-gray-500"></i>
                                    </div>
                                    <div className="review-item-body">
                                        <p className="text-gray-700 text-sm mb-2">La ubicación es genial, pero al estar tan céntrico, puede ser un poco ruidoso por la noche. Las ventanas no aíslan mucho el sonido.</p>
                                        <p className="text-xs text-gray-500">Por Elena R. - 10 de Junio, 2025</p>
                                    </div>
                                </div>
                                <div className="border-b pb-4">
                                    <div className="review-item-header py-2 flex justify-between items-center cursor-pointer">
                                        <div className="flex items-center">
                                            <div className="rating-dots mr-2">
                                                <span className="filled"></span><span className="filled"></span><span className="filled"></span><span className="filled"></span><span></span>
                                            </div>
                                            <span className="font-semibold text-sm">Céntrico y práctico</span>
                                        </div>
                                        <i className="fas fa-chevron-down review-arrow text-gray-500"></i>
                                    </div>
                                    <div className="review-item-body">
                                        <p className="text-gray-700 text-sm mb-2">Ideal para una escapada a Madrid. Cerca de todo, transporte público, restaurantes y tiendas. El desayuno es sencillo pero suficiente.</p>
                                        <p className="text-xs text-gray-500">Por Diego M. - 01 de Junio, 2025</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <button id="toggle-reviews-btn" onClick={() => setIsReviewsOpen(!isReviewsOpen)} className="text-sm font-semibold mt-4 hover:underline">
                        {isReviewsOpen ? 'Ver menos opiniones' : 'Ver todas las opiniones'} <i className={`review-arrow fas fa-chevron-${isReviewsOpen ? 'up' : 'down'} ml-1 text-xs`}></i>
                    </button>
                </section>

                <section id="faq" className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Preguntas frecuentes</h2>
                    <div id="faq-container" className="space-y-4">
                        {[
                            { q: "¿Qué atracciones populares hay cerca de Hotel Victoria 4 Puerta del Sol?", a: "Algunas atracciones cercanas son Calle 365 (0,2 km), The PubCrawl Company (0,3 km) y Madrid Urban Vibes Experiences (0,1 km)." },
                            { q: "¿Cuáles son algunos de los servicios del alojamiento Hotel Victoria 4 Puerta del Sol?", a: "Algunos de los servicios más populares que se ofrecen son wifi gratuito, restaurante y bar." },
                            { q: "¿Qué servicios de habitaciones hay disponibles en Hotel Victoria 4 Puerta del Sol?", a: "Algunos de los servicios de habitaciones son minibar, aire acondicionado y televisor de pantalla plana." },
                            { q: "¿Qué opciones de comida y bebida hay disponibles en Hotel Victoria 4 Puerta del Sol?", a: "Los huéspedes pueden disfrutar de restaurante, bar y desayuno durante su estancia." }
                        ].map((item, index) => (
                            <div key={index} className="border-b">
                                <div className="faq-item-header py-4 flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(index)}>
                                    <h3 className="font-semibold text-gray-800">{item.q}</h3>
                                    <i className={`fas fa-chevron-down faq-arrow text-gray-500 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}></i>
                                </div>
                                <div className={`faq-item-body pb-4 overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'max-h-screen' : 'max-h-0'}`}>
                                    <p className="text-gray-600 text-sm">{item.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
            
            <footer className="bg-gray-100 mt-12 py-10 text-xs text-blue-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-y-6 gap-x-8">
                        <div>
                            <div className="mb-3 font-semibold">Empresa</div>
                            <ul className="space-y-1">
                                <li><a className="hover:underline" href="#">Quiénes somos</a></li>
                                <li><a className="hover:underline" href="#">Empleo</a></li>
                                <li><a className="hover:underline" href="#">Anuncia tu alojamiento</a></li>
                                <li><a className="hover:underline" href="#">Publicidad</a></li>
                                <li><a className="hover:underline" href="#">Prensa</a></li>
                            </ul>
                        </div>
                        <div>
                            <div className="mb-3 font-semibold">Búsquedas</div>
                            <ul className="space-y-1">
                                <li><a className="hover:underline" href="#">Viajes a España</a></li>
                                <li><a className="hover:underline" href="#">Hoteles en España</a></li>
                                <li><a className="hover:underline" href="#">Alquileres vacacionales España</a></li>
                                <li><a className="hover:underline" href="#">Paquetes de vacaciones baratos</a></li>
                                <li><a className="hover:underline" href="#">Vuelos baratos en España</a></li>
                                <li><a className="hover:underline" href="#">Alquiler de coches en España</a></li>
                                <li><a className="hover:underline" href="#">Todos los alojamientos</a></li>
                                <li><a className="hover:underline" href="#">Guacamayafly Explore</a></li>
                            </ul>
                        </div>
                        <div>
                            <div className="mb-3 font-semibold">Políticas</div>
                            <ul className="space-y-1">
                                <li><a className="hover:underline" href="#">Términos y condiciones generales</a></li>
                                <li><a className="hover:underline" href="#">Términos y condiciones de Vrbo</a></li>
                                <li><a className="hover:underline" href="#">Privacidad</a></li>
                                <li><a className="hover:underline" href="#">Cookies</a></li>
                                <li><a className="hover:underline" href="#">Condiciones de uso</a></li>
                                <li><a className="hover:underline" href="#">Información legal/contacto</a></li>
                                <li><a className="hover:underline" href="#">Pautas sobre el contenido</a></li>
                            </ul>
                        </div>
                        <div>
                            <div className="mb-3 font-semibold">Ayuda</div>
                            <ul className="space-y-1">
                                <li><a className="hover:underline" href="#">Ayuda</a></li>
                                <li><a className="hover:underline" href="#">Cancelar un vuelo</a></li>
                                <li><a className="hover:underline" href="#">Cancelar una reserva</a></li>
                                <li><a className="hover:underline" href="#">Plazos de reembolso</a></li>
                                <li><a className="hover:underline" href="#">Utilizar un cupón</a></li>
                                <li><a className="hover:underline" href="#">Documentos de viaje</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-[9px] text-gray-600">
                        El sitio web de Guacamayafly.es permite pagar con American Express, Diner's Club International, MasterCard, Visa, Visa Electron, CartSsi, Carte Bleue y PayPal.
                    </div>
                </div>
            </footer>

            {/* Barra de reserva sticky para móvil */}
            <div id="sticky-footer-mobile" className="sticky-footer-mobile md:hidden flex items-center justify-between px-4 fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 z-40 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
                <div>
                    <p id="sticky-footer-price" className="font-bold text-lg">150 €</p>
                    <a href="#" className="text-xs text-brand-green font-semibold hover:underline">Ver detalles</a>
                </div>
                <button id="sticky-footer-offer-btn" onClick={handleBookNow} className="bg-brand-green text-white font-bold py-2 px-4 rounded-full hover:opacity-90 w-auto">Reservar</button>
            </div>

            {/* Barra de reserva sticky para desktop */}
            <div id="sticky-footer-desktop" className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 shadow-lg z-40 hidden md:flex items-center justify-center">
                <div className="max-w-7xl w-full flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">Precio por noche</p>
                        <p id="sticky-footer-price-desktop" className="font-bold text-2xl text-gray-900">150 €</p>
                        <a href="#" className="text-sm text-brand-green font-semibold hover:underline">Ver detalles de precios</a>
                    </div>
                    <button id="book-now-desktop-btn" onClick={handleBookNow} className="bg-brand-green text-white font-bold py-3 px-8 rounded-full hover:opacity-90 text-lg">Reservar ahora</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
