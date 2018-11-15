import React from 'react'

export const Stats = ({ stats }) => {
    const tasksCompleted = stats.tasksCompleted
    const totalTasksCompleted = Object.keys(tasksCompleted).length
    const oneWeekAgo = Date.now() - (60 * 60 * 24 * 7 * 1000)
    const totalTasksCompletedOneWeek = Object.keys(tasksCompleted)
        .reduce((total, id) => {
            if (tasksCompleted[id].timeCompleted > oneWeekAgo) {
                total++
            }
            return total
        }, 0)
    return (
        <div className='align-center'>
            <div className='star-big'>
                {"★"}
            </div>
            <h1>{`Stars: ${totalTasksCompleted + stats.bonusStars - stats.starsUsed}`}</h1>
            <div>
                {`Tasks completed: ${totalTasksCompleted}`}
            </div>
            <div>
                {`This week: ${totalTasksCompletedOneWeek}`}
            </div>
        </div>
    )
}