@echo off
:start
git add -A
git commit -m "auto-commit"
git push
timeout /t 10 /nobreak > NUL
goto start
pause