import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: ReactNode
  rightElement?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightElement, className, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={id}
            className="font-inter text-[12px] leading-4 tracking-widest font-semibold text-on-surface-variant uppercase"
          >
            {label}
          </label>
        )}
        <div className="relative group">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            className={cn(
              'w-full bg-[#F1F3F5] border-0 border-b-2 border-transparent py-3 rounded-t-lg font-inter text-[16px] text-on-surface outline-none transition-all duration-200 placeholder:text-on-surface-variant/60',
              'focus:border-b-primary focus:bg-surface-container-lowest',
              error && 'border-b-error focus:border-b-error',
              leftIcon ? 'pl-10' : 'px-4',
              rightElement ? 'pr-12' : 'pr-4',
              className,
            )}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</div>
          )}
        </div>
        {error && (
          <p className="text-[12px] text-error font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">error</span>
            {error}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
