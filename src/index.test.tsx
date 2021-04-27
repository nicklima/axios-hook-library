import React from 'react'
import ReactDOM from 'react-dom'

import useAxiosHook from './index'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

function App() {
  const { isLoading, isSuccess, hasError, rspData, fetchData } = useAxiosHook()

  const formData = {
    title: 'Axios Hook Library',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    userId: 1,
  }

  return (
    <div>
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
      {isLoading && <p>Sending Data...</p>}
      {hasError && <p>Some error occurred, try again.</p>}
      {isSuccess && <p>Data Sent!</p>}
      {rspData && <p>{JSON.stringify(rspData, null, 2)}</p>}
    </div>
  )
}
