type Props = {
  id: string
  title: string
  description: string
}

function OwaspSection({ id, title, description }: Props) {
  return (
    <section id={id} className="owasp-section">
      <div className="owasp-section-content">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </section>
  )
}

export default OwaspSection