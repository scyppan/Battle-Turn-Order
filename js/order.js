function updateOrderPanel() {
  if (!window.orderPanel) return;
  // clear previous entries except header
  window.orderPanel.querySelectorAll(':scope > *:not(h3)').forEach(el => el.remove());

  const drop = document.getElementById('drop-area');
  const monthIdx = {
    January: 0, February: 1, March: 2, April: 3,
    May: 4, June: 5, July: 6, August: 7,
    September: 8, October: 9, November: 10, December: 11
  };

  const participants = Array.from(drop.children).map(div => {
    const name = div.textContent.replace('×','').trim();
    const ch   = Object.values(characters).find(it => (it.meta.name||it.name) === name);
    return {
      name,
      emin:  ch?.meta.ixbnr?.length || 0,
      year:  +ch?.meta.birthyear   || 0,
      month: ch?.meta.birthmonth   || '',
      day:   +ch?.meta.birthday    || 0,
      ts:    div._droppedAt        || 0
    };
  }).sort((a,b) => {
    const dE = b.emin - a.emin;
    if (dE) return dE;
    const dA = new Date(a.year, monthIdx[a.month]||0, a.day);
    const dB = new Date(b.year, monthIdx[b.month]||0, b.day);
    const dT = dA - dB;
    return dT || Math.random() - 0.5;
  });

  const ul = document.createElement('ul');
  participants.forEach(p => {
    const li = document.createElement('li');
    li.className = 'order-item';
    li.title = `${p.name}\nEminence: ${p.emin}\nBirthdate: ${p.day} ${p.month} ${p.year}`;
    const label = document.createElement('div');
    label.textContent = `${p.name} (${p.emin} | ${p.year})`;
    const notes = document.createElement('textarea');
    notes.className   = 'order-notes';
    notes.placeholder = 'Notes…';
    li.append(label, notes);
    ul.append(li);
  });

  window.orderPanel.appendChild(ul);
}
