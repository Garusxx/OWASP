import type { OwaspItem } from '../types/owasp'
import '../style/OwaspNav.css'

type Props = {
  items: OwaspItem[]
}

function OwaspNav({ items }: Props) {
  return (
    <nav className="owasp-nav">
      {items.map((item, index) => (
        <a key={item.id} href={`#${item.id}`} className="owasp-nav-link">
          A{index + 1}
        </a>
      ))}
    </nav>
  )
}

export default OwaspNav