import { Accordion, AccordionTab } from 'primereact/accordion';

export default function FAQ() {
    const faqs = [
        {
            pregunta: "¿Cómo puedo hacer una donación?",
            respuesta: "Puedes realizar donaciones a través de nuestra plataforma..."
        },
        // ... más preguntas
    ];

    return (
        <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Preguntas Frecuentes
            </h2>
            <Accordion>
                {faqs.map((faq, index) => (
                    <AccordionTab
                        key={index}
                        header={faq.pregunta}
                    >
                        <p className="text-gray-600">
                            {faq.respuesta}
                        </p>
                    </AccordionTab>
                ))}
            </Accordion>
        </div>
    );
}