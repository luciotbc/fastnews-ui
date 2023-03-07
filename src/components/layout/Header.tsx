import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import siteMetadata from '@/data/siteMetadata'

import ThemeSwitch from './ThemeSwitch'

const Header: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  return (
    <header>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex flex-1">
          <div className="flex lg:hidden"></div>
        </div>
        <Link href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">{siteMetadata.headerTitle}</span>
          {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
            <Image
              src="/static/images/logo_white.png"
              alt="Ivaí.news Logo"
              width={133}
              height={60}
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          ) : (
            <Image
              src="/static/images/logo.png"
              alt="Ivaí.news Logo"
              width={133}
              height={60}
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          )}
        </Link>
        <div className="flex flex-1 justify-end">
          <ThemeSwitch />
        </div>
      </nav>
    </header>
  )
}

export default Header
