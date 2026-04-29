import type { ReactNode } from "react";

type Props = {
  id: string;
  title: string;
  children?: ReactNode;
};

function OwaspSection({ id, title, children }: Props) {
  return (
    <section id={id} className="owasp-section">
      <h2 className="owasp-section-title">{title}</h2>

      <div className="owasp-section-content">
        <div className="owasp-content">{children}</div>
      </div>
    </section>
  );
}

export default OwaspSection;
