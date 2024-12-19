# SuperHeroApp

## Overview

SuperHeroApp is a React-based web application that allows users to find their best superhero match based on their responses to a series of questions. Users can answer a set of questions, and based on their answers, the application calculates and displays the superhero that best matches their characteristics.

## Features

- **Home Page**: Start the quiz and answer questions.
- **Character Detail Page**: View detailed information about the matched superhero.
- **Redux State Management**: Manage state for questions, user answers, and superhero data.
- **Loading and Error Handling**: Display loading spinner and handle errors during API calls.
- **Dynamic Content**: Show different tabs with superhero details (powerstats, biography, appearance, connections).

## Installation

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn

### Steps

1. **Clone the repository**:

   ```sh
   git clone https://github.com/yourusername/SuperHeroApp.git
   cd SuperHeroApp
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

   or

   ```sh
   yarn install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following environment variables:

   ```
   VITE_PROXY=your_proxy_url
   VITE_BASE_URL=your_base_url
   VITE_API_KEY=your_api_key
   ```

4. **Run the application**:

   ```sh
   npm start
   ```

   or

   ```sh
   yarn start
   ```

   The application will be available at `http://localhost:3000`.

## Usage

1. Open the application in your browser.
2. Answer the questions presented on the home page.
3. The application will calculate and display your best superhero match.
4. Navigate through the tabs on the character detail page to view more information about the matched superhero.

## Project Structure

- `src/`
  - `components/`: Reusable UI components.
  - `pages/`: Main pages (HomePage, CharacterDetailPage).
  - `redux/`: Redux store configuration and slices.
  - `styles/`: Common styles using Material-UI's `makeStyles`.
  - `App.tsx`: Main application component.
  - `index.tsx`: Entry point of the application.

## Redux State Management

- **questionsSlice**: Manages state related to questions and user answers.

  - `setInitialData`: Sets initial list of superheroes.
  - `setAnswers`: Stores user's answers.
  - `setBestMatchClear`: Clears the best match.
  - `calculateFinalCracteristics`: Calculates the best match based on user answers.

- **superHerosSlice**: Manages state related to superheroes fetched from the API.
  - `fetchSuperheroes`: Async thunk to fetch superheroes.
  - Handles loading, success, and error states for API calls.

## Utility Functions

- **calculateSimilarity**: Calculates the similarity score between user answers and superhero powerstats.

## Testing

### Prerequisites

- Jest
- @testing-library/react
- @testing-library/jest-dom

### Setup

Add the following to your `package.json`:

```json
"jest": {
  "setupFilesAfterEnv": ["@testing-library/jest-dom/extend-expect"]
}
```
