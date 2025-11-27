import { useRef, useState, useEffect, Suspense, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Stars } from '@react-three/drei'
import * as THREE from 'three'

// Starfield background
function StarField() {
  const starsRef = useRef()
  
  useFrame((state) => {
    if (starsRef.current) {
      // Slow rotation for depth effect
      starsRef.current.rotation.z = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <Stars
      ref={starsRef}
      radius={300}
      depth={60}
      count={5000}
      factor={4}
      saturation={0}
      fade
      speed={0.5}
    />
  )
}

// Nebula/space fog effect
function SpaceFog() {
  const fogRef = useRef()
  
  return (
    <fog ref={fogRef} attach="fog" args={['#000000', 10, 50]} />
  )
}

// Load the space shuttle model
function SpaceShuttleModel({ progress, mouse }) {
  const { scene } = useGLTF('/SpaceShuttel.glb')
  const groupRef = useRef()
  const progressRef = useRef(0)
  const positionRef = useRef({ x: 0, y: 0 })

  // Clone the scene to avoid issues with multiple instances
  const clonedScene = useRef()

  useEffect(() => {
    if (scene) {
      clonedScene.current = scene.clone()
    }
  }, [scene])

  useFrame((state) => {
    if (!groupRef.current || !clonedScene.current) return
    
    const time = state.clock.elapsedTime
    const progressFactor = progress / 100
    
    // Smooth progress interpolation
    progressRef.current += (progressFactor - progressRef.current) * 0.05
    
    // Scale animation - shuttle scales in from 0
    const scale = progressRef.current
    groupRef.current.scale.set(scale, scale, scale)
    
    // Smooth position interpolation for cursor following
    const targetX = mouse.x * 2 // Increased range for more movement
    const targetY = mouse.y * 2
    
    positionRef.current.x += (targetX - positionRef.current.x) * 0.1
    positionRef.current.y += (targetY - positionRef.current.y) * 0.1
    
    // Move rocket based on cursor
    groupRef.current.position.x = positionRef.current.x
    groupRef.current.position.y = positionRef.current.y
    
    // Slow rotation
    groupRef.current.rotation.y = time * 0.2
    
    // Subtle floating animation (reduced since we're following cursor)
    groupRef.current.position.z = Math.sin(time * 0.5) * 0.1
    
    // Tilt based on movement direction
    const tiltX = mouse.y * 0.3
    const tiltZ = -mouse.x * 0.3
    groupRef.current.rotation.x = tiltX
    groupRef.current.rotation.z = tiltZ
  })

  if (!clonedScene.current) return null

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive object={clonedScene.current} />
    </group>
  )
}

// Fallback component while loading
function ModelFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#cccccc" wireframe />
    </mesh>
  )
}

// Camera controller with mouse parallax
function CameraController({ mouse }) {
  const { camera } = useThree()

  useFrame(() => {
    // Smooth camera movement based on mouse (subtle)
    const targetX = mouse.x * 0.2
    const targetY = mouse.y * 0.2

    camera.position.x += (targetX - camera.position.x) * 0.03
    camera.position.y += (targetY - camera.position.y) * 0.03
    camera.lookAt(0, 0, 0)
  })

  return null
}

export default function LoadingScene({ progress }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse position to -1 to 1 range
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Space background */}
        <color attach="background" args={['#000000']} />
        <SpaceFog />
        <StarField />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />
        <pointLight position={[0, 0, 5]} intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#4a90e2" />
        
        <CameraController mouse={mouse} />
        <Suspense fallback={<ModelFallback />}>
          <SpaceShuttleModel progress={progress} mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  )
}
