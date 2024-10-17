import axios from "axios";
import { TEXT_COMPLETION_URL, OPENAI_API_KEY } from "@env";
import { generateFeedbackMessage, generateRephrasingMessage } from "@/utils/utils";

type AnalysisResult = {
  results: {
    categories: { [key: string]: boolean };
    category_applied_input_types: { [key: string]: string[] };
    category_scores: { [key: string]: number };
    flagged: boolean;
  };
  score: number;
};


export default class Rephrasing {
  static async getRephrasing(analysisResults: AnalysisResult, postMessage: string) {
    try {
      const response = await axios.post(
        `${TEXT_COMPLETION_URL}`,
        {
          model: "gpt-4o-mini",
          messages: generateRephrasingMessage(analysisResults, postMessage),
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  static async getFeedback(analysisResults: AnalysisResult, postMessage: string) {
    try {
      const response = await axios.post(
        `${TEXT_COMPLETION_URL}`,
        {
          model: "gpt-4o-mini",
          messages: generateFeedbackMessage(analysisResults, postMessage),
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error;
    }
  }
}
