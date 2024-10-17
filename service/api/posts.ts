import axios from "axios";
import { API_URL, MODERATION_URL, OPENAI_API_KEY } from "@env";

export default class Posts {
  static async getAllPosts() {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  static async getById(id: string) {
    try {
      const response = await axios.get(`${API_URL}/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  static async postOne(userID: string = "", content: string, toxic_score: number) {
    try {
      const response = await axios.post(`${API_URL}/posts`, {
        content,
        toxic_score,
        visibility: "public", // default visibility
        image_exists: false, // default image exists
        image_b64: "", // default image b64
        date_creation: new Date().toISOString(), // current date
        verified: false, // default verified
        Id_User: userID, // default Id_User (should be replaced with actual user ID)
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
