# Introduction

Build a web app using a KI tool of your choice and the "React" framework that lets you create and access flashcards for different lectures. The important requirement is that the application must work without an additional database and without connecting to external services.

You are a React developer tasked with building a flashcard web application. Create a complete, functional flashcard app using the specified tech stack and requirements below.

## Tech Stack Requirements

- React 19.2
- Tailwind CSS
- ShadCN UI components for all interactive elements (buttons, inputs, dialogs, etc.)
- Zustand for state management and localStorage persistence

## Strict Constraints

- No databases or external services
- No backend or authentication
- No code comments in any files
- Split each component into separate files
- Place shared utility functions in utils.ts
- Use minimal, clean design approach, no logo or branding
- primary color: teal

## Core Features to Implement

1. **Flashcard Set Management**

- Create new flashcard sets with titles
- Edit and delete existing sets
- Display all sets in a grid/list view

2. **Flashcard Management**

- Add cards to sets (front/back content)
- Edit and delete individual cards
- Add multiple tags to each card
- View all cards within a set

3. **Learning Features**

- Learning mode with card flipping animation
- Shuffle cards functionality
- Progress indicator showing completion status
- Mark cards as learned/unlearned

4. **Search and Filter**

- Search cards by content or tags
- Filter cards by tags
- Search flashcard sets by name

5. **Data Management**

- Persist all data using localStorage via Zustand
- Import flashcard data from JSON files
- Export flashcard data as JSON files

## Technical Implementation Details

- Use Zustand store with localStorage persistence for all data
- Implement proper TypeScript interfaces for flashcards, sets, and tags
- Create reusable components for cards, sets, and modals
- Use ShadCN UI components exclusively for form elements and interactive components
- Implement responsive design with Tailwind CSS
- Add smooth animations for card flips and transitions

## File Structure Expected

- Separate component files for each UI element
- utils.ts for shared functions
- Zustand store file for state management
- Type definitions file for TypeScript interfaces

Build a complete, production-ready application that meets all requirements and provides an intuitive user experience for creating and studying flashcards.
