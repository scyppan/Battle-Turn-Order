function createOrderPanel(mountPoint = document.body) {
  if (window.orderPanel) return window.orderPanel;
  const panel = document.createElement('div');
  panel.id = 'order-panel';
  panel.className = 'panel';
  const hdr = document.createElement('h3');
  hdr.textContent = 'Order Panel';
  panel.appendChild(hdr);
  mountPoint.appendChild(panel);
  window.orderPanel = panel;
  return panel;
}