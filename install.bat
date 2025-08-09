@echo off
echo Installing GitHub Profile Finder dependencies...
echo.

echo Step 1: Installing React and core dependencies...
npm install react@^18.2.0 react-dom@^18.2.0 react-scripts@5.0.1

echo.
echo Step 2: Installing TailwindCSS and PostCSS...
npm install -D tailwindcss@^3.3.0 autoprefixer@^10.4.14 postcss@^8.4.24

echo.
echo Step 3: Installing testing libraries...
npm install -D @testing-library/jest-dom@^5.16.4 @testing-library/react@^13.3.0 @testing-library/user-event@^13.5.0

echo.
echo Step 4: Installing web-vitals...
npm install web-vitals@^2.1.4

echo.
echo Installation complete! You can now run:
echo npm start
echo.
pause
