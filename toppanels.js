function initBattlePanels(mountPoint = document.body) {
  const data = Object.values(characters);

  const wrapper = document.createElement('div');
  wrapper.className = 'panel-wrapper';

  // left panel
  const left = document.createElement('div');
  left.id = 'left-panel';
  left.className = 'panel';
  const search = document.createElement('input');
  search.id = 'search-box';
  search.placeholder = 'Search characters…';
  const list = document.createElement('ul');
  left.append(search, list);

  // right panel
  const right = document.createElement('div');
  right.id = 'right-panel';
  right.className = 'panel';
  const hdr = document.createElement('h3');
  hdr.textContent = 'Battle Participants';
  const drop = document.createElement('div');
  drop.id = 'drop-area';
  right.append(hdr, drop);

  wrapper.append(left, right);
  mountPoint.appendChild(wrapper);

  function render(items) {
    list.innerHTML = '';
    for (const it of items) {
      const li = document.createElement('li');
      li.textContent = it.meta.name || it.name;
      li.draggable = true;
      li.addEventListener('dragstart', e =>
        e.dataTransfer.setData('text/plain', li.textContent)
      );
      list.appendChild(li);
    }
  }

  render(data);

  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    const filtered = q
      ? data.filter(it =>
          (it.meta.name || it.name).toLowerCase().includes(q)
        )
      : data;
    render(filtered);
  });

  drop.addEventListener('dragover', e => e.preventDefault());
  drop.addEventListener('drop', e => {
    e.preventDefault();
    const name = e.dataTransfer.getData('text/plain');
    Array.from(list.children)
      .find(li => li.textContent === name)
      ?.remove();
    const item = document.createElement('div');
    item.className = 'participant-item';
    const span = document.createElement('span');
    span.textContent = name;
    const btn = document.createElement('button');
    btn.className = 'remove-btn';
    btn.textContent = '×';
    btn.onclick = () => item.remove();
    item.append(span, btn);
    drop.appendChild(item);
  });
}

