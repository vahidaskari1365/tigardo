import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type WheelEvent,
} from "react";
import * as THREE from "three";
import type { ColorOption, Product } from "../lib/data";
import { cn } from "../utils/cn";

type ModelKind = "chair" | "armchair" | "stool" | "round-table" | "console" | "sofa" | "set";

type Product3DViewerProps = {
  product: Product;
  color: ColorOption;
  leg: ColorOption;
  angle: number;
  zoom: number;
  onAngleChange?: (angle: number) => void;
  onZoomChange?: (zoom: number) => void;
  className?: string;
  showStatus?: boolean;
  compact?: boolean;
};

type Studio = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  model: THREE.Group | null;
  targetY: number;
  distance: number;
  animationId: number;
  resize: () => void;
};

type ViewState = {
  angle: number;
  zoom: number;
  onAngleChange?: (angle: number) => void;
  onZoomChange?: (zoom: number) => void;
};

const DEGREE = Math.PI / 180;

function normalizeAngle(angle: number) {
  const normalized = angle % 360;
  return normalized < 0 ? normalized + 360 : normalized;
}

function productKind(product: Product): ModelKind {
  if (product.id === "neo") return "stool";
  if (product.id === "rona") return "round-table";
  if (product.id === "lia") return "console";
  if (product.id === "aria") return "set";
  if (product.id === "minoo" || product.id === "bundle-living") return "sofa";
  if (product.id === "terra") return "armchair";
  return "chair";
}

function addMesh(
  parent: THREE.Object3D,
  geometry: THREE.BufferGeometry,
  material: THREE.Material,
  position: [number, number, number],
  rotation: [number, number, number] = [0, 0, 0],
) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function addLeg(
  parent: THREE.Object3D,
  x: number,
  z: number,
  height: number,
  material: THREE.Material,
  thickness = 0.055,
) {
  const leg = addMesh(
    parent,
    new THREE.CylinderGeometry(thickness * 0.8, thickness, height, 12),
    material,
    [x, height / 2, z],
  );
  leg.rotation.z = x > 0 ? -0.07 : 0.07;
  leg.rotation.x = z > 0 ? 0.04 : -0.04;
  return leg;
}

function addChair(
  parent: THREE.Object3D,
  fabric: THREE.Material,
  legs: THREE.Material,
  armchair = false,
) {
  const seatHeight = armchair ? 1.02 : 1.08;
  const seatWidth = armchair ? 1.82 : 1.6;
  const seatDepth = armchair ? 1.72 : 1.57;
  const group = new THREE.Group();
  parent.add(group);

  addMesh(
    group,
    new THREE.BoxGeometry(seatWidth, 0.22, seatDepth, 3, 2, 3),
    fabric,
    [0, seatHeight, 0.04],
  );
  addMesh(
    group,
    new THREE.BoxGeometry(seatWidth * 0.91, 0.17, seatDepth * 0.83, 3, 2, 3),
    fabric,
    [0, seatHeight + 0.17, 0.13],
  );

  const back = addMesh(
    group,
    new THREE.BoxGeometry(seatWidth * 0.95, armchair ? 1.36 : 1.22, 0.22, 4, 4, 2),
    fabric,
    [0, armchair ? 1.93 : 1.85, -seatDepth * 0.43],
    [-0.12, 0, 0],
  );
  back.castShadow = true;

  for (const offset of [-0.28, 0, 0.28]) {
    const seam = addMesh(
      group,
      new THREE.BoxGeometry(0.018, armchair ? 1.0 : 0.9, 0.025),
      fabric,
      [offset * (armchair ? 2.25 : 2.1), armchair ? 1.94 : 1.86, -seatDepth * 0.545],
      [-0.12, 0, 0],
    );
    seam.scale.z = 1.15;
  }

  const legHeight = seatHeight - 0.05;
  const legX = seatWidth * 0.36;
  const legZ = seatDepth * 0.34;
  for (const [x, z] of [
    [-legX, -legZ],
    [legX, -legZ],
    [-legX, legZ],
    [legX, legZ],
  ] as [number, number][]) {
    addLeg(group, x, z, legHeight, legs, armchair ? 0.065 : 0.052);
  }

  if (armchair) {
    for (const side of [-1, 1]) {
      const arm = addMesh(
        group,
        new THREE.BoxGeometry(0.18, 0.7, 1.2, 3, 3, 3),
        fabric,
        [side * (seatWidth * 0.47), 1.53, -0.01],
        [0, 0, side * -0.18],
      );
      arm.castShadow = true;
    }
  }

  return group;
}

function addStool(parent: THREE.Object3D, fabric: THREE.Material, legs: THREE.Material) {
  const group = new THREE.Group();
  parent.add(group);
  const seatHeight = 2.08;

  addMesh(group, new THREE.CylinderGeometry(0.8, 0.76, 0.22, 48), fabric, [0, seatHeight, 0]);
  addMesh(group, new THREE.CylinderGeometry(0.7, 0.74, 0.15, 48), fabric, [0, seatHeight + 0.16, 0.02]);
  addMesh(
    group,
    new THREE.BoxGeometry(1.42, 1.0, 0.2, 4, 4, 2),
    fabric,
    [0, 2.66, -0.55],
    [-0.11, 0, 0],
  );

  for (const [x, z] of [
    [-0.58, -0.48],
    [0.58, -0.48],
    [-0.58, 0.48],
    [0.58, 0.48],
  ] as [number, number][]) {
    addLeg(group, x, z, 2.02, legs, 0.052);
  }

  const footrest = addMesh(
    group,
    new THREE.TorusGeometry(0.58, 0.035, 10, 36),
    legs,
    [0, 0.66, 0],
  );
  footrest.rotation.x = Math.PI / 2;
  return group;
}

function addRoundTable(parent: THREE.Object3D, wood: THREE.Material, legs: THREE.Material) {
  const group = new THREE.Group();
  parent.add(group);
  const topHeight = 1.63;

  addMesh(group, new THREE.CylinderGeometry(1.5, 1.5, 0.16, 64), wood, [0, topHeight, 0]);
  addMesh(group, new THREE.CylinderGeometry(0.5, 0.68, 0.11, 48), wood, [0, topHeight - 0.14, 0]);
  for (const [x, z] of [
    [-0.94, -0.94],
    [0.94, -0.94],
    [-0.94, 0.94],
    [0.94, 0.94],
  ] as [number, number][]) {
    addLeg(group, x, z, topHeight - 0.09, legs, 0.075);
  }
  return group;
}

function addConsole(parent: THREE.Object3D, wood: THREE.Material, legs: THREE.Material) {
  const group = new THREE.Group();
  parent.add(group);
  const topHeight = 1.55;
  addMesh(group, new THREE.BoxGeometry(3.25, 0.16, 0.95, 4, 2, 3), wood, [0, topHeight, 0]);
  addMesh(group, new THREE.BoxGeometry(2.92, 0.48, 0.76, 3, 2, 3), wood, [0, 1.2, 0]);
  for (const [x, z] of [
    [-1.35, -0.31],
    [1.35, -0.31],
    [-1.35, 0.31],
    [1.35, 0.31],
  ] as [number, number][]) {
    addLeg(group, x, z, 0.96, legs, 0.06);
  }
  return group;
}

function addSofa(parent: THREE.Object3D, fabric: THREE.Material, legs: THREE.Material) {
  const group = new THREE.Group();
  parent.add(group);
  const width = 3.85;

  addMesh(group, new THREE.BoxGeometry(width, 0.38, 1.7, 5, 2, 3), fabric, [0, 0.72, 0.02]);
  for (const x of [-1.14, 0, 1.14]) {
    addMesh(group, new THREE.BoxGeometry(1.14, 0.2, 1.38, 3, 2, 3), fabric, [x, 1.0, 0.14]);
  }
  addMesh(group, new THREE.BoxGeometry(width, 1.14, 0.28, 5, 3, 2), fabric, [0, 1.46, -0.7]);
  addMesh(group, new THREE.BoxGeometry(0.32, 0.9, 1.6, 3, 3, 3), fabric, [-1.78, 1.22, 0]);
  addMesh(group, new THREE.BoxGeometry(0.32, 0.9, 1.6, 3, 3, 3), fabric, [1.78, 1.22, 0]);
  for (const [x, z] of [
    [-1.5, -0.58],
    [1.5, -0.58],
    [-1.5, 0.58],
    [1.5, 0.58],
  ] as [number, number][]) {
    addLeg(group, x, z, 0.48, legs, 0.07);
  }
  return group;
}

function addDiningSet(parent: THREE.Object3D, fabric: THREE.Material, legs: THREE.Material) {
  const group = new THREE.Group();
  parent.add(group);
  const topY = 1.48;
  addMesh(group, new THREE.BoxGeometry(3.25, 0.16, 1.48, 4, 2, 3), legs, [0, topY, 0]);
  for (const [x, z] of [
    [-1.3, -0.53],
    [1.3, -0.53],
    [-1.3, 0.53],
    [1.3, 0.53],
  ] as [number, number][]) {
    addLeg(group, x, z, 1.39, legs, 0.06);
  }

  const placements: Array<[number, number, number]> = [
    [-1.18, 1.5, Math.PI],
    [0, 1.5, Math.PI],
    [1.18, 1.5, Math.PI],
    [-1.18, -1.5, 0],
    [0, -1.5, 0],
    [1.18, -1.5, 0],
  ];
  for (const [x, z, rotation] of placements) {
    const chair = addChair(group, fabric, legs);
    chair.scale.setScalar(0.43);
    chair.position.set(x, 0, z);
    chair.rotation.y = rotation;
  }
  return group;
}

function buildModel(product: Product, color: ColorOption, leg: ColorOption) {
  const model = new THREE.Group();
  const kind = productKind(product);
  const fabric = new THREE.MeshPhysicalMaterial({
    color: color.hex,
    roughness: 0.73,
    metalness: 0.02,
    clearcoat: 0.04,
    sheen: 0.26,
    sheenColor: new THREE.Color("#ffffff"),
  });
  const wood = new THREE.MeshStandardMaterial({
    color: color.hex,
    roughness: 0.37,
    metalness: 0.06,
  });
  const legMaterial = new THREE.MeshStandardMaterial({
    color: leg.hex,
    roughness: leg.name === "برنزی" ? 0.25 : 0.44,
    metalness: leg.name === "برنزی" ? 0.78 : 0.18,
  });

  switch (kind) {
    case "stool":
      addStool(model, fabric, legMaterial);
      break;
    case "round-table":
      addRoundTable(model, wood, legMaterial);
      break;
    case "console":
      addConsole(model, wood, legMaterial);
      break;
    case "sofa":
      addSofa(model, fabric, legMaterial);
      break;
    case "set":
      addDiningSet(model, fabric, legMaterial);
      break;
    case "armchair":
      addChair(model, fabric, legMaterial, true);
      break;
    default:
      addChair(model, fabric, legMaterial);
      break;
  }

  return model;
}

function disposeModel(model: THREE.Object3D) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  model.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    geometries.add(object.geometry);
    if (Array.isArray(object.material)) {
      object.material.forEach((material) => materials.add(material));
    } else {
      materials.add(object.material);
    }
  });
  geometries.forEach((geometry) => geometry.dispose());
  materials.forEach((material) => material.dispose());
}

function updateFrame(studio: Studio, view: ViewState) {
  if (studio.model) {
    studio.model.rotation.y = normalizeAngle(view.angle) * DEGREE;
  }
  const safeZoom = Math.max(0.75, Math.min(1.55, view.zoom));
  const distance = studio.distance / safeZoom;
  const target = new THREE.Vector3(0, studio.targetY, 0);
  const desired = new THREE.Vector3(distance * 0.46, studio.targetY + distance * 0.31, distance);
  studio.camera.position.lerp(desired, 0.12);
  studio.camera.lookAt(target);
  studio.renderer.render(studio.scene, studio.camera);
}

/**
 * A real WebGL product studio. Models are generated from actual Three.js meshes so
 * colour and leg choices affect the geometry being rendered, rather than a flat image.
 */
export default function Product3DViewer({
  product,
  color,
  leg,
  angle,
  zoom,
  onAngleChange,
  onZoomChange,
  className,
  showStatus = true,
  compact = false,
}: Product3DViewerProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const studioRef = useRef<Studio | null>(null);
  const dragRef = useRef({ active: false, startX: 0, startAngle: 0 });
  const viewRef = useRef<ViewState>({ angle, zoom, onAngleChange, onZoomChange });
  const [webglState, setWebglState] = useState<"loading" | "ready" | "fallback">("loading");

  viewRef.current = { angle, zoom, onAngleChange, onZoomChange };

  const setAngle = useCallback((next: number) => {
    const value = normalizeAngle(next);
    viewRef.current.angle = value;
    viewRef.current.onAngleChange?.(value);
  }, []);

  const setZoom = useCallback((next: number) => {
    const value = Math.max(0.8, Math.min(1.5, Number(next.toFixed(2))));
    viewRef.current.zoom = value;
    viewRef.current.onZoomChange?.(value);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      setWebglState("fallback");
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;
    renderer.domElement.className = "h-full w-full touch-none";
    renderer.domElement.style.display = "block";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(3.2, 3.2, 7);

    const hemisphere = new THREE.HemisphereLight(0xfffcf4, 0x30485a, 2.1);
    scene.add(hemisphere);
    const key = new THREE.DirectionalLight(0xffe6bd, 3.1);
    key.position.set(4.8, 7.5, 5.5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 22;
    key.shadow.camera.left = -6;
    key.shadow.camera.right = 6;
    key.shadow.camera.top = 6;
    key.shadow.camera.bottom = -6;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xb7d7ff, 1.25);
    fill.position.set(-5, 3, 2);
    scene.add(fill);

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(8.5, 64),
      new THREE.ShadowMaterial({ color: 0x10222f, opacity: 0.2 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    const studio: Studio = {
      renderer,
      scene,
      camera,
      model: null,
      targetY: 1.15,
      distance: 6.2,
      animationId: 0,
      resize: () => undefined,
    };

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    studio.resize = resize;
    resize();

    const rebuild = (nextProduct: Product, nextColor: ColorOption, nextLeg: ColorOption) => {
      if (studio.model) {
        studio.scene.remove(studio.model);
        disposeModel(studio.model);
      }
      const model = buildModel(nextProduct, nextColor, nextLeg);
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      model.position.y -= box.min.y;
      studio.model = model;
      studio.targetY = Math.max(0.85, size.y * 0.5);
      studio.distance = Math.max(5.6, Math.max(size.x, size.z) * 2.15 + size.y * 0.7);
      studio.scene.add(model);
    };

    rebuild(product, color, leg);
    studioRef.current = studio;
    setWebglState("ready");

    const observer = new ResizeObserver(resize);
    observer.observe(host);

    const render = () => {
      updateFrame(studio, viewRef.current);
      studio.animationId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(studio.animationId);
      if (studio.model) disposeModel(studio.model);
      floor.geometry.dispose();
      (floor.material as THREE.Material).dispose();
      renderer.dispose();
      renderer.domElement.remove();
      studioRef.current = null;
    };
    // The WebGL stage is intentionally created once; model changes are handled below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const studio = studioRef.current;
    if (!studio) return;
    if (studio.model) {
      studio.scene.remove(studio.model);
      disposeModel(studio.model);
    }
    const model = buildModel(product, color, leg);
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    model.position.y -= box.min.y;
    studio.model = model;
    studio.targetY = Math.max(0.85, size.y * 0.5);
    studio.distance = Math.max(5.6, Math.max(size.x, size.z) * 2.15 + size.y * 0.7);
    studio.scene.add(model);
  }, [product, color, leg]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    dragRef.current = { active: true, startX: event.clientX, startAngle: viewRef.current.angle };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    setAngle(dragRef.current.startAngle + (event.clientX - dragRef.current.startX) * 0.55);
  };

  const stopDrag = (event: PointerEvent<HTMLDivElement>) => {
    dragRef.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    setZoom(viewRef.current.zoom + (event.deltaY > 0 ? -0.08 : 0.08));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setAngle(viewRef.current.angle - 12);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setAngle(viewRef.current.angle + 12);
    }
    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      setZoom(viewRef.current.zoom + 0.1);
    }
    if (event.key === "-") {
      event.preventDefault();
      setZoom(viewRef.current.zoom - 0.1);
    }
  };

  return (
    <div
      ref={hostRef}
      role="application"
      aria-label={`مدل سه‌بعدی ${product.name}. برای چرخش، بکشید یا از کلیدهای جهت استفاده کنید.`}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDrag}
      onPointerCancel={stopDrag}
      onWheel={onWheel}
      onKeyDown={onKeyDown}
      className={cn(
        "relative overflow-hidden touch-none outline-none",
        dragRef.current.active ? "cursor-grabbing" : "cursor-grab",
        className,
      )}
    >
      {webglState !== "ready" ? (
        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.96),rgba(235,227,215,0.85)_62%,rgba(218,204,183,0.76))]">
          <img
            src={product.image}
            alt={product.name}
            className={cn(
              "h-auto w-auto max-w-[72%] object-contain drop-shadow-[0_24px_24px_rgba(8,26,38,0.23)]",
              compact ? "max-h-[65%]" : "max-h-[76%]",
            )}
          />
        </div>
      ) : null}

      {showStatus ? (
        <span className="pointer-events-none absolute bottom-3 end-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/78 px-2.5 py-1 text-[9px] font-semibold text-navy/75 shadow-sm backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-sage shadow-[0_0_0_3px_rgba(124,138,111,0.14)]" />
          مدل WebGL سه‌بعدی
        </span>
      ) : null}

      {webglState === "fallback" ? (
        <span className="pointer-events-none absolute bottom-3 start-3 z-10 rounded-full border border-brass/35 bg-cream/85 px-2.5 py-1 text-[9px] font-medium text-navy/70 backdrop-blur">
          پیش‌نمایش تصویری
        </span>
      ) : null}
    </div>
  );
}
