# Project Setup Instructions

## Project Overview
Building an npm-based website for college graduates' rent affordability calculator in NJ with:
- Landing page (informational)
- Interactive calculator page (calculates rent affordability by city and income)
- Built with Node.js/Express, HTML, CSS, and JavaScript

## Progress Tracking

- [x] Create copilot-instructions.md
- [x] Scaffold npm project structure
- [x] Create landing page and styles
- [x] Create interactive calculator page
- [x] Implement rent affordability logic
- [x] Set up Express.js server
- [x] Install dependencies and test
- [x] Create/update documentation

## Completed Setup

**Server Running**: http://localhost:3001

### Project Structure Created:
```
IS219-midterm-project/
├── public/
│   ├── index.html           # Landing page with hero section
│   ├── calculator.html      # Interactive calculator interface
│   ├── css/
│   │   └── styles.css       # Responsive design (mobile, tablet, desktop)
│   └── js/
│       └── calculator.js    # Rent affordability calculation engine
├── server.js                # Express.js server (port 3001)
├── package.json             # npm dependencies (express)
├── README.md                # Full project documentation
└── .github/copilot-instructions.md
```

### Key Features Implemented:
- **Landing Page**: Informational homepage with features overview
- **Calculator Page**: Interactive form for income and city selection
- **Calculation Engine**: 30% affordability rule using rent data for 8 NJ cities
- **Results Display**: Color-coded affordability status with income gap calculation
- **Responsive Design**: Mobile-friendly CSS with breakpoints at 768px and 480px
- **Error Handling**: Validation for income input and city selection

## Project Details
- Framework: Express.js (Node.js)
- Frontend: HTML5, CSS3, Vanilla JavaScript
- Target: College graduates in New Jersey
- Features:
  - Rent affordability calculator for popular NJ cities
  - Income requirement calculator (if current income insufficient)
