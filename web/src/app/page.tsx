'use client'

import styles from './page.module.css'

import SideBar from './components/sideBar/SideBar'
import Tasks from './components/tasks/Tasks'

import AuthForm from './components/auth/Authform'

export default function Home() {
  return (
    <div className={styles.page}>
      <AuthForm />

      <SideBar />
      <Tasks />
    </div>
  )
}
