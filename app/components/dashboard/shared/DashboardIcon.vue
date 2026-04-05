<script setup lang="ts">
import { computed } from 'vue'

interface IconShape {
  tag: 'path' | 'circle' | 'rect' | 'line' | 'polyline' | 'polygon'
  attrs: Record<string, number | string>
}

const props = withDefaults(
  defineProps<{
    name: string
    size?: number
    strokeWidth?: number
    decorative?: boolean
  }>(),
  {
    size: 20,
    strokeWidth: 1.8,
    decorative: true
  }
)

const iconShapes: Record<string, IconShape[]> = {
  default: [
    { tag: 'circle', attrs: { cx: 12, cy: 12, r: 9 } },
    { tag: 'path', attrs: { d: 'M9.5 12l1.5 1.5L14.5 10' } }
  ],
  map: [
    { tag: 'path', attrs: { d: 'M4 6.5L8 4l4 2.5L16 4l4 2.5v11L16 20l-4-2.5L8 20l-4-2.5V6.5Z' } },
    { tag: 'line', attrs: { x1: 8, y1: 4, x2: 8, y2: 20 } },
    { tag: 'line', attrs: { x1: 16, y1: 4, x2: 16, y2: 20 } }
  ],
  'building-2': [
    { tag: 'path', attrs: { d: 'M4 20V6.5A1.5 1.5 0 0 1 5.5 5H12v15H4Z' } },
    { tag: 'path', attrs: { d: 'M12 20V3.5A1.5 1.5 0 0 1 13.5 2H18.5A1.5 1.5 0 0 1 20 3.5V20' } },
    { tag: 'line', attrs: { x1: 7, y1: 9, x2: 9, y2: 9 } },
    { tag: 'line', attrs: { x1: 7, y1: 13, x2: 9, y2: 13 } },
    { tag: 'line', attrs: { x1: 15, y1: 7, x2: 17, y2: 7 } },
    { tag: 'line', attrs: { x1: 15, y1: 11, x2: 17, y2: 11 } }
  ],
  'file-text': [
    { tag: 'path', attrs: { d: 'M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z' } },
    { tag: 'path', attrs: { d: 'M14 3v5h5' } },
    { tag: 'line', attrs: { x1: 9, y1: 12, x2: 15, y2: 12 } },
    { tag: 'line', attrs: { x1: 9, y1: 16, x2: 16, y2: 16 } }
  ],
  users: [
    { tag: 'circle', attrs: { cx: 9, cy: 8, r: 3 } },
    { tag: 'circle', attrs: { cx: 16.5, cy: 9.5, r: 2.5 } },
    { tag: 'path', attrs: { d: 'M3.5 19a5.5 5.5 0 0 1 11 0' } },
    { tag: 'path', attrs: { d: 'M13.5 19a4 4 0 0 1 7 0' } }
  ],
  'circle-check': [
    { tag: 'circle', attrs: { cx: 12, cy: 12, r: 9 } },
    { tag: 'polyline', attrs: { points: '8.5 12.2 11 14.7 15.5 9.8' } }
  ],
  'circle-x': [
    { tag: 'circle', attrs: { cx: 12, cy: 12, r: 9 } },
    { tag: 'line', attrs: { x1: 9, y1: 9, x2: 15, y2: 15 } },
    { tag: 'line', attrs: { x1: 15, y1: 9, x2: 9, y2: 15 } }
  ],
  clock: [
    { tag: 'circle', attrs: { cx: 12, cy: 12, r: 9 } },
    { tag: 'line', attrs: { x1: 12, y1: 7, x2: 12, y2: 12 } },
    { tag: 'line', attrs: { x1: 12, y1: 12, x2: 15, y2: 14 } }
  ],
  'badge-check': [
    { tag: 'path', attrs: { d: 'M8 3h8l2 2v8l-2 2H8l-2-2V5l2-2Z' } },
    { tag: 'polyline', attrs: { points: '9.3 10.8 11.4 12.9 15.2 9.2' } },
    { tag: 'path', attrs: { d: 'M9 15.5V20l3-1.6 3 1.6v-4.5' } }
  ],
  ban: [
    { tag: 'circle', attrs: { cx: 12, cy: 12, r: 9 } },
    { tag: 'line', attrs: { x1: 8.2, y1: 15.8, x2: 15.8, y2: 8.2 } }
  ],
  'circle-alert': [
    { tag: 'circle', attrs: { cx: 12, cy: 12, r: 9 } },
    { tag: 'line', attrs: { x1: 12, y1: 7.5, x2: 12, y2: 12.5 } },
    { tag: 'circle', attrs: { cx: 12, cy: 16.4, r: 0.8 } }
  ],
  'pie-chart': [
    { tag: 'path', attrs: { d: 'M12 3a9 9 0 1 1-9 9h9V3Z' } },
    { tag: 'path', attrs: { d: 'M13 3.1A9 9 0 0 1 20.9 11H13V3.1Z' } }
  ],
  calendar: [
    { tag: 'rect', attrs: { x: 4, y: 5, width: 16, height: 15, rx: 2 } },
    { tag: 'line', attrs: { x1: 8, y1: 3, x2: 8, y2: 7 } },
    { tag: 'line', attrs: { x1: 16, y1: 3, x2: 16, y2: 7 } },
    { tag: 'line', attrs: { x1: 4, y1: 9, x2: 20, y2: 9 } }
  ],
  'bar-chart-3': [
    { tag: 'line', attrs: { x1: 4, y1: 20, x2: 20, y2: 20 } },
    { tag: 'rect', attrs: { x: 6, y: 11, width: 3, height: 7, rx: 1 } },
    { tag: 'rect', attrs: { x: 11, y: 7, width: 3, height: 11, rx: 1 } },
    { tag: 'rect', attrs: { x: 16, y: 4, width: 3, height: 14, rx: 1 } }
  ],
  building: [
    { tag: 'path', attrs: { d: 'M5 20V7l7-4 7 4v13' } },
    { tag: 'line', attrs: { x1: 9, y1: 10, x2: 9, y2: 14 } },
    { tag: 'line', attrs: { x1: 15, y1: 10, x2: 15, y2: 14 } },
    { tag: 'line', attrs: { x1: 12, y1: 16, x2: 12, y2: 20 } }
  ],
  activity: [{ tag: 'polyline', attrs: { points: '3 12 7 12 9.5 7 13 17 15.5 12 21 12' } }],
  receipt: [
    { tag: 'path', attrs: { d: 'M7 3h10v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5V5a2 2 0 0 1 2-2Z' } },
    { tag: 'line', attrs: { x1: 9, y1: 8, x2: 15, y2: 8 } },
    { tag: 'line', attrs: { x1: 9, y1: 12, x2: 15, y2: 12 } }
  ],
  table: [
    { tag: 'rect', attrs: { x: 3.5, y: 5, width: 17, height: 14, rx: 2 } },
    { tag: 'line', attrs: { x1: 3.5, y1: 10, x2: 20.5, y2: 10 } },
    { tag: 'line', attrs: { x1: 10.5, y1: 5, x2: 10.5, y2: 19 } }
  ],
  'thumbs-up': [
    { tag: 'path', attrs: { d: 'M8.5 11.5V20H5a2 2 0 0 1-2-2v-4.5a2 2 0 0 1 2-2h3.5Z' } },
    { tag: 'path', attrs: { d: 'M9.5 20h6.4a2 2 0 0 0 2-1.6l1.3-6.2a2 2 0 0 0-2-2.4H13V6.7A2.7 2.7 0 0 0 10.3 4L8.5 11.5' } }
  ],
  like: [
    { tag: 'path', attrs: { d: 'M8 11V20H4.8A1.8 1.8 0 0 1 3 18.2v-5.4A1.8 1.8 0 0 1 4.8 11H8Z' } },
    { tag: 'path', attrs: { d: 'M9.3 20h6.3a2.2 2.2 0 0 0 2.1-1.5l1.4-4.6a2.2 2.2 0 0 0-2.1-2.9H13V7.5A2.5 2.5 0 0 0 10.5 5L9.3 11' } },
    { tag: 'circle', attrs: { cx: 18.2, cy: 5.8, r: 2.2 } },
    { tag: 'line', attrs: { x1: 18.2, y1: 4.6, x2: 18.2, y2: 7 } },
    { tag: 'line', attrs: { x1: 17, y1: 5.8, x2: 19.4, y2: 5.8 } }
  ],
  star: [{ tag: 'polygon', attrs: { points: '12 3.5 14.7 9 20.6 9.8 16.3 14 17.4 20 12 17.1 6.6 20 7.7 14 3.4 9.8 9.3 9' } }],
  'feedback-sheet': [
    { tag: 'path', attrs: { d: 'M7 3h9l4 4v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z' } },
    { tag: 'path', attrs: { d: 'M16 3v4h4' } },
    { tag: 'line', attrs: { x1: 9, y1: 11, x2: 15.5, y2: 11 } },
    { tag: 'line', attrs: { x1: 9, y1: 14.5, x2: 14, y2: 14.5 } },
    { tag: 'polyline', attrs: { points: '9.2 18 10.6 19.4 13.2 16.8' } }
  ],
  ticket: [
    { tag: 'path', attrs: { d: 'M5 7h14v3a2 2 0 0 0 0 4v3H5v-3a2 2 0 0 0 0-4V7Z' } },
    { tag: 'line', attrs: { x1: 10, y1: 7, x2: 10, y2: 17 } }
  ],
  timer: [
    { tag: 'circle', attrs: { cx: 12, cy: 13, r: 7 } },
    { tag: 'line', attrs: { x1: 12, y1: 13, x2: 15, y2: 10 } },
    { tag: 'line', attrs: { x1: 9, y1: 3, x2: 15, y2: 3 } }
  ],
  'clock-3': [
    { tag: 'circle', attrs: { cx: 12, cy: 12, r: 9 } },
    { tag: 'line', attrs: { x1: 12, y1: 7, x2: 12, y2: 12 } },
    { tag: 'line', attrs: { x1: 12, y1: 12, x2: 16, y2: 12 } }
  ],
  'user-round': [
    { tag: 'circle', attrs: { cx: 12, cy: 8, r: 3 } },
    { tag: 'path', attrs: { d: 'M5 19a7 7 0 0 1 14 0' } }
  ],
  'user-round-check': [
    { tag: 'circle', attrs: { cx: 10, cy: 8, r: 3 } },
    { tag: 'path', attrs: { d: 'M3 19a7 7 0 0 1 10 0' } },
    { tag: 'polyline', attrs: { points: '15.5 11.5 17 13 20 10' } }
  ],
  'scan-line': [
    { tag: 'path', attrs: { d: 'M7 4H4v3M17 4h3v3M7 20H4v-3M17 20h3v-3' } },
    { tag: 'line', attrs: { x1: 6, y1: 12, x2: 18, y2: 12 } }
  ],
  'settings-2': [
    { tag: 'circle', attrs: { cx: 12, cy: 12, r: 3 } },
    { tag: 'path', attrs: { d: 'M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1-1.8 3.1-.2-.1a1.8 1.8 0 0 0-2 .1l-.2.1a1.8 1.8 0 0 0-.9 1.5V22H9.3v-.3a1.8 1.8 0 0 0-.9-1.5l-.2-.1a1.8 1.8 0 0 0-2-.1l-.2.1-1.8-3.1.1-.1A1.7 1.7 0 0 0 4.6 15l-.1-.2a1.7 1.7 0 0 0-1.5-.8H3V10h.1a1.7 1.7 0 0 0 1.5-.8l.1-.2A1.7 1.7 0 0 0 4.4 7l-.1-.1L6.1 3.8l.2.1a1.8 1.8 0 0 0 2-.1l.2-.1c.5-.3.9-.9.9-1.5V2h5.4v.3c0 .6.3 1.2.9 1.5l.2.1a1.8 1.8 0 0 0 2 .1l.2-.1 1.8 3.1-.1.1A1.7 1.7 0 0 0 19.4 9l.1.2c.3.5.9.8 1.5.8h.1v4h-.1c-.6 0-1.2.3-1.5.8l-.1.2Z' } }
  ],
  benchmark: [
    { tag: 'path', attrs: { d: 'M4 19.5V6.5h4.8l2.7 3.1h8.5v9.9' } },
    { tag: 'line', attrs: { x1: 6.5, y1: 15.5, x2: 9.2, y2: 12.7 } },
    { tag: 'line', attrs: { x1: 9.2, y1: 12.7, x2: 12.2, y2: 14.6 } },
    { tag: 'line', attrs: { x1: 12.2, y1: 14.6, x2: 17.5, y2: 9.3 } },
    { tag: 'circle', attrs: { cx: 17.5, cy: 9.3, r: 1.1 } }
  ],
  indicator: [
    { tag: 'rect', attrs: { x: 4.5, y: 5, width: 15, height: 14, rx: 2 } },
    { tag: 'line', attrs: { x1: 8, y1: 10.5, x2: 8, y2: 15.5 } },
    { tag: 'line', attrs: { x1: 12, y1: 12.5, x2: 12, y2: 15.5 } },
    { tag: 'line', attrs: { x1: 16, y1: 8.5, x2: 16, y2: 15.5 } }
  ],
  'list-filter': [
    { tag: 'line', attrs: { x1: 4.5, y1: 7, x2: 19.5, y2: 7 } },
    { tag: 'line', attrs: { x1: 7.5, y1: 12, x2: 16.5, y2: 12 } },
    { tag: 'line', attrs: { x1: 10.5, y1: 17, x2: 13.5, y2: 17 } }
  ],
  'refresh-cw': [
    { tag: 'path', attrs: { d: 'M20 6v5h-5' } },
    { tag: 'path', attrs: { d: 'M4 18v-5h5' } },
    { tag: 'path', attrs: { d: 'M6.4 8.4A7 7 0 0 1 18 10' } },
    { tag: 'path', attrs: { d: 'M17.6 15.6A7 7 0 0 1 6 14' } }
  ],
  'arrow-rise': [
    { tag: 'path', attrs: { d: 'M4 16L10 10L13.5 13.5L20 7' } },
    { tag: 'polyline', attrs: { points: '15.5 7 20 7 20 11.5' } }
  ],
  'arrow-fall': [
    { tag: 'path', attrs: { d: 'M4 8L10 14L13.5 10.5L20 17' } },
    { tag: 'polyline', attrs: { points: '15.5 17 20 17 20 12.5' } }
  ],
  eye: [
    { tag: 'path', attrs: { d: 'M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12Z' } },
    { tag: 'circle', attrs: { cx: 12, cy: 12, r: 2.8 } }
  ],
  'file-spreadsheet': [
    { tag: 'path', attrs: { d: 'M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z' } },
    { tag: 'path', attrs: { d: 'M14 3v5h5' } },
    { tag: 'line', attrs: { x1: 9, y1: 11, x2: 16, y2: 11 } },
    { tag: 'line', attrs: { x1: 9, y1: 15, x2: 16, y2: 15 } },
    { tag: 'line', attrs: { x1: 12.5, y1: 9, x2: 12.5, y2: 17 } }
  ],
  search: [
    { tag: 'circle', attrs: { cx: 11, cy: 11, r: 6 } },
    { tag: 'line', attrs: { x1: 16.2, y1: 16.2, x2: 20, y2: 20 } }
  ],
  chevron: [{ tag: 'polyline', attrs: { points: '8 10 12 14 16 10' } }],
  download: [
    { tag: 'path', attrs: { d: 'M12 4v10' } },
    { tag: 'polyline', attrs: { points: '8.5 11.5 12 15 15.5 11.5' } },
    { tag: 'path', attrs: { d: 'M5 19h14' } }
  ]
}

const shapes = computed(() => iconShapes[props.name] ?? iconShapes.default)
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :aria-hidden="decorative"
    :role="decorative ? 'presentation' : 'img'"
    :stroke-width="strokeWidth"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <component
      :is="shape.tag"
      v-for="(shape, index) in shapes"
      :key="`${name}-${index}`"
      v-bind="shape.attrs"
    />
  </svg>
</template>
