const API_URL = " https://cat-fact.herokuapp.com/";

export default class CatFactsSerivece {
  static async fetchFromApi(method, endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method
    });
    return response.json();
  }

  static async get(endpoint) {
    return await this.fetchFromApi("GET", endpoint);
  }

  static async getFact() {
    return await this.get("facts/random");
  }

  static async getFactById(id) {
    return await this.get(`facts/${id}`);
  }

  static async getAllFacts() {
    return await this.get("facts");
  }
}
