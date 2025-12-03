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
  // 현시점에서 가장 싼 걸 고르는 경우
  const N = Number(input[0]);
  const rice = input.map(Number);

  // dp테이블 [i][j] -> i까지, j까지 왔을때 최대 수익
  const dpArr = Array.from({ length: N + 1 }, () => new Array(N + 1).fill(0));

  for (let i = 1; i <= N; i++) {
    dpArr[i][i] = N * rice[i];
  }

  const dp = (L, R) => {
    if (L > R) return 0;

    if (dpArr[L][R] !== 0) return dpArr[L][R];

    const cnt = N - R + L;

    const max = Math.max(
      dp(L + 1, R) + rice[L] * cnt,
      dp(L, R - 1) + rice[R] * cnt
    );

    return (dpArr[L][R] = max);
  };

  dp(1, N);

  console.log(dpArr[1][N]);
}

/*
실패코드
투포인터 + 그리디
    // 현시점에서 가장 싼 걸 고르는 경우
    const N = Number(input[0]);
    const rice = input.slice(1).map(Number);

    let startIdx = 0;
    let endIdx = N-1;
    let count = 1;
    let sum = 0;

    while(startIdx !== endIdx){
        //앞이 더 작다면
        if(rice[startIdx] < rice[endIdx]){
            sum += rice[startIdx] * count;
            count++;
            startIdx++;
        } else if(rice[startIdx] > rice[endIdx]){
            sum += rice[endIdx] * count;
            count++;
            endIdx--;
        } else {
            sum += rice[startIdx] * count;
            count++;
            startIdx++;
            
        }
    }
    sum += rice[startIdx] * count;
    console.log(sum);

*/
