"use client";

/**
 * Robot3D — humanoid robot dancer with studio-grade rendering.
 *
 * Mesh: RobotExpressive.glb (Tomás Laulhé / Don McCurdy, CC0) — humanoid
 * head/torso/arms/legs with built-in skeletal "Dance" animation.
 *
 * Premium rendering pipeline:
 *   • HDRI environment from drei <Environment preset="city" /> — realistic
 *     image-based lighting with reflections on metallic surfaces.
 *   • Materials adjusted at load time: higher metalness, lower roughness on
 *     the body for a sleek AI-product look. Emissive parts pumped to 2.5×
 *     so eyes/heart/antenna read as glowing without post-processing.
 *   • Subtle yaw oscillation on the model so the dance reads from multiple
 *     angles — turntable showcase feel.
 *   • Soft contact shadow grounds the robot in the scene.
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import type { Group, Mesh, MeshStandardMaterial } from "three";

const MODEL_URL = "/RobotExpressive.glb";

function Robot() {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions } = useAnimations(animations, group);

  // Tune the model's materials for a premium AI-product look
  useEffect(() => {
    scene.traverse((obj) => {
      const m = obj as Mesh;
      if (!m.isMesh) return;
      m.castShadow = true;
      m.receiveShadow = true;
      const mat = m.material as MeshStandardMaterial | undefined;
      if (mat && "metalness" in mat) {
        // Body parts → sleek brushed-metal
        mat.metalness = 0.55;
        mat.roughness = 0.32;
        // Boost any emissive parts so the glow reads clearly without bloom post-fx
        if (mat.emissive && mat.emissive.getHex && mat.emissive.getHex() !== 0x000000) {
          mat.emissiveIntensity = Math.max(mat.emissiveIntensity ?? 1, 2.5);
        }
        mat.envMapIntensity = 1.0;
        mat.needsUpdate = true;
      }
    });
  }, [scene]);

  // Play the built-in Dance clip on a smooth fade-in
  useEffect(() => {
    const dance = actions["Dance"];
    if (!dance) return;
    dance.reset().fadeIn(0.6).play();
    return () => { dance.fadeOut(0.3); };
  }, [actions]);

  // Subtle continuous turntable rotation so the dance reads from multiple angles
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.25;
  });

  return (
    <group ref={group} position={[0, -1.55, 0]} scale={0.78}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);

export default function Robot3D({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [2.4, 1.2, 4.5], fov: 30 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        {/* Studio HDRI for realistic reflections + ambient lighting */}
        <Environment preset="city" />

        {/* Key light for shadows and primary modeling */}
        <directionalLight
          position={[3.5, 5, 4]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0004}
        />
        {/* Brand-coloured rim lights — ember on the left, glow on the right */}
        <pointLight position={[-3.5, 2, 3]} intensity={0.6} color="#ff6a3d" />
        <pointLight position={[3.5, 0.8, 2.5]} intensity={0.35} color="#d6ff3a" />

        <Robot />

        {/* Soft floor shadow */}
        <ContactShadows
          position={[0, -1.55, 0]}
          opacity={0.7}
          blur={2.6}
          far={4}
          resolution={1024}
          color="#000000"
        />
      </Canvas>
    </div>
  );
}
