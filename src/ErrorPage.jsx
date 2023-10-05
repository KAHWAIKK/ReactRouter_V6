import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <main className='Missing'>
        <h2>Opps!,Page Not Found</h2>
        <p>Well, that's disappointing</p>
        <p>
          <Link to="/">Go back to Our Homepage</Link>
        </p>
    </main>
  )
}

export default ErrorPage