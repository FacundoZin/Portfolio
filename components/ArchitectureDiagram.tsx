"use client"

interface ArchitectureDiagramProps {
  type: string;
}

export function hasArchitectureDiagram(type: string): boolean {
  return type === "asociarg" || type === "afrelay"
}

export default function ArchitectureDiagram({ type }: ArchitectureDiagramProps) {
  if (type === "asociarg") return <AsociargDiagram />
  if (type === "afrelay") return <AfrelayDiagram />
  return null
}

const c = {
  fg: "var(--foreground)",
  muted: "var(--muted-foreground)",
  border: "var(--border)",
  mutedBg: "var(--muted)",
  bg: "var(--background)",
}

function ArrowDefs() {
  return (
    <defs>
      <marker id="arr" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <path d="M0,1 L9,3.5 L0,6" fill={c.muted} opacity="0.5" />
      </marker>
    </defs>
  )
}

function Layer({
  x, y, w, h, label, sub, stroke, fill,
}: {
  x: number; y: number; w: number; h: number
  label: string; sub?: string; stroke: string; fill: string
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={fill} stroke={stroke} strokeWidth="1.5" opacity="0.12" />
      <rect x={x} y={y} width={w} height={h} rx={10} fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.35" />
      <text x={x + w / 2} y={y + (sub ? 22 : h / 2 + 4)} textAnchor="middle" fill={stroke} fontSize="11" fontWeight="600" letterSpacing="0.08em" fontFamily="monospace">
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + 38} textAnchor="middle" fill={c.muted} fontSize="9" opacity="0.6">
          {sub}
        </text>
      )}
    </g>
  )
}

function Box({
  x, y, w, h, label, sub,
}: {
  x: number; y: number; w: number; h: number; label: string; sub?: string
}) {
  return (
    <g style={{ transition: "opacity 0.2s" }}>
      <rect x={x} y={y} width={w} height={h} rx={6} fill={c.mutedBg} stroke={c.border} strokeWidth="1" opacity="0.7" />
      <text x={x + w / 2} y={sub ? y + h / 2 - 3 : y + h / 2 + 4} textAnchor="middle" fill={c.fg} fontSize="10" fontFamily="system-ui">
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 10} textAnchor="middle" fill={c.muted} fontSize="8" opacity="0.5">
          {sub}
        </text>
      )}
    </g>
  )
}

function Pipe({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c.muted} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.45" markerEnd="url(#arr)" />
}

function AsociargDiagram() {
  return (
    <div className="w-full overflow-x-auto scrollbar-thin">
      <svg viewBox="0 0 800 520" className="w-full h-auto min-w-[600px]" fill="none">
        <ArrowDefs />

        <Layer x={50} y={20} w={700} h={95} label="CLIENTS" sub="Multi-tenant access points" stroke="#3b82f6" fill="#3b82f6" />
        <Box x={80} y={68} w={115} h={36} label="Web App" sub="Vue · Empleados" />
        <Box x={210} y={68} w={105} h={36} label="Mobile" sub="Socios" />
        <Box x={330} y={68} w={100} h={36} label="Portal" sub="Members" />
        <Box x={445} y={68} w={105} h={36} label="WhatsApp" sub="Bot API" />
        <Box x={565} y={68} w={165} h={36} label="Mercado Pago" sub="OAuth + Webhooks" />

        <Pipe x1={400} y1={115} x2={400} y2={148} />

        <Layer x={120} y={148} w={560} h={68} label="API GATEWAY" sub="Rate limiting · JWT · Tenant resolver" stroke="#8b5cf6" fill="#8b5cf6" />

        <Pipe x1={400} y1={216} x2={400} y2={248} />

        <rect x={50} y={248} width={700} height={145} rx={10} fill="none" stroke={c.border} strokeWidth="1" strokeDasharray="6 4" opacity="0.3" />
        <text x={400} y={270} textAnchor="middle" fill={c.muted} fontSize="9" fontFamily="monospace" letterSpacing="0.12em" opacity="0.55">
          MODULAR MONOLITH — DDD BOUNDED CONTEXTS
        </text>

        <Box x={70} y={285} w={100} h={55} label="Socios" sub="AR · VOs" />
        <Box x={180} y={285} w={100} h={55} label="Cobranzas" sub="Lotes · Pagos" />
        <Box x={290} y={285} w={100} h={55} label="Viajes" sub="Reservas" />
        <Box x={400} y={285} w={100} h={55} label="Pagos" sub="MP · ARCA" />
        <Box x={510} y={285} w={100} h={55} label="Notif." sub="Email · Push" />
        <Box x={620} y={285} w={110} h={55} label="Analytics" sub="Reports" />

        <Pipe x1={400} y1={393} x2={400} y2={430} />

        <Layer x={80} y={430} w={640} h={85} label="INFRASTRUCTURE" sub="Persistence · Cache · Deployment" stroke="#10b981" fill="#10b981" />
        <Box x={105} y={472} w={115} h={32} label="PostgreSQL" />
        <Box x={235} y={472} w={95} h={32} label="Redis" />
        <Box x={345} y={472} w={95} h={32} label="Docker" />
        <Box x={455} y={472} w={85} h={32} label="VPS" />
        <Box x={555} y={472} w={140} h={32} label="GitHub Actions" />
      </svg>
    </div>
  )
}

function AfrelayDiagram() {
  return (
    <div className="w-full overflow-x-auto scrollbar-thin">
      <svg viewBox="0 0 800 470" className="w-full h-auto min-w-[600px]" fill="none">
        <ArrowDefs />

        <Layer x={50} y={20} w={700} h={85} label="CLIENTS" sub="Multi-CUIT — Each with own certificates" stroke="#3b82f6" fill="#3b82f6" />
        <Box x={80} y={66} w={130} h={30} label="Accounting Software" />
        <Box x={225} y={66} w={110} h={30} label="ERP Systems" />
        <Box x={350} y={66} w={110} h={30} label="Custom Apps" />
        <Box x={475} y={66} w={120} h={30} label="API Consumers" />
        <Box x={610} y={66} w={120} h={30} label="E-commerce" />

        <Pipe x1={400} y1={105} x2={400} y2={135} />

        <Layer x={100} y={135} w={600} h={75} label="FastAPI" sub="REST · Async · Pydantic validation" stroke="#f59e0b" fill="#f59e0b" />
        <Box x={130} y={180} w={85} h={25} label="Auth" sub="CUIT" />
        <Box x={230} y={180} w={85} h={25} label="Invoices" />
        <Box x={330} y={180} w={85} h={25} label="Status" />
        <Box x={430} y={180} w={85} h={25} label="Webhooks" />
        <Box x={530} y={180} w={85} h={25} label="Health" />

        <Pipe x1={400} y1={210} x2={400} y2={240} />

        <Layer x={80} y={240} w={640} h={75} label="SERVICE LAYER" sub="Credential Manager · Crypto · ARCA Client" stroke="#8b5cf6" fill="#8b5cf6" />
        <Box x={110} y={282} w={135} h={26} label="Credential Manager" />
        <Box x={260} y={282} w={125} h={26} label="Certificate Store" />
        <Box x={400} y={282} w={115} h={26} label="Crypto Service" />
        <Box x={530} y={282} w={115} h={26} label="ARCA Client" />

        <Pipe x1={400} y1={315} x2={400} y2={345} />

        <Layer x={120} y={345} w={560} h={75} label="DATA LAYER" sub="Encrypted at rest · Alembic migrations" stroke="#10b981" fill="#10b981" />
        <Box x={155} y={388} w={140} h={26} label="PostgreSQL" sub="Encrypted" />
        <Box x={310} y={388} w={120} h={26} label="SQLAlchemy" sub="ORM" />
        <Box x={445} y={388} w={120} h={26} label="Alembic" sub="Migrations" />

        <text x={400} y={455} textAnchor="middle" fill={c.muted} fontSize="9" fontFamily="monospace" opacity="0.4">
          Docker · CI/CD · Automated deployments
        </text>
      </svg>
    </div>
  )
}