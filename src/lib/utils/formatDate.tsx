import { formatRelative } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const formatDate = (date: Date) => {
  return formatRelative(new Date(date), new Date(), { locale: ptBR })
}

export default formatDate
