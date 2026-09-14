// Elements
  const hall = document.getElementById('hall');
  const roomNav = document.getElementById('roomNav');
  const hallVideo = document.getElementById('hallVideo');
  const rooms = {
    room1: document.getElementById('room1'),
    room2: document.getElementById('room2'),
    room3: document.getElementById('room3'),
    room4: document.getElementById('room4'),
    room5: document.getElementById('room5'),
    room6: document.getElementById('room6'),
  };
  const backBtn = document.getElementById('backToHall');
  const navButtons = {
    btnHall: document.getElementById('btnHall'),
    btnRoom1: document.getElementById('btnRoom1'),
    btnRoom2: document.getElementById('btnRoom2'),
    btnRoom3: document.getElementById('btnRoom3'),
    btnRoom4: document.getElementById('btnRoom4'),
    btnRoom5: document.getElementById('btnRoom5'),
    btnRoom6: document.getElementById('btnRoom6'),
  };
  const doors = {
    door1: document.getElementById('door1'),
    door2: document.getElementById('door2'),
    door3: document.getElementById('door3'),
    door4: document.getElementById('door4'),
    door5: document.getElementById('door5'),
  };
  const artifactImg = document.getElementById('artifactImg');

  // Modal elements
  const modalOverlay = document.getElementById('modalOverlay');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  // Utility: Show one room, hide others + hall
  function showRoom(roomId) {
    hall.style.display = 'none';
    roomNav.hidden = false;
    if (hallVideo) hallVideo.pause();
    backBtn.hidden = false;
    for (const key in rooms) {
      rooms[key].classList.remove('active');
    }
    if (rooms[roomId]) {
      rooms[roomId].classList.add('active');
      rooms[roomId].focus();
    }
    // Update nav buttons active state and aria-current
    Object.entries(navButtons).forEach(([key, btn]) => {
      btn.classList.remove('active');
      btn.removeAttribute('aria-current');
    });
    const navBtnId = 'btn' + roomId.charAt(0).toUpperCase() + roomId.slice(1);
    if (navButtons[navBtnId]) {
      navButtons[navBtnId].classList.add('active');
      navButtons[navBtnId].setAttribute('aria-current', 'page');
    }
  }
  // Show hall, hide rooms
  function showHall() {
    hall.style.display = 'flex';
    roomNav.hidden = true;
    if (hallVideo && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      hallVideo.play().catch(() => {});
    }
    backBtn.hidden = true;
    for (const key in rooms) {
      rooms[key].classList.remove('active');
    }
    // Update nav buttons active state and aria-current
    Object.entries(navButtons).forEach(([key, btn]) => {
      btn.classList.remove('active');
      btn.removeAttribute('aria-current');
    });
    navButtons.btnHall.classList.add('active');
    navButtons.btnHall.setAttribute('aria-current', 'page');
    hall.querySelector('.door').focus();
  }

  // Event listeners for doors
  Object.entries(doors).forEach(([key, door]) => {
    door.addEventListener('click', () => {
      const roomNum = key.replace('door', '');
      showRoom('room' + roomNum);
    });
    door.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        door.click();
      }
    });
  });

  // Event listeners for nav buttons
  navButtons.btnHall.addEventListener('click', showHall);
  navButtons.btnRoom1.addEventListener('click', () => showRoom('room1'));
  navButtons.btnRoom2.addEventListener('click', () => showRoom('room2'));
  navButtons.btnRoom3.addEventListener('click', () => showRoom('room3'));
  navButtons.btnRoom4.addEventListener('click', () => showRoom('room4'));
  navButtons.btnRoom5.addEventListener('click', () => showRoom('room5'));
  navButtons.btnRoom6.addEventListener('click', () => showRoom('room6'));

  // Back to hall button
  backBtn.addEventListener('click', showHall);

  // Room 2: Artifact image zoom toggle
  artifactImg.addEventListener('click', () => {
    artifactImg.classList.toggle('zoomed');
  });
  artifactImg.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      artifactImg.click();
    }
  });

  // Room 3: Card flip effect
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const inner = card.querySelector('.card-inner');
    card.addEventListener('click', () => {
      inner.classList.toggle('flipped');
      const pressed = inner.getAttribute('aria-pressed') === 'true';
      inner.setAttribute('aria-pressed', !pressed);
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Room 5: Architecture cards - optional detailed info on click (can be extended)
  // Currently no modal for architecture cards, but can be added similarly if needed

  // Room 6: Message circles open modal with details
  const messageCircles = document.querySelectorAll('.message-circle');
  messageCircles.forEach(circle => {
    circle.addEventListener('click', () => {
      openModal(circle.textContent, circle.dataset.msg);
    });
    circle.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        circle.click();
      }
    });
  });

  // Modal functions
  function openModal(title, desc) {
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalOverlay.classList.add('active');
    modalCloseBtn.focus();
  }
  function closeModal() {
    modalOverlay.classList.remove('active');
    // Return focus to last focused element before modal opened
    if (lastFocusedElement) lastFocusedElement.focus();
  }
  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Keep track of last focused element before modal
  let lastFocusedElement = null;
  messageCircles.forEach(circle => {
    circle.addEventListener('focus', () => {
      lastFocusedElement = circle;
    });
  });

  // Respect reduced-motion preference for the video background.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function syncHallVideoMotion() {
    if (!hallVideo) return;
    if (reduceMotion.matches) hallVideo.pause();
    else if (hall.style.display !== 'none') hallVideo.play().catch(() => {});
  }
  if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', syncHallVideoMotion);

  // Initialize: show hall on load
  showHall();
  syncHallVideoMotion();