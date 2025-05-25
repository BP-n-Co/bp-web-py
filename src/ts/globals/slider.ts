// Styling
// /* Hide default range styling */
//       input[type='range'] {
//         -webkit-appearance: none;
//         appearance: none;
//         width: 100%;
//         position: absolute;
//         background: transparent;
//         pointer-events: none;
//         z-index: 2;
//       }

//       /* Custom track (hidden default) */
//       input[type='range']::-webkit-slider-runnable-track {
//         height: 2px;
//       }

//       /* Custom thumb styling (Centered) */
//       input[type='range']::-webkit-slider-thumb {
//         -webkit-appearance: none;
//         appearance: none;
//         width: 18px;
//         height: 18px;
//         background: white;
//         border: 3px solid #23a9f7;
//         border-radius: 50%;
//         cursor: pointer;
//         pointer-events: auto;
//         position: relative;
//         z-index: 3;
//         transform: translateY(-30%);
//       }

//       input[type='range']::-moz-range-thumb {
//         width: 18px;
//         height: 18px;
//         background: white;
//         border: 3px solid #23a9f7;
//         border-radius: 50%;
//         cursor: pointer;
//         pointer-events: auto;
//         z-index: 3;
//         transform: translateY(-30%);
//       }

//       /* Centering the range input itself */
//       .slider-container {
//         position: relative;
//         height: 18px; /* Adjust height to fit thumb */
//       }

// div
// <div
//       x-data="priceSlider(0, 400, 10)"
//       x-init="init()"
//       class="mx-auto w-full rounded-lg bg-white p-6 shadow-lg"
//     >
//       <h2 class="text-lg font-bold">PRICE RANGE</h2>

//       <div class="slider-container relative mt-4">
//         <!-- Custom Range Inputs -->
//         <input
//           type="range"
//           x-ref="minRange"
//           min="0"
//           max="400"
//           x-model.number="min"
//           @input="update"
//         />
//         <input
//           type="range"
//           x-ref="maxRange"
//           min="0"
//           max="400"
//           x-model.number="max"
//           @input="update"
//         />

//         <!-- Custom Track -->
//         <div class="relative h-2 w-full rounded-md bg-gray-200">
//           <div
//             class="absolute h-2 rounded-md bg-gradient-to-r from-blue-900 to-blue-400"
//             :style="`left: ${minPercent}%; right: ${100 - maxPercent}%`"
//           ></div>
//         </div>
//       </div>

//       <div class="mt-3 flex justify-between text-gray-600">
//         <span>Min Price: $<span x-text="min"></span></span>
//         <span>Max Price: $<span x-text="max"></span></span>
//       </div>
//     </div>

export function slider(minGap: number) {
  return {
    minRelative: 0,
    minAbsolute: 0,
    maxRelative: 0,
    maxAbsolute: 0,
    minGap: minGap,
    get minPercent() {
      return (
        ((this.minRelative - this.minAbsolute) /
          (this.maxAbsolute - this.minAbsolute)) *
        100
      )
    },
    get maxPercent() {
      return (
        ((this.maxRelative - this.minAbsolute) /
          (this.maxAbsolute - this.minAbsolute)) *
        100
      )
    },
    update(event: Event) {
      const self = this as any
      if (self.maxRelative - self.minRelative < self.minGap) {
        if (event.target === self.$refs.minRange) {
          self.minRelative = self.maxRelative - self.minGap
        } else {
          self.maxRelative = self.minRelative + self.minGap
        }
      }
    },
    init() {
      this.update(new Event('init'))
    },
  }
}
