@echo off
title DreamsGuider & Sarvaj Edtech - GenAI Internship Portal
echo ================================================================
echo  DREAMSGUIDER ^& SARVAJ EDTECH PVT. LTD.
echo  GenAI with Data Science: Training & Internship Portal
echo ================================================================
echo.
echo Starting local web server...
start "" "http://localhost:5000"
python server.py
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Python server could not start. Opening index.html directly in browser...
    start "" "index.html"
)
pause
