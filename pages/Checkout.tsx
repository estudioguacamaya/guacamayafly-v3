import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingDetails } from '../types';

const Checkout: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [timeLeft, setTimeLeft] = useState(1200); // 20 mins
    const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<'whatsapp' | 'card' | 'crypto' | null>(null);
    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const stored = sessionStorage.getItem('hotelBookingDetails');
        const flightStored = sessionStorage.getItem('currentFlightBooking');
        if (stored) {
            setBookingDetails(JSON.parse(stored));
        } else if (flightStored) {
            // Adapt flight data to booking structure
            const flight = JSON.parse(flightStored);
            setBookingDetails({
                hotelId: 0,
                hotelName: `${flight.carrier} Flight`,
                hotelImage: 'https://images.kiwi.com/airlines/64/IB.png',
                hotelLocation: `${flight.dept} -> ${flight.arr}`,
                price: flight.price,
                checkin: 'N/A',
                checkout: 'N/A',
                adults: 1,
                children: 0
            });
        }
    }, []);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleNextStep = () => {
        if (step === 1) setStep(2);
        else if (step === 2) {
             if (paymentMethod === 'whatsapp') {
                window.open('https://wa.me/5804243156057?text=Hola, quiero confirmar mi reserva.', '_blank');
                setIsConfirmed(true);
                setStep(3);
             } else if (paymentMethod === 'crypto') {
                 // Show crypto modal/section
                 alert("Por favor escanee el QR en la sección de abajo (Simulación).");
                 setIsConfirmed(true);
                 setStep(3);
             } else {
                 setIsConfirmed(true);
                 setStep(3);
             }
        }
    };

    if (step === 3) {
        return (
            <div className="max-w-2xl mx-auto py-12 px-6 text-center bg-white rounded-xl shadow-lg mt-8">
                <div className="text-green-500 mb-4 text-6xl"><i className="fas fa-check-circle"></i></div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">¡Reserva Confirmada!</h2>
                <p className="text-lg text-gray-600 mb-4">Tu reserva ha sido procesada con éxito.</p>
                <button onClick={() => navigate('/')} className="mt-6 bg-guacamayafly-orange text-white text-lg font-bold py-3 px-6 rounded-full hover:bg-guacamayafly-dark-orange transition">Volver al Inicio</button>
            </div>
        );
    }

    return (
        <div className="bg-[#f7f8fa] min-h-screen text-[#222222] font-sans">
             <header className="bg-white border-b border-gray-200 py-3">
                 <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                        <i className="fas fa-arrow-left fa-lg text-guacamayafly-orange"></i>
                        <span className="font-extrabold text-lg text-guacamayafly-orange">UACAMAYAFLY</span>
                    </div>
                    {/* Stepper */}
                    <div className="flex items-center space-x-4">
                        <div className={`flex flex-col items-center ${step >= 1 ? 'text-guacamayafly-orange' : 'text-gray-400'}`}>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs ${step >= 1 ? 'border-guacamayafly-orange bg-guacamayafly-orange text-white' : 'border-gray-300'}`}>1</div>
                            <span className="text-xs font-semibold">Info</span>
                        </div>
                        <div className="w-10 h-0.5 bg-gray-300"></div>
                        <div className={`flex flex-col items-center ${step >= 2 ? 'text-guacamayafly-orange' : 'text-gray-400'}`}>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs ${step >= 2 ? 'border-guacamayafly-orange bg-guacamayafly-orange text-white' : 'border-gray-300'}`}>2</div>
                            <span className="text-xs font-semibold">Pago</span>
                        </div>
                    </div>
                 </div>
             </header>

             <div className="bg-[#fff0eb] border-b border-[#fcd9cc] text-[#b33a3a] text-sm font-semibold text-center py-2">
                <i className="far fa-clock mr-2"></i> Estamos manteniendo tu precio... <span className="font-mono">{formatTime(timeLeft)}</span>
             </div>

             <main className="max-w-[1200px] mx-auto px-6 py-8 flex flex-col lg:flex-row gap-6">
                <aside className="w-full lg:w-[360px] order-last lg:order-first">
                    <div className="bg-white border border-gray-300 rounded-xl p-5 shadow-sm mb-6">
                        <h3 className="font-semibold text-lg mb-2">{bookingDetails?.hotelName || 'Resumen'}</h3>
                        <div className="flex gap-3 mb-4">
                            <img src={bookingDetails?.hotelImage} className="w-20 h-20 rounded-md object-cover" alt="Thumb" />
                            <div className="text-sm">
                                <p>{bookingDetails?.hotelLocation}</p>
                                <div className="text-guacamayafly-green font-semibold">9.7 Excepcional</div>
                            </div>
                        </div>
                        <div className="border-t pt-4">
                             <div className="flex justify-between mb-1"><span className="font-medium">Total</span><span className="font-bold text-lg">{bookingDetails?.price} €</span></div>
                             <p className="text-xs text-gray-400">Incluye impuestos y tasas</p>
                        </div>
                    </div>
                </aside>

                <section className="flex-1 bg-white rounded-xl border border-gray-200 p-6">
                    {step === 1 && (
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Información del cliente</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input className="w-full border border-gray-300 rounded-xl px-4 py-3" placeholder="Nombre *" required />
                                <input className="w-full border border-gray-300 rounded-xl px-4 py-3" placeholder="Apellido *" required />
                            </div>
                            <input className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4" placeholder="Correo electrónico *" required />
                            <button onClick={handleNextStep} className="w-full bg-guacamayafly-orange text-white font-bold py-3 rounded-xl hover:bg-guacamayafly-dark-orange transition">Siguiente: Pago</button>
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Método de pago</h2>
                            <div className="space-y-3 mb-6">
                                <div onClick={() => setPaymentMethod('whatsapp')} className={`payment-option flex items-center justify-between p-3 border rounded-lg cursor-pointer ${paymentMethod === 'whatsapp' ? 'border-guacamayafly-orange bg-orange-50' : ''}`}>
                                    <span className="font-semibold">WhatsApp</span>
                                    <i className="fab fa-whatsapp text-xl text-green-500"></i>
                                </div>
                                <div onClick={() => setPaymentMethod('card')} className={`payment-option flex items-center justify-between p-3 border rounded-lg cursor-pointer ${paymentMethod === 'card' ? 'border-guacamayafly-orange bg-orange-50' : ''}`}>
                                    <span className="font-semibold">Tarjeta</span>
                                    <i className="fas fa-credit-card"></i>
                                </div>
                                <div onClick={() => setPaymentMethod('crypto')} className={`payment-option flex items-center justify-between p-3 border rounded-lg cursor-pointer ${paymentMethod === 'crypto' ? 'border-guacamayafly-orange bg-orange-50' : ''}`}>
                                    <span className="font-semibold">Criptomonedas</span>
                                    <i className="fab fa-bitcoin text-xl text-yellow-500"></i>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => setStep(1)} className="w-1/2 border border-gray-300 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50">Atrás</button>
                                <button onClick={handleNextStep} className="w-1/2 bg-guacamayafly-orange text-white font-bold py-3 rounded-xl hover:bg-guacamayafly-dark-orange">Confirmar Reserva</button>
                            </div>
                        </div>
                    )}
                </section>
             </main>
        </div>
    );
};

export default Checkout;




