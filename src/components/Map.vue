<script setup lang="ts">
import type { Coordinate } from 'ol/coordinate';
import { ref } from 'vue';
import marker from '../assets/marker.svg';
import type { Location } from './../types';

const { coordinate: coordinateProp = [] } = defineProps<{
  coordinate?: number[]
}>()

const emit = defineEmits(['coordinateUpdated'])
const center = ref([51.49292000000105, 35.82672111111167])
const projection = ref('EPSG:4326')
const zoom = ref(8)
const rotation = ref(0)
const map = ref()
const coordinate = ref<Coordinate>(coordinateProp)
console.log(coordinate.value)
const view = ref()

const displayName = ref('')

function emitCoordinatesAndDisplayNameToParent() {
  emit('coordinateUpdated', {
    coordinate: coordinate.value,
    displayName: displayName.value,
  })
}

function clicked(e: { coordinate: Coordinate }) {
  coordinate.value = e.coordinate
  reverseGeocode(coordinate.value)
}

const locationAddress = ref<Location>()

const isLoading = ref(false)

async function reverseGeocode(coords: number[]) {
  try {
    isLoading.value = true
    displayName.value = ''
    const res = await fetch(`http://nominatim.openstreetmap.org/reverse?format=json&lon=${coords[0]}&lat=${coords[1]}`)
    locationAddress.value = await res.json() as Location
    displayName.value = locationAddress.value.display_name
    emitCoordinatesAndDisplayNameToParent()
    return locationAddress.value
  }
  catch (error) {
    console.warn(error)
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main class="flex-center-row">
    <p my-2 text-xs>
      <spinner v-if="isLoading" />
      {{ displayName }}
    </p>
    <div
      class="shadow-lg container"
      style="
        height: 50vh;
        max-height: 25rem;
        width: 100%;
        margin-inline: auto;
        margin-block: 1rem;
      "
    >
      <ol-map
        ref="map"
        :load-tiles-while-animating="true"
        :load-tiles-while-interacting="true"
        style="height: 100%"
        class="border-3 rounded-lg"
        @click="clicked"
      >
        <ol-view
          ref="view"
          :center="center"
          :rotation="rotation"
          :zoom="zoom"
          :projection="projection"
        />

        <ol-zoom-control />
        <ol-tile-layer>
          <ol-source-osm />
        </ol-tile-layer>

        <ol-vector-layer>
          <ol-source-vector>
            <ol-feature>
              <ol-geom-point :coordinates="coordinate" />
              <ol-style>
                <ol-style-icon :src="marker" :scale="0.05" />
              </ol-style>
            </ol-feature>
          </ol-source-vector>
        </ol-vector-layer>
      </ol-map>
    </div>
  </main>
</template>
