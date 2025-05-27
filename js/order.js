function updateOrderPanel() {
  if (!window.orderPanel) return;
  // clear old entries
  Array.from(orderPanel.children)
    .filter(el => el.tagName !== 'H3')
    .forEach(el => el.remove());
  // gather names
  const drop = document.getElementById('drop-area');
  const names = Array.from(drop.children)
    .map(div => div.textContent.replace('×','').trim());
  // build list
  const ol = document.createElement('ol');
  names.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    ol.appendChild(li);
  });
  orderPanel.appendChild(ol);
}
