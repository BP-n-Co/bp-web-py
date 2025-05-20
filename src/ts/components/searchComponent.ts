export default function searchComponent() {
  return {
    search: "",
    items: ["foo", "bar", "baz"],
    get filteredItems(): string[] {
      return this.items.filter((i: string) => i.startsWith(this.search));
    },
  };
}
