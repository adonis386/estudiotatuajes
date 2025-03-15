declare module 'firebase/app' {
  import { FirebaseApp } from '@firebase/app'
  export * from '@firebase/app'
  export function initializeApp(options: any, name?: string): FirebaseApp
}

declare module 'firebase/auth' {
  import { Auth, User, UserCredential } from '@firebase/auth'
  export * from '@firebase/auth'
  export function getAuth(app?: any): Auth
  export function signInWithEmailAndPassword(auth: Auth, email: string, password: string): Promise<UserCredential>
  export function signOut(auth: Auth): Promise<void>
  export function onAuthStateChanged(auth: Auth, nextOrObserver: (user: User | null) => void): () => void
}
