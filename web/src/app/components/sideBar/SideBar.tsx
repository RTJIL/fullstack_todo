
import styles from './style.module.css'

import { useState } from 'react'

export default function Aside() {
  const [title, setTitle] = useState('')
  const [description, setDesc] = useState('')

  const [form, setForm] = useState(false)

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token')

      const res = await fetch('http://localhost:3000/api/todos', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          title,
          description,
        }),
      })

      if (!res.ok) throw Error('Task fetching error')

      const curTodo = await res.json()
      console.log('Added: ', curTodo)

      setTitle('')
      setDesc('')
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message)
      } else {
        console.error('Unknown error', err)
      }
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>Todolist</header>
      <main>
        <button
        className={styles.addTaskButton}
          onClick={() => {
            setForm(!form)
          }}
        >
          Add task
        </button>
      </main>
      {form && (
        <form className={styles.addForm}>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
          />

          <button onClick={handleAdd}>Add task</button>
        </form>
      )}
    </div>
  )
}
