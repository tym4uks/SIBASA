import { Fish, Minus, Plus } from 'lucide-react'
import { Link } from 'react-router'
import type { ReactNode } from 'react'

export function Photo({ className = '', label = 'ФОТО' }: { className?: string; label?: string }) {
  return (
    <div className={`bg-foam flex flex-col items-center justify-center gap-2 text-teal/60 ${className}`}>
      <Fish size={36} strokeWidth={1.5} />
      <span className="text-[11px] font-semibold tracking-[0.2em]">{label}</span>
    </div>
  )
}

const base = 'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition active:scale-[0.98] cursor-pointer'
export const btnPrimary = `${base} bg-coral text-white hover:bg-[#dc725a] shadow-soft`
export const btnOutline = `${base} border-[1.5px] border-teal text-teal hover:bg-teal hover:text-white`

export function LinkButton({ to, children, outline }: { to: string; children: ReactNode; outline?: boolean }) {
  return (
    <Link to={to} className={outline ? btnOutline : btnPrimary}>
      {children}
    </Link>
  )
}

export function Stepper({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="inline-flex items-center rounded-xl border border-deep/15 bg-white">
      <button aria-label="Меньше" className="p-3 text-teal cursor-pointer" onClick={() => onChange(Math.max(1, value - 1))}>
        <Minus size={16} />
      </button>
      <span className="w-8 text-center text-sm font-semibold tabular-nums">{value}</span>
      <button aria-label="Больше" className="p-3 text-teal cursor-pointer" onClick={() => onChange(value + 1)}>
        <Plus size={16} />
      </button>
    </div>
  )
}

export const container = 'mx-auto w-full max-w-[1200px] px-5 md:px-8'
