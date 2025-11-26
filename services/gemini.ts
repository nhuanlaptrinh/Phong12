import { GoogleGenAI } from "@google/genai";
import { Task } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeTasks = async (tasks: Task[]): Promise<string> => {
  if (!tasks.length) return "Bạn chưa có công việc nào để phân tích.";

  try {
    const taskListString = tasks
      .filter(t => !t.completed)
      .map(t => `- ${t.text}`)
      .join('\n');

    const prompt = `
      Tôi có danh sách các việc cần làm sau đây:
      ${taskListString}

      Hãy đóng vai một trợ lý năng suất chuyên nghiệp. 
      1. Hãy sắp xếp thứ tự ưu tiên hợp lý cho các công việc này.
      2. Đưa ra một lời khuyên ngắn gọn, động viên để tôi hoàn thành chúng hiệu quả.
      3. Trả lời bằng tiếng Việt, định dạng Markdown đẹp mắt, ngắn gọn, súc tích.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Không thể tạo lời khuyên lúc này.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Đã xảy ra lỗi khi kết nối với AI.");
  }
};