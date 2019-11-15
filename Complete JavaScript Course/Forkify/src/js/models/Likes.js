export default class Likes {
	constructor() {
		this.likes = [];
	}

	addLike(id, title, author, img) {
		const like = { id, title, author, img };
		this.likes.push(like);

		// persist data in the localStorage
		this.persistData();
		return like;
	}

	deleteLike(id) {
		const index = this.likes.findIndex(el => el.id === id);

		// Persist data in the localStorage
		this.likes.splice(index, 1);
		this.persistData();
	}

	isLiked(id) {
		// if we cannot find any items with the id, it will return -1 else return true
		return this.likes.findIndex(el => el.id === id) !== -1;
	}

	getNumLikes() {
		return this.likes.length;
	}

	persistData() {
		localStorage.setItem("likes", JSON.stringify(this.likes));
	}

	readStorage() {
		// parse converts data back from string to whatever it was
		const storage = JSON.parse(localStorage.getItem("likes"));

		// restoring likes from the localStorage
		if (storage) this.likes = storage;
	}
}
