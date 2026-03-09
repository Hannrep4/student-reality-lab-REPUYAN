#!/usr/bin/env python3
import codecs

with codecs.open('README.md', 'r', encoding='utf-8') as f:
    content = f.read()

# Find where '## Features' starts
start_idx = content.find('## Features')
if start_idx != -1:
    # Keep everything before '## Features'
    new_content = content[:start_idx]
    
    # Add the new sections
    new_content += """## How to Run This Project

### Installation

1. Navigate to the project directory:
   ```bash
   cd IS219-midterm-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Usage

1. Start the server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3001
   ```

3. Explore the landing page or click "Try the Calculator" to begin

### Affordability Formula

The calculator uses the **30% Rule**—a standard financial guideline:

```
Maximum Affordable Rent = Monthly Income × 0.30
```

If average rent exceeds this threshold:
```
Monthly Income Needed = Average Rent ÷ 0.30
```

---

## Project Structure

```
IS219-midterm-project/
├── public/
│   ├── index.html           # Landing page with hero section
│   ├── calculator.html      # Interactive calculator interface
│   ├── css/
│   │   └── styles.css       # Responsive design (mobile, tablet, desktop)
│   └── js/
│       └── calculator.js    # Rent affordability calculation engine
├── data/
│   ├── cities.csv           # (Placeholder) City rent data
│   └── notes.md             # Data source documentation & caveats
├── server.js                # Express.js server (port 3001)
├── package.json             # npm dependencies
└── README.md                # This file
```

---

## Supported Cities & Estimated Average Rent

| City | Average Monthly Rent | Income Threshold (30% Rule) |
|------|----------------------|------------------------------|
| Newark | $1,400 | $4,667 |
| Jersey City | $1,800 | $6,000 |
| Paramus | $1,650 | $5,500 |
| Elizabeth | $1,350 | $4,500 |
| Hoboken | $2,100 | $7,000 |
| Trenton | $1,200 | $4,000 |
| Atlantic City | $1,300 | $4,333 |
| New Brunswick | $1,400 | $4,667 |

---

## Features

- **Landing Page**: Informational overview of the 30% rule, audience, and supported cities
- **Interactive Calculator**: Input gross monthly income and select a city for instant affordability feedback
- **Dynamic Results**: Color-coded status (Affordable / Not Affordable) with income gap calculation
- **Responsive Design**: Mobile-friendly layout with breakpoints at 768px and 480px
- **Error Handling**: Validation for income input and city selection

---

## Future Enhancements

- Integrate live rent data from APIs (Zillow, RentOMeter)
- Expand to all NJ cities and neighborhoods
- Add filters for apartment size (studio, 1BR, 2BR, etc.)
- Include other major expenses (utilities, transport, student loans)
- User account system to save calculator history and preferences

---

## Author

Created for IS219 Midterm Project

## License

ISC"""
    
    with codecs.open('README.md', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('README.md updated successfully')
else:
    print('Could not find ## Features section')
