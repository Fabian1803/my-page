//server/metadata/domain/utils/Sanitizer.ts
export class Sanitizer {
  public static cleanText(text: string): string {
    if (!text) return "";
    return text
      .replace(/<[^>]*>/g, "")
      .replace(/[<>]/g, "")
      .trim();
  }
  public static cleanJson(obj: any): any {
    if (obj === null || obj === undefined) return obj;
    if (typeof obj === "string") return this.cleanText(obj);
    if (Array.isArray(obj)) return obj.map(item => this.cleanJson(item));

    if (typeof obj === "object") {
      const cleanedObj: Record<string, any> = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          cleanedObj[key] = this.cleanJson(obj[key]);
        }
      }
      return cleanedObj;
    }
    return obj;
  }
}
