export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')

  const base = 'https://weatherapp.example.com'
  const locales = [
    { code: 'en', prefix: '' },
    { code: 'ru', prefix: '/ru' },
    { code: 'uz', prefix: '/uz' },
  ]

  const pages = [{ path: '/', priority: '1.0', changefreq: 'daily' }]

  const urls = pages.flatMap((page) =>
    locales.map(({ code, prefix }) => {
      const url = `${base}${prefix}${page.path === '/' ? '' : page.path}`
      const alternates = locales
        .map(
          (l) =>
            `<xhtml:link rel="alternate" hreflang="${l.code}" href="${base}${l.prefix}${page.path === '/' ? '' : page.path}"/>`
        )
        .join('\n      ')
      const xDefault = `<xhtml:link rel="alternate" hreflang="x-default" href="${base}${page.path === '/' ? '' : page.path}"/>`

      return `  <url>
    <loc>${url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${alternates}
    ${xDefault}
  </url>`
    })
  )

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${urls.join('\n')}
</urlset>`
})
