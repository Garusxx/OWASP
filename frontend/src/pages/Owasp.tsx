import OwaspSection from '../components/OwaspSection'
import '../style/Owasp.css'

const owaspItems = [
  {
    title: 'A1: Broken Access Control',
    description: 'Access control enforces what users are allowed to do.'
  },
  {
    title: 'A2: Cryptographic Failures',
    description: 'Weak or missing cryptography can expose sensitive data.'
  },
  {
    title: 'A3: Injection',
    description: 'Injection happens when untrusted data is sent to an interpreter.'
  }
]

function Owasp() {
  return (
    <>
      <div className="owasp-header">
        <h1>OWASP Top 10</h1>
      </div>

      <div className="owasp">
        {owaspItems.map((item) => (
          <OwaspSection
            key={item.title}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </>
  )
}

export default Owasp