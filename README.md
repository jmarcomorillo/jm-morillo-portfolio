# Jade Marco S. Morillo Portfolio Site

This is a static portfolio website with three pages:

- `index.html` - home, profile summary, contact details, highlights
- `technical.html` - technical portfolio, academic milestones, project archive, technical skills, tools
- `extracurriculars.html` - leadership, writing, creative direction, marketing, soft skills, and organization work
- `assets/MORILLO_JADE-MARCO_CV.pdf` - downloadable CV linked from the home page
- `assets/Resume_Morillo_JadeMarco.pdf` - downloadable data analyst resume linked from the home page
- `assets/*.png` and project PDFs - screenshots and documentation for documented technical portfolio projects

## How to Preview

Open the local preview at:

```text
http://127.0.0.1:4173/index.html
```

If the local server is not running, open a terminal in this folder and run:

```bash
python -m http.server 4173 --bind 127.0.0.1
```

## Where to Add Assets

Create an `assets` folder beside these files and add:

- A professional portrait photo, then replace the initials block in `index.html`.
- Screenshots of inactive academic projects, then replace each `.screenshot-slot` block with an `<img>` tag.
- Optional downloadable CV PDF, then add a button linking to it.

Example project image:

```html
<img src="assets/smartech-dashboard.png" alt="SMARTech dashboard screenshot">
```

You can add this CSS if you switch screenshot placeholders to images:

```css
.screenshot-slot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

## Recommended External Tools

- VS Code: easiest way to edit the HTML, CSS, and JavaScript.
- Git: tracks changes locally.
- GitHub: hosts the code repository and connects cleanly to deployment services.
- Vercel or Netlify: deploys this static site for free from GitHub.
- Canva, Figma, or PowerPoint: useful for preparing clean project screenshots if old project pages no longer run.

Suggested workflow:

1. Edit locally in VS Code.
2. Commit changes with Git.
3. Push the folder to a GitHub repository.
4. Import the repository into Vercel or Netlify.
5. Add your custom domain later if needed.
