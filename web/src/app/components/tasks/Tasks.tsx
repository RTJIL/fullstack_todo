import styles from './style.module.css'

import { useState, useEffect } from 'react'

type Task = {
  id: string | number
  title: string
  description?: string
  status: string
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const handleDelete = () => {
    
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('Auth toke not found')
        }

        const res = await fetch('http://localhost:3000/api/todos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) {
          throw new Error('Fetch tasks error')
        }

        const data = await res.json()
        setTasks(data)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Unknown error')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  if (loading) return <div>loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className={styles.container}>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <>
            <li key={task.id}>
              <strong>{task.title}: </strong>
              {task.description || '==='} ({task.status})
            </li>

            {/* <button onClick={handleDelete}>Delete</button> */}
          </>
        ))}
      </ul>
    </div>
  )
}
