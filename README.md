# Axios Hook Library

[![NPM](https://img.shields.io/npm/v/axios-hook-library.svg)](https://www.npmjs.com/package/axios-hook-library)

[![GH-Pages](https://img.shields.io/github/deployments/nicklima/axios-hook-library/github-pages)](https://nicklima.github.io/axios-hook-library/)
[![GitHub License](https://img.shields.io/github/license/nicklima/axios-hook-library)](https://github.com/nicklima/axios-hook-library/)
[![ISSUES](https://img.shields.io/github/issues/nicklima/axios-hook-library)](https://github.com/nicklima/axios-hook-library/issues)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-blue.svg)](https://standardjs.com)
[![Code Size](https://img.shields.io/github/languages/code-size/nicklima/axios-hook-library)](https://github.com/nicklima/axios-hook-library)
[![Top Language](https://img.shields.io/github/languages/top/nicklima/axios-hook-library)](https://standardjs.com)

## Table of contents

- [About](#about)
- [Playground](#playground)
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
  - [POST](#POST)
  - [GET](#GET)
  - [PATCH/PUT](#PATCH/PUT)
  - [DELETE](#DELETE)
- [License](#license)

## About

This project was developed as an NPM package to aid in our internal development to minimize code on our projects.

## Playground

[Click here](https://nicklima.github.io/axios-hook-library/) to view the project demo and made some tests requests.

## Installation

```bash
# npm
npm install axios-hook-library

# yarn
yarn add axios-hook-library
```

## Usage

Once installed just import it into your JSX file as in the example below

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

In the code below we have some useful information on how to use the library

```tsx
//If you want to reset the isSuccess state, pass a time parameter on the hook call.
//Ex: useAxiosHook(3000)
const { isLoading, isSuccess, hasError, rspData, fetchData } = useAxiosHook()

//Function fetchData
//Params: baseURL, method ("GET" | "POST" | "PUT" | "PATCH" | "DELETE"), data
fetchData('https://jsonplaceholder.typicode.com/posts', 'GET')

//React States
//isLoading(boolean), isSuccess(boolean), hasError(boolean), rspData(object)
isLoading && <p>Loading</p>
isSuccess && <p>Sent</p>
hasError && <p>Error</p>
rspData && <pre>{JSON.stringify(rspData, null, 2)}</pre>
```

## Examples

Check below how to make requests with the Axios Hook Library

### POST

```tsx
import React from 'react'
import useAxiosHook from 'axios-hook-library'

import logo from './logo.svg'
import './App.css'

const App = () => {
  const { isLoading, isSuccess, hasError, fetchData } = useAxiosHook()

  const formData = {
    title: 'Axios Hook Library',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    userId: 1,
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
            Get Comments
          </button>
        </header>
        <div className='comments'>
          {isLoading && <p>Loading Content...</p>}
          {hasError && <p>Some error occurred, try again.</p>}
          {checkData() &&
            rspData.data.map((comment: any) => {
              return (
                <div key={comment.id}>
                  <h1>{comment.title}</h1>
                  <p>{comment.body}</p>
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
    title: 'Axios Hook Library',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    userId: 1,
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

## License

MIT © [Nick Lima](https://github.com/nicklima)
