# Axios Hook Library

[![NPM](https://img.shields.io/npm/v/axios-hook-library.svg)](https://www.npmjs.com/package/axios-hook-library) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save axios-hook-library
```

## Usage

```tsx
import React, { Component } from 'react'
import useAxiosHook from 'axios-hook-library'

import logo from './logo.svg'
import './App.css'

const App = () => {
  const { isLoading, isSuccess, hasError, rspData, fetchData } = useAxiosHook()
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <button
          onClick={() =>
            fetchData('https://jsonplaceholder.typicode.com/posts', 'GET')
          }
          type='button'
        >
          Send Request
        </button>
      </header>
    </div>
  )
}
```

## License

MIT © [Nick Lima](https://github.com/nicklima)
