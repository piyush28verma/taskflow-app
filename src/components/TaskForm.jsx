import React, { useState } from 'react';

export default function TaskForm({ onAddTask, categories, onAddCategory, onDeleteCategory }) {
    const [taskText, setTaskText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!taskText.trim()) return;
        onAddTask(taskText, selectedCategory);
        setTaskText('');
    };

    const handleNewCategorySubmit = (e) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;
        const formattedCategory = newCategoryName.trim().toLowerCase();

        if (!categories.includes(formattedCategory)) {
            onAddCategory(formattedCategory);
        }

        setSelectedCategory(formattedCategory);
        setNewCategoryName('');
        setIsAddingCategory(false);
    };

    return (
        <div style={{ marginBottom: '16px' }}>
            <form className="new-task" onSubmit={handleFormSubmit} autoComplete="off">
                <input
                    className="new-task__input"
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    placeholder="Add a new task..."
                    required
                />
                <div className="new-task__controls">
                    <select
                        className="new-task__category"
                        value={selectedCategory}
                        onChange={(e) => {
                            if (e.target.value === 'ADD_NEW') {
                                setIsAddingCategory(true);
                            } else {
                                setSelectedCategory(e.target.value);
                            }
                        }}
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                        ))}
                        <option value="ADD_NEW" style={{ fontWeight: 'bold' }}>
                            + Custom Category
                        </option>
                    </select>

                    {!['work', 'study', 'personal'].includes(selectedCategory) && (
                        <button
                            type="button"
                            className="task__delete"
                            onClick={() => {
                                onDeleteCategory(selectedCategory);
                                setSelectedCategory('work');
                            }}
                            title="Delete this custom category"
                            aria-label="Delete custom category"
                            style={{ opacity: 1, padding: '0 8px' }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    )}

                    <button className="new-task__btn" type="submit">
                        Add
                    </button>
                </div>
            </form>

            {isAddingCategory && (
                <form className="new-cat-inline" onSubmit={handleNewCategorySubmit}>
                    <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Category name"
                        required
                        autoFocus
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setIsAddingCategory(false)}>
                        Cancel
                    </button>
                </form>
            )}
        </div>
    );
}
