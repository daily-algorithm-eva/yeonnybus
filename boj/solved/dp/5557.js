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
  const N = Number(input[0]);
  const numbers = input[1].split(" ").map(Number);
  const dp = Array.from({ length: N - 1 }, () => Array(21).fill(BigInt(0)));
  dp[0][numbers[0]] = BigInt(1);

  for (let i = 1; i < N - 1; i++) {
    for (let j = 0; j <= 20; j++) {
      const nowNum = numbers[i]; // 이번에 들어갈 수
      if (dp[i - 1][j] !== 0n) {
        if (j + nowNum <= 20) {
          dp[i][j + nowNum] += dp[i - 1][j];
        }
        if (j - nowNum >= 0) {
          dp[i][j - nowNum] += dp[i - 1][j];
        }
      }
      //1칸 전이 안 비어 있고, 그 칸의 값에따라 +20, -20 체크
    }
  }
  console.log(dp[N - 2][numbers[N - 1]].toString());
}
