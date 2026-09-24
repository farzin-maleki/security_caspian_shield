/* Shared components and behaviour. Serve through the configured Vercel routes. */
(() => {
  "use strict";
  // Resolve shared links from this script, independent of page depth or hosting folder.
  const siteRoot = new URL("../../../", document.currentScript.src);
  const assetRoot = new URL("dist/assets/", siteRoot);
  const data = window.CASPIAN,
    file = (location.pathname.split("/").pop() || "index.html").replace(
      /^(\w[\w-]*)$/,
      "$1.html",
    );
  const icons = {
    shield: "shield-halved",
    patrol: "car-side",
    door: "door-open",
    event: "users",
    building: "building",
  };
  const icon = (name) =>
    `<i class="icon fa-solid fa-${icons[name] || icons.shield}" aria-hidden="true"></i>`;
  const brand = `<a class="brand" href="index.html" aria-label="Security Caspian Shield Ltd home"><img src="assets/images/logo.webp" alt="" width="59" height="67"><span class="brand-name">CASPIAN SHIELD<small>SECURITY SERVICES</small></span></a>`;
  const link = (href, label) =>
    `<a href="${href}"${file === href ? ' aria-current="page"' : ""}>${label}</a>`;
  document.querySelector("[data-header]").innerHTML =
    `<header class="site-header"><div class="wrap nav-bar">${brand}<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-navigation" aria-label="Toggle navigation"><span class="menu-label">Menu</span> <i class="ui-icon fa-solid fa-bars" aria-hidden="true"></i></button><nav class="main-nav" id="main-navigation" aria-label="Main navigation">${link("index.html", "Home")}${link("about.html", "About us")}<details class="nav-services"><summary>Our services <i class="nav-chevron fa-solid fa-chevron-down" aria-hidden="true"></i></summary><div class="dropdown">${link("services.html", "All services")}${data.services.map((s) => link(s.id + ".html", s.name)).join("")}</div></details>${link("contact.html", "Contact us")}<a class="button" href="quote.html"${file === "quote.html" ? ' aria-current="page"' : ""}>Get a quote <span aria-hidden="true"><i class="ui-icon fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></span></a></nav></div></header>`;
  document.querySelector("[data-footer]").innerHTML =
    `<footer class="site-footer"><div class="wrap"><div class="footer-grid"><div class="footer-brand">${brand}<p>Protecting your people, your property and your peace of mind.</p></div><div class="footer-col"><h3>COMPANY</h3><a href="about.html">About us</a><a href="services.html">Our services</a><a href="contact.html">Contact us</a><a href="quote.html">Get a quote</a></div><div class="footer-col"><h3>OUR SERVICES</h3>${data.services.map((s) => `<a href="${s.id}.html">${s.name}</a>`).join("")}</div><div class="footer-col"><h3>LET’S TALK</h3><a href="tel:${data.phone.replace(/\s/g, "")}">${data.phone}</a><a href="https://wa.me/${data.whatsapp.replace(/\D/g, "")}" target="_blank" rel="noopener noreferrer">Message on WhatsApp <i class="ui-icon fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a><a href="${data.instagram}" target="_blank" rel="noopener noreferrer">Instagram <i class="ui-icon fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Security Caspian Shield Ltd. All rights reserved.</span><span class="footer-credit">Designed &amp; Built by <a class="designer-name" href="https://www.farzin-maleki.com/">Farzin</a></span></div></div></footer>`;
  const toggle = document.querySelector(".menu-toggle"),
    nav = document.querySelector(".main-nav"),
    dropdown = document.querySelector(".nav-services");
  function closeNav() {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    dropdown.open = false;
  }
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const open = nav.classList.contains("is-open");
      const serviceOpen = dropdown.open;
      closeNav();
      if (open) toggle.focus();
      else if (serviceOpen) dropdown.querySelector("summary").focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-services")) dropdown.open = false;
    if (!e.target.closest(".site-header")) closeNav();
  });
  matchMedia("(min-width:961px)").addEventListener("change", closeNav);
  document.querySelectorAll("[data-services]").forEach((el) => {
    el.innerHTML =
      data.services
        .filter((s) => s.id !== el.dataset.exclude)
        .map(
          (s, i) =>
            `<a class="service-card" href="${s.id}.html"><div>${icon(s.icon)}</div><h3>${s.name}</h3><p>${s.description}</p><span class="card-link">Explore service <span aria-hidden="true"><i class="ui-icon fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></span></span></a>`,
        )
        .join("") +
      (el.dataset.cta !== undefined
        ? `<a class="service-card cta-card" href="quote.html"><span class="eyebrow">YOUR SECURITY, YOUR WAY</span><h3>Find your protection.</h3><p>Tell us what you need to protect.</p><span class="card-link">Get a tailored quote <span aria-hidden="true"><i class="ui-icon fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></span></span></a>`
        : "");
  });
  document
    .querySelectorAll("[data-icon]")
    .forEach((el) => (el.innerHTML = icon(el.dataset.icon)));
  document
    .querySelectorAll("[data-service-strip]")
    .forEach(
      (el) =>
        (el.innerHTML = data.services
          .map((s) => `<a href="${s.id}.html">${s.name}</a>`)
          .join("")),
    );
  document
    .querySelectorAll("[data-cta]:not([data-services])")
    .forEach(
      (el) =>
        (el.innerHTML = `<section class="cta-band"><div class="wrap"><div><h2>Let’s talk about your security.</h2><p>Tell us what you need. We’ll take it from there.</p></div><a class="button button-dark" href="quote.html">Get a tailored quote <span aria-hidden="true"><i class="ui-icon fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></span></a></div></section>`),
    );
  document
    .querySelectorAll("[data-contact-options]")
    .forEach(
      (el) =>
        (el.innerHTML = `<div class="contact-option"><h3>Call our team</h3><p>Discuss your requirements.</p><a href="tel:${data.phone.replace(/\s/g, "")}">${data.phone}</a></div><div class="contact-option"><h3>WhatsApp</h3><p>Send us a message.</p><a href="https://wa.me/${data.whatsapp.replace(/\D/g, "")}" target="_blank" rel="noopener noreferrer">Message us on WhatsApp <i class="ui-icon fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a></div><div class="contact-option"><h3>Email us</h3><a href="mailto:${data.email}">${data.email}</a></div><div class="contact-option"><h3>Find us on Instagram</h3><p>Team photos and updates.</p><a href="${data.instagram}" target="_blank" rel="noopener noreferrer">@security_caspian_shield <i class="ui-icon fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a></div>`),
    );
  const form = document.querySelector("#quote-form");
  if (form) {
    const select = form.elements.service;
    data.services.forEach((s) => select.add(new Option(s.name, s.id)));
    const selected = new URLSearchParams(location.search).get("service");
    if (data.services.some((s) => s.id === selected)) select.value = selected;
    const labels = {
      name: "your name",
      phone: "a phone number with 7–15 digits",
      email: "a valid email address",
      service: "a service",
      message: "a few details about your requirements",
    };
    function validate(field) {
      let message = "";
      const value = field.value.trim();
      if (!value) message = `Please enter ${labels[field.name]}.`;
      else if (
        field.name === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      )
        message = "Please enter a valid email address.";
      else if (
        field.name === "phone" &&
        (!/^[+\d\s().-]+$/.test(value) ||
          value.replace(/\D/g, "").length < 7 ||
          value.replace(/\D/g, "").length > 15)
      )
        message = "Please enter a phone number with 7–15 digits.";
      field.setAttribute("aria-invalid", String(Boolean(message)));
      document.querySelector("#" + field.name + "-error").textContent = message;
      return !message;
    }
    const fields = ["name", "phone", "email", "service", "message"].map(
      (n) => form.elements[n],
    );
    fields.forEach((field) => {
      field.addEventListener("blur", () => {
        if (field.value || field.getAttribute("aria-invalid") === "true")
          validate(field);
      });
      field.addEventListener("input", () => {
        if (field.getAttribute("aria-invalid") === "true") validate(field);
        document.querySelector("#enquiry-preview").hidden = true;
        document.querySelector("#form-status").textContent = "";
      });
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const invalid = fields.filter((field) => !validate(field));
      if (invalid.length) {
        document.querySelector("#form-status").textContent =
          "Please check the highlighted fields.";
        invalid[0].focus();
        return;
      }
      const service = data.services.find((s) => s.id === select.value).name;
      const body = `Quote request — ${data.name}\n\nName: ${form.elements.name.value.trim()}\nPhone: ${form.elements.phone.value.trim()}\nEmail: ${form.elements.email.value.trim()}\nService: ${service}\n\nDetails:\n${form.elements.message.value.trim()}`;
      const preview = document.querySelector("#enquiry-preview");
      preview.hidden = false;
      preview.querySelector("pre").textContent = body;
      preview.querySelector("[data-send-email]").href =
        `mailto:${data.email}?subject=${encodeURIComponent("Security quote request: " + service)}&body=${encodeURIComponent(body)}`;
      preview.querySelector("[data-send-whatsapp]").href =
        `https://wa.me/${data.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(body)}`;
      document.querySelector("#form-status").textContent =
        "Enquiry ready. Choose email or WhatsApp to review and send. Nothing has been sent yet.";
      preview.focus();
    });
  }

  // Root homepage and nested service pages share one navigation implementation.
  document.querySelectorAll("a[href]").forEach((anchor) => {
    const href = anchor.getAttribute("href");
    if (/^[a-z-]+\.html(?:[?#]|$)/i.test(href)) {
      anchor.href = new URL(
        href.replace(/^index\.html/, "").replace(/\.html(?=[?#]|$)/, ""),
        siteRoot,
      ).href;
    }
  });
  document
    .querySelectorAll("[data-header] img, [data-footer] img")
    .forEach((img) => {
      img.src = new URL("images/logo.webp", assetRoot).href;
    });

  // Icon-only contact links keep descriptive names for assistive technology.
  document
    .querySelectorAll("a[href], a[data-send-whatsapp]")
    .forEach((anchor) => {
      const href = anchor.getAttribute("href") || "";
      let type, label;
      if (href.startsWith("tel:")) {
        type = "telephone";
        label = "Call " + data.phone;
      } else if (
        href.startsWith("https://wa.me/") ||
        anchor.hasAttribute("data-send-whatsapp")
      ) {
        type = "whatsapp";
        label = anchor.hasAttribute("data-send-whatsapp")
          ? "Open quote in WhatsApp"
          : "Message us on WhatsApp";
      } else if (href.startsWith("https://www.instagram.com/")) {
        type = "instagram";
        label = "Visit Security Caspian Shield on Instagram";
      }
      if (!type) return;
      anchor.classList.remove("button", "text-link");
      anchor.classList.add("social-link");
      anchor.setAttribute("aria-label", label);
      anchor.setAttribute("title", label);
      const socialClass =
        type === "telephone" ? "fa-solid fa-phone" : "fa-brands fa-" + type;
      anchor.innerHTML =
        '<i class="social-icon ' + socialClass + '" aria-hidden="true"></i>';
    });
  // Explicit Font Awesome elements replace CSS-generated interface icons.
  document
    .querySelectorAll(".check-list li, .hero-note span, .service-strip a")
    .forEach((element) => {
      const marker = document.createElement("i");
      marker.className =
        "list-icon fa-solid " +
        (element.closest(".service-strip") ? "fa-plus" : "fa-check");
      marker.setAttribute("aria-hidden", "true");
      element.prepend(marker);
    });
  document.querySelectorAll(".faq summary").forEach((summary) => {
    summary.insertAdjacentHTML(
      "beforeend",
      '<i class="faq-icon faq-expand fa-solid fa-plus" aria-hidden="true"></i><i class="faq-icon faq-collapse fa-solid fa-minus" aria-hidden="true"></i>',
    );
  });
})();
