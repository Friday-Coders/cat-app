const API_KEY = "592451d8-6091-410e-ba9c-cb7242d6946f";
const API_URL = " https://api.thecatapi.com/v1/";

export default class CatApiService {
  static async fetchFromApi(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: new Headers({
        "x-api-key": API_KEY
      })
    });
    return response.json();
  }

  static async searchForCats(params = { limit: 5, page: 0, order: "RANDOM" }) {
    return await this.fetchFromApi(`images/search?limit=${params.limit}`);
  }
}
