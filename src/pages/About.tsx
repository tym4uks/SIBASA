import { useState } from 'react'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { socials } from '../Layout'
import { btnPrimary, container } from '../ui'

const info = [
  { icon: MapPin, t: 'Адрес', d: 'Москва, ул. Рыбная, 12' },
  { icon: Clock, t: 'Часы работы', d: 'Ежедневно, 9:00 – 22:00' },
  { icon: Phone, t: 'Телефон', d: '+7 (495) 123-45-67' },
  { icon: Mail, t: 'Email', d: 'hello@sibasa.ru' },
]
const team = [
  ['Алексей Морев', 'Основатель, шеф-закупщик'],
  ['Мария Волкова', 'Контроль качества'],
  ['Игорь Берег', 'Логистика и доставка'],
]
const field = 'w-full rounded-xl border border-deep/15 bg-cream px-4 py-3 text-sm'

export default function About() {
  const [sent, setSent] = useState(false)
  return (
    <main className={`${container} py-12`}>
      <h1 className="text-4xl text-deep md:text-5xl">О магазине</h1>
      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <p className="max-w-xl text-lg leading-relaxed text-mute">СИБАСА начался в 2018 году с одной идеи: рыба должна доезжать до стола такой же свежей, как в день вылова. Мы работаем напрямую с фермами и рыбаками, храним улов при строгом температурном режиме и доставляем его за два часа.</p>
        <p className="max-w-xl leading-relaxed text-mute">Сегодня у нас более 120 позиций — от норвежского лосося до осетровой икры. Каждая партия проходит проверку качества, а если что-то вам не понравилось, мы вернём деньги.</p>
      </div>

      <section id="contacts" className="mt-20 grid scroll-mt-28 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {info.map((i) => (
              <div key={i.t} className="rounded-2xl bg-white p-5 shadow-soft">
                <i.icon size={20} className="text-teal" />
                <p className="mt-3 text-xs text-mute">{i.t}</p>
                <p className="mt-1 font-semibold text-deep">{i.d}</p>
              </div>
            ))}
          </div>
          <div className="relative grid h-72 place-items-center overflow-hidden rounded-2xl bg-foam text-teal/70">
            <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(#1e6f7a22_1px,transparent_1px),linear-gradient(90deg,#1e6f7a22_1px,transparent_1px)] [background-size:32px_32px]" />
            <div className="relative flex flex-col items-center gap-2"><MapPin size={36} className="text-coral" /><span className="text-xs font-semibold tracking-[0.2em]">КАРТА</span></div>
          </div>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a key={s.label} href="#" aria-label={s.label} className="grid h-12 w-12 place-items-center rounded-full bg-deep text-white transition hover:bg-coral"><s.icon size={18} /></a>
            ))}
          </div>
        </div>

        <form className="space-y-4 rounded-2xl bg-white p-6 shadow-soft md:p-8" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
          <h2 className="text-2xl text-deep">Напишите нам</h2>
          <input required className={field} placeholder="Ваше имя" />
          <input required type="email" className={field} placeholder="Email" />
          <textarea required rows={6} className={field} placeholder="Сообщение" />
          <button className={`${btnPrimary} w-full`}>{sent ? 'Спасибо! Мы ответим скоро' : 'Отправить'}</button>
        </form>
      </section>

      <h2 className="mb-8 mt-24 text-3xl text-deep">Команда</h2>
      <div className="grid gap-6 sm:grid-cols-3">
        {team.map(([n, r]) => (
          <div key={n} className="rounded-2xl bg-foam p-6">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-white text-lg font-semibold text-teal">{n.split(' ').map((w) => w[0]).join('')}</div>
            <p className="mt-5 font-semibold text-deep">{n}</p>
            <p className="text-sm text-mute">{r}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
