import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';

export class GoogleGenerativeAICustom {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;
  private context: string = '';

  constructor() {
    this.genAI = new GoogleGenerativeAI('https://api.topmediai.com/v1');
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async genText(text: string) {
    const prompt = this.context + text;

    const result = await this.model.generateContent(prompt);
    return result.response.text();
  }
}

export const textGenCustom = new GoogleGenerativeAICustom();
