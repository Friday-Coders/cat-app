import { jsonToQueryString } from "../helpers/index.js";

const API_KEY = "592451d8-6091-410e-ba9c-cb7242d6946f";
const API_URL = " https://api.thecatapi.com/v1/";

export default class CatApiService {
  static async fetchFromApi(method, endpoint, data) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      body: data,
      headers: new Headers({
        "x-api-key": API_KEY
      })
    });

    const body = await response.text();
    return body ? JSON.parse(body) : {};
  }

  static async get(endpoint, data) {
    const params = jsonToQueryString(data);
    return await this.fetchFromApi("GET", `${endpoint}?${params}`);
  }

  static async delete(endpoint, data) {
    const params = jsonToQueryString(data);
    return await this.fetchFromApi("DELETE", `${endpoint}?${params}`);
  }

  static async post(endpoint, data) {
    return await this.fetchFromApi("POST", endpoint, data);
  }

  static async listBreeds() {
    return await this.get("breeds");
  }

  static async listCategories() {
    return await this.get("categories");
  }

  static async getVote(id) {
    return await this.get(`votes/${id}`);
  }

  static async getMyVotes() {
    return await this.get("votes");
  }

  static async createVote(data = { image_id: "", value: 1 }) {
    return await this.post("votes", data);
  }

  static async deleteVote(id) {
    return await this.delete(`votes/${id}`);
  }

  static async getImage(id) {
    return await this.get(`images/${id}`);
  }

  static async searchForCats(params) {
    return await this.get("images/search", params);
  }

  static async uploadImage(image) {
    let formData = new FormData();
    formData.append("file", image);
    return await this.post("images/upload", formData);
  }

  static async getMyImages() {
    return await this.get("images");
  }

  static async deleteImage(id) {
    return await this.delete(`images/${id}`);
  }
}
