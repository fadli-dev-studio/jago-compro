<script lang="ts">
  import { onMount } from 'svelte';

  let containerEl: HTMLDivElement;

  onMount(() => {
    let animationFrameId: number;
    let THREE: typeof import('three');

    let cleanup = () => {};

    import('three').then((module) => {
      THREE = module;

      if (!containerEl) return;

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerEl.appendChild(renderer.domElement);

      const vertexShader = `
        varying vec2 v_texCoord;
        void main() {
            v_texCoord = uv;
            gl_Position = vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
        precision highp float;
        varying vec2 v_texCoord;
        uniform float u_time;
        uniform vec2 u_resolution;

        // Simplex 2D noise
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
        float snoise(vec2 v){
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                   -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
            dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.wwww) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
            vec2 uv = v_texCoord;
            
            // Background color: Deep black/dark charcoal
            vec3 backgroundColor = vec3(0.04, 0.04, 0.04);
            
            // Primary Teal: #00D1B2
            vec3 tealColor = vec3(0.0, 0.82, 0.7);
            
            // Animate noise
            float n = snoise(uv * 2.0 + u_time * 0.1);
            n += 0.5 * snoise(uv * 4.0 - u_time * 0.15);
            
            // Create soft, flowing glow
            float glow = smoothstep(0.1, 0.8, n);
            
            // Mix background with teal glow
            vec3 finalColor = mix(backgroundColor, tealColor * 0.18, glow);
            
            // Add subtle vignette
            float vignette = 1.0 - smoothstep(0.5, 1.5, length(uv - 0.5));
            finalColor *= vignette;
            
            gl_FragColor = vec4(finalColor, 1.0);
        }
      `;

      const uniforms = {
        u_time: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      };

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms
      });

      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const startTime = performance.now();
 
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        uniforms.u_time.value = (performance.now() - startTime) * 0.001;
        renderer.render(scene, camera);
      };

      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        uniforms.u_resolution.value.set(width, height);
      };

      window.addEventListener('resize', handleResize);
      animate();

      cleanup = () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        if (renderer.domElement && containerEl.contains(renderer.domElement)) {
          containerEl.removeChild(renderer.domElement);
        }
        renderer.dispose();
        geometry.dispose();
        material.dispose();
      };
    });

    return () => {
      cleanup();
    };
  });
</script>

<div
  bind:this={containerEl}
  class="fixed inset-0 z-[-10] pointer-events-none w-full h-full"
></div>
