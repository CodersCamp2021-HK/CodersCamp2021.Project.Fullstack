import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Configuration, ArticlesApi, ArticleDto } from '@fullstack/sdk';


const api = new ArticlesApi(new Configuration({
  basePath: 'http://localhost:4000'
}));

function App() {
  const [count, setCount] = useState(0)

  const [data, setData] = useState<ArticleDto[]>([]);

  useEffect(() => {
    api.getAll().then((data) => {
      setData(data.data);
    })
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {data.map((article) => 
          <li>
            {JSON.stringify(article)}
          </li>)}
        </ul>
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
