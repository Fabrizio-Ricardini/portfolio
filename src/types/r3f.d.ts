import "@react-three/fiber"

declare module "@react-three/fiber" {
  interface ThreeElements {
    primitive: {
      ref?: React.Ref<unknown>
      object: unknown
      dispose?: null
      [key: string]: unknown
    }
  }
}
