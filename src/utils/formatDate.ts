import dayjs from 'dayjs'

export function formatDate(data: string, format = 'MMM D, YYYY') {
  return dayjs.utc(data).format(format)
}