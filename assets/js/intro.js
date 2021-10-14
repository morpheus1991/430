const introArray = [
	"매일 공부중 ",
	"Git 사용 가능",
	"Scss 사용 가능",
	"Zeplin, Figma 활용가능 ",
	"컴포넌트 단위의 시스템 디자인 이해",
	"취미가 공부 인프런 강의 콜렉터 ",
	"리엑트 공부중 ",
	"든든판 정예 파티원같은 퍼블리셔 되기 ",
	"es6~공부중 ",
	"웹접근성 신입 퍼블리셔 교육 (강사) ",
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
			introCurrentIndex == introArray.length - 1 ?
				(introCurrentIndex = 0) :
				introCurrentIndex++;
			percent = 0;
			el_changeText.innerText = introArray[introCurrentIndex];
		}
	}, intervalTiming);
};

percentSet(3000);
const randomIndex = () => Math.round(Math.random(introArray.length) * 10);
for (let i = 0; i < 100; i++) {

}
el_changeArea.addEventListener("click", () => {
	let randomValue = randomIndex();
	randomValue == introArray.length ? (randomValue = randomValue - 1) : false;
	el_changeText.innerText = introArray[randomValue];
});