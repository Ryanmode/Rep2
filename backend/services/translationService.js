// Service for translation and summarization using OpenAI
// Handles text processing operations

const OpenAI = require('openai');

class TranslationService {
  constructor() {
    this.openai = process.env.OPENAI_API_KEY 
      ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
      : null;
    
    // Supported languages for translation
    this.supportedLanguages = [
      { code: 'es', name: 'Spanish', nativeName: 'Español' },
      { code: 'fr', name: 'French', nativeName: 'Français' },
      { code: 'de', name: 'German', nativeName: 'Deutsch' },
      { code: 'it', name: 'Italian', nativeName: 'Italiano' },
      { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
      { code: 'ru', name: 'Russian', nativeName: 'Русский' },
      { code: 'ja', name: 'Japanese', nativeName: '日本語' },
      { code: 'ko', name: 'Korean', nativeName: '한국어' },
      { code: 'zh', name: 'Chinese', nativeName: '中文' },
      { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
      { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
      { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
      { code: 'pl', name: 'Polish', nativeName: 'Polski' },
      { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
      { code: 'sv', name: 'Swedish', nativeName: 'Svenska' }
    ];
  }

  // Summarize text using OpenAI
  async summarizeText(text, length = 'medium') {
    try {
      if (!this.openai) {
        return this.getMockSummary(text, length);
      }

      const lengthInstructions = {
        short: 'in 2-3 sentences',
        medium: 'in 1-2 paragraphs',
        long: 'in 3-4 paragraphs with key details'
      };

      const instruction = lengthInstructions[length] || lengthInstructions.medium;

      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a helpful assistant that summarizes podcast transcripts. Create clear, engaging summaries that capture the main points and key insights. Focus on the most important and interesting content.`
          },
          {
            role: "user",
            content: `Please summarize the following podcast transcript ${instruction}:\n\n${text}`
          }
        ],
        temperature: 0.3,
        max_tokens: this.getMaxTokensForLength(length)
      });

      return completion.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error summarizing with OpenAI:', error.message);
      return this.getMockSummary(text, length);
    }
  }

  // Translate text to target language
  async translateText(text, sourceLanguage, targetLanguage) {
    try {
      if (!this.openai) {
        return this.getMockTranslation(text, targetLanguage);
      }

      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a professional translator. Translate the given text accurately while maintaining the original meaning, tone, and style. Provide natural, fluent translations that sound like they were originally written in the target language.`
          },
          {
            role: "user",
            content: `Translate the following text from ${sourceLanguage} to ${targetLanguage}:\n\n${text}`
          }
        ],
        temperature: 0.2,
        max_tokens: Math.min(4000, text.length * 2)
      });

      return completion.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error translating with OpenAI:', error.message);
      return this.getMockTranslation(text, targetLanguage);
    }
  }

  // Summarize and translate in one efficient operation
  async summarizeAndTranslate(text, sourceLanguage, targetLanguage, summaryLength = 'medium') {
    try {
      if (!this.openai) {
        const summary = this.getMockSummary(text, summaryLength);
        const translation = this.getMockTranslation(summary, targetLanguage);
        return { summary, translation };
      }

      const lengthInstructions = {
        short: 'in 2-3 sentences',
        medium: 'in 1-2 paragraphs',
        long: 'in 3-4 paragraphs with key details'
      };

      const instruction = lengthInstructions[summaryLength] || lengthInstructions.medium;

      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a helpful assistant that summarizes and translates podcast content. First, create a clear summary of the main points, then translate that summary into the requested language while maintaining accuracy and natural flow.`
          },
          {
            role: "user",
            content: `Please:
1. Summarize the following podcast transcript ${instruction}
2. Then translate that summary from ${sourceLanguage} to ${targetLanguage}

Provide both the summary and translation clearly labeled.

Transcript:
${text}`
          }
        ],
        temperature: 0.3,
        max_tokens: this.getMaxTokensForLength(summaryLength) * 2
      });

      const response = completion.choices[0].message.content.trim();
      
      // Parse the response to extract summary and translation
      const parts = this.parseSummaryAndTranslation(response);
      
      return {
        summary: parts.summary,
        translation: parts.translation
      };
    } catch (error) {
      console.error('Error in summarize and translate:', error.message);
      const summary = this.getMockSummary(text, summaryLength);
      const translation = this.getMockTranslation(summary, targetLanguage);
      return { summary, translation };
    }
  }

  // Get list of supported languages
  getSupportedLanguages() {
    return this.supportedLanguages;
  }

  // Helper methods
  getMaxTokensForLength(length) {
    const tokenLimits = {
      short: 150,
      medium: 500,
      long: 1000
    };
    return tokenLimits[length] || tokenLimits.medium;
  }

  parseSummaryAndTranslation(response) {
    // Simple parsing - looks for labeled sections
    const lines = response.split('\n');
    let summary = '';
    let translation = '';
    let currentSection = '';

    for (const line of lines) {
      if (line.toLowerCase().includes('summary') || line.toLowerCase().includes('summarize')) {
        currentSection = 'summary';
        continue;
      } else if (line.toLowerCase().includes('translation') || line.toLowerCase().includes('translate')) {
        currentSection = 'translation';
        continue;
      }

      if (currentSection === 'summary' && line.trim()) {
        summary += line.trim() + ' ';
      } else if (currentSection === 'translation' && line.trim()) {
        translation += line.trim() + ' ';
      }
    }

    // If parsing fails, split the response in half
    if (!summary || !translation) {
      const halfway = Math.floor(response.length / 2);
      summary = response.substring(0, halfway).trim();
      translation = response.substring(halfway).trim();
    }

    return {
      summary: summary.trim(),
      translation: translation.trim()
    };
  }

  // Mock methods for testing without API key
  getMockSummary(text, length) {
    const summaries = {
      short: "This podcast discusses interesting topics with valuable insights for listeners.",
      medium: "This podcast episode covers several important topics with expert analysis and engaging discussion. The hosts provide valuable insights and practical advice that listeners can apply to their own situations. The conversation is both informative and entertaining.",
      long: "This podcast episode provides an in-depth exploration of various topics with expert guests and hosts. The discussion covers multiple perspectives and offers practical insights that are valuable for the audience. Throughout the episode, the hosts maintain an engaging conversational style while delivering informative content. The topics discussed are relevant and timely, making this episode particularly valuable for listeners interested in the subject matter. Key takeaways include practical advice and actionable insights that can be implemented by the audience."
    };

    return summaries[length] || summaries.medium;
  }

  getMockTranslation(text, targetLanguage) {
    const mockTranslations = {
      'es': 'Esta es una traducción simulada al español del texto proporcionado.',
      'fr': 'Ceci est une traduction simulée en français du texte fourni.',
      'de': 'Dies ist eine Scheinübersetzung des bereitgestellten Textes ins Deutsche.',
      'it': 'Questa è una traduzione simulata in italiano del testo fornito.',
      'pt': 'Esta é uma tradução simulada em português do texto fornecido.'
    };

    const languageCode = targetLanguage.toLowerCase().substring(0, 2);
    return mockTranslations[languageCode] || `[Mock translation to ${targetLanguage}]: ${text.substring(0, 100)}...`;
  }
}

module.exports = new TranslationService(); 