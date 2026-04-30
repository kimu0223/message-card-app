'use client'

import { useReveal } from '@/hooks/useReveal'

const testimonials = [
  {
    name: '田中 翔太',
    role: '30代・会社員',
    initials: '田',
    color: 'var(--lp-terracotta)',
    quote:
      '妻の誕生日に何を贈るか毎年悩んでいましたが、CardMagicで初めてメッセージカードを作ったら「今までで一番嬉しい」と泣いて喜んでくれました。デザインセンスゼロの自分でも、3分で感動的なカードが作れるのは本当にすごいです。',
  },
  {
    name: '佐藤 美咲',
    role: '20代・主婦',
    initials: '佐',
    color: 'var(--lp-sage)',
    quote:
      '遠方に住む母に母の日のカードを送りました。封筒が開くアニメーションに母が「まるで手紙を受け取ったみたい」と感激していて、私まで嬉しくなりました。テンプレートが豊富で、毎回違うデザインを選べるのもお気に入りです。',
  },
  {
    name: '鈴木 健一',
    role: '40代・マネージャー',
    initials: '鈴',
    color: 'var(--lp-terracotta-deep)',
    quote:
      'チームメンバーの退職時に感謝のカードを贈っています。AI文章アシストのおかげで、気持ちをうまく言葉にできない自分でも温かいメッセージが書けるようになりました。URLを送るだけで届くのも、忙しい自分には助かります。',
  },
]

function StarRating() {
  return (
    <span
      aria-label="5つ星評価"
      style={{
        color: 'var(--lp-gold)',
        fontSize: 16,
        letterSpacing: '0.06em',
        lineHeight: 1,
      }}
    >
      {'★★★★★'}
    </span>
  )
}

export default function TestimonialsSection() {
  useReveal()

  return (
    <section className="relative py-[110px]" id="testimonials" style={{ position: 'relative', zIndex: 2 }}>
      <div className="mx-auto max-w-[1240px] px-8">
        {/* Eyebrow + Title */}
        <div className="lp-reveal text-center">
          <span
            className="inline-flex items-center gap-[10px]"
            style={{
              fontFamily: 'var(--font-lp-display)',
              fontStyle: 'italic',
              fontSize: 14,
              letterSpacing: '0.04em',
              color: 'var(--lp-terracotta)',
            }}
          >
            <span
              style={{
                width: 28,
                height: 1,
                background: 'var(--lp-terracotta)',
                opacity: 0.6,
                display: 'inline-block',
              }}
            />
            Testimonials
          </span>
          <h2
            className="mt-[14px] mb-[18px]"
            style={{
              fontFamily: 'var(--font-lp-serif)',
              fontWeight: 500,
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: 1.25,
              color: 'var(--lp-ink)',
            }}
          >
            ユーザーの声
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="mt-[60px] grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="lp-reveal flex flex-col rounded-[22px] border p-8"
              data-delay={i + 1}
              style={{
                background: 'var(--lp-paper)',
                borderColor: 'var(--lp-paper-line)',
                boxShadow: 'var(--lp-shadow-soft)',
              }}
            >
              {/* Quote mark */}
              <span
                aria-hidden="true"
                style={{
                  fontFamily: 'var(--font-lp-display)',
                  fontSize: 48,
                  lineHeight: 1,
                  color: 'var(--lp-terracotta)',
                  opacity: 0.35,
                  userSelect: 'none',
                }}
              >
                &ldquo;
              </span>

              {/* Quote text */}
              <p
                className="mt-2 flex-1 text-[15px] leading-[1.85]"
                style={{ color: 'var(--lp-ink-soft)' }}
              >
                {t.quote}
              </p>

              {/* Rating */}
              <div className="mt-5 mb-5">
                <StarRating />
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 border-t pt-5" style={{ borderColor: 'var(--lp-paper-line)' }}>
                {/* Avatar */}
                <div
                  className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full"
                  style={{
                    background: t.color,
                    color: '#fff',
                    fontFamily: 'var(--font-lp-serif)',
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <p
                    className="m-0"
                    style={{
                      fontFamily: 'var(--font-lp-serif)',
                      fontWeight: 500,
                      fontSize: 15,
                      color: 'var(--lp-ink)',
                      lineHeight: 1.4,
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="m-0"
                    style={{
                      fontSize: 13,
                      color: 'var(--lp-ink-mute)',
                      lineHeight: 1.4,
                    }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
