'use client'
import { useCodePedia } from './context/CodePediaContext'
import { usePathname } from 'next/navigation' 

const textSizes = [
    { label: 'Pequeño', value: 'small' },
    { label: 'Estándar', value: 'medium' },
    { label: 'Grande', value: 'large' },
]

const widths = [
    { label: 'Estándar', value: 'standard' },
    { label: 'Ancho', value: 'full' },
]

const colors = [
    { label: 'Automático', value: 'auto' },
    { label: 'Claro', value: 'light' },
    { label: 'Oscuro', value: 'dark' },
]

interface RadioGroupProps {
    name: string;
    options: { label: string; value: string }[];
    currentValue: string;
    onChange: (value: any) => void;
    disabled?: boolean;
}

function RadioGroup({ name, options, currentValue, onChange, disabled }: RadioGroupProps) {
    return (
        <div className="flex flex-col gap-2">
            {options.map((opt) => {
                const id = `${name}-${opt.value}`
                const isChecked = currentValue === opt.value
                
                return (
                    <label 
                        key={id} 
                        htmlFor={id} 
                        className={`flex items-center text-sm transition-colors duration-200 ${
                            disabled 
                                ? 'cursor-not-allowed opacity-40 text-gray-400 dark:text-gray-600' 
                                : 'cursor-pointer text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                        <div className="relative flex items-center justify-center">
                            <input
                                id={id}
                                name={name}
                                type="radio"
                                value={opt.value}
                                checked={isChecked}
                                onChange={() => onChange(opt.value)}
                                disabled={disabled}
                                className="
                                    appearance-none w-4 h-4 rounded-full border
                                    border-gray-400 dark:border-gray-500 bg-transparent
                                    checked:border-[#3566cb] dark:checked:border-[#88a2e6]
                                    focus:outline-none transition-all duration-200
                                    disabled:border-gray-300 dark:disabled:border-gray-700
                                    cursor-pointer disabled:cursor-not-allowed
                                "
                            />
                            <div 
                                className={`
                                    absolute w-2 h-2 rounded-full bg-[#3566cb] dark:bg-[#88a2e6] 
                                    transition-transform duration-200 pointer-events-none
                                    ${isChecked ? 'scale-100' : 'scale-0'}
                                    ${disabled ? 'bg-gray-300 dark:bg-gray-700' : ''}
                                `}
                            />
                        </div>
                        <span className="ml-2.5 font-medium">{opt.label}</span>
                    </label>
                )
            })}
        </div>
    )
}

export default function CodePediaSection() {
    const { textSize, setTextSize, color, setColor, width, setWidth } = useCodePedia()
    const pathname = usePathname()
    const isProjectPage = pathname?.startsWith('/Codepedia/project/')
    const isSearchPage = pathname?.startsWith('/Codepedia/') && !isProjectPage && pathname !== '/Codepedia'

    return (
        <section className="lg:pl-10 w-full lg:py-16 flex flex-col text-sm border-gray-100 h-full">
            <p className="font-semibold border-b border-gray-300 dark:border-gray-600 py-1 text-gray-900 dark:text-white">
                Apariencia
            </p>
            <fieldset className={`mb-4 mt-4 ${isSearchPage ? 'opacity-60' : ''}`}>
                <legend className="mb-2 border-b border-gray-300 dark:border-gray-600 py-1 w-full text-gray-700 dark:text-gray-400">
                    Texto {isSearchPage && <span className="text-xs italic text-gray-400">(No disponible aquí)</span>}
                </legend>
                <RadioGroup 
                    name="text-size" 
                    options={textSizes} 
                    currentValue={textSize} 
                    onChange={setTextSize} 
                    disabled={isSearchPage} 
                />
            </fieldset>
            <fieldset className={`mb-4 ${isProjectPage ? 'opacity-60' : ''}`}>
                <legend className="mb-2 border-b border-gray-300 dark:border-gray-600 py-1 w-full text-gray-700 dark:text-gray-400">
                    Anchura {isProjectPage && <span className="text-xs italic text-gray-400">(No disponible aquí)</span>}
                </legend>
                <RadioGroup 
                    name="width" 
                    options={widths} 
                    currentValue={width} 
                    onChange={setWidth} 
                    disabled={isProjectPage} 
                />
            </fieldset>
            <fieldset className="mb-4">
                <legend className="mb-2 border-b border-gray-300 dark:border-gray-600 py-1 w-full text-gray-700 dark:text-gray-400">Color (Beta)</legend>
                <RadioGroup name="color" options={colors} currentValue={color} onChange={setColor} />
            </fieldset>
        </section>
    )
}