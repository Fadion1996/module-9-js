const lang = {
  en: "qwertyuiop[]asdfghjkl;'zxcvbnm,./",
  enTop: [],
  enMiddle: [],
  enBotttom: [],
  space: [' '],
  note: ['do', 're', 'mi', 'fa', 'sol', 'la', 'do', 're', 'mi', 'fa', 'sol', 'la', 'do', 're', 'mi', 'fa', 'sol', 'la','do', 're', 'mi', 'fa', 'sol', 'la', 'do', 're', 'mi', 'fa', 'sol', 'la', 'do', 're', 'mi', 'fa']
};
const array = lang.en.split('');
lang.enTop = array.splice(0, 12);
lang.enMiddle = array.splice(0, 11);
lang.enBottom = array.splice(0, 10);

const keys = lang.en.split('');
const source = document.querySelector('#keyboard').innerHTML.trim();
const template = Handlebars.compile(source);
const markup = template(lang);

const container = document.querySelector('#keyboard-container');
container.innerHTML = markup;

const soundSwitcher = document.querySelector('#slideThree');
const checkSound = {
  playSound: soundSwitcher.checked
}

const buttons = Array.from(document.querySelectorAll('button'));

buttons.forEach(function(item, i, arr) {
   item.setAttribute('data-note', lang.note[i]);
});

playSound = note => {
  const audio = document.querySelector(`audio[data-note=${note}]`);
  audio.currentTime = 0;
  audio.play();
};

soundSwitcher.addEventListener('click', (event) => {
  checkSound.playSound = event.target.checked
  ? true
  : false;
});

const keydownEvent = (event) => {
  if (keys.includes(event.key)) {
    const currentButton = buttons.find((element ) => {
      return element.innerText  == event.key;
    });
    console.log(currentButton);
    currentButton.classList.add('keyboard__btn--active');  // добавляем класс active для подсветки
    let note = currentButton.getAttribute("data-note");
    if (checkSound.playSound) playSound(note);  // подключаем мелодию для выбраной ноты
  }
}

const keyupEvent = (event) => {
  const activeButtons = document.querySelectorAll('.keyboard__btn--active'); //Выбераем все подсвеченые елементы
  console.log(activeButtons);
  activeButtons.forEach((element) => {
    element.classList.remove('keyboard__btn--active');  //Проходимся по каждому елементу маи удаляем класс active
  });
}

window.addEventListener('keydown', keydownEvent);
window.addEventListener('keyup', keyupEvent);
