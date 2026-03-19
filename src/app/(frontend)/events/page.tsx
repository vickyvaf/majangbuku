import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Event } from '@/payload-types'
import './../styles.css'
import { MapPin, Calendar } from 'lucide-react'
import { Header } from '@/components/Header/Header'
import { RevealRow } from '@/components/RevealRow'
import { StripsHero } from '@/components/StripsHero'

export default async function EventsPage() {
  const payload = await getPayload({ config })

  const eventsPageData = await payload.findGlobal({
    slug: 'events-page',
  })

  const { docs: events } = await payload.find({
    collection: 'events',
    sort: '-date',
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
            eventsPageData.image && typeof eventsPageData.image === 'object'
              ? eventsPageData.image.url || ''
              : ''
          }
        />

        <div style={{ marginTop: '4rem' }}>
          {events.length === 0 ? (
            <div className="empty-state">
              <p>Belum ada kegiatan terbaru yang diunggah. Cek kembali nanti!</p>
            </div>
          ) : (
            <div className="events-table-container">
              <div className="events-table-header">
                <div className="col-event">KEGIATAN</div>
              </div>
              <div className="events-table-body">
                {events.map((event: Event, index: number) => {
                  const eventDate = new Date(event.date)
                  const formattedDate = eventDate.toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })

                  return (
                    <RevealRow key={event.id} className="event-table-row" delay={index * 50}>
                      <div className="col-event">
                        {event.image && typeof event.image !== 'number' && (
                          <div className="event-row-thumb-wrapper">
                            <img
                              src={event.image.url || ''}
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
                            {((event.description as any)?.root?.children?.[0]?.children?.[0]
                              ?.text as string) || ''}
                          </p>
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
