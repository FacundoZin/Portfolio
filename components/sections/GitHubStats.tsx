export default function GitHubStats() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="p-6 border border-border rounded-lg bg-muted/5 flex items-center justify-center">
        <img
          src="https://github-readme-stats-sigma-five.vercel.app/api?username=FacundoZin&show_icons=true&theme=onedark&hide_border=true&bg_color=00000000"
          alt="Facundo Zin GitHub contribution statistics"
          width={495}
          height={195}
          loading="lazy"
          className="max-w-full h-auto"
        />
      </div>
      <div className="p-6 border border-border rounded-lg bg-muted/5 flex items-center justify-center">
        <img
          src="https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=FacundoZin&layout=compact&theme=onedark&hide_border=true&bg_color=00000000"
          alt="Top programming languages: C#, TypeScript, JavaScript"
          width={495}
          height={195}
          loading="lazy"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  )
}
