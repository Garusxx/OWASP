import { Link } from 'react-router-dom'
import '../style/Home.css'

function Home() {
  return (
    <div className="home">
      <div className="home-container">
        
        <div className="logo">🔐 OWASP</div>

        <h1>OWASP Security Project</h1>

        <p>
          Learn about the most critical web security risks and how to prevent them.
        </p>

        <Link to="/owasp" className="btn">
          Explore OWASP Top 10 →
        </Link>

      </div>
    </div>
  )
}

export default Home