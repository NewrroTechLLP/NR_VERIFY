// src/app/page.tsx

// No longer need to import 'Image' from 'next/image' here
import styles from './page.module.css'
import VerificationForm from './VerificationForm'
import { DynamicLogo } from './DynamicLogo' // Import our new component

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        {/* Replace the old Image component with our new DynamicLogo component */}
        <DynamicLogo />

        <h1 className={styles.title}>Employee & Intern Verification Portal</h1>
      </header>

      <VerificationForm />
    </main>
  )
}