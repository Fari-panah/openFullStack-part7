import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../requests'

export const useUsers = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })

  return {
    users: result.data,
    isPending: result.isPending,
    isError: result.isError
  }
}