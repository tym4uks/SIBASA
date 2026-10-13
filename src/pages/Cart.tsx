import { useState } from 'react'
import { Fish, Trash2, Waves } from 'lucide-react'
import { products, rub } from '../data'
import { useCart } from '../cart'
import { LinkButton, Photo, Stepper, btnPrimary, container } from '../ui'

export default function Cart() {
  const { items, setQty, remove } = useCart()
  const [promo, setPromo] = useState('')
  const [applied, setApplied] = useState(false)

  if (!items.length)
    return (
      <main className={`${container} flex flex-col items-center py-28 text-center`}>
        <div className="relative grid h-44 w-44 place-items-center rounded-full bg-foam text-teal/70">
          <Fish size={64} strokeWidth={1.3} />
          <Waves size={28} className="absolute bottom-8 right-8" />
        </div>
        <h1 className="mt-10 text-3xl text-deep">Ваша корзина пуста</h1>
        <p className="mt-3 text-mute">Загляните в каталог — там свежий улов дня.</p>
        <div className="mt-8"><LinkButton to="/catalog">Перейти в каталог</LinkButton></div>
      </main>
    )

  const lines = items.map((i) => ({ ...i, p: products.find((p) => p.id === i.id)! }))
  const sum = lines.reduce((a, l) => a + l.p.price * l.qty, 0)
  const discount = applied ? Math.round(sum * 0.1) : 0
  const delivery = sum >= 5000 ? 0 : 350
  const total = sum - discount + delivery

  return (
    <main className={`${container} py-12`}>
      <h1 className="text-4xl text-deep">Корзина</h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {lines.map(({ p, qty }) => (
            <div key={p.id} className="grid grid-cols-[88px_1fr_auto] items-center gap-x-4 gap-y-3 rounded-2xl bg-white p-4 shadow-soft sm:grid-cols-[96px_1fr_auto_auto_auto] sm:gap-5">
              <Photo className="aspect-square rounded-xl" label="" />
              <div>
                <p className="font-semibold text-deep">{p.name}</p>
                <p className="text-sm text-mute">{rub(p.price)} · {p.weight}</p>
              </div>
              <button aria-label="Удалить" className="justify-self-end rounded-full p-2 text-mute hover:bg-foam hover:text-coral sm:order-last cursor-pointer" onClick={() => remove(p.id)}><Trash2 size={18} /></button>
              <div className="col-span-2 sm:col-span-1"><Stepper value={qty} onChange={(n) => setQty(p.id, n)} /></div>
              <p className="justify-self-end font-semibold text-deep sm:min-w-24 sm:text-right">{rub(p.price * qty)}</p>
            </div>
          ))}
        </div>
        <aside className="h-fit space-y-4 rounded-2xl bg-white p-6 shadow-soft lg:sticky lg:top-24">
          <h2 className="text-xl text-deep">Ваш заказ</h2>
          <Row l="Товары" v={rub(sum)} />
          {applied && <Row l="Промокод" v={'−' + rub(discount)} />}
          <Row l="Доставка" v={delivery ? rub(delivery) : 'Бесплатно'} />
          <div className="flex justify-between border-t border-deep/10 pt-4 text-lg font-semibold text-deep"><span>Итого</span><span>{rub(total)}</span></div>
          <div className="flex gap-2">
            <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Промокод" className="min-w-0 flex-1 rounded-xl border border-deep/15 bg-cream px-4 py-3 text-sm" />
            <button className="rounded-xl bg-foam px-4 text-sm font-semibold text-teal hover:bg-teal hover:text-white cursor-pointer" onClick={() => setApplied(promo.trim().toUpperCase() === 'SIBASA')}>OK</button>
          </div>
          <p className="text-xs text-mute">Попробуйте код SIBASA — скидка 10%.</p>
          <button className={`${btnPrimary} w-full`}>Оформить заказ</button>
        </aside>
      </div>
    </main>
  )
}

const Row = ({ l, v }: { l: string; v: string }) => (
  <div className="flex justify-between text-sm"><span className="text-mute">{l}</span><span className="font-medium">{v}</span></div>
)
