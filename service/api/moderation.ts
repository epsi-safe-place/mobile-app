import axios from "axios";
import { MODERATION_URL, OPENAI_API_KEY } from "@env";

export default class Moderation {
  static async getTextScore(input: string) {
    try {
      const response = await axios.post(
        `${MODERATION_URL}`,
        {
          model: "omni-moderation-latest",
          input: input,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );
      return response.data.results[0]
    } catch (error) {
      return error;
    }
  }
}
