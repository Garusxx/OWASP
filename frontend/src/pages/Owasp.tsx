import '../style/Owasp.css'
import OwaspSection from '../components/OwaspSection'
import useSectionScroll from '../hooks/useSectionScroll'
import OwaspNav from '../components/OwaspNav'
import type { OwaspItem } from '../types/owasp'



const owaspItems:OwaspItem[] = [
  {
    id: 'broken-access-control',
    title: 'A1: Broken Access Control',
    description: 'Access control enforces what users are allowed to do.'
  },
  {
    id: 'cryptographic-failures',
    title: 'A2: Cryptographic Failures',
    description: 'Weak or missing cryptography can expose sensitive data.'
  },
  {
    id: 'injection',
    title: 'A3: Injection',
    description: 'Injection happens when untrusted data is sent to an interpreter.'
  }
]

function Owasp() {
  const containerRef = useSectionScroll({
    sectionSelector: '.owasp-section'
  })

  return (
    <>
      <div className="owasp-header">
        <h1>OWASP Top 10</h1>
      </div>

      <OwaspNav items={owaspItems}/>


      <div ref={containerRef} className="owasp">
        {owaspItems.map((item) => (
          <OwaspSection
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </>
  )
}

export default Owasp
