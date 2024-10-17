import axios from "axios";
import { API_URL, MODERATION_URL, OPENAI_API_KEY } from "@env";

export default class Comments {
  static async getAllComments() {
    try {
      const response = await axios.get(`${API_URL}/comments`);
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  static async postOne(userID: string = "", content: string, toxic_score: number, idPost: string) {
    try {
      const response = await axios.post(`${API_URL}/comments`, {
        content,
        toxic_score,
        date_upload: new Date().toISOString(), // current date
        image_exists: false, // default image exists
        image_b64: "", // default image b64
        verified: true, // default verified
        Id_Post: idPost, // default Id_Post
        Id_User: userID, // default Id_User (should be replaced with actual user ID)
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
