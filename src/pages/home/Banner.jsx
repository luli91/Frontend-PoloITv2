export default function Banner() {
    return (
        <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Bienvenido a PoloIT
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Plataforma de gestión de donaciones
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            onClick={() => {/* tu lógica */}}
                        >
                            Comenzar
                        </button>
                        <button
                            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                            onClick={() => {/* tu lógica */}}
                        >
                            Saber más
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}