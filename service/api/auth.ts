import axios from "axios";
import { API_URL, MODERATION_URL, OPENAI_API_KEY } from "@env";

export default class Auth {
  static async login(mail: string, password: string) {
    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        mail: mail,
        password: password,
      });
      return response.data;
    } catch (error) {
      throw error; // This will ensure the error is propagated to the catch block on the frontend
    }
  }
}
