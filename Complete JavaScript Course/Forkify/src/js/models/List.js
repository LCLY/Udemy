import uniqid from "uniqid";
export default class List {
	constructor() {
		this.items = [];
	}

	addItem(count, unit, ingredient) {
		const item = {
			id: uniqid(),
			count,
			unit,
			ingredient
		};
		this.items.push(item);
		return item;
	}

	deleteItem(id) {
		// compare the id of the elements in the item array to the id we wanted to delete
		const index = this.items.findIndex(el => el.id === id);
		// splice vs slice
		// original array [2,4,8] splice(1,1) return 4 --> original array [2,8]
		// original array [2,4,8] splice(1,2) return 4 --> original array [2,48]
		this.items.splice(index, 1);
	}

	// here is to change the amount of ingredient in the shopping list
	updateCount(id, newCount) {
		// change the count property using the id we specify
		this.items.find(el => el.id === id).count = newCount;
	}
}
