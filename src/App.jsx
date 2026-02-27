import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { makeId } from './utils';
import { fireConfetti } from './confetti';

// using localstorage for basic persistence
const storeKey = 'tf_tasks';
const themeKey = 'tf_theme';
const catKey = 'tf_cats';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(themeKey) || 'light';
  });

  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem(storeKey);
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });

  const [categories, setCategories] = useState(() => {
    try {
      const savedCats = localStorage.getItem(catKey);
      if (savedCats) {
        const parsedCats = JSON.parse(savedCats);
        // default cats if somehow empty
        return parsedCats.length > 0 ? parsedCats : ['work', 'study', 'personal'];
      }
      return ['work', 'study', 'personal'];
    } catch {
      return ['work', 'study', 'personal'];
    }
  });

  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(storeKey, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(catKey, JSON.stringify(categories));
  }, [categories]);

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(themeKey, newTheme);
  };

  const handleAddTask = (text, category) => {
    const newTask = {
      id: makeId(),
      text: text.trim(),
      category: category,
      done: false,
      createdAt: new Date().toISOString()
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const handleAddCategory = (newCategory) => {
    setCategories(prevCats => [...prevCats, newCategory]);
  };

  const handleDeleteCategory = (categoryName) => {
    if (['work', 'study', 'personal'].includes(categoryName)) return;

    setCategories(prevCats => prevCats.filter(cat => cat !== categoryName));
    setTasks(prevTasks => prevTasks.filter(task => task.category !== categoryName));
  };

  const handleToggleTask = (taskId) => {
    setTasks(prevTasks => prevTasks.map(task => {
      if (task.id === taskId) {
        const isNowDone = !task.done;
        if (isNowDone) setTimeout(fireConfetti, 50);
        return { ...task, done: isNowDone };
      }
      return task;
    }));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const handleClearAll = () => {
    // maybe a bit intrusive but it works
    if (window.confirm('Are you sure you want to delete ALL tasks?')) {
      setTasks([]);
    }
  };

  return (
    <div className="container">
      <Header
        theme={theme}
        toggleTheme={handleToggleTheme}
        onClearAll={handleClearAll}
        tasksCount={tasks.length}
      />

      <ProgressBar tasks={tasks} />

      <TaskForm
        onAddTask={handleAddTask}
        categories={categories}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
      />

      <div className="filters" role="group" aria-label="Filter tasks">
        {['all', 'pending', 'done'].map(filter => (
          <button
            key={filter}
            className={`filters__btn ${activeFilter === filter ? 'is-active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      <TaskList
        tasks={tasks}
        activeFilter={activeFilter}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
