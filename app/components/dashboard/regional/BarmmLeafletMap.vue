<script setup lang="ts">
import 'leaflet/dist/leaflet.css'

import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import type {
  FeatureGroup as LeafletFeatureGroup,
  LatLngBoundsExpression,
  Map as LeafletMap,
  PathOptions,
  Polygon as LeafletPolygon
} from 'leaflet'
import type { RegionTooltipData } from '../../../../types'

interface ProvinceRegion {
  id: string
  name: string
  status: 'Low' | 'Medium' | 'High'
  total: number
  completed: number
  pending: number
  rejected: number
  tone: 'low' | 'medium' | 'high'
  polygon: [number, number][]
}

const emit = defineEmits<{
  hover: [province: RegionTooltipData]
  leave: []
}>()

const mapElement = ref<HTMLDivElement | null>(null)

let map: LeafletMap | null = null
let provinceGroup: LeafletFeatureGroup | null = null

const philippinesBounds: LatLngBoundsExpression = [
  [4.2, 116.7],
  [21.35, 126.6]
]

const provinceRegions: ProvinceRegion[] = [
  {
    id: 'basilan',
    name: 'Basilan',
    status: 'Medium',
    total: 162480,
    completed: 131720,
    pending: 18640,
    rejected: 12120,
    tone: 'medium',
    polygon: [
      [6.48, 121.92],
      [6.57, 121.84],
      [6.69, 121.9],
      [6.75, 122.06],
      [6.69, 122.23],
      [6.56, 122.29],
      [6.44, 122.18]
    ]
  },
  {
    id: 'sulu',
    name: 'Sulu',
    status: 'Medium',
    total: 204690,
    completed: 165110,
    pending: 24780,
    rejected: 14790,
    tone: 'medium',
    polygon: [
      [5.86, 120.56],
      [6.02, 120.43],
      [6.17, 120.62],
      [6.21, 120.98],
      [6.05, 121.29],
      [5.8, 121.16],
      [5.72, 120.78]
    ]
  },
  {
    id: 'tawi-tawi',
    name: 'Tawi-Tawi',
    status: 'Low',
    total: 118320,
    completed: 94140,
    pending: 15300,
    rejected: 8880,
    tone: 'low',
    polygon: [
      [4.72, 119.82],
      [4.92, 119.68],
      [5.11, 119.86],
      [5.14, 120.26],
      [4.99, 120.56],
      [4.78, 120.41],
      [4.65, 120.04]
    ]
  },
  {
    id: 'lanao-del-sur',
    name: 'Lanao del Sur',
    status: 'High',
    total: 372560,
    completed: 308420,
    pending: 38490,
    rejected: 25650,
    tone: 'high',
    polygon: [
      [7.28, 123.74],
      [7.55, 123.66],
      [7.89, 123.86],
      [8.08, 124.2],
      [7.98, 124.58],
      [7.62, 124.71],
      [7.33, 124.52],
      [7.21, 124.11]
    ]
  },
  {
    id: 'maguindanao-del-norte',
    name: 'Maguindanao del Norte',
    status: 'High',
    total: 286740,
    completed: 236890,
    pending: 30210,
    rejected: 19640,
    tone: 'high',
    polygon: [
      [6.82, 124.1],
      [7.08, 124.02],
      [7.34, 124.29],
      [7.42, 124.7],
      [7.28, 125],
      [6.97, 125.05],
      [6.77, 124.72]
    ]
  },
  {
    id: 'maguindanao-del-sur',
    name: 'Maguindanao del Sur',
    status: 'High',
    total: 452310,
    completed: 380100,
    pending: 45000,
    rejected: 27210,
    tone: 'high',
    polygon: [
      [6.15, 124.36],
      [6.5, 124.23],
      [6.89, 124.42],
      [7.02, 124.91],
      [6.86, 125.33],
      [6.48, 125.46],
      [6.2, 125.18],
      [6.07, 124.74]
    ]
  }
]

function provinceStyle(tone: ProvinceRegion['tone']): PathOptions {
  if (tone === 'high') {
    return {
      color: '#2F85E4',
      fillColor: '#3899FA',
      fillOpacity: 0.4,
      weight: 2.5,
      lineCap: 'round',
      lineJoin: 'round'
    }
  }

  if (tone === 'medium') {
    return {
      color: '#5D9EF5',
      fillColor: '#87B6FF',
      fillOpacity: 0.34,
      weight: 2.25,
      lineCap: 'round',
      lineJoin: 'round'
    }
  }

  return {
    color: '#84B8FB',
    fillColor: '#D5E6FF',
    fillOpacity: 0.46,
    weight: 2,
    lineCap: 'round',
    lineJoin: 'round'
  }
}

function hoverStyle(tone: ProvinceRegion['tone']): PathOptions {
  const base = provinceStyle(tone)

  return {
    ...base,
    color: '#1D4ED8',
    weight: 3.25,
    fillOpacity: tone === 'high' ? 0.62 : tone === 'medium' ? 0.54 : 0.56
  }
}

function createTooltipData(province: ProvinceRegion): RegionTooltipData {
  return {
    name: province.name,
    statusLabel: province.status,
    stats: [
      { id: `${province.id}-total`, label: 'Total Registrations', value: province.total },
      { id: `${province.id}-completed`, label: 'Completed', value: province.completed },
      { id: `${province.id}-pending`, label: 'Pending', value: province.pending },
      { id: `${province.id}-rejected`, label: 'Rejected', value: province.rejected, tone: 'danger' }
    ]
  }
}

function activateProvince(layer: LeafletPolygon, province: ProvinceRegion) {
  layer.setStyle(hoverStyle(province.tone))
  layer.bringToFront()
  emit('hover', createTooltipData(province))
}

function deactivateProvince(layer: LeafletPolygon, province: ProvinceRegion) {
  layer.setStyle(provinceStyle(province.tone))
  emit('leave')
}

onMounted(async () => {
  if (!mapElement.value || map) {
    return
  }

  const L = await import('leaflet')
  const boundedPhilippines = L.latLngBounds(philippinesBounds).pad(0.08)

  map = L.map(mapElement.value, {
    zoomControl: false,
    attributionControl: false,
    scrollWheelZoom: true,
    dragging: true,
    doubleClickZoom: true,
    boxZoom: false,
    keyboard: false,
    touchZoom: true,
    tapHold: false,
    zoomSnap: 0.25,
    maxBounds: boundedPhilippines,
    maxBoundsViscosity: 1
  })

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 20,
    maxNativeZoom: 20,
    minZoom: 3,
    noWrap: true
  }).addTo(map)

  L.control.zoom({
    position: 'bottomleft'
  }).addTo(map)

  provinceGroup = L.featureGroup().addTo(map)

  provinceRegions.forEach((province) => {
    const layer: LeafletPolygon = L.polygon(province.polygon, {
      ...provinceStyle(province.tone),
      interactive: true
    }).addTo(provinceGroup!)

    layer.on('mouseover', () => activateProvince(layer, province))
    layer.on('mouseout', () => deactivateProvince(layer, province))
    layer.on('click', () => activateProvince(layer, province))
  })

  map.fitBounds(boundedPhilippines, { padding: [28, 28] })
  const philippinesZoom = map.getZoom()
  const barmmBounds = provinceGroup.getBounds().pad(0.35)

  map.fitBounds(barmmBounds as LatLngBoundsExpression, { padding: [36, 36] })
  map.setMinZoom(philippinesZoom)
  map.setMaxZoom(18)

  await nextTick()
  requestAnimationFrame(() => {
    map?.invalidateSize()
    map?.fitBounds(barmmBounds as LatLngBoundsExpression, { padding: [36, 36] })
    map?.setMinZoom(philippinesZoom)
  })
})

onBeforeUnmount(() => {
  emit('leave')
  provinceGroup?.remove()
  provinceGroup = null

  map?.remove()
  map = null
})
</script>

<template>
  <div ref="mapElement" class="dashboard-density-map h-full w-full rounded-[24px]" />
</template>
