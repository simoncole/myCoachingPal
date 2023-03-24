import styles from '../../styles/Home.module.css';
import { useState } from 'react';

const LoginForm = ({loginData, setFormDataState}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await setFormDataState({"username": username, "password": password});
    loginData.refetch();
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className={styles.loginFormWrapper}>

        <div className={styles.loginField}>
            <label htmlFor="username">Username: </label>
            <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            />
        </div>
        <div className={styles.loginField}>
            <label htmlFor="password">Password: </label>
            <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            />
        </div>
        <button className={styles.button} type="submit">Login</button>
        </div>

    </form>
  );
};

export default LoginForm;
