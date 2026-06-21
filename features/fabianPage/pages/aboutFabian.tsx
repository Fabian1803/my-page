'use client'
import React from 'react'
import Image from "next/image"
import SearchMapComponent from "../components/searchMapComponent"
import Link from "next/link"

export default function AboutFabian() {
  const abouttext = {
    name: "Fabián Mauro Rivera Morales",
    description: "Bachiller en Ingeniería de Software por la Universidad Tecnológica del Perú. Enfocado en el desarrollo de aplicaciones full-stack robustas y escalables, con sólida experiencia implementando arquitecturas limpias, principios SOLID y automatización de procesos.",
    image: "/perfil.jpeg"
  }

  return (
    <SearchMapComponent>
      <div className="max-w-4xl pt-8 pb-50 px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
        <section className="block md:flex md:flex-row gap-8 items-start justify-between border-b border-gray-100 pb-8 overflow-hidden">
          <div className="float-right ml-4 mb-2 md:float-none md:ml-0 md:mb-0 md:order-last shrink-0">
            <Image
              src={abouttext.image}
              alt="Fabián Rivera"
              width={100}
              height={100}
              priority
              className="rounded-xl border border-blue-50 shadow-sm object-contain md:w-[140px] md:h-[140px]"
            />
          </div>

          <div className="md:flex-1 space-y-3 text-left">
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {abouttext.name}
            </h1>
            <p className="text-sm sm:text-base text-justify text-gray-600 leading-relaxed max-w-2xl">
              {abouttext.description}
            </p>
          </div>
          <div className="clear-both md:hidden" />
        </section>
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            Experiencia Profesional
          </h2>
          <div className="relative pl-6 border-l-2 border-gray-200 ml-3 space-y-4">
            <div className="absolute -left-[6.5px] top-1.5 w-3 h-3 rounded-full bg-gray-400 ring-4 ring-blue-50" />
            <div className="space-y-1">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-xs font-bold uppercase tracking-wider">Full Stack Intern</span>
                <span className="text-gray-400 hidden sm:inline">•</span>
                <h3 className="text-base font-bold text-gray-900">Tecnología Digital Data S.A.C.</h3>
              </div>
              <p className="text-xs text-gray-500 font-medium">Marzo 2026 - Presente</p>
            </div>
            <div className="text-sm text-gray-600 leading-relaxed">
              <ul className="list-disc list-inside space-y-1.5 pl-1">
                <li>Diseño y consumo de REST APIs empleando NestJS y Spring Boot bajo arquitectura hexagonal.</li>
                <li>Construcción de interfaces modulares y altamente responsivas con React y Next.js.</li>
                <li>Automatización de flujos y empaquetamiento de entornos de desarrollo utilizando Docker.</li>
              </ul>
            </div>
            <div className="flex gap-4 text-xs font-semibold pt-1">
              <a
                href="https://www.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-800 hover:underline"
              >
                Sitio Web
              </a>
              <Link href="/Codepedia" className="text-[#0b57d0] hover:underline">
                Más información
              </Link>
            </div>

          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Educación y Certificaciones
          </h2>

          <div className="relative pl-6 border-l-2 border-gray-200 ml-3 space-y-3">
            <div className="absolute -left-[6.5px] top-1.5 w-3 h-3 rounded-full bg-gray-400 ring-4 ring-gray-50" />
            <div className="space-y-0.5">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Bachiller en Ingeniería de Software</span>
                <span className="text-gray-400 hidden sm:inline">•</span>
                <h3 className="text-sm sm:text-base font-semibold text-gray-900">Universidad Tecnológica del Perú</h3>
              </div>
              <p className="text-xs text-gray-500 font-medium">2021 - 2026</p>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              Formación integral orientada al ciclo de vida del software, desarrollo ágil, bases de datos relacionales y no relacionales, principios arquitectónicos y desarrollo de inteligencia artificial (Vision Transformers).
            </p>
          </div>
        </section>

      </div>
    </SearchMapComponent>
  )
}