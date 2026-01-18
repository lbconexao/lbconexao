const API_HEALTH = "https://script.google.com/macros/s/AKfycbwv8-izst46wZsfoNrXch-qIi6bPL9XFSeAoGBBIYY6NPOqIoV22uoC2ldYJB6xq-IGhg/exec";

export const googleSheetsApi = {
    // AUTHENTICATION
    login: async (user: string, pass: string) => {
        const res = await fetch(`${API_HEALTH}?action=login&user=${encodeURIComponent(user)}&pass=${encodeURIComponent(pass)}`);
        return await res.json();
    },

    register: async (userData: { usuario: string; senha: string; confirma: string }) => {
        const res = await fetch(API_HEALTH, {
            method: 'POST',
            body: JSON.stringify({ action: "registrar", ...userData })
        });
        return await res.json();
    },

    // COURSES
    fetchCourses: async () => {
        const res = await fetch(`${API_HEALTH}?action=getCursos`);
        const data = await res.json();

        // Helper to find value regardless of header case/spaces
        const getV = (obj: any, key: string) => {
            const keys = Object.keys(obj);
            const foundKey = keys.find(k => k.trim().toUpperCase() === key.toUpperCase());
            return foundKey ? obj[foundKey] : undefined;
        };

        return data.map((c: any) => ({
            id: getV(c, 'ID') || '',
            type: getV(c, 'TIPO') || 'Online',
            image: getV(c, 'IMAGEM') || '',
            category: getV(c, 'CATEGORIA') || '',
            title: getV(c, 'TITULO') || 'Sem Título',
            description: getV(c, 'DESCRIÇÃO') || '',
            price: Number(getV(c, 'PREÇO') || 0),
            vagas: Number(getV(c, 'QTD VAGAS') || 0),
            url: getV(c, 'INSCREVA-SE AGORA - URL') || '',
            linhaOriginal: c.linhaOriginal
        }));
    },

    saveCourse: async (courseData: any) => {
        const res = await fetch(API_HEALTH, {
            method: 'POST',
            body: JSON.stringify(courseData) // action is already inside courseData from Admin.tsx
        });
        return await res.json();
    },

    deleteCourse: async (linha: number) => {
        const res = await fetch(API_HEALTH, {
            method: 'POST',
            body: JSON.stringify({ action: "excluirCurso", linha })
        });
        return await res.json();
    }
};
