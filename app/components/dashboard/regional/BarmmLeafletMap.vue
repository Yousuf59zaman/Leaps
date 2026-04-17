<script setup lang="ts">
import 'leaflet/dist/leaflet.css'

import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import type {
  CircleMarker as LeafletCircleMarker,
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

interface MunicipalityPoint {
  id: string
  provinceId: ProvinceRegion['id']
  name: string
  coordinates: [number, number]
}

const emit = defineEmits<{
  hover: [province: RegionTooltipData]
  leave: []
}>()

const mapElement = ref<HTMLDivElement | null>(null)

let map: LeafletMap | null = null
let provinceGroup: LeafletFeatureGroup | null = null
let municipalityGroup: LeafletFeatureGroup | null = null
const provinceLayerMap = new Map<ProvinceRegion['id'], LeafletPolygon>()

const philippinesBounds: LatLngBoundsExpression = [
  [4.2, 116.7],
  [21.35, 126.6]
]

const barmmFocusCenter: [number, number] = [6.9, 123.15]

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

const municipalityPoints: MunicipalityPoint[] = [
  { id: 'city-of-lamitan', provinceId: 'basilan', name: 'City of Lamitan', coordinates: [6.6575615, 122.1449694] },
  { id: 'butig', provinceId: 'lanao-del-sur', name: 'Butig', coordinates: [7.7436291, 124.3131226] },
  { id: 'marantao', provinceId: 'lanao-del-sur', name: 'Marantao', coordinates: [7.9482892, 124.2315699] },
  { id: 'piagapo', provinceId: 'lanao-del-sur', name: 'Piagapo', coordinates: [7.989793, 124.1796138] },
  { id: 'taraka', provinceId: 'lanao-del-sur', name: 'Taraka', coordinates: [7.8998799, 124.3339467] },
  { id: 'datu-blah-t-sinsuat', provinceId: 'maguindanao-del-norte', name: 'Datu Blah T. Sinsuat', coordinates: [7.0678918, 124.0189526] },
  { id: 'parang', provinceId: 'maguindanao-del-norte', name: 'Parang', coordinates: [7.3755802, 124.267482] },
  { id: 'sultan-kudarat', provinceId: 'maguindanao-del-norte', name: 'Sultan Kudarat', coordinates: [7.271093, 124.2919201] },
  { id: 'buluan', provinceId: 'maguindanao-del-sur', name: 'Buluan', coordinates: [6.7166195, 124.7865943] },
  { id: 'shariff-aguak', provinceId: 'maguindanao-del-sur', name: 'Shariff Aguak', coordinates: [6.8610172, 124.4444871] },
  { id: 'talipao', provinceId: 'sulu', name: 'Talipao', coordinates: [5.9750727, 121.114474] },
  { id: 'bongao', provinceId: 'tawi-tawi', name: 'Bongao', coordinates: [5.0289741, 119.7713119] }
]

function provinceStyle(tone: ProvinceRegion['tone']): PathOptions {
  if (tone === 'high') {
    return {
      color: '#2F85E4',
      fillColor: '#FFFFFF',
      fillOpacity: 0.02,
      weight: 2.3,
      lineCap: 'round',
      lineJoin: 'round'
    }
  }

  if (tone === 'medium') {
    return {
      color: '#4E91EE',
      fillColor: '#FFFFFF',
      fillOpacity: 0.02,
      weight: 2.1,
      lineCap: 'round',
      lineJoin: 'round'
    }
  }

  return {
    color: '#7FAEEA',
    fillColor: '#FFFFFF',
    fillOpacity: 0.02,
    weight: 1.95,
    lineCap: 'round',
    lineJoin: 'round'
  }
}

function hoverStyle(tone: ProvinceRegion['tone']): PathOptions {
  const base = provinceStyle(tone)

  return {
    ...base,
    color: '#1D4ED8',
    weight: 3.1,
    fillOpacity: 0.04
  }
}

function municipalityMarkerStyle(active = false) {
  return {
    radius: active ? 9.5 : 7,
    color: '#FFFFFF',
    weight: active ? 3.5 : 3,
    fillColor: active ? '#1D4ED8' : '#3899FA',
    fillOpacity: 1,
    opacity: 1
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

function createMunicipalityTooltip(province: ProvinceRegion, municipality: MunicipalityPoint) {
  return `
    <div class="dashboard-municipality-tooltip-card">
      <div class="dashboard-municipality-tooltip-name">${municipality.name}</div>
      <div class="dashboard-municipality-tooltip-province">${province.name}</div>
    </div>
  `
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

function activateMunicipality(marker: LeafletCircleMarker, province: ProvinceRegion) {
  marker.setStyle(municipalityMarkerStyle(true))
  marker.bringToFront()
  emit('hover', createTooltipData(province))
}

function deactivateMunicipality(marker: LeafletCircleMarker, province: ProvinceRegion) {
  marker.setStyle(municipalityMarkerStyle(false))
  const layer = provinceLayerMap.get(province.id)
  if (layer) {
    layer.setStyle(provinceStyle(province.tone))
  }
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

  map.createPane('provincePane')
  map.createPane('municipalityPane')

  const provincePane = map.getPane('provincePane')
  const municipalityPane = map.getPane('municipalityPane')

  if (provincePane) {
    provincePane.style.zIndex = '420'
  }

  if (municipalityPane) {
    municipalityPane.style.zIndex = '640'
  }

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    maxNativeZoom: 19,
    minZoom: 3,
    noWrap: true
  }).addTo(map)

  L.control.zoom({
    position: 'bottomleft'
  }).addTo(map)

  provinceGroup = L.featureGroup().addTo(map)
  municipalityGroup = L.featureGroup().addTo(map)

  provinceRegions.forEach((province) => {
    const layer: LeafletPolygon = L.polygon(province.polygon, {
      ...provinceStyle(province.tone),
      className: 'dashboard-province-shape',
      pane: 'provincePane',
      interactive: true
    }).addTo(provinceGroup!)

    provinceLayerMap.set(province.id, layer)
    layer.on('mouseover', () => activateProvince(layer, province))
    layer.on('mouseout', () => deactivateProvince(layer, province))
    layer.on('click', () => activateProvince(layer, province))
  })

  municipalityPoints.forEach((municipality) => {
    const province = provinceRegions.find((item) => item.id === municipality.provinceId)

    if (!province) {
      return
    }

    const provinceLayer = provinceLayerMap.get(province.id)

    const marker = L.circleMarker(municipality.coordinates, {
      ...municipalityMarkerStyle(false),
      className: 'dashboard-municipality-marker',
      pane: 'municipalityPane'
    }).addTo(municipalityGroup!)

    marker.bindTooltip(createMunicipalityTooltip(province, municipality), {
      direction: 'top',
      offset: L.point(0, -12),
      className: 'dashboard-municipality-tooltip',
      opacity: 1
    })

    marker.on('mouseover', () => {
      if (provinceLayer) {
        activateProvince(provinceLayer, province)
      }
      activateMunicipality(marker, province)
      marker.openTooltip()
    })

    marker.on('mouseout', () => {
      deactivateMunicipality(marker, province)
      marker.closeTooltip()
    })

    marker.on('click', () => {
      if (provinceLayer) {
        activateProvince(provinceLayer, province)
      }
      activateMunicipality(marker, province)
      marker.openTooltip()
      map?.setView(municipality.coordinates, Math.max(map?.getZoom() ?? 8, 10), {
        animate: true
      })
    })
  })

  map.fitBounds(boundedPhilippines, { padding: [40, 40] })
  const philippinesZoom = map.getZoom()
  const barmmBounds = municipalityGroup.getBounds().extend(provinceGroup.getBounds()).pad(0.2)

  map.fitBounds(barmmBounds as LatLngBoundsExpression, { padding: [50, 50] })
  map.setMinZoom(philippinesZoom)
  map.setMaxZoom(18)

  if (map.getZoom() <= philippinesZoom + 0.25) {
    map.setView(barmmFocusCenter, Math.min(philippinesZoom + 2.25, 8), { animate: false })
  }

  await nextTick()
  requestAnimationFrame(() => {
    map?.invalidateSize()
    map?.fitBounds(barmmBounds as LatLngBoundsExpression, { padding: [50, 50] })
    map?.setMinZoom(philippinesZoom)
    if (map && map.getZoom() <= philippinesZoom + 0.25) {
      map.setView(barmmFocusCenter, Math.min(philippinesZoom + 2.25, 8.5), { animate: false })
    }
  })
})

onBeforeUnmount(() => {
  emit('leave')
  provinceGroup?.remove()
  provinceGroup = null
  municipalityGroup?.remove()
  municipalityGroup = null
  provinceLayerMap.clear()

  map?.remove()
  map = null
})
</script>

<template>
  <div ref="mapElement" class="dashboard-density-map h-full w-full rounded-[24px]" />
</template>
