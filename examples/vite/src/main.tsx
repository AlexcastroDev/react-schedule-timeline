import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../../../src'
import db from '../../../__mocks__'
import './App.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App
      data={db}
      components={{
        header: {
          sidebarTop: <div> Header </div>,
        },
        eventAreaItem: (datum) => {
          return <span>#{datum.id}</span>
        },
      }}
    />
  </React.StrictMode>
)
