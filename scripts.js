document.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});

document.addEventListener('mousedown', function(event) {
  if (event.button === 1) {
    event.preventDefault();
  }
});

document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === 'a') {
    event.preventDefault();
  }
});

document.addEventListener('selectstart', function(event) {
  event.preventDefault();
});

document.addEventListener('dragstart', function(event) {
  event.preventDefault();
});

document.addEventListener('dragover', function(event) {
  event.preventDefault();
});

document.addEventListener('copy', function(event) {
  event.preventDefault();
});

document.addEventListener('paste', function(event) {
  event.preventDefault();
});

document.getElementById('show-songs-btn').addEventListener('click', async () => {
  const container = document.getElementById('songs-container');
  if (container.style.display === 'none' || container.innerHTML === '') {
    const response = await fetch('txt/songs.txt');
    const text = await response.text();
    const lines = text.trim().split('\n');

    container.innerHTML = '';
    container.style.display = 'block';

    lines.forEach((line) => {
      const p = document.createElement('p');
      p.textContent = line;
      p.className = 'song-line';
      container.appendChild(p);
    });

    setTimeout(() => {
      container.style.opacity = '1';
    }, 100);
  } else {
    container.style.opacity = '0';
    setTimeout(() => {
      container.style.display = 'none';
      container.innerHTML = '';
    }, 300);
  }
});

document.getElementById('show-components-btn').addEventListener('click', async () => {
  const container = document.getElementById('components-container');
  if (container.style.display === 'none' || container.innerHTML === '') {
    const response = await fetch('txt/components.txt');
    const text = await response.text();
    const lines = text.trim().split('\n');

    container.innerHTML = '';
    container.style.display = 'block';

    lines.forEach((line) => {
      const p = document.createElement('p');
      const [description, link] = line.split('|');

      const a = document.createElement('a');
      a.href = link;
      a.textContent = description;
      a.target = "_blank";

      p.className = 'components-line';
      p.appendChild(a);
      container.appendChild(p);
    });

    setTimeout(() => {
      container.style.opacity = '1';
    }, 100);
  } else {
    container.style.opacity = '0';
    setTimeout(() => {
      container.style.display = 'none';
      container.innerHTML = '';
    }, 300);
  }
});
