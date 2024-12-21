// Simple in-memory storage for demo purposes
// In production, use a proper database
const urlStorage = new Map<string, string>();

export const db = {
  urls: {
    create: (code: string, url: string) => {
      urlStorage.set(code, url);
      return { code, url };
    },
    get: (code: string) => {
      return urlStorage.get(code);
    }
  }
};