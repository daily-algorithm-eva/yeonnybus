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

function solution(input) {
  //N 마을수 2000이하, C 트럭 용량 10000 이하
  const [N, C] = input[0].split(" ").map(Number);
  const boxArr = input.slice(2).map((e) => e.split(" ").map(Number));

  boxArr.sort((a, b) => {
    if (a[1] !== b[1]) {
      return a[1] - b[1];
    }
    return a[0] - b[0];
  });

  const countArr = new Array(N + 1).fill(C);
  let sum = 0;

  for (let i = 0; i < boxArr.length; i++) {
    const [start, end, box] = boxArr[i];
    let nowBoxCnt = Math.min(countArr[start], box);
    for (let j = start; j < end; j++) {
      if (countArr[j] - nowBoxCnt < 0) {
        nowBoxCnt = Math.min(countArr[j], box);
      }
    }

    const compareArr = countArr.slice(start, end + 1);
    const flag = Math.min(nowBoxCnt, ...compareArr) === nowBoxCnt;

    if (flag) {
      for (let j = start; j < end; j++) {
        if (countArr[j] > 0) {
          countArr[j] -= nowBoxCnt;
        }
      }
      sum += nowBoxCnt;
    }
  }
  console.log(sum);
}
