import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const testimonials = [
    { name: "Sofía", message: "Gracias a ReDoná encontré un abrigo para el invierno.", image: "/images/testimonio1.jpg" },
    { name: "Martín", message: "Doné mi bicicleta vieja y ahora alguien la usa todos los días.", image: "/images/testimonio2.jpg" },
    { name: "Lucía", message: "Pude donar juguetes y hacer feliz a niños en mi comunidad.", image: "/images/testimonio3.jpg" },
];

const TestimonialSection = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-center py-12 px-4 md:px-12 bg-[#FFA36C]">
            {/* Título con tamaño dinámico */}
            <h2 className="font-bold mb-8 text-gray-800 text-2xl sm:text-3xl md:text-4xl">
                Lo que donás, transforma vidas
            </h2>

            {/* Testimonio animado con Framer Motion */}
            <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center gap-4 max-w-3xl mx-auto"
            >
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-gray-300 flex-shrink-0">
                    <img
                        src={testimonials[index].image}
                        alt={testimonials[index].name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Contenido del testimonio */}
                <div className="text-left max-w-lg pl-2">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {testimonials[index].name}
                    </h3>
                    <p className="text-gray-800 italic">
                        "{testimonials[index].message}"
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default TestimonialSection;