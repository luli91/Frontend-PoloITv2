const categories = [
    { title: "Ropa", image: "/images/ReDona_ropa.jpg" },
    { title: "Libros", image: "/images/ReDona_libros.jpg" },
    { title: "Muebles", image: "/images/ReDona_muebles.jpg" },
    { title: "Mercadería", image: "/images/ReDona_mercaderia.jpg" },
    { title: "Electrodomésticos", image: "/images/ReDona_electrodomesticos.jpeg" },
    { title: "Juguetes", image: "/images/ReDona_juguetes.jpg" },
];

const Categories = () => {
    return (
        <div className="mt-12 text-center px-10 py-10">
            {/* Título de la sección */}
            <h2 className="font-bold mb-8 text-xl sm:text-2xl md:text-3xl">
                Explora las categorías de donaciones
            </h2>

            {/* Contenedor de tarjetas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md overflow-hidden max-w-[280px] mx-auto flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="h-[200px] overflow-hidden">
                            <img
                                src={category.image}
                                alt={category.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4 text-center">
                            <h3 className="text-sm sm:text-base md:text-lg font-bold">
                                {category.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;