import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const DonationMap = () => {
    return (
        <div className="text-center py-10 max-w-[900px] mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Encontrá donaciones cerca tuyo
            </h2>
            <div className="rounded-lg overflow-hidden">
                <MapContainer
                    center={[-34.6037, -58.3816]}
                    zoom={12}
                    className="h-[400px] w-full"
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                </MapContainer>
            </div>
        </div>
    );
};

export default DonationMap;