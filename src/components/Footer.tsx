import emailIcon from '../assets/social/email.svg';
import githubIcon from '../assets/social/github.svg';
import linkedinIcon from '../assets/social/linkedin.svg';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="contact-links" aria-label="Kontak Fathan Rafif Athaya">
        <a
          href="https://www.linkedin.com/in/fathan-rafif-athaya-80bb37437"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn: Fathan Rafif Athaya"
        >
          <img src={linkedinIcon} alt="" width="32" height="32" />
          <span>Fathan Rafif Athaya</span>
        </a>
        <a
          href="mailto:fathanrafif20@gmail.com"
          aria-label="Email: fathanrafif20@gmail.com"
        >
          <img src={emailIcon} alt="" width="32" height="32" />
          <span>fathanrafif20@gmail.com</span>
        </a>
        <a
          href="https://github.com/fathanra-20"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub: fathanra-20"
        >
          <img src={githubIcon} alt="" width="32" height="32" />
          <span>fathanra-20</span>
        </a>
      </div>
      <p>© 2026 Fathan Rafif Athaya. Hak Cipta Dilindungi.</p>
    </footer>
  );
}
