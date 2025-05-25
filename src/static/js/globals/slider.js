export function slider(min, max, minGap) {
    return {
        min: min,
        max: max,
        minGap: minGap,
        get minPercent() {
            return (this.min / max) * 100;
        },
        get maxPercent() {
            return (this.max / max) * 100;
        },
        update(event) {
            const self = this;
            if (self.max - self.min < self.minGap) {
                if (event.target === self.$refs.minRange) {
                    self.min = self.max - self.minGap;
                }
                else {
                    self.max = self.min + self.minGap;
                }
            }
        },
        init() {
            this.update(new Event('init'));
        },
    };
}
