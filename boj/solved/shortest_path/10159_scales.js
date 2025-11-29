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
  const N = Number(input[0]); // 물건의 개수 N, 상수니까 const
  const M = Number(input[1]); // 쌍의 개수 M, 상수니까 const

  // 비교 목록 2차원 배열로 저장
  const compareList = input.slice(2).map((e) => e.split(" ").map(Number));

  // 편의를 위해 1 based index 사용
  const floydMap = Array.from({ length: N + 1 }, () => Array(N + 1).fill("N"));

  // 비교 결과 채우기
  compareList.forEach((e) => {
    const [left, right] = e;
    floydMap[left][right] = "H";
    floydMap[right][left] = "L";
  });

  // 플로이드 워셜 알고리즘 적용
  for (let k = 1; k < N + 1; k++) {
    for (let i = 1; i < N + 1; i++) {
      for (let j = 1; j < N + 1; j++) {
        if (floydMap[i][k] === "H" && floydMap[k][j] === "H") {
          floydMap[i][j] = "H";
        } else if (floydMap[i][k] === "L" && floydMap[k][j] === "L") {
          floydMap[i][j] = "L";
        }
      }
    }
  }

  const res = [];
  floydMap.slice(1).forEach((e) => {
    const cnt = e.filter((res) => res === "N").length - 2; // -2는 본인과 0인덱스 제거
    res.push(cnt);
  });
  console.log(res.join("\n"));
}

/*
2>3 3>4 니까 2>4임.
2<3 3<4면, 2랑 4는 비교 불가능함.
*/
