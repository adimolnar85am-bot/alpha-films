import { films } from '../src/data/films'
import { validateAllFilms } from '../src/lib/a7iiiValidate'

const issues = validateAllFilms(films)
const errors = issues.filter((i) => i.severity === 'error')
const warns = issues.filter((i) => i.severity === 'warn')

console.log(`Films: ${films.length}`)
console.log(`Errors: ${errors.length}, Warnings: ${warns.length}`)

for (const i of issues) {
  console.log(`[${i.severity}] ${i.filmId}: ${i.message}`)
}

if (errors.length > 0) process.exit(1)
