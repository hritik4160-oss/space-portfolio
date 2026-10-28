import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, Stars } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import { Color, Group, Mesh, Points, Vector3 } from "three";
import { useReducedMotion } from "framer-motion";

function Core({ reduced }: { reduced: boolean }) {
  const { size } = useThree();
  const group = useRef<Group>(null);
  const globe = useRef<Mesh>(null);
  const dust = useRef<Points>(null);
  const target = useMemo(() => new Vector3(), []);
  const palette = useMemo(() => {
    const css = getComputedStyle(document.documentElement);
    return {
      silver: new Color(css.getPropertyValue("--core-silver").trim()),
      blue: new Color(css.getPropertyValue("--core-blue").trim()),
      light: new Color(css.getPropertyValue("--core-light").trim()),
    };
  }, []);
  const positions = useMemo(() => {
    const array = new Float32Array(1500);
    for (let i = 0; i < 500; i++) {
      const angle = i * 2.399963;
      const radius = 1.5 + (i % 37) / 19;
      array[i * 3] = Math.cos(angle) * radius;
      array[i * 3 + 1] = Math.sin(angle) * radius;
      array[i * 3 + 2] = Math.sin(i * 1.7) * 0.8;
    }
    return array;
  }, []);
  useFrame(({ pointer, camera, clock }, rawDelta) => {
    if (reduced) return;
    const dt = Math.min(rawDelta, 0.05);
    if (group.current) {
      group.current.rotation.y += dt * 0.13;
      group.current.rotation.z += dt * 0.035;
      group.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.09;
    }
    if (globe.current) globe.current.rotation.y -= dt * 0.2;
    if (dust.current) dust.current.rotation.z -= dt * 0.04;
    const scroll = Math.min(window.scrollY / window.innerHeight, 1);
    target.set(pointer.x * 0.3, pointer.y * 0.2, 8 + scroll * 1.2);
    camera.position.lerp(target, 1 - Math.exp(-dt * 2));
    camera.lookAt(0, 0, 0);
  });
  return (
    <group position={[size.width < 760 ? 0 : 2.35, 0, 0]}>
      <group ref={group} rotation={[0.4, -0.4, 0.25]}>
        <mesh ref={globe}>
          <icosahedronGeometry args={[0.96, 2]} />
          <meshPhysicalMaterial
            color={palette.silver}
            emissive={palette.blue}
            emissiveIntensity={0.16}
            metalness={0.92}
            roughness={0.22}
            flatShading
          />
        </mesh>
        <mesh scale={1.022}>
          <icosahedronGeometry args={[0.96, 2]} />
          <meshBasicMaterial color={palette.blue} wireframe transparent opacity={0.22} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.75, 32, 24]} />
          <meshStandardMaterial
            color={palette.blue}
            emissive={palette.blue}
            emissiveIntensity={2}
          />
        </mesh>
        {[0, 1, 2, 3].map((i) => (
          <group key={i} rotation={[i * 0.65 + 0.4, i * 0.8, i * 0.4]}>
            <mesh>
              <torusGeometry args={[1.38 + i * 0.19, i === 0 ? 0.065 : 0.025, 12, 120]} />
              <meshStandardMaterial color={palette.silver} metalness={0.95} roughness={0.23} />
            </mesh>
            <mesh rotation={[0.04, 0.03, 0]}>
              <torusGeometry args={[1.39 + i * 0.19, 0.009, 6, 120, Math.PI * 1.3]} />
              <meshBasicMaterial color={palette.blue} toneMapped={false} />
            </mesh>
          </group>
        ))}
        <points ref={dust}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.016}
            color={palette.blue}
            transparent
            opacity={0.65}
            sizeAttenuation
          />
        </points>
      </group>
      <mesh rotation={[1.1, 0.2, -0.3]}>
        <torusGeometry args={[2.65, 0.005, 5, 180]} />
        <meshBasicMaterial color={palette.silver} transparent opacity={0.35} />
      </mesh>
      <mesh position={[2.6, 1.1, -1]}>
        <sphereGeometry args={[0.11, 20, 16]} />
        <meshStandardMaterial color={palette.silver} metalness={0.8} roughness={0.22} />
      </mesh>
    </group>
  );
}

export default function Universe() {
  const reduced = Boolean(useReducedMotion());
  return (
    <div className="universe" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[-3, 5, 4]} intensity={3} />
        <Environment resolution={128}>
          <Lightformer intensity={3} position={[0, 5, 0]} scale={[10, 10, 1]} />
          <Lightformer
            intensity={2}
            position={[-5, 1, 2]}
            rotation-y={Math.PI / 2}
            scale={[15, 2, 1]}
          />
        </Environment>
        <Stars
          radius={50}
          depth={30}
          count={700}
          factor={1.5}
          saturation={0}
          fade
          speed={reduced ? 0 : 0.2}
        />
        <Core reduced={reduced} />
        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={1.2} intensity={0.3} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
