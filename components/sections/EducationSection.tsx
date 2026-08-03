import type { Dictionary } from "@/lib/i18n"

interface EducationSectionProps {
  dict: Dictionary
}

export default function EducationSection({ dict: t }: EducationSectionProps) {
  return (
    <div className="space-y-12 sm:space-y-16">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <h2 className="text-3xl sm:text-4xl font-light">{t.educationTitle}</h2>
        <div className="text-sm text-muted-foreground font-mono">{t.educationYears}</div>
      </div>

      <div className="space-y-8 sm:space-y-12">
        {t.education.map((item, index) => (
          <div
            key={index}
            className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
          >
            <div className="lg:col-span-2 space-y-1">
              <div className="text-sm font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500 leading-relaxed">
                {item.period}
              </div>
              <div
                className={`text-xs font-mono uppercase tracking-wider ${
                  item.status === t.inProgress
                    ? "text-green-500"
                    : "text-muted-foreground/60"
                }`}
              >
                {item.status}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div>
                <h3 className="text-lg sm:text-xl font-medium">{item.degree}</h3>
                <div className="text-muted-foreground">{item.institution}</div>
                <div className="text-xs text-muted-foreground/60 mt-0.5">{item.location}</div>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-lg">{item.description}</p>
            </div>

            <div className="lg:col-span-3 flex items-start lg:justify-end mt-2 lg:mt-0">
              <svg
                viewBox="0 0 595.3 699.4"
                className="w-7 h-8 text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors duration-500"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  d="m246.6 0h102v190.8c80.8-22.4 140.4-96.7 140.4-184.4h106.3c0 146.5-106.8 268.9-246.6 293.2v4.4h233.9v104.2h-214.4c130 31.8 227 149.5 227 289.1h-106.2c0-87.7-59.6-162-140.3-184.4v186.5h-102v-186.5c-80.7 22.4-140.3 96.7-140.3 184.4h-106.4c0-139.6 97-257.3 227-289.1h-214.2v-104.2h233.9v-4.4c-139.9-24.3-246.7-146.7-246.7-293.2h106.3c0 87.7 59.6 162 140.3 184.4z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
