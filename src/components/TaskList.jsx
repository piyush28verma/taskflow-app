import React from 'react';

function formatRelativeTime(isoString) {
    const timeDifference = Date.now() - new Date(isoString).getTime();
    const minutes = Math.floor(timeDifference / 60000);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
}

export default function TaskList({ tasks, activeFilter, onToggle, onDelete }) {
    const filteredTasks = tasks.filter((task) => {
        if (activeFilter === 'pending') return !task.done;
        if (activeFilter === 'done') return task.done;
        return true;
    });

    if (filteredTasks.length === 0) {
        return (
            <div className="empty is-visible">
                <div className="empty__icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.2 }}>
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    </svg>
                </div>
                <p className="empty__title">Nothing here yet</p>
                <p className="empty__hint">Type a task above and press Add to begin.</p>
            </div>
        );
    }

    return (
        <ul className="tasks" role="list">
            {filteredTasks.map((task) => (
                <li
                    key={task.id}
                    className={`task ${task.done ? 'is-done' : ''}`}
                >
                    <div className="task__pip" data-color={task.category}></div>

                    <label className="task__checkbox">
                        <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => onToggle(task.id)}
                            aria-label={`Mark task completion: ${task.text}`}
                        />
                        <span className="task__check"></span>
                    </label>

                    <div className="task__body">
                        <p className="task__text">{task.text}</p>
                        <div className="task__meta">
                            <span className="task__badge" data-color={task.category}>
                                {task.category}
                            </span>
                            <span className="task__time">{formatRelativeTime(task.createdAt)}</span>
                        </div>
                    </div>

                    <button
                        className="task__delete"
                        onClick={() => onDelete(task.id)}
                        aria-label="Delete task"
                        title="Delete task"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </li>
            ))}
        </ul>
    );
}
