import type { OwaspItem } from '../types/owasp'
import '../style/OwaspNav.css'

type Props = {
  items: OwaspItem[]
  activeId: string
}

function OwaspNav({ items, activeId }: Props) {
  return (
    <nav className="owasp-nav">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`owasp-nav-link ${activeId === item.id ? 'active' : ''}`}
        >
          {item.title.split(':')[0]}
        </a>
      ))}
    </nav>
  )
}

export default OwaspNav