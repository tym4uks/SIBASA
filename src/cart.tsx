import { createContext, useContext, useState, type ReactNode } from 'react'

type Item = { id: number; qty: number }
type Ctx = {
  items: Item[]
  count: number
  add: (id: number, qty?: number) => void
  setQty: (id: number, qty: number) => void
  remove: (id: number) => void
}

const CartCtx = createContext<Ctx>(null!)
export const useCart = () => useContext(CartCtx)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([
    { id: 1, qty: 1 },
    { id: 5, qty: 2 },
  ])
  const add = (id: number, qty = 1) =>
    setItems((s) =>
      s.some((i) => i.id === id)
        ? s.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i))
        : [...s, { id, qty }],
    )
  const setQty = (id: number, qty: number) =>
    setItems((s) => s.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)))
  const remove = (id: number) => setItems((s) => s.filter((i) => i.id !== id))
  const count = items.reduce((a, i) => a + i.qty, 0)
  return <CartCtx.Provider value={{ items, count, add, setQty, remove }}>{children}</CartCtx.Provider>
}
