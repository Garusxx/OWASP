import type { ReactNode } from "react";

type Props = {
  id: string;
  title: string;
  children?: ReactNode;
};

function OwaspSection({ id, title, children }: Props) {
  return (
    <section id={id} className="owasp-section">
      <div className="owasp-section-content">
        <div className="owasp-content">
          <h2 className="owasp-section-title">{title}</h2>
          {children}
        </div>
      </div>
    </section>
  );
}

export default OwaspSection;
