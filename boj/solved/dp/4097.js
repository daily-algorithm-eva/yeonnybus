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
  const getArr = (input) => {
    let cases = [];
    while (input.length) {
      let N = Number(input[0]);
      if (N === 0) break;
      let arr = input.slice(1, N + 1);
      cases.push(arr);
      input.splice(0, N + 1);
      // console.log(input);
    }
    return cases;
  };
  const testCase = getArr(input.map((e) => Number(e)));

  const res = [];

  const getMaxBenefit = (cases) => {
    const len = cases.length;
    const dp = Array(len).fill(0);
    dp[0] = cases[0];

    for (let i = 1; i < len; i++) {
      dp[i] = Math.max(dp[i - 1] + cases[i], cases[i]);
    }
    res.push(Math.max(...dp));
  };
  testCase.forEach((e) => getMaxBenefit(e.map(Number)));

  console.log(res.join("\n"));
}

/*
1일차 -> 1일차
2일차 -> 1일차 + 2일차 or 2일차 max
3일차 -> 3일차 or 2일차 max의 max
*/
