'use client'
import React from 'react'
import { useCodePedia } from '../context/CodePediaContext' // Ajusta tu ruta

const textSizes = [
    { label: 'Pequeño', value: 'small' },
    { label: 'Estándar', value: 'medium' },
    { label: 'Grande', value: 'large' },
]

const widths = [
    { label: 'Estándar', value: 'normal' },
    { label: 'Ancho', value: 'wide' },
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
}

function RadioGroup({ name, options, currentValue, onChange }: RadioGroupProps) {
    return (
        <div className="flex flex-col gap-2">
            {options.map((opt) => {
                const id = `${name}-${opt.value}`
                return (
                    <label key={id} htmlFor={id} className="flex items-center cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                        <input
                            id={id}
                            name={name}
                            type="radio"
                            value={opt.value}
                            checked={currentValue === opt.value}
                            onChange={() => onChange(opt.value)}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 bg-transparent"
                        />
                        <span className="ml-2">{opt.label}</span>
                    </label>
                )
            })}
        </div>
    )
}

export default function CodePediaSection() {
    const { textSize, setTextSize, color, setColor } = useCodePedia()

    return (
        <section className="lg:pl-10 w-full lg:py-16 flex flex-col text-sm  border-gray-100 h-full">
            <p className="font-semibold border-b border-gray-300 dark:border-gray-600 py-1 text-gray-900 dark:text-white">
                Apariencia
            </p>
            
            <fieldset className="mb-4 mt-4">
                <legend className="mb-2 border-b border-gray-300 dark:border-gray-600 py-1 w-full text-gray-700 dark:text-gray-400">Texto</legend>
                <RadioGroup name="text-size" options={textSizes} currentValue={textSize} onChange={setTextSize} />
            </fieldset>

            <fieldset className="mb-4">
                <legend className="mb-2 border-b border-gray-300 dark:border-gray-600 py-1 w-full text-gray-700 dark:text-gray-400">Anchura</legend>
                <RadioGroup name="width" options={widths} currentValue="normal" onChange={() => {}} />
            </fieldset>

            <fieldset className="mb-4">
                <legend className="mb-2 border-b border-gray-300 dark:border-gray-600 py-1 w-full text-gray-700 dark:text-gray-400">Color (Beta)</legend>
                <RadioGroup name="color" options={colors} currentValue={color} onChange={setColor} />
            </fieldset>
        </section>
    )
}