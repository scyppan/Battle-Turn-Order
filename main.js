let characters;

const cssfiles = ['toppanels.css']
const jsfiles = ['load.js', 'toppanels.js']
// const htmlfiles  = [
//   'intro','overview','attributes','rolling','abilities',
//   'bloodstatus','development','characteristics',
//   'parental','traits','skills', 'knowledge'
// ]

function loadAssets(baseUrl, version) {
  return new Promise((resolve, reject) => {
    const head = document.head;
    const fullPath = baseUrl + '@' + version + '/';
    const total = cssfiles.length + jsfiles.length;
    let loaded = 0;
    const ok = () => ++loaded===total && resolve();

    cssfiles.forEach(file => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fullPath + 'css/' + file;
      link.onload  = ok;
      link.onerror = () => reject(new Error(`CSS load failed: ${file}`));
      head.appendChild(link);
    });

    jsfiles.forEach(file => {
      const script = document.createElement('script');
      script.src = fullPath + 'js/' + file;
      script.defer = true;
      script.onload  = ok;
      script.onerror = () => reject(new Error(`JS load failed: ${file}`));
      head.appendChild(script);
    });

    if (total===0) resolve();
  });
}

async function initapp(baseUrl, version) {
  try {
    await loadAssets(baseUrl, version);
    await loadSnippets(baseUrl, version);
  } catch (err) {
    console.error('Asset loading error:', err);
    return;
  }
  characters = await fetchfresh(972);
  document.getElementById('char-count')?.remove();
}
