export type Product = {
  id: number
  name: string
  desc: string
  price: number
  weight: string
  category: string
  origin: string
  fresh: string
}

export const products: Product[] = [
  { id: 1, name: 'Лосось', desc: 'Охлаждённое филе, стейковая нарезка', price: 1890, weight: '1 кг', category: 'Рыба', origin: 'Норвегия', fresh: 'Охлаждённое' },
  { id: 2, name: 'Тунец', desc: 'Жёлтопёрый тунец, стейк сашими-класса', price: 2490, weight: '500 г', category: 'Рыба', origin: 'Вьетнам', fresh: 'Охлаждённое' },
  { id: 3, name: 'Дорадо', desc: 'Тушка потрошёная, средиземноморская', price: 1290, weight: '400 г', category: 'Рыба', origin: 'Турция', fresh: 'Охлаждённое' },
  { id: 4, name: 'Сибас', desc: 'Нежное белое мясо, идеально для гриля', price: 1350, weight: '450 г', category: 'Рыба', origin: 'Турция', fresh: 'Охлаждённое' },
  { id: 5, name: 'Креветки тигровые', desc: 'Крупные 16/20, сыро-мороженые', price: 1690, weight: '800 г', category: 'Морепродукты', origin: 'Вьетнам', fresh: 'Замороженное' },
  { id: 6, name: 'Мидии', desc: 'Мидии в раковине, шоковая заморозка', price: 690, weight: '1 кг', category: 'Морепродукты', origin: 'Чили', fresh: 'Замороженное' },
  { id: 7, name: 'Икра осетровая', desc: 'Классическая, банка 100 г', price: 14900, weight: '100 г', category: 'Икра', origin: 'Россия', fresh: 'Охлаждённое' },
  { id: 8, name: 'Скумбрия копчёная', desc: 'Горячего копчения на ольхе', price: 590, weight: '350 г', category: 'Копчёности', origin: 'Россия', fresh: 'Охлаждённое' },
]

export const rub = (n: number) => n.toLocaleString('ru-RU') + ' ₽'
