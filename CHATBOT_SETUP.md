# 🤖 Rent Affordability Chatbot Setup Guide

This document provides complete instructions for setting up and running the AI-powered chatbot feature.

## Overview

The chatbot feature allows users to interactively discuss rent affordability in New Jersey cities using an AI assistant. The system consists of:

- **Frontend**: HTML/CSS/JavaScript chatbot UI (runs on Express server on port 3001)
- **Backend**: Python Flask server with OpenAI integration (runs on port 5000)

## Prerequisites

1. **Node.js** (already installed for Express)
2. **Python 3.7+** (with venv already configured)
3. **OpenAI API Key** (get from https://platform.openai.com/api-keys)

## Installation & Setup

### Step 1: Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in to your OpenAI account
3. Create a new API key
4. Copy the API key (you won't be able to see it again)

### Step 2: Configure Environment Variables

1. Open the `.env` file in the project root
2. Replace `your_openai_api_key_here` with your actual API key:
   ```
   OPENAI_API_KEY=sk-xxx...
   ```
3. Save the file

**Important**: Never commit the `.env` file to version control. Add it to `.gitignore`.

### Step 3: Install Python Dependencies

The Python environment is already configured. Install the required packages:

```bash
# On Windows, using the configured virtual environment:
.venv\Scripts\pip install -r requirements.txt
```

Or manually install via the editor's Python tools.

## Running the Application

### Option A: Run Both Servers (Recommended)

You need to run TWO separate servers in different terminals:

**Terminal 1 - Express Server (Node.js)**:
```bash
npm start
# Server runs on http://localhost:3001
```

**Terminal 2 - Flask Server (Python)**:
```bash
# On Windows:
.venv\Scripts\python chatbot_backend.py

# On Mac/Linux:
source .venv/bin/activate
python chatbot_backend.py
# Server runs on http://localhost:5000
```

### Testing the Setup

1. Open http://localhost:3001 in your browser
2. Click on "Chatbot" in the navigation menu
3. Try asking a question like:
   - "Can I afford $1,800/month rent in Jersey City with $4,500/month income?"
   - "What's the most expensive city in NJ?"
   - "How much do I need to earn to afford rent in Hoboken?"

## Chatbot Features

### Rent Affordability Rules

The chatbot enforces these financial rules:

- **30% Rule** (Healthy): Rent ≤ 30% of gross income
- **30-40% Range** (Caution): Rent is 30-40% of gross income
- **Above 40%** (Rent-Burdened): Rent > 40% of gross income

### Supported Cities

The chatbot has data for these 8 NJ cities:

| City | Average Rent |
|------|--------------|
| Newark | $1,400 |
| Jersey City | $1,800 |
| Paramus | $1,650 |
| Elizabeth | $1,350 |
| Hoboken | $2,100 |
| Trenton | $1,200 |
| Atlantic City | $1,300 |
| New Brunswick | $1,400 |

### What the Chatbot Can Help With

✅ Calculate rent affordability based on income
✅ Explain the 30% affordability rule
✅ Suggest affordable cities based on income
✅ Calculate required income for desired cities
✅ Discuss rent-burden situations
✅ Provide practical financial advice

## File Structure

```
IS219-midterm-project/
├── chatbot_backend.py              # Flask server with OpenAI integration
├── requirements.txt                # Python dependencies
├── .env                            # OpenAI API key (not in git)
├── CHATBOT_SETUP.md               # This file
├── server.js                       # Express.js server
├── public/
│   ├── chatbot.html                # Chatbot UI page
│   ├── index.html                  # Home page (updated navbar)
│   ├── calculator.html             # Calculator page (updated navbar)
│   ├── css/
│   │   ├── styles.css              # Main styles
│   │   └── chatbot.css             # Chatbot-specific styles
│   └── js/
│       ├── calculator.js           # Calculator logic
│       └── chatbot.js              # Chatbot frontend logic
```

## Troubleshooting

### "Connection refused" or "Cannot connect to Flask"

**Problem**: The chatbot shows an error about connecting to the Flask backend.

**Solution**:
1. Make sure the Flask server is running on port 5000
2. Check that Python is installed and the virtual environment is activated
3. Verify the Flask server started without errors
4. Check your firewall isn't blocking port 5000

### "OpenAI API error" or "401 Unauthorized"

**Problem**: The chatbot returns an API error.

**Solution**:
1. Verify your API key is correctly set in `.env`
2. Check that your OpenAI account has credits
3. Make sure the API key is valid and not expired
4. Test the API key directly on https://platform.openai.com/account/api-keys

### Flask "ModuleNotFoundError"

**Problem**: Flask or other packages aren't found when running the Python server.

**Solution**:
1. Ensure the virtual environment is activated
2. Run `pip install -r requirements.txt` again
3. Verify Python version is 3.7 or higher: `python --version`

### CORS Errors in Browser Console

**Problem**: JavaScript gets CORS errors when communicating with Flask.

**Solution**: This is already handled by Flask-CORS in the backend. If you still see errors:
1. Verify the Flask server is running
2. Check that requests are going to `http://localhost:5000`
3. Clear browser cache and reload

## Development Notes

### OpenAI Model Used

Currently using `gpt-3.5-turbo` for cost-effectiveness. To change the model:

1. Open `chatbot_backend.py`
2. Find the line: `model="gpt-3.5-turbo"`
3. Change to another model (e.g., `gpt-4`, `gpt-4-turbo-preview`)
4. Note: Different models have different pricing and capabilities

### Customizing the Chatbot

The chatbot's behavior is defined by the `SYSTEM_PROMPT` in `chatbot_backend.py`. To customize:

1. Edit `SYSTEM_PROMPT` in `chatbot_backend.py`
2. Change the instructions, tone, or capabilities
3. Restart the Flask server

## Future Enhancements

Potential improvements to the chatbot:

- [ ] Add conversation memory (multi-turn context)
- [ ] Include apartment listing data from real estate APIs
- [ ] Add voice input/output
- [ ] Fine-tune the model with specific training data
- [ ] Add support for more NJ cities and neighborhoods
- [ ] Implement cost estimates for utilities, transport
- [ ] Create a chat history/saved conversations feature

## Support & Issues

If you encounter issues:

1. Check the troubleshooting section above
2. Verify both servers are running
3. Check the browser console for errors (F12)
4. Check the Flask server terminal for error messages
5. Ensure your `.env` file is correctly set up

---

**Last Updated**: March 2026
**Chatbot Version**: 1.0