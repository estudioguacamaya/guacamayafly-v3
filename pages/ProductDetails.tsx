import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hotel } from '../types';

const ProductDetails: React.FC = () => {
    const navigate = useNavigate();
    const [hotel, setHotel] = useState<Hotel | null>(null);
    const [reviewsOpen, setReviewsOpen] = useState(false);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);

    useEffect(() => {
        const stored = sessionStorage.getItem('selectedPropertyData');
        if (stored) {
            try {
                // Fallback default if parsing fails or incomplete
                const parsed = JSON.parse(stored);
                // Enrich with dummy data if missing from simple card object
                if (!parsed.rating) parsed.rating = 4.5;
                if (!parsed.reviews) parsed.reviews = 120;
                if (!parsed.description) parsed.description = "Un hotel exclusivo con todas las comodidades que necesitas.";
                if (!parsed.price) parsed.price = 150;
                setHotel(parsed);
            } catch (e) {
                console.error("Failed to parse hotel data", e);
            }
        } else {
            // Default mock data if accessed directly
            setHotel({
                id: 11,
                name: 'Hotel Victoria 4 Puerta del Sol',
                price: 150,
                rating: 3.9,
                reviews: 1034,
                location: 'Madrid, España',
                address: 'Calle de Victoria 4, 28012 Madrid España',
                img: 'https://storage.googleapis.com/a1aa/image/7be15fdb-6ab0-4bd0-6612-8e0b7f8750f4.jpg',
                description: "DESPIÉRTATE EN LA PUERTA DEL SOL. Dormir junto a la Puerta del Sol...",
            });
        }
    }, []);

    const handleBooking = () => {
        if (!hotel) return;
        sessionStorage.setItem('hotelBookingDetails', JSON.stringify({
            hotelId: hotel.id,
            hotelName: hotel.name,
            hotelImage: hotel.img || hotel.image,
            hotelLocation: hotel.location,
            price: hotel.price,
            checkin: new Date().toISOString().split('T')[0],
            checkout: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
            adults: 2,
            children: 0
        }));
        navigate('/pagocheckout');
    };

    if (!hotel) return <div className="p-10 text-center">Cargando...</div>;

    return (
        <div className="bg-gray-50 pb-24 md:pb-0">
             <header className="bg-white shadow-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                     <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <img src="https://guacamayafly.vercel.app/logo.svg" alt="Logo" className="h-8 w-auto"/>
                        <span className="font-extrabold text-xl text-guacamayafly-orange">UACAMAYAFLY</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm font-semibold">
                        <button onClick={() => navigate('/')} className="text-gray-700 hover:text-black">Inicio</button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => navigate('/')} className="back-button text-sm flex items-center gap-1">
                        <i className="fas fa-chevron-left"></i> Volver
                    </button>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{hotel.name}</h1>
                <p className="text-sm text-gray-600 mb-4">{hotel.location}</p>

                <section className="mb-8 hidden md:grid grid-cols-3 gap-2 h-96">
                    <div className="col-span-2 row-span-2 rounded-lg overflow-hidden">
                        <img src={hotel.img || hotel.image} className="w-full h-full object-cover" alt="Main" />
                    </div>
                    <div className="rounded-lg overflow-hidden"><img src="https://placehold.co/400x300/cccccc/ffffff?text=Room" className="w-full h-full object-cover" alt="Sub 1"/></div>
                    <div className="rounded-lg overflow-hidden"><img src="https://placehold.co/400x300/cccccc/ffffff?text=View" className="w-full h-full object-cover" alt="Sub 2"/></div>
                </section>
                
                <div className="md:hidden relative w-full h-64 rounded-lg overflow-hidden my-4">
                     <img src={hotel.img || hotel.image} className="w-full h-full object-cover" alt="Main Mobile" />
                </div>

                <section className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-8">
                    <h2 className="font-bold text-lg md:text-xl mb-3">Reserva tu estancia</h2>
                    <div className="flex flex-col sm:flex-row justify-between items-center border border-gray-200 p-3 rounded-lg gap-3">
                         <div>
                            <p className="font-semibold text-sm">Mejor precio disponible</p>
                            <p className="text-xs text-gray-500">Cancelación gratuita</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-lg">{hotel.price} €</p>
                        </div>
                        <button onClick={handleBooking} className="bg-guacamayafly-orange text-white font-bold py-2 px-4 rounded-lg hover:bg-guacamayafly-dark-orange w-full sm:w-auto">Reservar ahora</button>
                    </div>
                </section>

                <section className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Información</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                             <div className="flex items-center gap-4 mb-4">
                                <div className="text-4xl font-bold text-brand-green">{hotel.rating}</div>
                                <div><p className="font-semibold">Excelente</p><p className="text-xs text-gray-500">{hotel.reviews} opiniones</p></div>
                             </div>
                             <p className="text-gray-700 text-sm leading-relaxed">{hotel.description}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-4">Servicios destacados</h3>
                            <div className="flex flex-wrap gap-3 text-sm">
                                <span className="attribute-pill"><i className="fas fa-wifi"></i> Wifi Gratis</span>
                                <span className="attribute-pill"><i className="fas fa-parking"></i> Parking</span>
                                <span className="attribute-pill"><i className="fas fa-swimmer"></i> Piscina</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Opiniones</h2>
                    {/* Simplified Reviews Logic */}
                    <div className="border-b pb-4 mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-sm">Experiencia fantástica</span>
                            <div className="text-brand-green text-xs">★★★★★</div>
                        </div>
                        <p className="text-sm text-gray-700">"El hotel superó mis expectativas. Muy limpio y el personal increíble."</p>
                        <p className="text-xs text-gray-500 mt-1">Maria G. - Hace 2 días</p>
                    </div>
                     {reviewsOpen && (
                        <div className="border-b pb-4 mb-4">
                             <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-sm">Buena ubicación</span>
                                <div className="text-brand-green text-xs">★★★★☆</div>
                            </div>
                            <p className="text-sm text-gray-700">"Cerca del centro, perfecto para turistas."</p>
                             <p className="text-xs text-gray-500 mt-1">Juan P. - Hace 1 semana</p>
                        </div>
                     )}
                     <button onClick={() => setReviewsOpen(!reviewsOpen)} className="text-sm font-semibold hover:underline">
                         {reviewsOpen ? 'Ver menos' : 'Ver más opiniones'}
                     </button>
                </section>
                
                <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 shadow-lg z-40 flex items-center justify-between md:hidden">
                    <div>
                         <p className="font-bold text-lg">{hotel.price} €</p>
                         <p className="text-xs text-gray-500">por noche</p>
                    </div>
                    <button onClick={handleBooking} className="bg-guacamayafly-orange text-white font-bold py-2 px-6 rounded-full">Reservar</button>
                </div>
            </main>
        </div>
    );
};

export default ProductDetails;