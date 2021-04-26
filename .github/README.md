# Axios Hook Library

[![NPM](https://img.shields.io/npm/v/axios-hook-library.svg)](https://www.npmjs.com/package/axios-hook-library)

[![GH-Pages](https://img.shields.io/github/deployments/nicklima/axios-hook-library/github-pages)](https://nicklima.github.io/axios-hook-library/)
[![GitHub License](https://img.shields.io/github/license/nicklima/axios-hook-library)](https://github.com/nicklima/axios-hook-library/)
[![GitHub Issues](https://img.shields.io/github/issues/nicklima/axios-hook-library)](https://github.com/nicklima/axios-hook-library/issues)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-blue.svg)](https://standardjs.com)
[![Code Size](https://img.shields.io/github/languages/code-size/nicklima/axios-hook-library)](https://github.com/nicklima/axios-hook-library)
[![Top Language](https://img.shields.io/github/languages/top/nicklima/axios-hook-library)](https://standardjs.com)
[![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat)](https://gitmoji.dev)

## Table of contents

- [About](#about)
- [Playground](#playground)
- [Technologies](#technologies)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage & Examples](#usage--examples)
  - [POST](#POST)
  - [GET](#GET)
  - [PATCH/PUT](#PATCH/PUT)
  - [DELETE](#DELETE)
- [TODO](#todo)
- [License](#license)

## About

This project was developed to help our team to minimize the code in our projects.

## Playground

[Click here](https://nicklima.github.io/axios-hook-library/) to view the project demo and made some tests requests.

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

To run the code on your machine, follow the steps below.

```bash
git clone git@github.com:nicklima/axios-hook-library.git
```

After cloning the project, we need to install all the dependencies.

```bash
npm install
```

Local development is broken into two parts (ideally using two tabs).
First, run rollup to watch your src/ module and automatically recompile it into dist/ whenever you make changes.

```bash
npm start # runs rollup with watch flag
```

The second part will be running the example/ create-react-app that's linked to the local version of your module.

We have to prepare the test environment to view the package that is being executed. Open another terminal window and run the following commands:

```bash
# (in another tab)
npm run example  # chage to example directory and install modules
```

And finally we can run the project and test.

```bash
# (on the same tab as the previous command)
npm run preview # runs create-react-app dev server
```

Now, anytime you make a change to your library in src/ or to the example app's example/src, create-react-app will live-reload your local dev server so you can iterate on your component in real-time.

## Usage & Examples

The package is not yet published but below are some examples of how to use Axios Hook Library.

First we will need to install the package

```bash
npm install --save axios-hook-library
```

### Usage

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
//Params: baseURL, method ("GET" | "POST" | "PUT" | "PATCH" | "DELETE"), data, headers
fetchData('https://jsonplaceholder.typicode.com/posts', 'GET')

//React States
//isLoading(boolean), isSuccess(boolean), hasError(boolean), rspData(object)
isLoading && <p>Loading</p>
isSuccess && <p>Sent</p>
hasError && <p>Error</p>
rspData && <pre>{JSON.stringify(data, null, 2)}</pre>
```

### Examples

Check below how to make requests with the Axios Hook Library

#### POST

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

#### GET

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

#### PATCH/PUT

```tsx
import React from 'react'
import useAxiosHook from 'axios-hook-library'

import logo from './logo.svg'
import './App.css'

const App = () => {
  const { isLoading, isSuccess, hasError, fetchData } = useAxiosHook()

  const formData = {
    title: 'Axios Hook Library',
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

#### DELETE

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

- [ ] Create a DOC page;
- [ ] Unitary tests with Jest to the axios functions;
- [ ] Check and fix all types;
- [ ] Add Headers Fields to Input headers options on Playground/Preview URL;
- [ ] Check the code and dependencies looking for Security Issues;

## License

MIT © [Nick Lima](https://github.com/nicklima)
