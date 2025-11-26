import React, { useState } from 'react';
import { Task, LoadingState } from '../types';
import { analyzeTasks } from '../services/gemini';
import { Bot, Loader2, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AIAdvisorProps {
  tasks: Task[];
}

const AIAdvisor: React.FC<AIAdvisorProps> = ({ tasks }) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);

  const handleGetAdvice = async () => {
    const activeTasks = tasks.filter(t => !t.completed);
    
    if (activeTasks.length === 0) {
      setAdvice("Bạn đã hoàn thành hết công việc! Hãy tận hưởng thời gian nghỉ ngơi.");
      setStatus(LoadingState.SUCCESS);
      return;
    }

    setStatus(LoadingState.LOADING);
    try {
      const result = await analyzeTasks(activeTasks);
      setAdvice(result);
      setStatus(LoadingState.SUCCESS);
    } catch (error) {
      setAdvice("Xin lỗi, tôi không thể kết nối ngay lúc này. Vui lòng thử lại sau.");
      setStatus(LoadingState.ERROR);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Bot className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-semibold text-slate-800">Góc Tư Vấn AI</h2>
        </div>
      </div>

      <p className="text-slate-600 mb-6 text-sm leading-relaxed">
        Nhấn nút bên dưới để AI phân tích danh sách việc cần làm của bạn và đề xuất thứ tự ưu tiên tối ưu nhất.
      </p>

      {status === LoadingState.IDLE && (
        <button
          onClick={handleGetAdvice}
          className="w-full py-3 px-4 bg-white border border-indigo-200 text-indigo-700 font-medium rounded-xl hover:bg-indigo-50 hover:border-indigo-300 transition-all flex items-center justify-center gap-2 shadow-sm group"
        >
          <Sparkles className="w-4 h-4 text-indigo-500 group-hover:text-indigo-600" />
          Phân tích & Lập kế hoạch
        </button>
      )}

      {status === LoadingState.LOADING && (
        <div className="flex flex-col items-center justify-center py-8 text-indigo-600">
          <Loader2 className="w-8 h-8 animate-spin mb-3" />
          <span className="text-sm font-medium animate-pulse">Đang suy nghĩ...</span>
        </div>
      )}

      {status === LoadingState.SUCCESS && advice && (
        <div className="bg-white rounded-xl p-5 border border-indigo-100 shadow-sm animate-fade-in">
          <div className="prose prose-sm prose-indigo max-w-none text-slate-700">
            <ReactMarkdown>{advice}</ReactMarkdown>
          </div>
          <button 
            onClick={() => setStatus(LoadingState.IDLE)}
            className="mt-4 text-xs text-indigo-500 hover:text-indigo-700 font-medium hover:underline"
          >
            Thử lại
          </button>
        </div>
      )}
       {status === LoadingState.ERROR && advice && (
        <div className="bg-red-50 text-red-600 rounded-xl p-4 border border-red-100 text-sm">
           {advice}
            <button 
            onClick={() => setStatus(LoadingState.IDLE)}
            className="block mt-2 text-xs font-semibold hover:underline"
          >
            Thử lại
          </button>
        </div>
      )}
    </div>
  );
};

export default AIAdvisor;