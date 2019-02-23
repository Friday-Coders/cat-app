import { jsonToQueryString } from "../helpers/index.js";

const API_KEY = "a0243b34-d9c7-42bf-962b-b00d0c766509";
const API_URL = "https://api.deepai.org/api/";

export default class DeepAIService {
  static async fetchFromApi(method, endpoint, data) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      body: data,
      headers: new Headers({
        "Api-Key": API_KEY
      })
    });
    return response.json();
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

  static async deepDream(image) {
    let formData = new FormData();
    formData.append("content", image);
    return await this.post("deepdream", formData);
  }
}
