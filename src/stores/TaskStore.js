import { defineStore } from "pinia";

export const useItemsStore = defineStore("items", {
	state: () => ({
		items: [
			{ title: "المقال الأول", isFave: true },
			{ title: "المقال الثاني", isFave: false },
			{ title: "المقال الثالث", isFave: true },
		],
	}),
	actions: {
		addItem(title) {
			this.items.push({ title, isFave: false });
		},
		removeItem(index) {
			this.items.splice(index, 1);
		},
		toggleFave(index) {
			this.items[index].isFave = !this.items[index].isFave;
		},
	},
});