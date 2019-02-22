import { jsonToQueryString } from "../helpers/index.js";

const API_URL = " https://memegen.link/";

const escapeMemeLine = line => {
  return line
    .replace("-", "--")
    .replace("_", "__")
    .replace(" ", "_")
    .replace("?", "~q")
    .replace("%", "~p")
    .replace("#", "~h")
    .replace("/", "~s")
    .replace('"', "''");
};

export default class MemeGeneratorService {
  static async fetchFromApi(method, endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method
    });
    return response.json();
  }

  static async get(endpoint) {
    return await this.fetchFromApi("GET", endpoint);
  }

  static async generateMemeFromTemplate(template, line1, line2) {
    const line1Safe = escapeMemeLine(line1);
    const line2Safe = escapeMemeLine(line2);

    return await this.get(`${template}/${line1Safe}/${line2Safe}`);
  }

  static async generateMemeFromImageUrl(imageUrl, line1, line2) {
    const line1Safe = escapeMemeLine(line1);
    const line2Safe = escapeMemeLine(line2);

    const params = jsonToQueryString({ alt: imageUrl });
    return await this.get(`custom/${line1Safe}/${line2Safe}?${params}`);
  }

  static async getAllTemplates() {
    return await this.get("api/templates");
  }
}
