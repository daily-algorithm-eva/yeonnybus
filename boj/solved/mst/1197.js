// readline 모듈을 불러옵니다.
const readline = require("readline");

// 입력을 받기 위한 인터페이스 객체를 생성합니다.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 입력을 저장할 배열을 선언합니다.
const input = [];

// 'line' 이벤트: 사용자가 한 줄을 입력하고 Enter를 누를 때마다 발생합니다.
rl.on("line", (line) => {
  // 입력받은 한 줄(line)을 input 배열에 추가합니다.
  input.push(line);
});

// 'close' 이벤트: 모든 입력이 끝나고 rl.close()가 호출될 때 발생합니다.
rl.on("close", () => {
  // 모든 입력이 input 배열에 저장되었으므로, solution 함수를 호출합니다.
  solution(input);

  // 프로그램을 종료합니다.
  process.exit();
});

// 부모 찾기
const findParent = (parent, x) => {
  if (parent[x] !== x) {
    parent[x] = findParent(parent, parent[x]);
  }
  return parent[x];
};

const union = (parent, x, y) => {
  const parentX = findParent(parent, x);
  const parentY = findParent(parent, y);

  if (parentX !== parentY) {
    parent[parentY] = parentX;
  }
};

function solution(input) {
  const [V, E] = input[0].split(" ").map(Number);
  const edges = input.slice(1).map((e) => e.split(" ").map(Number));
  edges.sort((a, b) => a[2] - b[2]);

  let total = 0;

  const parent = [];
  for (let i = 0; i <= V; i++) {
    parent.push(i);
  }

  for (const edge of edges) {
    const cost = edge[2];

    if (findParent(parent, edge[0]) !== findParent(parent, edge[1])) {
      total += cost;
      union(parent, edge[0], edge[1]);
    }
  }

  console.log(total);
}
