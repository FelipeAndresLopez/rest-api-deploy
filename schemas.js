// Zood sirve para validar los datos
const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
    invalid_type_error: 'Title must be a string'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.string().url({
    message: 'Must be a valid URL'
  }),
  genre: z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Thriller']).array({
    required_error: 'Genre is required',
    invalid_type_error: 'Genre must be an array of strings'
  }),
  rate: z.number().min(0).max(10).default(5)
})

function validateMovie (movie) {
  return movieSchema.safeParse(movie)
}

function validatePartialMovie (input) {
  return movieSchema.partial().safeParse(input)
}

module.exports = { validateMovie, validatePartialMovie }
