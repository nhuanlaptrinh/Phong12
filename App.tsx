import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';
import AIAdvisor from './components/AIAdvisor';
import { Task } from './types';

const App: React.FC = () => {
  // Load tasks from localStorage initially
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('smart-planner-tasks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('smart-planner-tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Header />
      
      <main className="max-w-3xl mx-auto p-4 sm:p-6 space-y-8 pb-20">
        
        {/* Welcome Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Xin chào! 👋</h2>
          <p className="text-slate-500">
            Hôm nay bạn muốn đạt được điều gì? Hãy liệt kê ra nhé.
          </p>
        </section>

        {/* Two Column Layout for larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Main Task List Area */}
          <div className="md:col-span-3 space-y-6">
            <TaskList tasks={tasks} setTasks={setTasks} />
          </div>

          {/* Sidebar / AI Advisor Area */}
          <div className="md:col-span-2 space-y-6">
            <AIAdvisor tasks={tasks} />
            
            {/* Simple Tip Card */}
            <div className="bg-yellow-50 rounded-2xl p-5 border border-yellow-100 text-yellow-800 text-sm">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                💡 Mẹo nhỏ
              </h3>
              <p className="opacity-90">
                Hãy chia nhỏ các công việc lớn thành các bước nhỏ để dễ dàng hoàn thành hơn.
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-200 bg-white mt-auto">
        <p>&copy; {new Date().getFullYear()} Trợ Lý Việc Làm Thông Minh. Built with React & Gemini.</p>
      </footer>
    </div>
  );
};

export default App;