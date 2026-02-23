import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Stars, OrbitControls, Line } from '@react-three/drei'
import * as THREE from 'three'

// Animated rotating globe with pulsing connection lines
function Globe() {
    const meshRef = useRef()
    const glowRef = useRef()

    useFrame((state) => {
        meshRef.current.rotation.y += 0.003
        glowRef.current.rotation.y += 0.003
        glowRef.current.material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05
    })

    return (
        <group>
            {/* Main Globe */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[2, 64, 64]} />
                <meshStandardMaterial
                    color="#0a1628"
                    emissive="#1e40af"
                    emissiveIntensity={0.3}
                    metalness={0.8}
                    roughness={0.2}
                    wireframe={false}
                />
            </mesh>
            {/* Wireframe overlay */}
            <mesh ref={glowRef}>
                <sphereGeometry args={[2.02, 32, 32]} />
                <meshBasicMaterial
                    color="#3b82f6"
                    wireframe={true}
                    transparent
                    opacity={0.15}
                />
            </mesh>
            {/* Glow sphere */}
            <mesh>
                <sphereGeometry args={[2.3, 32, 32]} />
                <meshBasicMaterial
                    color="#06b6d4"
                    transparent
                    opacity={0.03}
                    side={THREE.BackSide}
                />
            </mesh>
        </group>
    )
}

// Orbiting trade route rings
function TradeRing({ radius, speed, color, tilt }) {
    const ref = useRef()
    useFrame((state) => {
        ref.current.rotation.z += speed
        ref.current.rotation.x += speed * 0.3
    })
    return (
        <mesh ref={ref} rotation={[tilt, 0, 0]}>
            <torusGeometry args={[radius, 0.01, 8, 120]} />
            <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
    )
}

// Floating particles representing global capital flow
function CapitalParticles() {
    const ref = useRef()
    const count = 200
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            const r = 2.5 + Math.random() * 3
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos((Math.random() * 2) - 1)
            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
            pos[i * 3 + 2] = r * Math.cos(phi)
        }
        return pos
    }, [])

    useFrame((state) => {
        ref.current.rotation.y += 0.001
    })

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial color="#06b6d4" size={0.04} transparent opacity={0.8} />
        </points>
    )
}

export function HeroScene() {
    return (
        <Canvas camera={{ position: [0, 0, 7], fov: 55 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#3b82f6" />
            <pointLight position={[-5, -3, -5]} intensity={1} color="#8b5cf6" />
            <Stars radius={80} depth={50} count={3000} factor={4} fade speed={0.5} />
            <Globe />
            <TradeRing radius={3.2} speed={0.004} color="#3b82f6" tilt={0.3} />
            <TradeRing radius={3.6} speed={-0.003} color="#8b5cf6" tilt={1.1} />
            <TradeRing radius={4.0} speed={0.002} color="#06b6d4" tilt={0.7} />
            <CapitalParticles />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
    )
}

// ---- NETWORK SCENE for IFI Section ----
function NetworkNode({ position, color, size = 0.15, pulseSpeed = 1 }) {
    const ref = useRef()
    const ringRef = useRef()
    useFrame((state) => {
        const s = 1 + Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.15
        ref.current.scale.setScalar(s)
        ringRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * pulseSpeed + 1) * 0.4)
        ringRef.current.material.opacity = 0.3 - Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.2
    })
    return (
        <group position={position}>
            <mesh ref={ref}>
                <sphereGeometry args={[size, 16, 16]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
            </mesh>
            <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[size * 2.5, 0.01, 8, 64]} />
                <meshBasicMaterial color={color} transparent opacity={0.3} />
            </mesh>
        </group>
    )
}

function ConnectionLine({ start, end, color }) {
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)]
    return <Line points={points} color={color} lineWidth={0.8} transparent opacity={0.4} />
}

function FloatingIFINetwork() {
    const nodes = [
        { pos: [0, 0, 0], color: '#f59e0b', size: 0.25, label: 'IMF', speed: 0.8 },
        { pos: [-2.5, 1, 0], color: '#3b82f6', size: 0.18, label: 'World Bank', speed: 1.2 },
        { pos: [2.5, 1, 0], color: '#10b981', size: 0.18, label: 'ADB', speed: 1.0 },
        { pos: [-1.5, -1.8, 0], color: '#8b5cf6', size: 0.15, speed: 1.4 },
        { pos: [1.5, -1.8, 0], color: '#06b6d4', size: 0.15, speed: 0.9 },
        { pos: [-3.5, -0.5, 0.5], color: '#f59e0b', size: 0.1, speed: 1.1 },
        { pos: [3.5, -0.5, 0.5], color: '#3b82f6', size: 0.1, speed: 1.3 },
    ]

    const connections = [
        [0, 1], [0, 2], [0, 3], [0, 4], [1, 3], [2, 4], [1, 5], [2, 6], [3, 5], [4, 6]
    ]

    const colors = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#06b6d4', '#f59e0b', '#3b82f6']
    const groupRef = useRef()

    useFrame((state) => {
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    })

    return (
        <group ref={groupRef}>
            {connections.map(([a, b], i) => (
                <ConnectionLine key={i} start={nodes[a].pos} end={nodes[b].pos} color={colors[a]} />
            ))}
            {nodes.map((n, i) => (
                <NetworkNode key={i} position={n.pos} color={n.color} size={n.size} pulseSpeed={n.speed} />
            ))}
        </group>
    )
}

export function IFINetworkScene() {
    return (
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#f59e0b" />
            <pointLight position={[-5, -5, -5]} intensity={1} color="#3b82f6" />
            <Stars radius={100} depth={50} count={1500} factor={3} fade speed={0.3} />
            <FloatingIFINetwork />
        </Canvas>
    )
}

// ---- TIMELINE SCENE ----
function TimelineCube({ position, color, rotSpeed }) {
    const ref = useRef()
    useFrame(() => {
        ref.current.rotation.x += rotSpeed
        ref.current.rotation.y += rotSpeed * 0.7
    })
    return (
        <mesh ref={ref} position={position}>
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} metalness={0.8} roughness={0.2} />
        </mesh>
    )
}

export function TimelineScene() {
    const eras = [
        { pos: [-5, 0, 0], color: '#f59e0b' },
        { pos: [-1.8, 0, 0], color: '#ef4444' },
        { pos: [1.5, 0, 0], color: '#3b82f6' },
        { pos: [4.8, 0, 0], color: '#10b981' },
    ]
    return (
        <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[0, 5, 5]} intensity={2} color="#ffffff" />
            <Stars radius={80} depth={30} count={1000} factor={2} fade speed={0.2} />
            {eras.map((e, i) => (
                <TimelineCube key={i} position={e.pos} color={e.color} rotSpeed={0.008 + i * 0.003} />
            ))}
            {/* Connecting beam */}
            <Line
                points={[new THREE.Vector3(-6, 0, 0), new THREE.Vector3(6, 0, 0)]}
                color="#334155"
                lineWidth={1.5}
            />
        </Canvas>
    )
}

// ---- GLOBE ATTRIBUTES SCENE ----
function SpinningDNA() {
    const count = 40
    const groupRef = useRef()

    const points = useMemo(() => {
        return Array.from({ length: count }, (_, i) => {
            const t = (i / count) * Math.PI * 4
            const r = 1.5
            return {
                a: [Math.cos(t) * r, (i / count) * 8 - 4, Math.sin(t) * r],
                b: [Math.cos(t + Math.PI) * r, (i / count) * 8 - 4, Math.sin(t + Math.PI) * r],
                color: i % 5 === 0 ? '#3b82f6' : i % 3 === 0 ? '#06b6d4' : '#8b5cf6'
            }
        })
    }, [])

    useFrame(() => {
        groupRef.current.rotation.y += 0.005
    })

    return (
        <group ref={groupRef}>
            {points.map((p, i) => (
                <group key={i}>
                    <mesh position={p.a}>
                        <sphereGeometry args={[0.06, 8, 8]} />
                        <meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={1} />
                    </mesh>
                    <mesh position={p.b}>
                        <sphereGeometry args={[0.06, 8, 8]} />
                        <meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={1} />
                    </mesh>
                    {i < count - 1 && (
                        <Line points={[new THREE.Vector3(...p.a), new THREE.Vector3(...p.b)]} color={p.color} lineWidth={0.5} transparent opacity={0.4} />
                    )}
                </group>
            ))}
        </group>
    )
}

export function AttributesScene() {
    return (
        <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[4, 4, 4]} intensity={2} color="#3b82f6" />
            <pointLight position={[-4, -4, -4]} intensity={1} color="#8b5cf6" />
            <Stars radius={80} depth={40} count={1500} factor={3} fade speed={0.4} />
            <SpinningDNA />
        </Canvas>
    )
}
