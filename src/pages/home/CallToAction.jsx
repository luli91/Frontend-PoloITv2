import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';

const CallToAction = () => {
    const navigate = useNavigate();

    return (
        <div className="text-center py-12 bg-[#F6EEC9]">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                ¡Haz tu primera donación hoy!
            </h2>

            <p className="max-w-[600px] mx-auto mb-6 text-base">
                Tu aporte puede marcar la diferencia en la vida de alguien. Doná lo que ya no usas y ayudá a quienes más lo necesitan.
            </p>

            <button
                onClick={() => navigate("/publicar")}
                className="
                    border-2 border-black text-black
                    text-sm sm:text-lg md:text-xl
                    px-4 sm:px-6 md:px-8
                    py-2 sm:py-3 md:py-4
                    w-full sm:w-auto
                    transition-all duration-300
                    hover:bg-black hover:text-white
                    font-medium
                    rounded-md
                "
            >
                Publicar Donación
            </button>
        </div>
    );
};

export default CallToAction;