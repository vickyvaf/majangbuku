import { Header } from '@/components/Header/Header'
import { RevealRow } from '@/components/RevealRow'
import { StripsHero } from '@/components/StripsHero'
import { Event } from '@/payload-types'
import config from '@/payload.config'
import { Calendar, MapPin } from 'lucide-react'
import { getPayload } from 'payload'
import './../styles.css'

export const dynamic = 'force-dynamic'
export const revalidate = 0


export default async function EventsPage() {
  const payload = await getPayload({ config })

  const eventsPageData = await payload.findGlobal({
    slug: 'events-page',
  })

  const { docs: events } = await payload.find({
    collection: 'events',
    limit: 100000
  })

  const now = new Date()
  const sortedEvents = [...events].sort((a: Event, b: Event) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()

    const isPastA = dateA < now.getTime()
    const isPastB = dateB < now.getTime()

    // Keep active/upcoming events at the top
    if (isPastA && !isPastB) return 1
    if (!isPastA && isPastB) return -1

    // Chronologically sort both active and past lists ascending (earlier dates first)
    return dateA - dateB
  })

  return (
    <>
      <Header />
      <div className="page-container">
        <h1 className="page-title">{eventsPageData.title}</h1>
        {eventsPageData.subtitle && (
          <p className="section-text" style={{ fontSize: '1.25rem', textAlign: 'center' }}>
            {eventsPageData.subtitle}
          </p>
        )}

        {/* Dynamic Image Merge Effect */}
        <StripsHero
          imageSrc={
            eventsPageData.imageUrl ||
            (eventsPageData.image && typeof eventsPageData.image === 'object'
              ? eventsPageData.image.url || ''
              : '')
          }
        />

        <div>
          {sortedEvents.length === 0 ? (
            <div className="empty-state">
              <p>Belum ada kegiatan terbaru yang diunggah. Cek kembali nanti!</p>
            </div>
          ) : (
            <div className="events-table-container">
              <div className="events-table-header">
                <div className="col-event">KEGIATAN</div>
              </div>
              <div className="events-table-body">
                {sortedEvents?.map((event: Event, index: number) => {
                  const eventDate = new Date(event.date)
                  const isPast = eventDate < new Date()
                  const formattedDate = eventDate.toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                  const hasImage = !!(event.imageUrl || (event.image && typeof event.image !== 'number'))

                  return (
                    <RevealRow key={event.id} className="event-table-row" delay={Math.min(index * 50, 500)}>
                      <div className={`col-event ${hasImage ? 'has-image' : 'no-image'}`}>
                        {(event.imageUrl || (event.image && typeof event.image !== 'number')) && (
                          <div className="event-row-thumb-wrapper">
                            <img
                              src={
                                event.imageUrl ||
                                (event.image && typeof event.image !== 'number'
                                  ? event.image.url || ''
                                  : '')
                              }
                              alt={event.title}
                              className="event-row-thumb"
                            />
                          </div>
                        )}
                        <div className="event-row-info">
                          <h3 className="event-row-title">{event.title}</h3>
                          {event.location && (
                            <p className="event-row-location">
                              <MapPin
                                size={14}
                                style={{
                                  display: 'inline',
                                  verticalAlign: 'middle',
                                  marginRight: '4px',
                                }}
                              />
                              {event.location}
                            </p>
                          )}
                          <p className="event-row-location" suppressHydrationWarning>
                            <Calendar
                              size={14}
                              style={{
                                display: 'inline',
                                verticalAlign: 'middle',
                                marginRight: '4px',
                              }}
                            />
                            {formattedDate}
                          </p>
                          <p className="event-row-subtitle">
                            {event.description
                              ? ((event.description as any)?.root?.children?.[0]?.children?.[0]
                                ?.text as string) || ''
                              : ''}
                          </p>
                          {event.buttonLink && !isPast && (
                            <a
                              href={event.buttonLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="event-row-btn"
                            >
                              Daftar Sekarang
                            </a>
                          )}
                        </div>
                      </div>
                    </RevealRow>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
