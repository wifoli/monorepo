import { Button as PrimeButton } from 'primereact/button'
import type { ButtonProps as PrimeButtonProps } from 'primereact/button'

export interface ButtonProps extends PrimeButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger'
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-gray-600 hover:bg-gray-700',
    success: 'bg-green-600 hover:bg-green-700',
    danger: 'bg-red-600 hover:bg-red-700',
  }

  return (
    <PrimeButton
      className={`${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}
