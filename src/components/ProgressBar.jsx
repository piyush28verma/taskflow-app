import React from 'react';

export default function ProgressBar({ tasks }) {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.done).length;
    const completionPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    return (
        <section className="progress" aria-label="Task progress">
            <div className="progress__top">
                <span className="progress__label">Progress</span>
                <span className="progress__value">{completionPercentage} %</span>
            </div>
            <div className="progress__track">
                <div className="progress__fill" style={{ width: `${completionPercentage}%` }}></div>
            </div>
            <div className="progress__bottom">
                <span>{completedTasks} done</span>
                <span>
                    {totalTasks} task{totalTasks !== 1 && 's'}
                </span>
            </div>
        </section>
    );
}
