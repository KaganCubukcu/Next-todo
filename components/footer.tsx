import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons'

export function Footer() {
  return (
    <footer className="w-full border-t pb-1 pt-1">
      <div className="container flex h-14 flex-col items-center justify-center py-8">
        <p className="text-sm text-muted-foreground mb-4">
          Focus Flow - Your Personal Task Management App
        </p>
        <div className="flex space-x-4">
          <a
            href="https://github.com/kagancubukcu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <SiGithub size={20} />
          </a>
          <a
            href="https://linkedin.com/in/kagancubukcu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <SiLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}
