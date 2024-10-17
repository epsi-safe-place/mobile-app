import axios from "axios";
import { API_URL, MODERATION_URL, OPENAI_API_KEY } from "@env";

export default class User {
  static async getById(id: string) {
    try {
      const response = await axios.get(`${API_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      throw error; // This will ensure the error is propagated to the catch block on the frontend
    }
  }
}
