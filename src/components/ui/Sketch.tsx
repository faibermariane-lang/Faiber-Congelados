import { motion, useReducedMotion } from 'motion/react';
import type { SketchName } from '../../content/site';
import { cn } from '../../lib/cn';

/**
 * Ilustrações em traço único, no espírito de um caderno de receitas antigo
 * ou de um desenho técnico de embalagem. São decorativas (aria-hidden).
 */

const circ = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

const dots = (pts: Array<[number, number]>, r = 0.9) => pts.map(([x, y]) => circ(x, y, r)).join('');

/** marcas de garfo ao longo da borda do pastel */
const crimp = () => {
  let d = '';
  for (let x = 36; x <= 204; x += 8) d += `M${x} 44l0.6 7M${x + 1} 126l-0.4 7`;
  for (let y = 54; y <= 118; y += 8) d += `M30 ${y}l7 0.4M203 ${y}l7 -0.5`;
  return d;
};

type Drawing = { viewBox: string; paths: string[]; fine?: string[] };

const DRAWINGS: Record<SketchName, Drawing> = {
  pastel: {
    viewBox: '0 24 240 128',
    paths: [
      'M24 38C70 31 160 30 215 36C221 70 222 110 216 138C160 144 80 146 26 140C19 106 18 70 24 38Z',
      'M28 41C76 36 158 35 211 40',
      'M27 136C80 141 158 139 212 134',
      crimp(),
      'M60 70c6-4 13-3 16 2M108 92c5-3 11-2 13 2M150 66c6-3 12-2 15 3M86 110c4-2 9-1 11 2M170 104c4-3 10-2 12 2',
    ],
    fine: [dots([[70, 84], [128, 72], [144, 112], [98, 64], [182, 84], [54, 112], [120, 118]], 1.3)],
  },
  coxinha: {
    viewBox: '0 0 160 210',
    paths: [
      'M80 16C86 40 118 78 128 118C139 160 113 186 80 186C47 186 21 160 32 118C42 78 74 40 80 16Z',
      'M79 22C84 44 112 80 122 118',
      'M24 192C52 200 110 200 138 191',
      'M80 16c-1-5 0-8 3-10',
    ],
    fine: [
      dots(
        [
          [62, 80], [92, 72], [74, 104], [104, 110], [56, 126], [86, 136], [114, 140], [48, 152], [70, 160],
          [100, 164], [82, 92], [60, 104], [96, 150], [120, 124], [40, 136], [76, 174],
        ],
        1.1,
      ),
    ],
  },
  enroladinho: {
    viewBox: '0 0 240 150',
    paths: [
      'M52 34C90 30 150 30 188 34C206 36 214 54 214 75C214 96 206 114 188 116C150 120 90 120 52 116',
      'M52 34C36 34 26 52 26 75C26 98 36 116 52 116C66 116 76 98 76 75C76 52 66 34 52 34Z',
      'M52 52C42 52 38 64 38 75C38 88 44 98 53 98C62 98 66 88 66 76C66 66 61 60 54 60C48 60 46 68 46 75C46 82 50 86 54 85',
      'M96 31C108 60 108 92 98 119M132 31C144 60 144 92 134 119M168 32C180 60 180 92 170 118',
      'M214 62C224 62 230 68 230 75C230 82 224 88 214 88',
    ],
    fine: [dots([[112, 50], [150, 96], [186, 54], [118, 100], [84, 64]], 1.1)],
  },
  miniPizza: {
    viewBox: '0 0 200 200',
    paths: [
      'M100 18C146 17 182 52 182 100C183 146 146 182 100 182C54 183 18 146 18 100C17 54 54 18 100 18Z',
      'M100 32C138 31 168 62 168 100C168 138 138 168 100 168C62 169 32 138 32 100C31 62 62 32 100 32Z',
      circ(76, 72, 12),
      circ(124, 80, 11),
      circ(88, 128, 12),
      circ(134, 126, 10),
      'M108 104c4-6 12-7 16-3c-6 4-12 5-16 3ZM60 102c5-4 11-4 14 0c-5 3-10 3-14 0ZM112 52c3-5 9-6 12-3c-4 4-9 5-12 3Z',
    ],
    fine: [dots([[100, 96], [64, 120], [146, 100], [112, 150], [70, 92], [120, 64]], 1.2)],
  },
  assado: {
    viewBox: '0 0 240 160',
    paths: [
      'M22 120C24 70 70 32 120 32C170 32 216 70 218 120C180 132 60 132 22 120Z',
      'M30 118C68 128 172 128 210 118',
      'M74 62C86 78 88 98 82 118M120 48C130 70 130 98 122 122M166 62C176 78 176 98 168 118',
      'M16 134C70 146 170 146 224 134',
    ],
    fine: [dots([[96, 60], [108, 74], [140, 58], [150, 76], [100, 92], [146, 96], [60, 92], [184, 94]], 1.4)],
  },
  trigo: {
    viewBox: '0 0 120 280',
    paths: [
      'M62 276C60 220 58 150 62 40',
      'M62 60C50 52 46 40 48 26C58 32 64 44 62 60ZM62 60C74 52 78 40 76 26C66 32 60 44 62 60Z',
      'M61 92C48 84 44 72 46 58C56 64 62 76 61 92ZM61 92C74 84 78 72 76 58C66 64 60 76 61 92Z',
      'M61 124C48 116 44 104 46 90C56 96 62 108 61 124ZM61 124C74 116 78 104 76 90C66 96 60 108 61 124Z',
      'M60 156C47 148 43 136 45 122C55 128 61 140 60 156ZM60 156C73 148 77 136 75 122C65 128 59 140 60 156Z',
      'M62 40C62 28 64 16 68 4M48 26C44 16 38 8 30 2M76 26C82 16 88 8 96 4M46 58C40 48 34 42 26 38M76 58C84 48 90 42 98 40',
      'M60 200C50 196 42 188 38 176',
    ],
  },
  pimenta: {
    viewBox: '0 0 220 130',
    paths: [
      'M44 44C80 40 130 52 166 80C180 92 194 108 204 122C184 116 164 108 140 98C104 84 66 78 42 70C30 66 30 46 44 44Z',
      'M52 52C84 52 124 62 156 84',
      'M44 44C38 36 30 30 20 30C22 40 28 50 36 56',
      'M20 30C16 24 10 18 4 16',
    ],
  },
  folha: {
    viewBox: '0 0 170 240',
    paths: [
      'M86 236C84 190 82 130 88 70C90 50 94 30 100 12',
      'M86 150C60 150 32 134 22 108C50 104 76 120 86 150Z',
      'M86 150C66 140 46 128 28 112',
      'M87 112C110 108 136 88 144 62C116 62 94 82 87 112Z',
      'M87 112C104 98 122 82 138 68',
      'M89 64C72 58 58 42 56 22C76 28 88 44 89 64Z',
      'M89 64C78 52 68 40 60 28',
      'M85 196C104 194 124 182 132 164C112 162 94 174 85 196Z',
    ],
  },
  rolo: {
    viewBox: '0 0 300 90',
    paths: [
      'M72 22C120 18 184 18 230 22C236 34 236 58 230 68C184 72 120 72 72 68C66 56 66 34 72 22Z',
      'M72 22C66 34 66 56 72 68',
      'M4 40C18 38 46 38 66 40C68 44 68 48 66 52C46 54 18 54 4 52C2 48 2 44 4 40Z',
      'M236 40C256 38 282 38 296 40C298 44 298 48 296 52C282 54 256 54 236 52',
      'M92 34C130 31 180 31 214 34',
    ],
  },
  tomate: {
    viewBox: '0 0 160 160',
    paths: [
      'M80 30C120 28 148 56 146 92C144 128 116 150 80 150C44 150 14 128 14 92C14 56 40 30 80 30Z',
      'M80 34C70 28 58 28 50 34C60 38 70 40 80 40C90 40 102 38 110 32C100 28 90 28 80 34Z',
      'M80 34C80 24 82 16 88 10',
      'M40 70C34 82 32 98 36 112',
    ],
  },
};

type SketchProps = {
  name: SketchName;
  className?: string;
  /** desenha o traço ao entrar na viewport */
  draw?: boolean;
  /** atraso da animação de traço, em segundos */
  delay?: number;
};

export function Sketch({ name, className, draw = true, delay = 0 }: SketchProps) {
  const reduce = useReducedMotion();
  const drawing = DRAWINGS[name];
  const animate = draw && !reduce;

  return (
    <svg viewBox={drawing.viewBox} className={cn('overflow-visible', className)} aria-hidden="true" focusable="false">
      <g className="sketch">
        {drawing.paths.map((d, i) =>
          animate ? (
            <motion.path
              key={i}
              d={d}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 1.6, delay: delay + i * 0.12, ease: [0.65, 0, 0.35, 1] }}
            />
          ) : (
            <path key={i} d={d} />
          ),
        )}
        {drawing.fine?.map((d, i) => (
          <motion.path
            key={`f${i}`}
            d={d}
            initial={animate ? { opacity: 0 } : false}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: delay + 0.9 }}
          />
        ))}
      </g>
    </svg>
  );
}
