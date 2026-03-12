from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Rent affordability dataset
RENT_DATA = {
    'newark': {'name': 'Newark', 'averageRent': 1400},
    'jersey-city': {'name': 'Jersey City', 'averageRent': 1800},
    'paramus': {'name': 'Paramus', 'averageRent': 1650},
    'elizabeth': {'name': 'Elizabeth', 'averageRent': 1350},
    'hoboken': {'name': 'Hoboken', 'averageRent': 2100},
    'trenton': {'name': 'Trenton', 'averageRent': 1200},
    'atlantic-city': {'name': 'Atlantic City', 'averageRent': 1300},
    'new-brunswick': {'name': 'New Brunswick', 'averageRent': 1400}
}

# Create a system prompt that makes the AI a rent affordability assistant
SYSTEM_PROMPT = """You are a helpful rent affordability assistant for college graduates in New Jersey. 
You help users understand whether they can afford rent in different NJ cities using the 30% affordability rule.

The 30% Affordability Rule: Rent should not exceed 30% of gross monthly income.
- If rent is more than 30% of income: warn the user
- If rent is above 40% of income: explain that they may be rent-burdened

Here is the current rent data for NJ cities (2026 estimates):
- Newark: $1400/month
- Jersey City: $1800/month
- Paramus: $1650/month
- Elizabeth: $1350/month
- Hoboken: $2100/month
- Trenton: $1200/month
- Atlantic City: $1300/month
- New Brunswick: $1400/month

When users ask about affordability:
1. If they provide income and a city, calculate if it's affordable using the 30% rule
2. If not affordable, tell them how much more they need to earn
3. Provide encouragement and practical suggestions for improving affordability
4. Always reference the 30% rule and explain the calculations

Be friendly, informative, and empowering. Help them make informed decisions about their housing choices."""

@app.route('/chat', methods=['POST'])
def chat():
    """Handle chat messages and send them to OpenAI"""
    try:
        data = request.get_json()
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({'error': 'Message cannot be empty'}), 400
        
        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_message}
            ],
            max_tokens=500,
            temperature=0.7
        )
        
        ai_response = response.choices[0].message.content
        
        return jsonify({
            'response': ai_response,
            'success': True
        })
    
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

@app.route('/rent-data', methods=['GET'])
def get_rent_data():
    """Return rent data for the frontend"""
    return jsonify(RENT_DATA)

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)