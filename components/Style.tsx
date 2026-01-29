"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image, ScrollControls, useScroll, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

// Use existing images for the gallery
const IMAGES = [
  "/hero1.jpg",
  "/hero2.jpg",
  "/hero3.jpg",
  "/hero1.jpg",
  "/hero2.jpg",
  "/hero3.jpg",
  "/hero1.jpg",
  "/hero2.jpg",
  "/hero3.jpg",
];

function GalleryItem({ url, index, total }: { url: string; index: number; total: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const scroll = useScroll();
  const [hovered, setHover] = useState(false);
  
  // Calculate position in a circle/cylinder
  const radius = 4;
  const angle = (index / total) * Math.PI * 2;
  
  useFrame((state, delta) => {
    // Current scroll offset (0 to 1)
    const offset = scroll.offset;
    
    // Rotate the entire gallery based on scroll
    // We add the initial angle to the scroll rotation
    const currentAngle = angle + offset * Math.PI * 2;
    
    // Calculate x, z based on circular path
    // y is slightly staggered for visual interest
    const x = Math.cos(currentAngle) * radius;
    const z = Math.sin(currentAngle) * radius;
    const y = Math.sin(currentAngle * 2) * 0.5; // Wave motion

    // Smoothly move to position
    ref.current.position.set(x, y, z);
    
    // Look at center (0,0,0) so images face inward/outward correctly
    ref.current.lookAt(0, 0, 0);
    
    // Flip rotation so image faces camera (outward)
    ref.current.rotation.y += Math.PI;

    // Hover effect
    const targetScale = hovered ? 1.2 : 1;
    ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale * 1.5, 1), delta * 5); // 1.5 aspect ratio
    
    // Material adjustments (grayscale to color on hover)
    const material = (ref.current as any).material;
    if (material) {
        material.grayscale = THREE.MathUtils.lerp(material.grayscale, hovered ? 0 : 1, delta * 5);
        // Fade out images at the back
        const distanceFromCamera = ref.current.position.distanceTo(state.camera.position);
        material.opacity = THREE.MathUtils.lerp(material.opacity, distanceFromCamera > 6 ? 0.2 : 1, delta * 5);
        material.transparent = true;
    }
  });

  return (
    <Image 
      ref={ref}
      url={url} 
      scale={[1.5, 2.25]} // Base scale
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      transparent
    />
  );
}

function GalleryScene() {
  return (
    <group position={[0, -0.5, 0]}>
        {IMAGES.map((img, i) => (
            <GalleryItem key={i} url={img} index={i} total={IMAGES.length} />
        ))}
    </group>
  );
}

export default function Style() {
  return (
    <section className="relative h-[200vh] w-full bg-zinc-950">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Title Overlay */}
        <div className="absolute top-10 left-0 w-full text-center z-10 pointer-events-none">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="font-serif text-4xl text-white/50 tracking-widest uppercase md:text-6xl"
            >
                Style Collection
            </motion.h2>
        </div>

        {/* 3D Gallery */}
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ScrollControls pages={2} damping={0.2}>
            <GalleryScene />
          </ScrollControls>
        </Canvas>
        
        {/* Instruction/Hint */}
        <div className="absolute bottom-10 left-0 w-full text-center z-10 pointer-events-none">
             <p className="font-serif text-sm text-white/30 tracking-widest">SCROLL TO EXPLORE</p>
        </div>

      </div>
    </section>
  );
}
