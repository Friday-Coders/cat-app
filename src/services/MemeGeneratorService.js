import { jsonToQueryString } from "../helpers/index.js";

const API_URL = "https://memegen.link/";

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

  static generateMemeFromTemplate(template, line1, line2) {
    const line1Safe = escapeMemeLine(line1);
    const line2Safe = escapeMemeLine(line2);

    return `${API_URL}${template}/${line1Safe}.jpg/${line2Safe}`;
  }

  static generateMemeFromImageUrl(imageUrl, line1, line2, width, height) {
    const line1Safe = escapeMemeLine(line1);
    const line2Safe = escapeMemeLine(line2);

    const params = jsonToQueryString({ alt: imageUrl, width, height });
    return `${API_URL}custom/${line1Safe}/${line2Safe}.jpg?${params}`;
  }

  static async getAllTemplates() {
    return await this.get("api/templates");
  }
}
