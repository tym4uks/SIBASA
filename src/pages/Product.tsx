import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { products, rub } from '../data'
import { useCart } from '../cart'
import { Photo, Stepper, btnOutline, btnPrimary, container } from '../ui'
import { ProductCard } from './Catalog'

const weights = [
  { l: '500 г', k: 0.5 },
  { l: '1 кг', k: 1 },
  { l: '2 кг', k: 2 },
]
const tabs = ['Описание', 'Состав и польза', 'Доставка']

export default function Product() {
  const { id } = useParams()
  const p = products.find((x) => x.id === Number(id)) ?? products[0]
  const { add } = useCart()
  const nav = useNavigate()
  const [w, setW] = useState(1)
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState(0)
  const content = [
    `${p.name} — ${p.desc.toLowerCase()}. Происхождение: ${p.origin}. Поставляется в вакуумной упаковке, сохраняет вкус и текстуру до момента приготовления.`,
    'Богат омега-3 жирными кислотами, высококачественным белком, витаминами D и B12, селеном и йодом. Поддерживает работу сердца и мозга.',
    'Доставка по Москве за 2 часа в термосумке со льдом. Бесплатно при заказе от 5 000 ₽, иначе 350 ₽. По Подмосковью — в день заказа.',
  ]
  const price = Math.round(p.price * weights[w].k)
  const related = products.filter((x) => x.id !== p.id).slice(0, 4)

  return (
    <main className={`${container} py-10`}>
      <nav className="text-sm text-mute">
        <Link to="/" className="hover:text-deep">Главная</Link> / <Link to="/catalog" className="hover:text-deep">Каталог</Link> / <span className="text-deep">{p.name}</span>
      </nav>
      <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
        <Photo className="aspect-square rounded-3xl shadow-soft" />
        <div className="flex flex-col justify-center">
          <span className="w-fit rounded-full bg-foam px-3 py-1 text-xs font-semibold text-teal">{p.category} · {p.origin}</span>
          <h1 className="mt-4 text-4xl text-deep md:text-5xl">{p.name}</h1>
          <p className="mt-3 text-mute">{p.desc}</p>
          <p className="mt-6 text-3xl font-semibold text-deep">{rub(price)}</p>
          <h4 className="mb-3 mt-8 text-sm text-deep">Вес</h4>
          <div className="flex gap-2">
            {weights.map((x, i) => (
              <button key={x.l} onClick={() => setW(i)} className={`rounded-full px-5 py-2 text-sm font-medium transition cursor-pointer ${w === i ? 'bg-deep text-white' : 'bg-foam text-ink hover:bg-teal/20'}`}>{x.l}</button>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Stepper value={qty} onChange={setQty} />
            <button className={`${btnPrimary} flex-1`} onClick={() => { add(p.id, qty); nav('/cart') }}>Добавить в корзину</button>
          </div>
          <button className={`${btnOutline} mt-3`} onClick={() => { add(p.id, qty); nav('/cart') }}>Купить сейчас</button>
        </div>
      </div>

      <section className="mt-20 rounded-3xl bg-white p-6 shadow-soft md:p-10">
        <div className="flex gap-2 overflow-x-auto border-b border-deep/10 pb-4">
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium cursor-pointer transition ${tab === i ? 'bg-deep text-white' : 'text-mute hover:text-deep'}`}>{t}</button>
          ))}
        </div>
        <p className="mt-6 max-w-3xl leading-relaxed text-ink">{content[tab]}</p>
      </section>

      <h2 className="mb-8 mt-24 text-3xl text-deep">С этим покупают</h2>
      <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4">
        {related.map((r) => <ProductCard key={r.id} p={r} />)}
      </div>
    </main>
  )
}
