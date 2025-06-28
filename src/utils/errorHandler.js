export const handleApiError = (context, error) => {
    console.error(`❌ Error en ${context}:`, error);
    throw error;
};
