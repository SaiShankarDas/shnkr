"use client"

import { useEffect, useRef } from "react"

interface LiquidEffectAnimationProps {
    className?: string
    imageUrl?: string
}

export function LiquidEffectAnimation({
    className = "",
    imageUrl = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
}: LiquidEffectAnimationProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        const canvasId = `liquid-canvas-${Math.random().toString(36).slice(2, 9)}`
        canvasRef.current.id = canvasId

        const script = document.createElement("script")
        script.type = "module"
        script.textContent = `
      import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js';

      const canvas = document.getElementById('${canvasId}');
      if (canvas) {
        const app = LiquidBackground(canvas);
        app.loadImage('${imageUrl}');
        app.liquidPlane.material.metalness = 0.9;
        app.liquidPlane.material.roughness = 0.15;
        app.liquidPlane.uniforms.displacementScale.value = 15;
        app.setRain(false);
        canvas.__liquidApp = app;
      }
    `

        document.body.appendChild(script)

        const currentCanvas = canvasRef.current

        return () => {
            if (currentCanvas && (currentCanvas as any).__liquidApp?.dispose) {
                ; (currentCanvas as any).__liquidApp.dispose()
            }
            document.body.removeChild(script)
        }
    }, [imageUrl])

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full ${className}`}
        />
    )
}
