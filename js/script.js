const days = document.querySelectorAll('.edt-day');
const label = document.getElementById('week-label');

function mondayOf(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diff = (d.getDay() + 6) % 7; // lundi = 0 ... dimanche = 6
  d.setDate(d.getDate() - diff);
  return d;
}

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear()
      && a.getMonth() === b.getMonth()
      && a.getDate() === b.getDate();
}

function weekText(start, end) {
  const month = { month: 'long' };
  const y = end.getFullYear();
  if (start.getMonth() === end.getMonth()) {
    return `Semaine du ${start.getDate()} au ${end.getDate()} ${end.toLocaleDateString('fr-FR', month)} ${y}`;
  }
  const from = start.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
  const to = end.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
  const fromYear = start.getFullYear() !== y ? ` ${start.getFullYear()}` : '';
  return `Semaine du ${from}${fromYear} au ${to} ${y}`;
}

let monday = mondayOf(new Date());

function render() {
  const today = new Date();
  const saturday = new Date(monday);
  saturday.setDate(monday.getDate() + 5);

  days.forEach((day, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    day.querySelector('.edt-date').textContent =
      date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    day.classList.toggle('is-today', sameDay(date, today));
  });

  label.textContent = weekText(monday, saturday);
  document.getElementById('this-week').disabled = sameDay(monday, mondayOf(today));
}

document.getElementById('prev-week').addEventListener('click', () => {
  monday.setDate(monday.getDate() - 7);
  render();
});

document.getElementById('next-week').addEventListener('click', () => {
  monday.setDate(monday.getDate() + 7);
  render();
});

document.getElementById('this-week').addEventListener('click', () => {
  monday = mondayOf(new Date());
  render();
});

render();
