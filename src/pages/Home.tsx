import { Link } from 'react-router'
import { Clock, Gem, Snowflake } from 'lucide-react'
import { LinkButton, Photo, container } from '../ui'

const cats = ['Рыба', 'Морепродукты', 'Икра', 'Копчёности']
const why = [
  { icon: Clock, t: 'Доставка за 2 часа', d: 'Курьер привезёт заказ в термосумке по Москве и ближнему Подмосковью.' },
  { icon: Snowflake, t: 'Свежесть гарантирована', d: 'Прямые поставки, холодовая цепь без разрывов, контроль на каждом этапе.' },
  { icon: Gem, t: 'Премиум качество', d: 'Отбираем только лучшие партии у проверенных хозяйств мира.' },
]

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-b from-cream to-foam">
        <svg className="pointer-events-none absolute inset-x-0 bottom-0 w-full text-teal/10" viewBox="0 0 1440 200" preserveAspectRatio="none" height="200" fill="none" stroke="currentColor" strokeWidth="1.5">
          {[0, 24, 48, 72].map((o) => (
            <path key={o} d={`M0 ${90 + o} Q 180 ${40 + o} 360 ${90 + o} T 720 ${90 + o} T 1080 ${90 + o} T 1440 ${90 + o}`} />
          ))}
        </svg>
        <div className={`${container} relative py-24 md:py-36`}>
          <span className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-teal shadow-soft">Улов дня уже в магазине</span>
          <h1 className="mt-7 max-w-3xl text-4xl leading-[1.08] text-deep sm:text-5xl md:text-7xl">Свежая рыба и морепродукты с доставкой</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute">Премиальный улов от проверенных поставщиков — на вашем столе в течение двух часов после заказа.</p>
          <div className="mt-10"><LinkButton to="/catalog">Перейти в каталог</LinkButton></div>
        </div>
      </section>

      <section className={`${container} pt-24`}>
        <h2 className="text-3xl text-deep md:text-4xl">Категории</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {cats.map((c) => (
            <Link key={c} to="/catalog" className="group rounded-2xl bg-white p-3 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
              <Photo className="aspect-[4/5] rounded-xl" />
              <p className="px-2 pb-2 pt-4 font-semibold text-deep">{c}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={`${container} pt-28`}>
        <h2 className="text-3xl text-deep md:text-4xl">Почему СИБАСА</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {why.map((w) => (
            <div key={w.t} className="rounded-2xl bg-foam p-8">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-white text-teal shadow-soft"><w.icon size={22} /></div>
              <h3 className="mt-6 text-xl text-deep">{w.t}</h3>
              <p className="mt-3 leading-relaxed text-mute">{w.d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
