
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingDetails } from '../types';

const Checkout: React.FC = () => {
    const navigate = useNavigate();
    const [booking, setBooking] = useState<any>(null);
    const [step, setStep] = useState(1);
    const [timeLeft, setTimeLeft] = useState(1194); // 19:54 in seconds
    const [paymentMethod, setPaymentMethod] = useState<'whatsapp' | 'card' | 'crypto' | null>(null);

    // --- 1. RECUPERACIÓN DE DATOS ---
    useEffect(() => {
        // Prioridad de carga: 1. Hotel específico, 2. Vuelo, 3. Propiedad genérica (Home)
        const hotelStored = sessionStorage.getItem('hotelBookingDetails');
        const flightStored = sessionStorage.getItem('currentFlightBooking');
        const propertyStored = sessionStorage.getItem('selectedPropertyData');

        if (hotelStored) {
            setBooking(JSON.parse(hotelStored));
        } else if (flightStored) {
            const flight = JSON.parse(flightStored);
            setBooking({
                hotelName: `${flight.carrier} Flight`,
                hotelImage: 'https://images.kiwi.com/airlines/64/IB.png', // Placeholder airline logo
                hotelLocation: `${flight.flight.itineraries[0].segments[0].departure.iataCode} -> ${flight.flight.itineraries[0].segments[flight.flight.itineraries[0].segments.length-1].arrival.iataCode}`,
                price: flight.finalPrice.toFixed(2),
                checkin: new Date(flight.flight.itineraries[0].segments[0].departure.at).toLocaleDateString(),
                checkout: 'N/A',
                adults: 1,
                children: 0
            });
        } else if (propertyStored) {
            const prop = JSON.parse(propertyStored);
            setBooking({
                hotelName: prop.name,
                hotelImage: prop.img || prop.image,
                hotelLocation: 'Ubicación seleccionada',
                price: prop.price,
                checkin: new Date().toLocaleDateString(),
                checkout: new Date(Date.now() + 86400000 * 2).toLocaleDateString(), // +2 days
                adults: 2,
                children: 0
            });
        } else {
            // Fallback visual para evitar página rota si se accede directo
            setBooking({
                hotelName: 'Hotel Victoria 4 Puerta del Sol',
                hotelImage: 'https://placehold.co/80x80/cccccc/ffffff?text=Hotel',
                hotelLocation: 'Madrid, España',
                price: 150,
                checkin: '12/12/2025',
                checkout: '14/12/2025',
                adults: 2,
                children: 0
            });
        }
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleNextStep = () => {
        if (step === 1) {
            // Aquí iría validación del formulario
            setStep(2);
            window.scrollTo(0, 0);
        } else if (step === 2) {
            if (!paymentMethod) {
                alert("Por favor selecciona un método de pago");
                return;
            }
            if (paymentMethod === 'whatsapp') {
                window.open(`https://wa.me/5804243156057?text=Hola, deseo confirmar mi reserva para ${booking?.hotelName}. Precio: ${booking?.price}€`, '_blank');
            } else if (paymentMethod === 'card') {
                 // Simulación de redirección a pasarela
            }
            setStep(3); // Ir a confirmación
            window.scrollTo(0, 0);
        }
    };

    // Renderizado de Confirmación (Paso 3)
    if (step === 3) {
        return (
            <div className="bg-[#f7f8fa] min-h-screen flex items-center justify-center font-poppins px-4">
                <div className="max-w-2xl w-full py-12 px-8 text-center bg-white rounded-xl shadow-lg">
                    <div className="text-green-500 mb-6 text-7xl flex justify-center"><i className="fas fa-check-circle"></i></div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">¡Reserva Confirmada!</h2>
                    <p className="text-lg text-gray-600 mb-6">Tu reserva para <strong>{booking?.hotelName}</strong> ha sido procesada con éxito.</p>
                    <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left inline-block w-full sm:w-2/3">
                         <p className="mb-1"><strong>Referencia:</strong> <span className="font-mono text-guacamayafly-orange">XC-{Math.floor(Math.random()*100000)}</span></p>
                         <p className="mb-1"><strong>Check-in:</strong> {booking?.checkin}</p>
                         <p><strong>Total:</strong> {booking?.price} €</p>
                    </div>
                    <div>
                        <button onClick={() => navigate('/')} className="bg-guacamayafly-orange text-white text-lg font-bold py-3 px-8 rounded-full hover:bg-guacamayafly-dark-orange transition shadow-md">
                            Volver al Inicio
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#f7f8fa] min-h-screen text-[#222222] font-poppins">
            {/* HEADER */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="hidden lg:flex max-w-[1200px] mx-auto px-3 py-3 sm:px-6 items-center justify-between relative">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(-1)}>
                        <span className="text-guacamayafly-orange"><i className="fas fa-arrow-left fa-lg"></i></span>
                        <div className="flex items-center space-x-2">
                            <img alt="Logo Guacamayafly" height="32" src="https://guacamayafly.vercel.app/logo.svg" width="32"/>
                            <span className="font-extrabold text-lg select-none text-guacamayafly-orange">UACAMAYAFLY</span>
                        </div>
                    </div>
                    
                    <nav className="flex items-center relative flex-1 justify-center w-auto mx-8">
                        <div className="absolute w-full h-0.5 bg-gray-300 top-[12px] left-0 right-0"></div>
                        <div className="absolute h-0.5 bg-guacamayafly-orange top-[12px] left-0 transition-all duration-300 ease-in-out" style={{ width: step === 1 ? '16.5%' : '50%' }}></div>

                        <div className="flex flex-col items-center relative z-10 px-2">
                            <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold border-2 ${step >= 1 ? 'bg-guacamayafly-orange text-white border-guacamayafly-orange' : 'bg-white text-gray-400 border-gray-300'}`}>1</div>
                            <span className={`font-semibold text-sm mt-1 whitespace-nowrap ${step >= 1 ? 'text-guacamayafly-orange' : 'text-gray-600'}`}>Información del cliente</span>
                        </div>

                        <div className="flex flex-col items-center relative z-10 px-2 ml-20">
                            <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold border-2 ${step >= 2 ? 'bg-guacamayafly-orange text-white border-guacamayafly-orange' : 'bg-white text-gray-400 border-gray-300'}`}>2</div>
                            <span className={`font-semibold text-sm mt-1 whitespace-nowrap ${step >= 2 ? 'text-guacamayafly-orange' : 'text-gray-600'}`}>Información de pago</span>
                        </div>

                        <div className="flex flex-col items-center relative z-10 px-2 ml-20">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 bg-white text-xs text-gray-400"><i className="fas fa-check"></i></div>
                            <span className="text-gray-600 text-sm mt-1 whitespace-nowrap">¡Reserva confirmada!</span>
                        </div>
                    </nav>
                    
                    <div className="flex items-center gap-4">
                        <button className="bg-blue-600 text-white rounded-full px-4 py-1.5 text-sm font-semibold hover:bg-blue-700 transition">Iniciar sesión</button>
                    </div>
                </div>
                
                {/* Mobile Header Placeholder */}
                <div className="lg:hidden flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2" onClick={() => navigate(-1)}>
                        <i className="fas fa-chevron-left"></i>
                        <div className="flex items-center space-x-2">
                            <img alt="Logo" height="24" src="https://guacamayafly.vercel.app/logo.svg" width="24"/>
                            <span className="font-extrabold text-guacamayafly-orange">UACAMAYAFLY</span>
                        </div>
                    </div>
                </div>
            </header>

            <div id="timer-bar" className="bg-[#fff0eb] border-b border-[#fcd9cc] text-[#b33a3a] text-sm font-semibold flex items-center justify-center space-x-2 py-2">
                <i className="far fa-clock"></i>
                <span>Estamos manteniendo tu precio...</span>
                <span className="font-mono tracking-wide">{formatTime(timeLeft)}</span>
            </div>

            <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-6">
                {/* --- SIDEBAR RESUMEN (INYECCIÓN DE DATOS) --- */}
                <aside className="w-full lg:w-[360px] flex flex-col order-first lg:order-last">
                    <div className="bg-white border border-gray-300 rounded-xl p-4 mb-5 text-gray-600 grid grid-cols-[1fr_auto_1fr_auto] items-center gap-x-2">
                        <div className="text-xs text-gray-500 font-semibold">Registrarse</div>
                        <div></div>
                        <div className="text-xs text-gray-500 font-semibold">Verificar</div>
                        <div className="text-right"></div>

                        <div className="flex flex-col items-start">
                            <div className="font-semibold text-base text-[#222222]">
                                {booking ? booking.checkin : '--'}
                            </div>
                            <div className="text-xs font-normal text-gray-600">14:00</div>
                        </div>

                        <div className="text-xl text-gray-600 flex-shrink-0">→</div>
                        
                        <div className="flex flex-col items-start">
                            <div className="font-semibold text-base text-[#222222]">
                                {booking ? booking.checkout : '--'}
                            </div>
                            <div className="text-xs font-normal text-gray-600">13:00</div>
                        </div>
                        
                        <div className="flex flex-col items-end">
                            <div className="font-bold text-xl text-[#222222]">2</div>
                            <div className="text-xs font-normal text-gray-600">nights</div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-300 rounded-xl p-5 shadow-sm mb-6">
                        <div className="flex gap-3 mb-4 pb-4 border-b border-gray-300">
                            {/* IMAGEN DINÁMICA */}
                            <img
                                id="summary-hotel-image"
                                alt="Foto del hotel"
                                className="w-20 h-20 rounded-md object-cover flex-shrink-0"
                                src={booking?.hotelImage || 'https://placehold.co/80x80/cccccc/ffffff?text=Hotel'}
                            />
                            <div className="flex-1 text-sm">
                                {/* NOMBRE DINÁMICO */}
                                <h3 className="font-semibold text-[#222222] mb-1 line-clamp-2">
                                    {booking ? booking.hotelName : 'Cargando hotel...'}
                                </h3>
                                <div className="flex items-center text-gray-500 text-xs mb-1 space-x-1">
                                    <i className="fas fa-map-marker-alt text-[10px]"></i>
                                    <span className="truncate max-w-[150px]">{booking?.hotelLocation || 'Ubicación'}</span>
                                </div>
                                <div className="flex items-center mb-1 text-pink-600 space-x-1">
                                    <i className="fas fa-star text-sm"></i><i className="fas fa-star text-sm"></i><i className="fas fa-star text-sm"></i><i className="fas fa-star text-sm"></i>
                                </div>
                                <div className="text-guacamayafly-green font-semibold text-sm mb-1">
                                    9.7 Excepcional <span className="text-gray-400 font-normal ml-1 text-xs">49 reseñas</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-md p-4 text-gray-700 text-sm space-y-2 border border-gray-300 mb-4">
                             <div className="flex space-x-3 items-center font-semibold text-gray-900 pb-2">
                                <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center"><i className="fas fa-bed text-gray-500"></i></div>
                                <div>1 x Habitación/Vuelo</div>
                             </div>
                             <div className="py-1"><strong>Huéspedes:</strong> {booking?.adults || 2} adultos</div>
                             <div className="text-orange-600 text-xs font-semibold py-1 mt-2 flex items-start gap-1">
                                <i className="fas fa-exclamation-triangle mt-0.5"></i>
                                <span>¡Date prisa! ¡Tenemos la última habitación disponible para tus fechas a este precio!</span>
                            </div>
                        </div>
                        
                        <button type="button" className="w-full flex justify-between items-center text-sm font-semibold text-green-700 border border-gray-300 rounded px-4 py-2 hover:bg-green-50 transition">
                          <div className="flex items-center gap-3"><i className="fas fa-shield-alt text-lg"></i><span>Política de cancelación</span></div>
                          <i className="fas fa-chevron-right text-lg"></i>
                        </button>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 text-sm mb-6">
                        <div className="bg-red-500 text-white text-center py-1 rounded-t-xl text-xs font-semibold">
                            21% DE DESCUENTO HOY
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between mb-1"><span className="font-medium">Precio original</span><span className="font-semibold">{(parseFloat(booking?.price || 0) * 1.21).toFixed(2)} €</span></div>
                             <div className="flex justify-between items-center border-t border-gray-200 pt-3 mt-3">
                                <span className="font-semibold text-base">Precio final <i className="fas fa-info-circle text-xs ml-1"></i></span>
                                {/* PRECIO DINÁMICO */}
                                <span className="font-bold text-xl">{booking ? booking.price + ' €' : '---'}</span>
                            </div>
                            <p className="text-[10px] text-gray-400 mb-3">Incluido en el precio total: Impuestos y tasas</p>
                            <div className="bg-[#0b5e07] bg-opacity-10 rounded-xl p-3 text-xs text-[#0b5e07] font-semibold mt-4">Igualamos los precios. ¡Si lo encuentras por menos, lo igualamos!</div>
                        </div>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="bg-[#d9f0d9] rounded-xl p-4 text-sm text-[#0b5e07] flex items-center gap-2 font-semibold">
                            <i className="fas fa-thumbs-up text-base"></i>
                            <span>¡Excelente elección! <span className="font-normal">Has elegido nuestra tarifa más baja.</span></span>
                        </div>
                         <div className="bg-[#ffe3d3] rounded-xl p-4 text-sm text-[#b35a0b] flex items-center gap-2 font-semibold">
                            <i className="fas fa-clock text-base"></i>
                            <span>Faltan solo <span className="font-bold">2</span> días para tu llegada.</span>
                        </div>
                    </div>
                </aside>

                {/* --- FORMULARIO PRINCIPAL --- */}
                <section className="flex-1 bg-white rounded-xl border border-gray-200 p-6 max-w-full">
                    <div className="bg-orange-100 border border-orange-200 text-orange-800 text-sm p-4 rounded-xl mb-6">
                        <p className="font-semibold mb-2">
                            ¡Inicia sesión para utilizar tu Guacamayafly Cash!
                            <a href="#" className="text-guacamayafly-dark-orange hover:underline font-bold ml-1">Iniciar sesión</a>
                        </p>
                        <p className="text-xs text-orange-700">Iniciar sesión en su cuenta de Guacamayafly le permitirá realizar reservas más rápidas.</p>
                    </div>

                    {/* STEP 1: INFORMACIÓN DEL CLIENTE */}
                    <div className={step === 1 ? 'block' : 'hidden'}>
                        <h2 className="text-base font-semibold mb-2">¿Quién es el invitado principal?</h2>
                        <p className="text-sm text-[#b33a3a] mb-4 font-semibold">*Campo obligatorio</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Nombre de pila *</label>
                                <input className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-guacamayafly-orange" type="text" required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Apellido *</label>
                                <input className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-guacamayafly-orange" type="text" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Correo electrónico *</label>
                                <input className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-guacamayafly-orange" type="email" required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">País/región de residencia *</label>
                                <select className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-guacamayafly-orange">
                                  <option>Selecciona un país</option>
                                  <option>España</option><option>Venezuela</option><option>Colombia</option><option>México</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-6">
                          <label className="block text-sm font-semibold text-gray-600 mb-1">Número de teléfono (opcional)</label>
                          <input className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-guacamayafly-orange" type="tel" />
                        </div>

                        <fieldset className="border border-gray-300 rounded-xl p-4 mb-6 text-sm">
                          <legend className="font-semibold text-base mb-2 px-2">Solicitudes especiales</legend>
                          <p className="text-gray-500 mb-4 text-sm">Selecciona tu(s) preferencia(s) (sujeto a disponibilidad).</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <p className="font-semibold mb-2 text-sm">¿Qué tipo de habitación preferirías?</p>
                              <div className="flex items-center mb-2">
                                <input className="mr-2 w-5 h-5 accent-guacamayafly-orange" name="fumadores" type="radio" />
                                <label className="flex items-center gap-1 text-sm"><i className="fas fa-smoking-ban text-lg"></i> Habitación de no fumadores</label>
                              </div>
                              <div className="flex items-center">
                                <input className="mr-2 w-5 h-5 accent-guacamayafly-orange" name="fumadores" type="radio" />
                                <label className="flex items-center gap-1 text-sm"><i className="fas fa-smoking text-lg"></i> Habitación de fumadores</label>
                              </div>
                            </div>
                            <div>
                              <p className="font-semibold mb-2 text-sm">¿Qué configuración de camas prefieres?</p>
                              <div className="flex items-center mb-2">
                                <input className="mr-2 w-5 h-5 accent-guacamayafly-orange" name="camas" type="radio" />
                                <label className="flex items-center gap-1 text-sm"><i className="fas fa-bed text-lg"></i> Quiero una cama grande</label>
                              </div>
                              <div className="flex items-center">
                                <input className="mr-2 w-5 h-5 accent-guacamayafly-orange" name="camas" type="radio" />
                                <label className="flex items-center gap-1 text-sm"><i className="fas fa-bed text-lg"></i> Quiero camas separadas</label>
                              </div>
                            </div>
                          </div>
                        </fieldset>

                        <div className="bg-white rounded-xl border border-gray-200 p-6 my-6">
                          <h2 className="text-base font-semibold mb-2">Información adicional sobre hospitalidad</h2>
                          <p className="text-gray-500 mb-4 text-sm">Por favor proporcione la siguiente información para optimizar los servicios que brinda la propiedad</p>
                          <p className="font-semibold mb-2 text-sm">Avísanos cuando llegues</p>
                          <select className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-guacamayafly-orange">
                              <option>Seleccionar hora</option><option>No sé</option><option>12:00 - 13:00</option><option>13:00 - 14:00</option>
                          </select>
                        </div>
                        
                        <button onClick={handleNextStep} className="w-full bg-guacamayafly-orange text-white font-bold text-lg py-3 rounded-full hover:bg-guacamayafly-dark-orange transition shadow-md mt-4">
                            Siguiente: Paso Final
                        </button>
                    </div>

                    {/* STEP 2: PAGO */}
                    <div className={step === 2 ? 'block' : 'hidden'}>
                        <h2 className="text-base font-semibold mb-4">Selecciona tu método de pago</h2>
                        
                        <div className="space-y-3 mb-6">
                            <div onClick={() => setPaymentMethod('whatsapp')} className={`payment-option flex justify-between items-center p-4 border rounded-lg cursor-pointer transition ${paymentMethod === 'whatsapp' ? 'border-guacamayafly-orange bg-orange-50 ring-1 ring-guacamayafly-orange' : 'hover:bg-gray-50'}`}>
                                <div className="flex items-center gap-3">
                                    <i className="fab fa-whatsapp text-2xl text-green-500"></i>
                                    <span className="font-semibold">Reservar por WhatsApp</span>
                                </div>
                                <div className={`w-4 h-4 rounded-full border ${paymentMethod === 'whatsapp' ? 'bg-guacamayafly-orange border-guacamayafly-orange' : 'border-gray-300'}`}></div>
                            </div>

                            <div onClick={() => setPaymentMethod('card')} className={`payment-option flex justify-between items-center p-4 border rounded-lg cursor-pointer transition ${paymentMethod === 'card' ? 'border-guacamayafly-orange bg-orange-50 ring-1 ring-guacamayafly-orange' : 'hover:bg-gray-50'}`}>
                                <div className="flex items-center gap-3">
                                    <i className="fas fa-credit-card text-2xl text-blue-600"></i>
                                    <span className="font-semibold">Tarjeta de Crédito/Débito</span>
                                </div>
                                <div className={`w-4 h-4 rounded-full border ${paymentMethod === 'card' ? 'bg-guacamayafly-orange border-guacamayafly-orange' : 'border-gray-300'}`}></div>
                            </div>

                            <div onClick={() => setPaymentMethod('crypto')} className={`payment-option flex justify-between items-center p-4 border rounded-lg cursor-pointer transition ${paymentMethod === 'crypto' ? 'border-guacamayafly-orange bg-orange-50 ring-1 ring-guacamayafly-orange' : 'hover:bg-gray-50'}`}>
                                <div className="flex items-center gap-3">
                                    <i className="fab fa-bitcoin text-2xl text-yellow-500"></i>
                                    <span className="font-semibold">Criptomonedas</span>
                                </div>
                                <div className={`w-4 h-4 rounded-full border ${paymentMethod === 'crypto' ? 'bg-guacamayafly-orange border-guacamayafly-orange' : 'border-gray-300'}`}></div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button onClick={() => setStep(1)} className="w-1/3 border border-gray-300 text-gray-700 font-bold py-3 rounded-full hover:bg-gray-100 transition">Atrás</button>
                            <button onClick={handleNextStep} className="w-2/3 bg-guacamayafly-orange text-white font-bold py-3 rounded-full hover:bg-guacamayafly-dark-orange transition shadow-md flex justify-center items-center gap-2">
                                Completar Reserva <i className="fas fa-lock"></i>
                            </button>
                        </div>
                    </div>

                </section>
            </main>
            
            {/* Sticky footer mobile */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 shadow-[0_-4px_6px_rgba(0,0,0,0.1)] z-40 flex justify-between items-center">
                <div>
                    <p className="text-xs text-gray-500">Total</p>
                    <p className="font-bold text-xl">{booking ? booking.price + ' €' : '---'}</p>
                </div>
                <button 
                    onClick={() => step === 1 ? handleNextStep() : handleNextStep()} 
                    className="bg-guacamayafly-orange text-white font-bold py-2 px-6 rounded-full shadow-lg"
                >
                    {step === 1 ? 'Siguiente' : 'Pagar'}
                </button>
            </div>
        </div>
    );
};

export default Checkout;
