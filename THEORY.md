# Теоретическая часть

Ответы на вопросы по TypeScript.

---

## Вопрос 1. Дженерики: определение, отличие от `any`, пример с ограничением

**Дженерик** — параметр, который подставляется конкретным типом в момент вызова. Код пишется один раз и работает с разными типами, при этом проверка типов сохраняется: тип результата определяется по переданному значению и связан с типом аргумента.

**any** отключает проверку типов. Ошибки не обнаруживаются на этапе компиляции и переносятся в рантайм; редактор не подсказывает по содержимому значения.

```ts
// any — проверка отключена
function takeFirst(list: any[]): any {
  return list[0];
}
// результат: проверка типов отключена

// дженерик — тип результата определяется типом аргумента
function takeFirst<T>(list: T[]): T | undefined {
  return list[0];
}
// результат: проверка типов сохраняется

const a = takeFirst([1, 2, 3]); // number | undefined
const b = takeFirst(["x", "y"]); // string | undefined
```

**Ограничение (`T extends ...`).** Ограничение гарантирует, что у переданного типа есть требуемые свойства:

```ts
function showTitle<T extends { title: string }>(thing: T): string {
  return thing.title;
}

showTitle({ title: "Перфоратор" }); // ок
showTitle(42); // ошибка: number не имеет свойства title
```

Пример из проекта — универсальная фабрика хранилищ `createPersistedStore<T>` в `src/shared/utils/zustand.ts`.

Благодаря ограничению внутри функции TypeScript знает, что у T есть поле title, поэтому обращение thing.title компилируется без ошибок. А на этапе вызова компилятор проверяет аргумент на соответствие ограничению и отклоняет неподходящие значения (например, number).

---

## Вопрос 2. `type` vs `interface`: различия, критерии выбора, `extends`

**Различия:**

- `interface` описывает форму объекта и поддерживает **слияние деклараций**: несколько объявлений с одним именем объединяются в одно.
- `type` — псевдоним для любого типа: примитивов, объединений, кортежей, сложных конструкций. `interface` такие случаи не покрывает.

```ts
// interface можно объявлять по частям — TypeScript объединяет
interface User {
  name: string;
}
interface User {
  age: number;
}

// в итоге:

User = { name: string; age: number }

// type не сливается, но умеет объединения
type Status = "new" | "active" | "blocked";
```

**Расширение:**

```ts
interface Entity {
  id: string;
}

// через extends
interface Slide extends Entity {
  title: string;
}

// у type — через пересечение
type Slide = Entity & { title: string };
```

**Критерии выбора:**

- `interface` — когда описывается объектный контракт, который могут расширять (в том числе внешние библиотеки).
- `type` — объединения, пересечения, кортежи, псевдонимы сложных типов.

В проекте состояние хранилищ описано через `type` и пересечение, что удобнее для комбинации нескольких частей:

```ts
export type TAuthState = { token: string | null };
export type TAuthActions = { setAuth: (t: string) => void; logout: () => void };
export type TAuthStore = TAuthState & TAuthActions;
```

---

## Вопрос 3. Intersection и Union: разница, работа со свойствами, type guard

**Union (`|`)** — значение принадлежит одному из перечисленных типов. Доступ к общим свойствам возможен напрямую, к специфичным — только после сужения.

**Intersection (`&`)** — значение объединяет свойства всех типов. Доступны сразу все свойства.

```ts
type A = { x: number };
type B = { y: number };

type Union = A | B; // либо x, либо y
type Both = A & B; // и x, и y
```

При работе с union компилятор не позволяет обращаться к свойствам, которые есть не во всех ветках, без предварительной проверки. Проверка осуществляется **type guard** — через `typeof`, `in`, `instanceof` или **дискриминант** (общее литеральное поле):

```ts
type Circle = { kind: "circle"; radius: number };
type Square = { kind: "square"; side: number };
type Shape = Circle | Square;

function area(shape: Shape): number {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2; // shape сужен до Circle
  }
  return shape.side ** 2; // shape сужен до Square
}
```

В проекте union используется для `TLocale = "ru" | "en"` и `TTheme = "auto" | "light" | "dark"`.

---

## Вопрос 4. Объяснить работу типа:

```ts
type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];
```

Тип возвращает ключи `T`, у которых тип значения совместим с `U`. Разбор по шагам:

1. `keyof T` — объединение всех ключей `T`.
2. `[K in keyof T]` — перебор ключей (mapped type).
3. `T[K] extends U ? K : never` — условный тип: если тип значения ключа подходит под `U`, остаётся имя ключа `K`, иначе — `never`.
4. Селекция `[keyof T]` — из полученного набора берётся объединение значений; `never` при этом исключается.

Пример на модели проекта:

```ts
type TSlide = {
  id: string;
  title: string;
  annotation: string;
  isChecked: boolean;
};

type StringKeys = KeysOfType<TSlide, string>; // "id" | "title" | "annotation"
type BoolKeys = KeysOfType<TSlide, boolean>; // "isChecked"
```

Промежуточный объект для `StringKeys`:

```ts
{
  id: "id";
  title: "title";
  annotation: "annotation";
  isChecked: never;
}
["id" | "title" | "annotation" | "isChecked"];
// => "id" | "title" | "annotation"
```

Практическое применение — выборка ключей по типу значений, например для реализации `pick` по строкам.

---

## Вопрос 5. Утилитарные типы: `Partial`, `Pick`, `Omit`, `Record`, `Readonly`

Встроенные утилитарные типы. Примеры — на модели `TSlide`:

```ts
type TSlide = {
  id: string;
  title: string;
  annotation: string;
  isChecked: boolean;
};
```

- **`Partial<T>`** — все свойства становятся необязательными, удобно для черновиков и частичного обновления:

```ts
const draft: Partial<TSlide> = { title: "строка" };
```

- **`Pick<T, K>`** — оставляет только указанные ключи. Используется в модели карусели для принимаемых данных:

```ts
addSlide: (data: Pick<TSlide, "title" | "annotation">) => void;
// { title: string; annotation: string }
```

- **`Omit<T, K>`** — исключает указанные ключи, остальные сохраняются:

```ts
type SlideInput = Omit<TSlide, "id" | "isChecked">;
// { title: string; annotation: string }
```

- **`Record<K, V>`** — объект-словарь: ключи из `K`, значения типа `V`. Подходит для соответствий по перечислениям:

```ts
type LabelByLocale = Record<TLocale, string>; // { ru: string; en: string }

// пример из проекта:
const FLAGS: Record<TLocale, string> = { ru, en: us };
```

- **`Readonly<T>`** — свойства доступны только для чтения; присваивание запрещено на уровне типов:

```ts
const base: Readonly<TSlide> = {
  id: "dbrj1530",
  title: "Перфоратор",
  annotation: "",
  isChecked: false,
};
base.title = "Другое"; // ошибка компиляции
```

Кратко: `Partial` — всё необязательно, `Pick` — выбор нужных полей, `Omit` — исключение лишних, `Record` — словарь по ключам, `Readonly` — только чтение.
