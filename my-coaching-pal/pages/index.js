import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const handleSubmit = () => {
    console.log("made it here");
  }


  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor={'usernameField'}>Username: </label>
            <input name='usernameField' type={"text"}></input>
            <label htmlFor={'passwordField'}>Password: </label>
            <input name={'passwordField'} type={"text"}></input>
            <input type={'submit'} value={'Log in'}></input>
          </form>
        </div>
      </main>
    </>
  )
}
