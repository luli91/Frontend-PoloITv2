import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

export default function ContactUs() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    Contáctanos
                </h2>

                <form className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <InputText
                            id="nombre"
                            className="w-full"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">
                            Correo electrónico
                        </label>
                        <InputText
                            id="email"
                            type="email"
                            className="w-full"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">
                            Mensaje
                        </label>
                        <InputTextarea
                            id="mensaje"
                            rows={4}
                            className="w-full"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        label="Enviar Mensaje"
                        icon="pi pi-send"
                        className="w-full"
                    />
                </form>
            </div>
        </div>
    );
}