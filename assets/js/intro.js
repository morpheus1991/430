const introArray = [
  "매일 공부중인 ",
  "경력 1년 n개월차 퍼블리셔인 ",
  "Git ,Sass, Zeplin, Figma 활용가능한 ",
  "취미가 공부 인프런 강의 콜렉터인 ",
  "기분좋게 성심성의 작업하는 ",
  "영상, 마케팅 경험 있는 ",
  "지금은 퍼블리싱 fe개발을 잘하고 싶은 ",
  "든든판 정예 파티원같은 퍼블리셔 되려는 ",
  "es6~공부중인 ",
  "리엑트 공부중인 ",
];

const el_changeArea = qs(".change-area");
const el_changeText = qs(".change-text");
const percentBar = qs(".percent-bar");
let introCurrentIndex = 0;
const percentSet = (time) => {
  let intervalTiming = time / 100;
  let percent = 0;
  setInterval(() => {
    percent++;
    percentBar.style.width = percent + "%";
    if (percent == 100) {
      introCurrentIndex == introArray.length - 1
        ? (introCurrentIndex = 0)
        : introCurrentIndex++;
      percent = 0;
      el_changeText.innerText = introArray[introCurrentIndex];
    }
  }, intervalTiming);
};

percentSet(3000);
console.log(introArray.length);
const randomIndex = () => Math.round(Math.random(introArray.length) * 10);
for (let i = 0; i < 100; i++) {
  console.log(randomIndex());
}
el_changeArea.addEventListener("click", () => {
  let randomValue = randomIndex();
  randomValue == introArray.length ? (randomValue = randomValue - 1) : false;
  el_changeText.innerText = introArray[randomValue];
});
console.log(randomIndex());
