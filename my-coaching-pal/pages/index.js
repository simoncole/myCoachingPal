import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import {useQuery} from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import Unverified from './components/Unverified';
import { useRouter } from 'next/router';

export const baseUrl = "http://localhost:3000";

export default function Home() {
  const router = useRouter();
  const [formDataState, setFormDataState] = useState({});
  const [unverifiedState, setUnverifiedState] = useState(false);

  const queryKeyVars = {
    "formDataState": formDataState,
    "setUnverifiedState": setUnverifiedState,
    "router": router
  };
  const loginData = useQuery({
    queryKey: ["loginData", queryKeyVars],
    queryFn: () => fetchLoginData(queryKeyVars.formDataState), 
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: (data) => redirectUser(data, queryKeyVars.setUnverifiedState, queryKeyVars.router)
  });

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.loginWrapper}>
        <h1 className={styles.title}>Please Log In</h1>
        <LoginForm loginData={loginData} setFormDataState={setFormDataState}/>
        <Unverified unverifiedState={unverifiedState}/>
      </div>
    </>
  );
}

const fetchLoginData = async (formDataState) => {
  const queryString = `http://localhost:4000/verifyUser/?username=${formDataState.username}&password=${formDataState.password}`;
  console.log(queryString);
  const res = await fetch(queryString);
  return await res.json();
}

const redirectUser = (data, setUnverifiedState, router) => {
  if(data.role === "coach") router.push(`${baseUrl}/coach`);
  else if(data.role === "player") router.push(`${baseUrl}/player`);
  else if(data.role === "unverified") setUnverifiedState(true);
  else{
    console.error("there was an error in the role returned");
  }; 

  // window.location.replace(baseUrl + "/player");
}