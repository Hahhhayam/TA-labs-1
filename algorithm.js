function main(variant, startPoint) {

  function getVertex(graph) {
    return graph.length;
  } //функція визначення кількості вершин

  function getEdges(graph) {
    let countOfEdges = 0;
    for(let i = 0; i < graph.length; i++) {
      for(let j = 0; j < graph.length; j++) {
        if(graph[i][j] > 0 ) countOfEdges++;
      }
    }
    return countOfEdges / 2;
  } //функція визначення кількості ребер

  function shortestPathDijkstra(graph, start, end) { //функція алгоритму Дейкстри
    const len = graph.length; //визначаємо довжину масиву
    const visited = new Array(len).fill(false); //створення масиву візитів, початок заповнюємо 0 або false
    const distances = new Array(len).fill(Number.MAX_VALUE); //масив відстаней, заповнюємо спочатку максимальними значеннями числа
    const previous = new Array(len).fill(null); //для знаходження маршруту створюємо масив для збереження минулого елементу
    start--;
    end--;
    distances[start] = 0;

    for (let i = 0; i < len - 1; i++) {
      let current = null;
      for (let j = 0; j < len; j++) {
        if (!visited[j] && (current === null || distances[j] < distances[current])) { //призначення нинішнього рядку
          current = j;
        }
      }

      visited[current] = true; //відмічаємо в масиві візитів, що ми потрапили в нинішню точку

      for (let j = 0; j < len; j++) {
        const distance = graph[current][j]; //створюємо константу, яка дорівнює нинішньому елементу нинішнього рядка
        if (distance > 0 && distances[current] + distance < distances[j]) { //якщо знаходимо дистанцію, яка буде менше
          distances[j] = distances[current] + distance;
          previous[j] = current; //зберігаємо в масиві минулих елементів нинішній
        }
      }
    }

    const path = []; //створюємо масив для знаходження маршруту
    let current = end; //нинішня точка - кінцева
    while (current !== start) {
      path.unshift(current); //додаємо в початок нашу нинішню точку
      current = previous[current]; //нинішня точка = минулій точці
    }
    path.unshift(start); //додаємо вкінці нашу початкову точку

    if(distances[end] === Number.MAX_VALUE) return {distance:'Не можна знайти відстань', path: 0};
    if(distances[end] === 0 || Number.isInteger(distances[end])) return { distance: distances[end], path };

    return { distance: distances[end].toFixed(2), path };
  }

  function BellmanFord(graph, start)  { //функція алгоритму Беллмана-Форда
    let distances = {}; //створюємо об'єкт дистанцій
    let routes = {}; //створюємо об'єкт для маршрутів
    let len = graph.length;
    for(let i = 0; i < len; i++) {
      for(let j = 0; j < len; j++) {
        if(graph[i][j] === -1) graph[i][j] = 0; //зміна елементів матриці з -1 на 0
      }
    }

    //Заповнюємо масиви дистанцій та візиту
    for (let i = 0; i < len; i++) {
      distances[i] = Infinity; //заповнюємо всі ключі об'єктів
      routes[i] = [];
    }
    distances[start] = 0; //призначаємо початковій дистанції в стартовій точці - 0
    routes[start].push(start+1); // додаємо початковий маршрут в об'єкт

    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len; j++) { //проходимо по місцю
        for (let k = 0; k < len; k++) { //проходимо по кожній вершині
          if (graph[j][k] !== 0) {
            let distance = graph[j][k];
            if (distances[j] + distance < distances[k]) { //порівнюємо дистанції сусіднього вузла з поточною дистанцією
              distances[k] = distances[j] + distance;
              routes[k] = [...routes[j], k+1];
            }
          }
        }
      }
    }
    return {distances, routes};
  }

  let Places = [ //створюємо масив наших шляхів
    [0, 2, -1, 0.9, -1, -1, 5, 1, 1.3, -1, 2.6],
    [2, 0, 0.6, -1, -1, -1 , -1 , -1 ,0.95, -1, 0.6 ],
    [-1, -1, 0, -1, -1, -1, -1,-1, 0.65, -1, -1 ],
    [0.9, -1, -1, 0, -1, -1, -1, 1, 0.55, -1, -1],
    [-1, -1, 0.5, -1, 0, -1, -1, -1, -1, 0.85, -1 ],
    [-1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1],
    [5, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1 ],
    [-1, -1,-1, -1, 1.1, -1, -1, 0, -1, -1, -1],
    [1.3, 0.95, -1, -1, 0.75, -1,-1, -1, 0, -1, -1],
    [-1, -1, -1, -1, -1, 0.75, -1, -1, -1, 0 ,-1],
    [2.6, -1, -1,-1, -1, 1.2, -1, -1, -1, -1, 0]
  ];
  let nameOfPlaces = ["Червоного університету", "Андріївської церкви", "Михайлівського собору",
    "Золотих воріт", "Лядських воріт",
    "Фунікулеру", "Київської політехніки",
    "Фонтану на Хрещатику", "Софії київської",
    "Національної філармонії", "Музею однієї вулиці"];
  let names = ["Червоний університет", "Андріївська церква", "Михайлівський собор",
    "Золоті ворота", "Лядські ворота",
    "Фунікулер", "Київська політехніка",
    "Фонтан на Хрещатику", "Софія київська",
    "Національна філармонія", "Музей однієї вулиці"];
  let lengthOfGraph = Places.length;


  let result =
      `Кількість вершин графу: ${getVertex(Places)}\n` +
      `Кількість ребер графу: ${getEdges(Places)}\n`;

  switch (variant) {
    case 1:
      let boolean = true;
      while (boolean === true) {
        if (+startPoint > 0 && +startPoint < 12) {
          let {distances, routes} = BellmanFord(Places, startPoint - 1);
          let pathNames = '';
          for (let i = 0; i < Places.length; i++) {
            let optimalWay = `\tОптимальний маршрут від ${nameOfPlaces[startPoint - 1]} до ${nameOfPlaces[i]}: ${routes[i]}\n`;
            let labelWay = `\tМаршрут від ${nameOfPlaces[startPoint - 1]} до ${nameOfPlaces[i]} у вигляді місць: \n`
            result += optimalWay + labelWay;
            for (let j = 0; j < routes[i].length; j++) {
              if (j === routes[i].length - 1) pathNames += `${names[routes[i][j] - 1]}`;
              else pathNames += `${names[routes[i][j] - 1]} --> `;
            }
            result += pathNames;
            pathNames = '';
            let endLine = `\tВідстань від ${nameOfPlaces[startPoint - 1]} до ${nameOfPlaces[i]}: ${Object.values(distances)[i]} км.\n` +
                `-------------------------------------------------------------------------------------------------\n`;
            result += endLine;
          }
          boolean = false;
        } else if (startPoint === '') break;
        else continue;
      }
      break;

    case 2:
      let boole = true;
      while (boole === true) {
        if (+startPoint > 0 && +startPoint < 12) {
          for (let i = 0; i < lengthOfGraph; i++) {
            let {distance, path} = shortestPathDijkstra(Places, startPoint, i + 1);
            let pathNames = '';
            for (let j = 0; j < path.length; j++) {
              path[j]++;
            }
            let optimalWay = `\tОптимальний маршрут від ${nameOfPlaces[startPoint - 1]} до ${nameOfPlaces[i]}: ${path}\n`;
            let labelWay = `\tМаршрут від ${nameOfPlaces[startPoint - 1]} до ${nameOfPlaces[i]} у вигляді місць: \n`
            result += optimalWay + labelWay;

            for (let j = 0; j < path.length; j++) {
              if (j === path.length - 1) pathNames += `${names[path[j] - 1]}`;
              else pathNames += `${names[path[j] - 1]} --> `;
            }
            result += pathNames;
            pathNames = '';
            let endLine = `\tВідстань від ${nameOfPlaces[startPoint - 1]} до ${nameOfPlaces[i]}: ${distance} км.\n` +
                `-------------------------------------------------------------------------------------------------\n`;
            result += endLine;
          }
          boole = false;
        } else if (startPoint === '') break;
        else continue;
      }
      break;
    default:
      result += "вася вставай ты обосрался";
      break;
  }
  document.getElementById("text").innerText = result;
}
