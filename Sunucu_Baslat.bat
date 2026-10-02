@echo off
title Yesilpelit Duyuru Panosu Sunucusu

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [Bilgi] Node.js bulunamadi. Site dogrudan tarayicida aciliyor...
    call "%~dp0Baslat.bat"
    exit /b 0
)

node "%~dp0server.js"
pause
