@echo off
echo ===============================
echo   Auto Push to GitHub
echo ===============================

git add .
git commit -m "fix: migrate to output export for Netlify"
git push origin main

echo.
echo ✅ Push completed successfully!
pause
