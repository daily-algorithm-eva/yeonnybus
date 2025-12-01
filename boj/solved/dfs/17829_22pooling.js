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

const recur = (matrix) => {
  const N = matrix[0].length;

  //종료조건
  if (N === 1) {
    return matrix[0][0];
  }

  const nextMatrix = [];
  let line = [];

  for (let i = 0; i < N; i += 2) {
    for (let j = 0; j < N; j++) {
      if (j % 2 === 1) {
        const temp = [
          matrix[i][j - 1],
          matrix[i][j],
          matrix[i + 1][j - 1],
          matrix[i + 1][j],
        ];
        temp.sort((a, b) => b - a);
        line.push(temp[1]);
      }
    }
    nextMatrix.push(line);
    line = [];
  }

  return recur(nextMatrix);
};

function solution(input) {
  const matrix = input.slice(1).map((e) => e.split(" ").map(Number));

  const res = recur(matrix);
  console.log(res);
}
