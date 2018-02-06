@echo off
:start
git add -A
git commit -m "auto-commit"
git push
goto start
timeout /t 10 /nobreak > NUL
pause