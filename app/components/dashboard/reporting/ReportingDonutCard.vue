<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { DonutPanelData } from '../../../../types'

const props = defineProps<{
  data: DonutPanelData
  variant: 'demographic' | 'vulnerability'
}>()

const orderedIds = computed(() => (
  props.variant === 'vulnerability'
    ? ['vulnerability', 'male', 'female', 'common']
    : ['male', 'female', 'common']
))

const viewportWidth = ref(1280)
const chartFrameRef = ref<HTMLElement | null>(null)
const chartFrameWidth = ref(0)
let chartResizeObserver: ResizeObserver | null = null

const chartSegments = computed(() => {
  const byId = new Map(props.data.legend.map((item) => [item.id, item]))

  return orderedIds.value
    .map((id) => byId.get(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
})

function syncViewportWidth() {
  if (typeof window === 'undefined') {
    return
  }

  viewportWidth.value = window.innerWidth
}

function syncChartFrameWidth() {
  chartFrameWidth.value = chartFrameRef.value?.clientWidth ?? 0
}

onMounted(() => {
  syncViewportWidth()
  syncChartFrameWidth()
  window.addEventListener('resize', syncViewportWidth, { passive: true })

  if (typeof window !== 'undefined' && 'ResizeObserver' in window && chartFrameRef.value) {
    chartResizeObserver = new ResizeObserver(() => syncChartFrameWidth())
    chartResizeObserver.observe(chartFrameRef.value)
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', syncViewportWidth)
  }

  chartResizeObserver?.disconnect()
  chartResizeObserver = null
})

const donutLayout = computed(() => {
  const measuredWidth = chartFrameWidth.value || (viewportWidth.value < 480
    ? 232
    : viewportWidth.value < 768
      ? 284
      : viewportWidth.value < 1024
        ? 360
        : 468)
  const maxWidth = viewportWidth.value >= 768 ? 500 : 440
  const width = Math.max(232, Math.min(measuredWidth, maxWidth))
  const compact = width < 300
  const tablet = width < 380
  const expanded = width >= 460
  const horizontalPadding = compact ? 34 : tablet ? 42 : expanded ? 58 : 52
  const size = Math.max(
    compact ? 172 : tablet ? 196 : expanded ? 262 : 236,
    Math.min(width - horizontalPadding * 2, compact ? 188 : tablet ? 216 : expanded ? 288 : 258)
  )
  const top = compact ? 38 : tablet ? 30 : expanded ? 18 : 22
  const bottomPadding = compact ? 52 : tablet ? 54 : expanded ? 68 : 60

  return {
    width,
    height: top + size + bottomPadding,
    size,
    top,
    center: size / 2,
    innerRadius: Math.round(size * 0.22),
    labelOffset: compact ? 12 : tablet ? 14 : expanded ? 18 : 16,
    startAngle: -12,
    gapAngle: 1.8
  }
})

const labelTextClass = computed(() => (
  donutLayout.value.width < 300
    ? 'text-[12px] leading-4'
    : donutLayout.value.width < 380
      ? 'text-[13px] leading-4'
      : donutLayout.value.width < 440
        ? 'text-[14px] leading-[18px]'
        : 'text-[15.2667px] leading-5'
))

const donutHoleSize = computed(() => `${donutLayout.value.innerRadius * 2}px`)

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function outerRadiusForSegment(segmentId: string) {
  if (props.variant === 'vulnerability') {
    let ratio = 0.315

    switch (segmentId) {
      case 'female':
        ratio = 0.36
        break
      case 'vulnerability':
        ratio = 0.3467
        break
      case 'male':
        ratio = 0.3267
        break
      case 'common':
        ratio = 0.3
        break
      default:
        ratio = 0.315
    }

    return Math.min(donutLayout.value.size / 2 - 8, donutLayout.value.size * ratio)
  }

  let ratio = 0.32

  switch (segmentId) {
    case 'female':
      ratio = 0.3733
      break
    case 'male':
      ratio = 0.34
      break
    case 'common':
      ratio = 0.3067
      break
    default:
      ratio = 0.32
  }

  return Math.min(donutLayout.value.size / 2 - 8, donutLayout.value.size * ratio)
}

function polarToCartesian(radius: number, angleDeg: number) {
  const layout = donutLayout.value
  const radians = (angleDeg * Math.PI) / 180

  return {
    x: layout.center + Math.sin(radians) * radius,
    y: layout.center - Math.cos(radians) * radius
  }
}

function buildSlicePath(startAngle: number, endAngle: number, outerRadius: number, innerRadius: number) {
  const outerStart = polarToCartesian(outerRadius, startAngle)
  const outerEnd = polarToCartesian(outerRadius, endAngle)
  const innerEnd = polarToCartesian(innerRadius, endAngle)
  const innerStart = polarToCartesian(innerRadius, startAngle)
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}`,
    'Z'
  ].join(' ')
}

const donutSlices = computed(() => {
  const layout = donutLayout.value
  let currentAngle = layout.startAngle

  return chartSegments.value.map((segment) => {
    const sweepAngle = (segment.percentage ?? 0) * 3.6
    const nextAngle = currentAngle + sweepAngle
    const startAngle = currentAngle + layout.gapAngle / 2
    const endAngle = Math.max(startAngle + 0.01, nextAngle - layout.gapAngle / 2)
    const outerRadius = outerRadiusForSegment(segment.id)

    currentAngle = nextAngle

    return {
      ...segment,
      outerRadius,
      midAngle: startAngle + (endAngle - startAngle) / 2,
      path: buildSlicePath(startAngle, endAngle, outerRadius, layout.innerRadius)
    }
  })
})

const sliceLabels = computed(() => {
  const layout = donutLayout.value
  const centerX = layout.width / 2
  const centerY = layout.top + layout.center
  const minX = layout.width < 300 ? 20 : layout.width < 380 ? 24 : 28
  const maxX = layout.width - minX
  const minY = layout.width < 300 ? 12 : 14
  const maxY = layout.height - (layout.width < 300 ? 18 : 22)

  return donutSlices.value.map((segment) => {
    const radians = (segment.midAngle * Math.PI) / 180
    const labelRadius = segment.outerRadius + layout.labelOffset
    const rawX = centerX + Math.sin(radians) * labelRadius
    const rawY = centerY - Math.cos(radians) * labelRadius
    const isLeft = rawX < centerX - 14
    const isRight = rawX > centerX + 14
    const isTop = rawY < centerY - 20
    const isBottom = rawY > centerY + 20
    const x = clamp(rawX + (isLeft ? -4 : isRight ? 4 : 0), minX, maxX)
    const y = clamp(rawY + (isTop ? -3 : isBottom ? 4 : 0), minY, maxY)

    const horizontalClass = x <= minX + 2
      ? 'translate-x-0 text-left'
      : x >= maxX - 2
        ? '-translate-x-full text-right'
        : isLeft
          ? '-translate-x-full text-right'
          : isRight
            ? 'translate-x-0 text-left'
            : '-translate-x-1/2 text-center'

    const verticalClass = y <= minY + 2
      ? 'translate-y-0'
      : y >= maxY - 2
        ? '-translate-y-full'
        : isTop
          ? '-translate-y-full'
          : isBottom
            ? 'translate-y-0'
            : '-translate-y-1/2'

    return {
      id: segment.id,
      label: segment.id === 'vulnerability' && props.data.centerLabel ? props.data.centerLabel : segment.label,
      class: [horizontalClass, verticalClass].join(' '),
      style: {
        left: `${x}px`,
        top: `${y}px`
      }
    }
  })
})
</script>

<template>
  <article class="rounded-[15px] bg-white px-4 py-4 shadow-[0px_2.5px_5.5px_rgba(0,0,0,0.06)] sm:px-[18px] sm:py-[18px] lg:px-[28px] lg:py-[24px]">
    <div class="grid gap-5 xl:grid-cols-[150px_minmax(0,1fr)] xl:items-center xl:gap-4">
      <div class="space-y-3 self-start pt-1 sm:space-y-[14px] lg:space-y-[18px] lg:pt-[10px]">
        <div v-for="item in data.legend" :key="item.id" class="flex items-center gap-[9px]">
          <span class="h-[10px] w-[10px] rounded-full" :style="{ backgroundColor: item.color }" />
          <span class="text-[14px] font-medium leading-5 sm:text-[16px] sm:leading-6 lg:text-[17.8111px] lg:leading-[27px]" :style="{ color: item.color }">
            {{ item.label }}
          </span>
        </div>
      </div>

      <div
        ref="chartFrameRef"
        class="relative mx-auto w-full max-w-[440px] overflow-visible md:max-w-[500px] lg:max-w-[540px] xl:max-w-[500px]"
        :style="{ height: `${donutLayout.height}px` }"
      >
        <span
          v-for="item in sliceLabels"
          :key="item.id"
          class="absolute z-10 whitespace-nowrap font-medium text-[#171A1F]"
          :class="[labelTextClass, item.class]"
          :style="item.style"
        >
          {{ item.label }}
        </span>

        <div
          class="absolute left-1/2 top-0 z-0 -translate-x-1/2"
          :style="{ top: `${donutLayout.top}px`, width: `${donutLayout.size}px`, height: `${donutLayout.size}px` }"
        >
          <svg
            class="h-full w-full overflow-visible"
            :viewBox="`0 0 ${donutLayout.size} ${donutLayout.size}`"
            aria-hidden="true"
          >
            <path
              v-for="segment in donutSlices"
              :key="segment.id"
              :d="segment.path"
              :fill="segment.color"
            />
          </svg>

          <div
            class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0px_9.66791px_68.8838px_rgba(0,0,0,0.14)]"
            :style="{ width: donutHoleSize, height: donutHoleSize }"
          />
        </div>
      </div>
    </div>
  </article>
</template>
