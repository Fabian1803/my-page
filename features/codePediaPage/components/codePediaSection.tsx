import React from 'react'

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

function RadioGroup({ name, options, defaultValue }: { name: string; options: { label: string; value: string }[]; defaultValue?: string }) {
    return (
        <div className="flex flex-col gap-2">
            {options.map((opt) => {
                const id = `${name}-${opt.value}`
                return (
                    <label key={id} htmlFor={id} className="flex items-center cursor-pointer text-sm">
                        <input
                            id={id}
                            name={name}
                            type="radio"
                            value={opt.value}
                            defaultChecked={defaultValue === opt.value}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-2">{opt.label}</span>
                    </label>
                )
            })}
        </div>
    )
}

export default function CodePediaSection() {
    return (
        <section className="px-10 py-15 flex flex-col text-sm">
            <p className="font-semibold border-b border-gray-200 py-1">Apariencia</p>
            <fieldset className="mb-4">
                <legend className="mb-2 border-b border-gray-200 py-1 w-full">Texto</legend>
                <RadioGroup name="text-size" options={textSizes} defaultValue="medium" />
            </fieldset>

            <fieldset className="mb-4">
                <legend className="mb-2 border-b border-gray-200 py-1 w-full">Anchura</legend>
                <RadioGroup name="width" options={widths} defaultValue="normal" />
            </fieldset>

            <fieldset className="mb-4">
                <legend className="mb-2 border-b border-gray-200 py-1 w-full">Color (Beta)</legend>
                <RadioGroup name="color" options={colors} defaultValue="auto" />
            </fieldset>
        </section>
    )
}
