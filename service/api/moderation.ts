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
      let max_score = Math.max(
        ...(Object.values(response.data.results[0].category_scores) as number[])
      );

      // Conversion en pourcentage
      const toxicity_score = max_score * 100;
      return toxicity_score;
    } catch (error) {
      return error;
    }
  }
}
