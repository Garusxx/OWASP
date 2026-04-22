type Props = {
  title: string
  description: string
}

function OwaspSection({ title, description }: Props) {
  return (
    <section className="owasp-section">
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  )
}

export default OwaspSection