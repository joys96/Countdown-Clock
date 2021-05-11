const buttons = document.querySelectorAll('.countdown-clock-controls button');
const enterTime = document.querySelector('.countdown-clock-controls input');
const clock = document.querySelector('.clock');
const backAt = document.querySelector('.back-at');

/*
document.querySelector로 주어진 선택자를 만족하는 모든 요소의 리스트를 반환한다.
buttons = 상단에 20초 , 5분과 같은 버튼
enterTime = input으로 받은 시간을 의미
clock = 화면 중앙에 남은 시간을 의미
backAt = 설정한 시간이 끝나는 시간을 의미
*/


let timer;

function startTimer(seconds) { //startTimer 함수로 setInterval, displayTimeLeft, displayBackAt, displayTimeLeft를 실행
    clearInterval(timer); // 해당 함수를 종료시킴(실행하기 전에 등록되어있는 setInterval함수가 있다면 지운다.)

    let now = Date.now();//1970년 1월 1일 0시 0분 0초부터 현재까지 경과된 밀리 초를 나타내는 숫자
    let then = now + (seconds * 1000);// 현재 시간에서 선택한 시간을 더해서 담는다.

    displayTimeLeft(seconds); //초 단위의 시간값을 받아서 화면에 표시
    displayBackAt(then);//카운트 다운이 끝날 시점의 시간값이 then 로 넘어오는 것

    timer = setInterval(() => { // 설정된 시간마다 반복되는 함수. (1초당 반복됨)
        let secsLeft = Math.round((then - Date.now()) / 1000);

        if(secsLeft < 0) {  // 시간이 0초 미만이면 함수를 종료시킨다.
            clearInterval(timer);
            return;
        }

        displayTimeLeft(secsLeft);
    },1000);
}

    function displayTimeLeft(secsLeft){ //초 단위의 시간을 받아서 화면에 표시하는 함수
        let minutes = Math.floor(secsLeft / 60);
        let secs = secsLeft % 60;

        clock.textContent = `${formatTime(minutes)}:${formatTime(secs)}`;
        //엘리먼트 및 노드에 텍스트를 추가하거나 값을 가져올 수 있는 방법
    }

    function displayBackAt(then){ //카운트다운이 끝날 시점을 표시
        let end = new Date(then);
        let hours = end.getHours();
        let minutes = end.getMinutes();

        backAt.textContent = `Back at ${formatTime(hours)}:${formatTime(minutes)}`;
    }

    function formatTime(time) {//시간이 10미만이면 앞에 0이 나오도록 ex) 7를 입력하면 07:00
        return `${time < 10 ? '0' : ''}${time}`;
    }

      function setSeconds(e) {//button이 눌릴때 마다 value값을 읽어서 secs변수에 넣어  startTimer를 실행시킨다.
        let value = parseInt(this.value);
        let secs = e.type === 'click' ? value : value * 60;
        
        startTimer(secs);
      }
      buttons.forEach(button => button.addEventListener('click', setSeconds));
      enterTime.addEventListener('keyup', setSeconds);
      //button을 클릭했을때, 사용자가 입력값을 input했을때 이벤트 발생