import { User } from './types'

export const loginMock = (email: string, name: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email.includes('@')) {
        reject(new Error('Invalid email address'))
      } else {
        resolve({
          id: 'user_123',
          name: name || 'John Doe',
          email,
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
          bio: 'Founding operator looking to streamline business operations and escape the messy middle.',
          company: 'Vertex Ventures',
        })
      }
    }, 800)
  })
}
