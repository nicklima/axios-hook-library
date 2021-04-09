[![NPM](https://img.shields.io/npm/v/axios-hook-library.svg)](https://www.npmjs.com/package/axios-hook-library) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# Axios Hook Library

## Table of contents

- [About](#about)
- [Playground](#playground)
- [Technologies](#technologies)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage & Examples](#usage-&-examples)
  - [POST](#POST)
  - [GET](#GET)
  - [PATCH/PUT](#PATCH/PUT)
  - [DELETE](#DELETE)
- [TODO](#todo)
- [License](#license)

## About

This project was developed as an NPM package to aid in our internal development to minimize code on our projects.

## Playground

[Click here](http://nicklima.com.br) to view the project demo and made tests requests.

## Technologies

- [React](https://pt-br.reactjs.org/)
- [TypeScript](https://www.typescriptlang.org)
- [PropTypes](https://github.com/facebook/prop-types)

## Dependencies

- [Node](https://nodejs.org/en/download/)
- [Create React Lib](https://www.npmjs.com/package/create-react-library)
- [MicroBundle CRL](https://www.npmjs.com/package/microbundle-crl)
- [Axios](https://www.npmjs.com/package/axios)
- [Pretier](https://prettier.io/)
- [Eslint](https://eslint.org/)
- [Jest](https://jestjs.io/pt-BR/)
- [CrossEnv](https://www.npmjs.com/package/cross-env)

## Installation

```bash
npm install --save axios-hook-library
```

## Usage & Examples

Here are some examples of how to use Axios Hook Library

### Usage

```tsx
import React from 'react'
import useAxiosHook from 'axios-hook-library'

import logo from './logo.svg'
import './App.css'

const App = () => {
  const { isLoading, isSuccess, hasError, rspData, fetchData } = useAxiosHook()

  return (
    <main>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
        </header>
      </div>
    </main>
  )
}

export default App
```

```tsx
//If you want to reset isSucess state pass a time param to use the hook.
//Ex: useAxiosHook(3000)
const { isLoading, isSuccess, hasError, rspData, fetchData } = useAxiosHook()

//Function fetchData
//Params: baseURL, method, data, headers, responseType
fetchData('https://jsonplaceholder.typicode.com/posts', 'GET')

//React States
//isLoading(boolean), isSuccess(boolean), hasError(boolean), rspData(object)
isLoading && <p>Loading</p>
isSuccess && <p>Sent</p>
hasError && <p>Error</p>
rspData && <pre>{JSON.stringify(data, null, 2)}</pre>
```

### POST

```tsx
import React from 'react'
import useAxiosHook from 'axios-hook-library'

import logo from './logo.svg'
import './App.css'

const App = () => {
  const { isLoading, isSuccess, hasError, fetchData } = useAxiosHook()

  const formData = {
    title: 'New Post',
    body:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia asperiores mollitia ipsam aliquam dolore, similique et enim error non iste illo inventore voluptate debitis.',
    userId: 1
  }

  return (
    <main>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <button
            onClick={() =>
              fetchData(
                'https://jsonplaceholder.typicode.com/posts',
                'POST',
                formData
              )
            }
          >
            Send Request
          </button>
        </header>
        {isLoading && <p>Sending Data...</p>}
        {hasError && <p>Some error occurred, try again.</p>}
        {isSuccess && <p>Data Sent!</p>}
      </div>
    </main>
  )
}

export default App
```

### GET

```tsx
import React from 'react'
import useAxiosHook from 'axios-hook-library'

import logo from './logo.svg'
import './App.css'

const App = () => {
  const { isLoading, hasError, rspData, fetchData } = useAxiosHook()

  //Function to check if the object is empty
  const checkData = () => {
    if (Object.keys(rspData).length !== 0) {
      return true
    }
    return false
  }

  return (
    <main>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <button
            onClick={() =>
              fetchData(
                'https://jsonplaceholder.typicode.com/posts/1/comments',
                'GET'
              )
            }
          >
            Get Posts
          </button>
        </header>
        <div className='posts'>
          {isLoading && <p>Loading Content...</p>}
          {hasError && <p>Some error occurred, try again.</p>}
          {checkData() &&
            rspData.data.map((post: any) => {
              return (
                <div key={post.id}>
                  <h1>{post.title}</h1>
                  <p>{post.body}</p>
                </div>
              )
            })}
        </div>
      </div>
    </main>
  )
}

export default App
```

### PATCH/PUT

```tsx
import React from 'react'
import useAxiosHook from 'axios-hook-library'

import logo from './logo.svg'
import './App.css'

const App = () => {
  const { isLoading, isSuccess, hasError, fetchData } = useAxiosHook()

  const formData = {
    title: 'New Post',
    userId: 1
  }

  return (
    <main>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <button
            onClick={() =>
              fetchData(
                'https://jsonplaceholder.typicode.com/posts/1',
                'PATCH',
                formData
              )
            }
          >
            Send Request
          </button>
        </header>
        {isLoading && <p>Sending Data...</p>}
        {hasError && <p>Some error occurred, try again.</p>}
        {isSuccess && <p>Post Updated!</p>}
      </div>
    </main>
  )
}

export default App
```

### DELETE

```tsx
import React from 'react'
import useAxiosHook from 'axios-hook-library'

import logo from './logo.svg'
import './App.css'

const App = () => {
  const { isLoading, isSuccess, hasError, fetchData } = useAxiosHook()

  return (
    <main>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <button
            onClick={() =>
              fetchData(
                'https://jsonplaceholder.typicode.com/posts/1',
                'DELETE'
              )
            }
          >
            Delete Post
          </button>
        </header>
        {isLoading && <p>Trying to delete...</p>}
        {hasError && <p>Some error occurred, try again.</p>}
        {isSuccess && <p>Deleted with success!</p>}
      </div>
    </main>
  )
}

export default App
```

## TODO

Here are some features that i want to add in the package. If you want to help, send me a PR

- [ ] Unitary tests with Jest to the axios functions;
- [ ] Add Headers Fields to Input headers options on Playground/Preview URL;
- [ ] Security measures;

## License

MIT © [Nick Lima](https://github.com/nicklima)
