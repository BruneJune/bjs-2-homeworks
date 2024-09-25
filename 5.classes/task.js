//Задача 1
class PrintEditionItem {
	constructor(name, releaseDate, pagesCount) {
		this.name = name;
		this.releaseDate = releaseDate;
		this.pagesCount = pagesCount;
		this.state = 100;
		this.type = null;
	}

	fix() {
		this.state *= 1.5;
		if (this.state > 100) {
			this.state = 100;
		}
	}

	set state(newState) {
		if (newState < 0) {
			this._state = 0;
		} else if (newState > 100) {
			this._state = 100;
		} else {
			this._state = newState;
		}
	}

	get state() {
		return this._state;
	}
}

class Magazine extends PrintEditionItem {
	constructor(name, releaseDate, pagesCount) {
		super(name, releaseDate, pagesCount);
		this.type = "magazine";
	}
}

class Book extends PrintEditionItem {
	constructor(author, name, releaseDate, pagesCount) {
		super(name, releaseDate, pagesCount);
		this.author = author;
		this.type = "book";
	}
}

class NovelBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "novel";
	}
}

class FantasticBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "fantastic";
	}
}

class DetectiveBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "detective";
	}
}

// Пример использования:
const sherlock = new PrintEditionItem(
	"Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
	2019,
	1008
);

console.log(sherlock.releaseDate); // 2019
console.log(sherlock.state); // 100
sherlock.fix();
console.log(sherlock.state); // 100

const picknick = new FantasticBook(
	"Аркадий и Борис Стругацкие",
	"Пикник на обочине",
	1972,
	168
);

console.log(picknick.author); // "Аркадий и Борис Стругацкие"
picknick.state = 10;
console.log(picknick.state); // 10
picknick.fix();
console.log(picknick.state); // 15

//Задача 2
class Library {
	constructor(name) {
		this.name = name;
		this.books = [];
	}

	addBook(book) {
		if (book.state > 30) {
			this.books.push(book);
		}
	}

	findBookBy(type, value) {
		return this.books.find(book => book[type] === value) || null;
	}

	giveBookByName(bookName) {
		const bookIndex = this.books.findIndex(book => book.name === bookName);
		if (bookIndex !== -1) {
			const [book] = this.books.splice(bookIndex, 1);
			return book;
		}
		return null;
	}
}

// Пример использования:
const library = new Library("Библиотека имени Ленина");

library.addBook(
	new DetectiveBook(
		"Артур Конан Дойл",
		"Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
		2019,
		1008
	)
);
library.addBook(
	new FantasticBook(
		"Аркадий и Борис Стругацкие",
		"Пикник на обочине",
		1972,
		168
	)
);
library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
library.addBook(new Magazine("Мурзилка", 1924, 60));

console.log(library.findBookBy("name", "Властелин колец")); // null
console.log(library.findBookBy("releaseDate", 1924).name); // "Мурзилка"

console.log("Количество книг до выдачи: " + library.books.length); // Количество книг до выдачи: 4
library.giveBookByName("Машина времени");
console.log("Количество книг после выдачи: " + library.books.length); // Количество книг после выдачи: 3

// Повреждаем книгу
const damagedBook = new FantasticBook("Аркадий и Борис Стругацкие", "Пикник на обочине", 1972, 168);
damagedBook.state = 10; // Состояние книги стало очень плохим
console.log(damagedBook.state); // 10

// Восстанавливаем книгу
damagedBook.fix();
console.log(damagedBook.state); // 15

// Попытка добавить восстановленную книгу обратно в библиотеку
library.addBook(damagedBook); // Не добавит, так как состояние < 30
console.log("Количество книг после попытки добавления поврежденной книги: " + library.books.length); // Количество книг: 3

//Задача 3
class Student {
	constructor(name) {
		this.name = name;
		this.marks = {}; // Объект для хранения оценок по предметам
	}

	addMark(mark, subject) {
		if (mark < 2 || mark > 5) {
			console.log(`Оценка ${mark} по предмету ${subject} недопустима!`);
			return;
		}

		if (!this.marks[subject]) {
			this.marks[subject] = []; // Если предмет отсутствует, создаем его
		}

		this.marks[subject].push(mark); // Добавляем оценку по предмету
	}

	getAverageBySubject(subject) {
		if (!this.marks[subject] || this.marks[subject].length === 0) {
			return 0; // Если предмет отсутствует, возвращаем 0
		}

		const total = this.marks[subject].reduce((sum, mark) => sum + mark, 0);
		return total / this.marks[subject].length;
	}

	getAverage() {
		const subjects = Object.keys(this.marks); // Получаем все предметы
		if (subjects.length === 0) {
			return 0; // Если нет предметов, возвращаем 0
		}

		const totalAverage = subjects.reduce((sum, subject) => {
			return sum + this.getAverageBySubject(subject);
		}, 0);

		return totalAverage / subjects.length; // Общий средний балл по всем предметам
	}
}

// Пример использования:
const student = new Student("Олег Смирнов");
student.addMark(5, "химия");
student.addMark(5, "химия");
student.addMark(5, "физика");
student.addMark(4, "физика");
student.addMark(6, "физика"); // Оценка не добавится, так как больше 5

console.log(student.getAverageBySubject("физика")); // 4.5
console.log(student.getAverageBySubject("биология")); // 0
console.log(student.getAverage()); // 4.75