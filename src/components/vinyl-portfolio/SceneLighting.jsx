import PlasterEnvironment from './PlasterEnvironment'

/**
 * Soft indoor lighting for the plaster-walled scene.
 */
export default function SceneLighting() {
  return (
    <>
      <PlasterEnvironment />

      <hemisphereLight args={['#fff8ef', '#d8d0c4', 0.9]} />
      <ambientLight intensity={0.35} color="#fff4e6" />

      <directionalLight
        position={[5, 7, 4]}
        intensity={2.2}
        color="#fff0d8"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />

      <directionalLight position={[-4, 3, -2]} intensity={0.45} color="#eef3ff" />
    </>
  )
}
