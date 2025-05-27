function updateOrderPanel() {
  if (!window.orderPanel) return;
  // clear old entries except header
  window.orderPanel.querySelectorAll(':scope > *:not(h3)').forEach(el => el.remove());

  const drop = document.getElementById('drop-area');
  // map to participants with eminence and birthdate
  const participants = Array.from(drop.children).map(div => {
    const name = div.textContent.replace('×','').trim();
    const ch   = Object.values(characters)
                      .find(it => (it.meta.name||it.name) === name);
    const emin = ch?.meta.ixbnr?.length || 0;
    const year = +ch?.meta.birthyear || 0;
    const month = ch?.meta.birthmonth || '';
    const day  = +ch?.meta.birthday || 0;
    // timestamp for drop order
    const ts   = div._droppedAt;
    return { name, emin, year, month, day, ts };
  });

  // month name → index
  const monthIdx = {
    January:0, February:1, March:2, April:3,
    May:4, June:5, July:6, August:7,
    September:8, October:9, November:10, December:11
  };

  // sort: eminence ↓, birthdate ↑, then random
  participants.sort((a,b) => {
    const e = b.emin - a.emin;
    if (e) return e;
    const dateA = new Date(a.year, monthIdx[a.month]||0, a.day);
    const dateB = new Date(b.year, monthIdx[b.month]||0, b.day);
    const d = dateA - dateB;
    if (d) return d;
    return Math.random() - 0.5;
  });

  // build list
  const ul = document.createElement('ul');
  participants.forEach(({name, emin, year, month, day}) => {
    const li = document.createElement('li');
    li.className = 'order-item';
    const title = document.createElement('div');
    title.className = 'order-eminence';
    title.textContent = `Eminence: ${emin}`;
    const nm = document.createElement('div');
    nm.className = 'order-name';
    nm.textContent = name;
    const bd = document.createElement('div');
    bd.className = 'order-birthdate';
    bd.textContent = `Born: ${month} ${day}, ${year}`;
    const notes = document.createElement('textarea');
    notes.className = 'order-notes';
    notes.placeholder = 'Notes…';
    li.append(title, nm, bd, notes);
    ul.appendChild(li);
  });

  window.orderPanel.appendChild(ul);
}
