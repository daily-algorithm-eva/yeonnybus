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
  // k가지 동전이, 각 k개 있음.
  // T원의 지폐 교환하는 방법으 가지 수 계산.
  // 방법의 수가 2^31-1 초과하지 않으니, 일반 js Number로 처리 가능

  const T = Number(input[0]); // 교환할 지폐의 금액
  const k = Number(input[1]); // 동전 종류(가지) 수

  const coins = input.slice(2).map((e) => e.split(" ").map(Number));
  const dp = Array.from({ length: k + 1 }, () => Array(T + 1).fill(0));

  dp[0][0] = 1;

  for (let i = 1; i < k + 1; i++) {
    const [value, coinCnt] = coins[i - 1];

    for (let count = 0; count <= coinCnt; count++) {
      const idx = [];
      for (let j = 0; j < T + 1; j++) {
        if (dp[i - 1][j] !== 0) {
          idx.push(j);
        }
      }
      idx.forEach((e) => {
        if (e + count * value <= T) {
          dp[i][e + count * value] += dp[i - 1][e];
        }
      });
    }
  }
  console.log(dp[k][T]);
}

/*
//dp풀이 -> 시간초과

function solution(input) {
    // k가지 동전이, 각 k개 있음.
    // T원의 지폐 교환하는 방법으 가지 수 계산.
    // 방법의 수가 2^31-1 초과하지 않으니, 일반 js Number로 처리 가능

    const T = Number(input[0]); // 교환할 지폐의 금액
    const k = Number(input[1]); // 동전 종류(가지) 수
    const coins = input.slice(2).map((e) => e.split(" ").map(Number));
    const usedTable = Array(k).fill(0);
    coins.sort((a,b) => b[0]-a[0]);

    const resSet = new Set();

    const dfs = (sum) => {
        if(sum > T){
            return;
        }
        if(sum === T){
            // console.log(usedTable);
            resSet.add(usedTable.toString());
            return;
        }

        for(let i=0; i<k; i++){
            if(usedTable[i]<coins[i][1]){
                usedTable[i]++;
                dfs(sum+coins[i][0]);
                usedTable[i]--;
            }
            
        }
    }
    dfs(0);

    console.log(resSet.size);
    
}

*/
