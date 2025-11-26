import React, { useState } from 'react';
import { Task } from '../types';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks }) => {
  const [inputValue, setInputValue] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    setTasks(prev => [newTask, ...prev]);
    setInputValue('');
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <form onSubmit={addTask} className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Thêm công việc mới..."
            className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="absolute right-2 top-2 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </form>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {tasks.length === 0 ? (
          <div className="p-8 text-center text-slate-400 flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-3">
              <CheckCircle2 className="w-8 h-8 opacity-50" />
            </div>
            <p>Bạn đang rảnh rỗi! Hãy thêm việc cần làm.</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {tasks.map(task => (
              <li 
                key={task.id} 
                className={`flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group ${task.completed ? 'bg-slate-50/50' : ''}`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <button 
                    onClick={() => toggleTask(task.id)}
                    className={`flex-shrink-0 transition-colors ${task.completed ? 'text-green-500' : 'text-slate-300 hover:text-indigo-500'}`}
                  >
                    {task.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                  </button>
                  <span className={`truncate text-slate-700 ${task.completed ? 'line-through text-slate-400' : ''}`}>
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title="Xóa"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="p-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex justify-between px-6">
        <span>{tasks.filter(t => !t.completed).length} việc chưa làm</span>
        <span>{tasks.filter(t => t.completed).length} việc đã hoàn thành</span>
      </div>
    </div>
  );
};

export default TaskList;