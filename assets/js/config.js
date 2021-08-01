const protocol = 'http';
const domain = 'localhost';
const host = `${protocol}://${domain}`;
const port = 3000;
const baseURL = `${host}:${port}/`;

class apiService {
    constructor() {}

    async makeFech(uri, method = 'GET', body, headers = {}){
        try {
            const data = await fetch(`${baseURL}${uri}`, {method, body, headers});
            return data.json();
        } catch (e) {
            throw new Error(`Error al hacer fetch a ${baseURL}${uri}. \nERROR: ${e.message}`);
        }
    }
}

async function getData(uri, method, body, headers) {
    try {
        const service = new apiService();
        return service.makeFech(uri, method, body, headers);
    } catch (e) {
        throw new Error(e.message);
    }
}
