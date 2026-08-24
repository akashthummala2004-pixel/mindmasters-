declare module '@/components/ui/LightRays' {
  import { FC } from 'react';

  interface LightRaysProps {
    raysOrigin?: 'top-center' | 'top-left' | 'top-right' | 'left' | 'right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    raysColor?: string;
    raysSpeed?: number;
    lightSpread?: number;
    rayLength?: number;
    pulsating?: boolean;
    fadeDistance?: number;
    saturation?: number;
    followMouse?: boolean;
    mouseInfluence?: number;
    noiseAmount?: number;
    distortion?: number;
    className?: string;
  }

  const LightRays: FC<LightRaysProps>;
  export default LightRays;
}
