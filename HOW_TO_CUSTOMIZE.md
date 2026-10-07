# 🚀 How to Customize Your Portfolio Website

Welcome to your portfolio website! This website was built so that you have **total control** over adding your **photo**, **text**, or **images**.

You have two convenient ways to customize everything:
1. **Interactive In-Browser Customizer (Fastest & No Code)**: Point, click, upload photos, or edit details directly on your screen!
2. **Configuration File (`portfolio-data.js`)**: Open the file in any text editor and change values cleanly.

---

## ⚡ Method 1: In-Browser Instant Customizer (Recommended)

When you open `index.html` in your browser, you will notice interactive editing buttons:

### 1. Change Photo or Switch to Text Initials (Avatar)
- Hover over your avatar on the Home page and click **"📷 Photo / Text"**.
- A popup appears with 3 choices:
  - **📁 Upload File**: Click to choose any photo from your Mac or phone (JPG, PNG, WebP). It loads immediately!
  - **🔗 File Path / URL**: Enter a local path (e.g. `assets/images/my-photo.jpg`) or an online image URL.
  - **🔤 Text Initials**: If you don't have a photo or prefer a sleek monogram (e.g. `PS`), type your initials. It creates a bold gradient badge!
- Click **"Apply & Save"** — your choice is instantly applied and saved in your browser!

### 2. Edit Name, 1-2 Line Intro, Phone, Email & Social Links
- Click the floating **"✏️ Edit Details"** button in the bottom-left corner of the screen.
- A clean settings panel will open:
  - **Personal Info tab**: Update your Full Name, Professional Title, 1-2 Line Intro, and Availability Status.
  - **Contact & Social tab**: Update your Phone number, Email address, Location, LinkedIn, GitHub, and Instagram URLs.
- Click **"💾 Save & Apply"** to instantly update the site.
- Click **"📥 Export JS File"** to download an updated `portfolio-data.js` file anytime you want to save your changes permanently to the project folder!

---

## 🛠️ Method 2: Editing `portfolio-data.js` Directly

If you prefer to edit files in VS Code, TextEdit, or any code editor, open:
📁 **`portfolio-website/portfolio-data.js`**

### 1. Photo or Text Avatar
```javascript
personal: {
  name: "Prashant Sahu",
  role: "Software Developer & Tech Enthusiast",
  intro: "Write your custom 1-2 line introduction here.",
  
  // Option A: Use an Image file or URL
  avatarType: "image", // "image" or "text"
  avatar: "assets/images/avatar-placeholder.svg", // Replace with "assets/images/my-photo.jpg"

  // Option B: Or use Text Initials
  // avatarType: "text",
  // avatarText: "PS",
  ...
}
```

### 2. Educational Details (About Page)
```javascript
education: [
  {
    degree: "Bachelor of Technology in Computer Science & Engineering",
    institution: "Your University / College Name",
    year: "2020 — 2024",
    score: "CGPA: 8.5 / 10.0",
    description: "Write details about your studies or projects here."
  },
  // Add more degrees as needed
]
```

### 3. Hobbies & Interests (About Page)
```javascript
hobbies: [
  {
    icon: "💻",
    title: "Open Source & Coding",
    description: "Building side projects and experimenting with new tech."
  },
  {
    icon: "🎮",
    title: "Gaming & Strategy",
    description: "Enjoying multiplayer strategy and immersive games."
  }
]
```

### 4. Achievements & Milestones (About Page)
```javascript
achievements: [
  {
    title: "Hackathon Winner / Finalist",
    organization: "National Level TechFest Hackathon",
    year: "2023",
    description: "Built an AI-driven accessibility platform that won 1st runner-up."
  }
]
```

### 5. Skills & Certifications (Skills Page)
```javascript
skills: [
  { name: "HTML5 & Modern CSS3", level: 95, category: "frontend", icon: "🌐" },
  { name: "JavaScript (ES6+)", level: 90, category: "frontend", icon: "⚡" },
  { name: "Python", level: 85, category: "backend", icon: "🐍" },
  { name: "Git & GitHub", level: 90, category: "tools", icon: "🐙" }
]
```

### 6. Contact Details & Social Links (Contact Page)
```javascript
contact: {
  phone: "+91 98765 43210",       // Displayed on screen
  phoneClean: "+919876543210",     // Clean format for click-to-call
  email: "your.email@example.com", // Your email for click-to-email & contact form
  address: "New Delhi, India",     // Your city

  socials: {
    linkedin: {
      name: "LinkedIn",
      username: "linkedin.com/in/your-profile",
      url: "https://www.linkedin.com/in/your-profile"
    },
    github: {
      name: "GitHub",
      username: "github.com/your-username",
      url: "https://github.com/your-username"
    },
    instagram: {
      name: "Instagram",
      username: "@your-handle",
      url: "https://instagram.com/your-handle"
    }
  }
}
```

---

## 🌐 How to View and Test

1. **Directly in Browser**: Double-click `index.html` in Finder to open it in Safari or Chrome.
2. **Local Web Server**:
   ```bash
   cd portfolio-website
   python3 -m http.server 8000
   ```
   Open `http://localhost:8000` in your browser.
