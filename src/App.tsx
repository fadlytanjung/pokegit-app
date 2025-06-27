import useSWR from 'swr'
import './App.css'

const fetcher = (args: any) => fetch(args).then(res => res.json())

function PokemonCard({ url, name }: { name: string; url: string; }) {
  const { data: detail, error: detailErr } = useSWR(url, fetcher)

  if (detailErr) return <div>Error loading {name}</div>
  if (!detail) return <div>Loading {name}…</div>

  const imgUrl = detail.sprites.other.dream_world.front_default

  return (
    <div className="card">
      <img alt={name} src={imgUrl} />
      <h4>{name}</h4>
      <p>Weight: {detail.weight}</p>
    </div>
  )
}

function App() {
  const { data, error } = useSWR(
    'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10',
    fetcher
  )

  if (error) return <div>Failed to load Pokémon list.</div>
  if (!data) return <div>Loading list…</div>

  return (
    <>
      <header>
        Pokémon App
      </header>
      <main>
        {data.results.map((p: any) => (
          <PokemonCard key={p.name} url={p.url} name={p.name} />
        ))}
      </main>
    </>
  )
}

export default App
