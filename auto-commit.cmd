@echo off
:start
git add -A
git commit -m "auto-commit"
git push
@ping 127.0.0.1 -n 2 -w 10000 > nul
goto start
pause