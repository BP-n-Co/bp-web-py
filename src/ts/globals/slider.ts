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

export function slider(min: number, max: number, minGap: number) {
  return {
    min: min,
    max: max,
    minGap: minGap,
    get minPercent() {
      return (this.min / max) * 100
    },
    get maxPercent() {
      return (this.max / max) * 100
    },
    update(event: Event) {
      const self = this as any
      if (self.max - self.min < self.minGap) {
        if (event.target === self.$refs.minRange) {
          self.min = self.max - self.minGap
        } else {
          self.max = self.min + self.minGap
        }
      }
    },
    init() {
      this.update(new Event('init'))
    },
  }
}
