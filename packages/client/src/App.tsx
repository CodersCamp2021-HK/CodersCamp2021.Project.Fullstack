import './App.css';

import { ArticleDto, ArticlesApi, Configuration } from '@fullstack/sdk';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

import logo from './logo.svg';

const api = new ArticlesApi(
  new Configuration({
    basePath: 'http://localhost:4000',
  }),
);

const App = () => {
  const [count, setCount] = useState(0);

  const [data, setData] = useState<ArticleDto[]>([]);

  useEffect(() => {
    api.list().then((x) => {
      setData(x.data);
    });
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <ul>
          {data.map((article) => (
            <li key={article.id}>{JSON.stringify(article)}</li>
          ))}
        </ul>
        <p>Hello Vite + React!</p>
        <p>
          <Button variant='contained' onClick={() => setCount((x) => x + 1)}>
            count is: {count}
          </Button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
            Learn React
          </a>
          {' | '}
          <a
            className='App-link'
            href='https://vitejs.dev/guide/features.html'
            target='_blank'
            rel='noopener noreferrer'
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
};

export { App };
