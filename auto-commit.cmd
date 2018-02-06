@echo off
:start
echo start
git add -A
git commit -m "auto-commit"
git push
echo done.
timeout /t 10 /nobreak > NUL
goto start
pause