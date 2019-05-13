export const fetchPhrase = async () => {
    const url = '/phrases/new';
    try {
        const response = await fetch(url, {
            method: 'get',
        });
        return response.json();
    } catch (error) {
        console.error(error);
        return error;
    }
};
