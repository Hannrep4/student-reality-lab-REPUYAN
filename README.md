# NJ Rent Affordability Calculator

## Essential Question

Can college graduates entering the workforce afford to rent in popular New Jersey cities on entry-level salaries?

## Claim (Hypothesis)

Most college graduates earning between $35,000–$60,000 annually will struggle to afford rent in urban NJ cities like Jersey City and Hoboken, but can find affordable housing in areas like Newark and Trenton using the 30% affordability rule.

## Audience

College graduates (ages 21–27) transitioning to full-time employment in New Jersey seeking clarity on rent affordability and realistic income targets for their chosen city.

## STAR Draft

**S — Situation**
- College graduates face significant financial uncertainty when relocating for work
- Rent is frequently the largest expense for young professionals
- Many don't know if their starting salary is sufficient or what minimum income they should target
- Having concrete affordability benchmarks reduces financial stress and improves decision-making

**T — Task**
- Viewers should understand whether their current monthly income supports rent in their target city
- Users should be able to calculate the exact monthly income needed to afford rent at the 30% threshold
- Graduates should feel empowered to compare cities and plan their career trajectory accordingly

**A — Action**
We will build an interactive rent affordability calculator with two views:
- **Landing Page**: Educational overview explaining the 30% rule, target audience, and supported cities
- **Calculator Page**: Interactive form where users input income and city; real-time affordability status and income gap calculation displayed

**R — Result**
- Users will receive instant, color-coded feedback (Affordable / Not Affordable)
- For insufficient income, the calculator displays the monthly income shortfall
- Data will show that entry-level salaries ($40k–$50k) are inadequate in 4+ major NJ cities, validating the hypothesis
- Success metric: 100% of users can determine affordability status and required income within 30 seconds

---

## Dataset & Provenance

| Source | Details | Retrieval Date | License |
|--------|---------|----------------|----------|
| **Custom Compiled Data** | Average rent prices for 8 NJ cities collected from real estate research and market surveys | March 2026 | Internal Use |
| | Cities: Newark, Jersey City, Paramus, Elizabeth, Hoboken, Trenton, Atlantic City, New Brunswick | — | — |

**Note**: These are estimated average monthly rents. Actual prices vary by neighborhood, lease date, and property type. For current, precise data, consult [Zillow](https://www.zillow.com), [Apartments.com](https://www.apartments.com), or local NJ real estate boards.

---

## Data Dictionary

| Column Name | Meaning | Units | Data Type | Example |
|-------------|---------|-------|-----------|----------|
| `city` | Name of city in New Jersey | Text (string) | String | "Jersey City" |
| `average_rent` | Monthly average rent across the city | US Dollars (USD) | Integer | 1800 |
| `population_category` | City size classification | Categorical | String | "Urban" / "Suburban" |
| `availability_score` | Rental market tightness (scale 1–5) | Rating scale | Integer | 4 |
| `user_income_threshold` | Minimum monthly income to afford rent at 30% rule | US Dollars (USD) | Integer | 6000 |

---

## Data Viability Audit

### Missing Values & Weird Fields

- No missing values currently; all 8 cities have rent data
- Some cities have seasonal rent fluctuations (e.g., college-driven spike in New Brunswick Aug–Sept) not accounted for in averages
- Data does not differentiate by bedroom count, location within city, or apartment condition

### Cleaning Plan

1. **Outlier Detection**: Flag rents deviating >20% from regional averages; investigate luxury vs. budget segments
2. **Consistency Check**: Verify all rent values are positive integers in reasonable range ($800–$3,000)
3. **Date Alignment**: Ensure all data points are from same time period (month/quarter) to avoid temporal bias
4. **Documentation**: Maintain a data log noting when rent prices change and the source of updates

### What This Dataset Cannot Prove

- **Geographic Bias**: Data covers only 8 cities; many NJ communities are unrepresented
- **Selection Bias**: Rent prices represent mainstream rental markets; does not include subsidized housing or luxury developments
- **Temporal Limitation**: Snapshot data; cannot predict future rent trends or seasonal variations
- **Causation**: Calculator shows *correlation* between income and affordability, not *causation*
- **Individual Variation**: Does not account for roommates, partner income, financial aid, or family support—only individual income
- **Quality & Commute**: Rent excludes utility costs, maintenance, or commute time to job centers

---

## Draft Chart Screenshot

*[TODO: Add screenshot of sample affordability comparison chart from Sheets/Excel]*
*Example: Bar chart showing "Monthly Income Required vs. Current Income" across the 8 cities*

**Why this chart answers the question:**
- **Visual Clarity**: Instantly communicates which cities are affordable and which create income gaps
- **Actionable Insight**: Graduates see concrete dollar amounts needed, enabling career planning and location decisions

---

## How to Run This Project

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

### Chatbot Feature (NEW!)

The project now includes an **AI-powered chatbot** for rent affordability discussions!

To use the chatbot, you need to:

1. Set up a separate **Python Flask backend** (see [CHATBOT_SETUP.md](CHATBOT_SETUP.md))
2. The chatbot uses OpenAI API, so you'll need an API key
3. Run both the Express server (port 3001) and Flask server (port 5000)

**Quick Start**:
```bash
# Terminal 1: Start Express server
npm start

# Terminal 2: Start Flask server
python chatbot_backend.py
```

Then navigate to http://localhost:3001/chatbot

**For complete setup instructions**, see [CHATBOT_SETUP.md](CHATBOT_SETUP.md)

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

**Chatbot Files**:
```
├── chatbot_backend.py        # Flask server with OpenAI integration (port 5000)
├── .env                      # OpenAI API key configuration (not in git)
├── requirements.txt          # Python dependencies
├── CHATBOT_SETUP.md         # Detailed chatbot setup instructions
├── public/
│   ├── chatbot.html          # Chatbot UI page
│   ├── css/
│   │   └── chatbot.css       # Chatbot-specific styles
│   └── js/
│       └── chatbot.js        # Chatbot frontend logic
```
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

Hannah Repuyan
Created with the assistance of VSCode Chat feature for IS219 Midterm Project.

## License

ISC
