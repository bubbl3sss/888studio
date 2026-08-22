// ============================================
// 888 studio — main.js
// ============================================

// mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.querySelector('.nav');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('nav--open');
  });
}

// close mobile nav after clicking a link
document.querySelectorAll('.nav__links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('nav--open');
  });
});

// gentle scroll-reveal for sections and cards
const revealTargets = document.querySelectorAll(
  '.issue-card, .staff-card, .card--submit, .social-pill'
);

revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach(el => observer.observe(el));

// ============================================
// STAFF DATA — edit this whenever staff changes
// ============================================

const staffData = {
  // ---- INDIVIDUALS (Khwaish, Aritri) ----
  people: {
    khwaish: {
      name: "Khwaish Malhotra",
      role: "founder & editor-in-chief",
      email: "khwaish@888studio.com",
      photo: "assets/images/khwaish.jpeg",
      bio: "all about music, money and fashion."
    },
    aritri: {
      name: "Aritri Nandi",
      role: "lead writer & website dev",
      email: "aritritay13@gmail.com.com",
      photo: "assets/images/aritri.jpeg",
      bio: "lost in liminality of words, visions and culture. still in it for the art."
    }
    // to add a new individual card later:
    // 1. add a new entry here, e.g. "newperson: { name: ..., role: ..., email: ..., photo: ..., bio: ... }"
    // 2. add a matching <div class="staff-card" data-type="person" data-id="newperson"> in your HTML
  },

  // ---- TEAMS (each team = array of members) ----
  teams: {
    writing: {
      title: "Writing Team",
      members: [
        { name: "Bade Pusat", role: "writer", photo: "assets/images/pfp.jpeg", bio: "15 year old writer who loves art, music and films." },
        { name: "Jupiter", role: "writer", photo: "assets/images/pfp.jpeg", bio: "a Tunisian based writer, poet, scriptwriter and artist with a passion for culture, art and social activism. hoping make a great impact with the help of other ambitious people." },
        { name: "Radhika Sharma", role: "writer", photo: "assets/images/radhika.jpeg", bio: "writer with a soft spot for good books, great films, and music that lingers, she reads obsessively, writes curiously, and is always looking for another perspective to fall into."},
        { name: "Eleni Athanasiou", role: "writer", photo: "assets/images/eleni.jpeg", bio: "an 18-year-old Fashion Enterprise student and freelance writer, who adores literature, journalism & fashion. establishing a passionate multimedia community."}
        // add more members by copying the line above and changing the details
      ]
    },
    design: {
      title: "Design Team",
      members: [
        { name: "Ayca Somers", role: "graphic designer", photo: "assets/images/ayca.jpeg", bio: "giddily cosplaying as a locked in professional " },
        { name: "Jaimie Barit", role: "graphic designer", photo: "assets/images/jaimie.jpeg", bio: "that one whimsical rock chic borzoi that's really into tragedies, fashion, art, and theater ★" }

      ]
    },
    review: {
      title: "Review Team",
      members: [
        { name: "Divena Upadhyae", role: "reviewer", photo: "assets/images/divena.jpeg", bio: "an aspiring author and a language enthusiast from the Himalayas, who spends most of her time listening to music, delaying her assignments and watching c-dramas."}
        
      ]
    },
    marketing: {
      title: "Marketing Team",
      members: [
        { name: "Madison Ruby Hawthorne", role: "marketing", photo: "assets/images/madison.jpeg", bio: "fashion marketing student specialising in consumer insights, trend forecasting and emerging technologies. interested in how AI, culture and sustainability are reshaping luxury and contemporary fashion."}
      ]
    }
    // to add a whole new team later:
    // 1. add a new team object here, e.g. "photography: { title: 'Photography Team', members: [...] }"
    // 2. add a matching <div class="staff-card" data-type="team" data-id="photography"> in your HTML
  }
};

// ============================================
// MODAL LOGIC — you shouldn't need to touch this part
// ============================================

const personModal = document.getElementById('personModal');
const teamModal = document.getElementById('teamModal');

function openPersonModal(id) {
  const p = staffData.people[id];
  if (!p) return;

  document.getElementById('personModalPhoto').innerHTML = `<img src="${p.photo}" alt="${p.name}">`;
  document.getElementById('personModalName').textContent = p.name;
  document.getElementById('personModalRole').textContent = p.role;
  document.getElementById('personModalEmail').textContent = p.email;
  document.getElementById('personModalBio').textContent = p.bio;

  personModal.classList.add('modal-overlay--open');
}

function openTeamModal(id) {
  const team = staffData.teams[id];
  if (!team) return;

  document.getElementById('teamModalTitle').textContent = team.title;

  const listEl = document.getElementById('teamModalList');
  listEl.innerHTML = ''; // clear previous content

  team.members.forEach(member => {
    const card = document.createElement('div');
    card.className = 'modal-team-member';
    card.innerHTML = `
      <div class="modal-team-member__photo">
        <img src="${member.photo}" alt="${member.name}">
      </div>
      <h4>${member.name}</h4>
      <p>${member.role}</p>
      <p>${member.bio}</p>
    `;
    listEl.appendChild(card);
  });

  teamModal.classList.add('modal-overlay--open');
}

// click on any staff card
document.querySelectorAll('.staff-card').forEach(card => {
  card.addEventListener('click', () => {
    const type = card.dataset.type;
    const id = card.dataset.id;

    if (type === 'person') openPersonModal(id);
    if (type === 'team') openTeamModal(id);
  });
});

// close buttons
document.getElementById('personModalClose').addEventListener('click', () => {
  personModal.classList.remove('modal-overlay--open');
});
document.getElementById('teamModalClose').addEventListener('click', () => {
  teamModal.classList.remove('modal-overlay--open');
});

// click outside the box to close
[personModal, teamModal].forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('modal-overlay--open');
  });
});

// ============================================
// EIC NOTE — edit the message text here
// ============================================

const eicNoteMessage = `
hi, i’m Khwaish 💌
and I am the founder & Editor In Chief of the 888studio magazine.
Every-time i was so fed up of my daily routine i always caught myself either sketching, writing or learning about design or media and that’s when i realised this is exactly what i wish to do forevermore. I love any form of media either it be movies, music, magazines, documentaries and i appreciate it with my whole heart.
And therefore, I wanted to create a creative safe space for teens and young adults who wish to display their work and actually provide valuable feedback to help them grow. I dont want it to be another “aesthetic” page on Instagram, i want it to be factual and fun altogether and that’s exactly what we mean by our tagline, “style with substance” ⭐️
so if you’ve ever had an idea for any literary piece and nowhere to put it,
this page is for you.`;

const eicNoteFloat = document.getElementById('eicNoteFloat');
const eicNoteModal = document.getElementById('eicNoteModal');
const eicNoteModalClose = document.getElementById('eicNoteModalClose');

if (eicNoteFloat && eicNoteModal) {
  document.getElementById('eicNoteText').textContent = eicNoteMessage;

  eicNoteFloat.addEventListener('click', () => {
    eicNoteModal.classList.add('modal-overlay--open');
  });

  eicNoteModalClose.addEventListener('click', () => {
    eicNoteModal.classList.remove('modal-overlay--open');
  });

  eicNoteModal.addEventListener('click', (e) => {
    if (e.target === eicNoteModal) eicNoteModal.classList.remove('modal-overlay--open');
  });
}

// ============================================
// ISSUES DATA — edit this whenever an issue's lineup changes
// ============================================

const issuesData = {
  issue01: {
    title: "Issue 01 : interlinked",
    subtitle: "coming soon",
    submissions: [
      // {
      //   title: "Piece Title",
      //   author: "Author Name",
      //   cover: "assets/issues/issue01/piece1.jpg",
      //   link: "https://yoursubstack.substack.com/p/piece-1"
      // },
    ]
  },
  issue02: {
    title: "Issue 02: coming soon",
    subtitle: "details announced soon",
    submissions: []
  },
  issue03: {
    title: "Issue 03 : coming soon",
    subtitle: "details announced soon",
    submissions: []
  }
  // to add a new issue later:
  // 1. add a new entry here, e.g. "issue03: { title: ..., subtitle: ..., submissions: [...] }"
  // 2. add a matching <article class="issue-card" data-issue="issue03"> in your HTML
};

function openIssueModal(issueId) {
  const issue = issuesData[issueId];
  if (!issue) return;

  document.getElementById('issueModalTitle').textContent = issue.title;
  document.getElementById('issueModalSubtitle').textContent = issue.subtitle || '';

  // build the issue nav links
  const navEl = document.getElementById('issueModalNav');
  navEl.innerHTML = '';
  const issueIds = Object.keys(issuesData);
  issueIds.forEach((id, index) => {
    const link = document.createElement('a');
    link.textContent = issuesData[id].title.split(':')[0].trim();
    link.href = '#';
    link.onclick = (e) => {
      e.preventDefault();
      openIssueModal(id);
    };
    if (id === issueId) link.classList.add('issue-modal-nav__active');
    navEl.appendChild(link);

    if (index < issueIds.length - 1) {
      const divider = document.createElement('span');
      divider.className = 'issue-modal-nav__divider';
      divider.textContent = '·';
      navEl.appendChild(divider);
    }
  });

  // build the submission grid
  const gridEl = document.getElementById('issueModalGrid');
  gridEl.innerHTML = '';

  if (issue.submissions.length === 0) {
    gridEl.innerHTML = `<p class="card__text" style="grid-column: 1 / -1; text-align:center;">submissions coming soon ♡</p>`;
  } else {
    issue.submissions.forEach(sub => {
      const card = document.createElement('a');
      card.className = 'submission-card';
      card.href = sub.link;
      card.target = '_blank';
      card.rel = 'noopener';
      card.innerHTML = `
        <div class="submission-card__cover">
          <img src="${sub.cover}" alt="${sub.title}">
        </div>
        <p class="submission-card__title">${sub.title}</p>
        <p class="submission-card__author">${sub.author || ''}</p>
      `;
      gridEl.appendChild(card);
    });
  }

  issueModal.classList.add('modal-overlay--open');
}

const issueModal = document.getElementById('issueModal');
const issueModalClose = document.getElementById('issueModalClose');

if (issueModal && issueModalClose) {
  const issuesSingleBlock = document.getElementById('issuesSingleBlock');
  if (issuesSingleBlock) {
    issuesSingleBlock.addEventListener('click', () => {
      openIssueModal('issue01');
    });
  }

  issueModalClose.addEventListener('click', () => {
    issueModal.classList.remove('modal-overlay--open');
  });

  issueModal.addEventListener('click', (e) => {
    if (e.target === issueModal) issueModal.classList.remove('modal-overlay--open');
  });
}