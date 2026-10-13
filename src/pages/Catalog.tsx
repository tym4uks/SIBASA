import { useState } from 'react'
import { Link } from 'react-router'
import { SlidersHorizontal } from 'lucide-react'
import { products, rub, type Product } from '../data'
import { useCart } from '../cart'
import { Photo, btnPrimary, container } from '../ui'

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart()
  return (
    <div className="flex flex-col rounded-2xl bg-white p-3 shadow-soft transition duration-300 hover:-translate-y-1.5 hover:shadow-lift">
      <Link to={`/product/${p.id}`}>
        <Photo className="aspect-square rounded-xl" />
      </Link>
      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <Link to={`/product/${p.id}`} className="font-semibold text-deep hover:text-teal">{p.name}</Link>
        <p className="mt-1 text-sm leading-snug text-mute">{p.desc}</p>
        <div className="mt-4 flex items-baseline justify-between">
          <span className="text-lg font-semibold text-deep">{rub(p.price)}</span>
          <span className="rounded-full bg-foam px-2.5 py-0.5 text-xs font-medium text-teal">{p.weight}</span>
        </div>
        <button className={`${btnPrimary} mt-4 w-full`} onClick={() => add(p.id)}>В корзину</button>
      </div>
    </div>
  )
}

function Group({ title, options, value, onChange }: { title: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <h4 className="mb-3 text-sm text-deep">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {['Все', ...options].map((o) => (
          <button key={o} onClick={() => onChange(o)} className={`rounded-full px-3.5 py-1.5 text-sm transition cursor-pointer ${value === o ? 'bg-deep text-white' : 'bg-foam text-ink hover:bg-teal/20'}`}>
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Catalog() {
  const [cat, setCat] = useState('Все')
  const [fresh, setFresh] = useState('Все')
  const [origin, setOrigin] = useState('Все')
  const [max, setMax] = useState(15000)
  const [open, setOpen] = useState(false)
  const [more, setMore] = useState(false)

  const list = products.filter(
    (p) => (cat === 'Все' || p.category === cat) && (fresh === 'Все' || p.fresh === fresh) && (origin === 'Все' || p.origin === origin) && p.price <= max,
  )
  const shown = more ? [...list, ...list] : list

  return (
    <main className={`${container} py-12`}>
      <h1 className="text-4xl text-deep">Каталог</h1>
      <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-deep shadow-soft md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
        <SlidersHorizontal size={16} /> Фильтры
      </button>
      <div className="mt-8 grid gap-10 md:grid-cols-[250px_1fr]">
        <aside className={`${open ? 'block' : 'hidden'} h-fit space-y-8 rounded-2xl bg-white p-6 shadow-soft md:sticky md:top-24 md:block`}>
          <Group title="Категория" options={['Рыба', 'Морепродукты', 'Икра', 'Копчёности']} value={cat} onChange={setCat} />
          <div>
            <h4 className="mb-3 flex justify-between text-sm text-deep">Цена <span className="font-medium text-mute">до {rub(max)}</span></h4>
            <input type="range" min={500} max={15000} step={100} value={max} onChange={(e) => setMax(+e.target.value)} className="w-full" />
          </div>
          <Group title="Свежесть" options={['Охлаждённое', 'Замороженное']} value={fresh} onChange={setFresh} />
          <Group title="Происхождение" options={['Норвегия', 'Турция', 'Вьетнам', 'Россия', 'Чили']} value={origin} onChange={setOrigin} />
        </aside>
        <section>
          {shown.length ? (
            <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 xl:grid-cols-3">
              {shown.map((p, i) => <ProductCard key={i} p={p} />)}
            </div>
          ) : (
            <p className="rounded-2xl bg-foam p-10 text-center text-mute">Ничего не найдено. Измените фильтры.</p>
          )}
          {!more && list.length > 0 && (
            <div className="mt-12 text-center">
              <button className="rounded-xl border-[1.5px] border-teal px-8 py-3 text-sm font-semibold text-teal transition hover:bg-teal hover:text-white cursor-pointer" onClick={() => setMore(true)}>Показать ещё</button>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
