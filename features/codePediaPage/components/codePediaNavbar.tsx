import Link from 'next/link'
export default function CodePediaNavbar() {
  const navLinkClassName = 'flex h-full items-center hover:border-b-2 hover:text-black'
  const linkGroups = [
    [
      { href: '/', label: 'Portada' },
      { href: '/acerca-de', label: 'Discusion' },
    ],
    [
      { href: '/contacto', label: 'Leer' },
      { href: '/politica-de-privacidad', label: 'codigo Fuente' },
      { href: '/terminos-de-servicio', label: 'Ver Historial' },
      { href: '/cookies', label: 'Herramientas' },
    ],
  ]

  return (
    <nav className="mt-5 flex h-8 items-center justify-between border-y border-gray-400 text-sm font-medium text-blue-700">
      {linkGroups.map((group, index) => (
        <div key={index} className="flex h-full items-center gap-3">
          {group.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClassName}>
              {item.label}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  )
}
