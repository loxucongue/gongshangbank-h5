const sections = Array.from(document.querySelectorAll("[data-section]"));
const dots = Array.from(document.querySelectorAll(".dot"));
const reveals = Array.from(document.querySelectorAll("[data-reveal]"));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    dots.forEach((dot) => {
      dot.classList.toggle("is-active", dot.dataset.target === visible.target.id);
    });
  },
  {
    root: null,
    threshold: [0.35, 0.55, 0.75],
  }
);

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

reveals.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 4, 3) * 90}ms`;
  revealObserver.observe(item);
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const target = document.getElementById(dot.dataset.target);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

document.querySelectorAll(".faq-item").forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    const isOpen = button.classList.toggle("is-open");
    answer.classList.toggle("is-open", isOpen);
  });
});
