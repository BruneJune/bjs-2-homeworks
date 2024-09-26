// Функция для парсинга значения
function parseCount(value) {
    const parsedValue = Number.parseFloat(value);
    if (isNaN(parsedValue)) {
        throw new Error('Невалидное значение');
    }
    return parsedValue;
}

// Функция для валидации значения с обработкой ошибок
function validateCount(value) {
    try {
        return parseCount(value);
    } catch (error) {
        return error;
    }
}

// Пример использования:
console.log(validateCount('42')); // 42
console.log(validateCount('abc')); // Error: Невалидное значение
console.log(validateCount('12.34')); // 12.34


// Класс для треугольника
class Triangle {
    constructor(a, b, c) {
        // Проверка, может ли существовать треугольник с такими сторонами
        if (a + b <= c || a + c <= b || b + c <= a) {
            throw new Error('Треугольник с такими сторонами не существует');
        }
        this.a = a;
        this.b = b;
        this.c = c;
    }

    // Геттер для периметра
    get perimeter() {
        return this.a + this.b + this.c;
    }

    // Геттер для площади
    get area() {
        const p = this.perimeter / 2; // Полупериметр
        const area = Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c)); // Формула Герона
        return +area.toFixed(3); // Округление до 3 знаков после запятой
    }
}

// Функция для создания треугольника или возврата объекта с ошибкой
function getTriangle(a, b, c) {
    try {
        return new Triangle(a, b, c);
    } catch (error) {
        // Возвращаем объект с геттерами, которые сообщают об ошибке
        return {
            get perimeter() {
                return 'Ошибка! Треугольник не существует';
            },
            get area() {
                return 'Ошибка! Треугольник не существует';
            }
        };
    }
}

// Пример использования:
let triangle1 = getTriangle(3, 4, 5);
console.log('Perimeter:', triangle1.perimeter); // 12
console.log('Area:', triangle1.area); // 6

let triangle2 = getTriangle(1, 1, 3);
console.log('Perimeter:', triangle2.perimeter); // Ошибка! Треугольник не существует
console.log('Area:', triangle2.area); // Ошибка! Треугольник не существует.