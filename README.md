# Flashcard Learning App

React-based flashcard application for creating and studying flashcards. Works entirely offline without databases or external services.

## Features

### Flashcard Set Management
- Create, edit, and delete flashcard sets
- Grid view of all sets
- Search sets by name

### Flashcard Management
- Add cards with front/back content
- Edit and delete individual cards
- Multi-tag support per card
- View all cards within a set

### Learning Features
- Interactive learning mode with card flipping
- Shuffle cards
- Progress tracking
- Mark cards as learned/unlearned

### Search and Filter
- Search cards by content or tags
- Filter by multiple tags
- Real-time filtering

### Data Management
- Persistent localStorage storage
- Import flashcard data from JSON
- Export flashcard data as JSON
- No database required

## Tech Stack

- **React** 19.2
- **TypeScript**
- **Tailwind CSS** - styling
- **ShadCN UI** - component library
- **Zustand** - state management with localStorage persistence

## Installation

```bash
npm install
```

## Development

```bash
npm start
```

Opens app at http://localhost:3000

## Build

```bash
npm run build
```

Production build in `build/` directory.

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # ShadCN UI components
│   ├── HomePage.tsx    # Main page with sets grid
│   ├── SetDetailPage.tsx # Set view with cards
│   ├── CardDialog.tsx  # Add/edit card modal
│   ├── SetDialog.tsx   # Add/edit set modal
│   ├── CardItem.tsx    # Individual card display
│   ├── SetCard.tsx     # Set card display
│   ├── LearnMode.tsx   # Learning interface
│   ├── SearchBar.tsx   # Search component
│   ├── TagFilter.tsx   # Tag filtering
│   └── ImportExport.tsx # JSON import/export
├── store.ts            # Zustand store
├── types.ts            # TypeScript interfaces
├── utils.ts            # Utility functions
└── App.tsx             # Root component
```

## Data Structure

### Flashcard Set
```typescript
{
  id: string;
  title: string;
  createdAt: number;
}
```

### Flashcard
```typescript
{
  id: string;
  setId: string;
  front: string;
  back: string;
  tags: string[];
  learned: boolean;
  createdAt: number;
}
```

## Storage

All data persists in browser localStorage via Zustand middleware. Data survives page refreshes and browser restarts.

## Import/Export

Export creates JSON file with all sets and cards. Import accepts same JSON format for backup/restore or data transfer between browsers.
